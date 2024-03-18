/**********************************************************
 *	Messagerie de page-HTML vers embed, et réciproquement
 *	- Paramétrer ce script : rechercher PARAMETER_TODO. Chaque paramètre est décrit.   
 *	- Voir : doc_embed_request.txt
 * http://localhost:81/tools/ember_request/wvembed_master.html
 */
//********************************************************************************************************************
// 															POUR TEST
//********************************************************************************************************************
//--------------------------------------------------------------------------------------------------------------------
// 														  S E R V E U R												 
//--------------------------------------------------------------------------------------------------------------------
/**
 * Intègre des variables dans des texte, au format du langage C : %1 = var1, %2=var2...
 * Notez que les balise '%n' sont numérotées à partir de 1
 * Exemple : 'il %2 beau %1' params = ['ici', 'fait'] => 'ils fait beau ici'
 * Paramètres :
 * - varsP : variables à incorporer dans le texte
 * - startP (optionnel=0) : début dans lecture dans le tableau
 *		Note : certaines tables de variables comporte le texte en 1ère case du tableau, startP vaudra 1
 */
String.prototype.wvVarC=function(varsP, startP){
	let p = (Array.isArray(varsP))? varsP:arguments;
	let nb = p.length;
	let text_ = this;
	for (let i=startP, j=1; i<nb;i++,j++) {					// inclus dans le message au format C : %1
		text_=text_.replace('%'+j,p[i]);// ex : printf("il %1 beau", "fait");
	}
	return text_;
}
/**
 * Point d'accroche global pour toutes les fonctions accéssibles par une "requète dans un embed" (cible-requète)
 * La page HTML 'embed' respectera la sintaxe suivante pour TOUTES ces fonctions "cible-requète" 
 * - WvEmbedEvent.nomFonction(message, fonctionDeRetour)
 *		- message : message envoyé par la page-html-container 
 *					par la fonction de lancement de la requète (lance-requète)
 *					Rappel de la syntaxe du lance requète :
 *						- let result = await window.wvEmbedRequest.postWait(message, "nomCibleRequete", délaiMax);
 * 		- fonctionDeRetour : retourne le résultat au lance-requète
 *					IMPORTANT 1 : n'est utile que pour les fonctions asynchrones : setTimeout(), accès serveur...
 *					IMPORTANT 2 : Pour toutes les autre fonctions, la plupart en réalité, on utilisera "return" 
 */
class WvEmbedEvent{}

	/**
	 * Utilitaire proposé aux fonctions-cible-requète.
	 * Cet outil prend encharge la levée d'une erreur à retourner à la fonction "lance-requète" (page container).
	 * - formate le message d'erreur à envoyer
	 * - lève l'erreur, qui sera interceptée par : commandTimeout().catch(e)
	 */
	WvEmbedEvent.wvErrorSys=function(p){
		if(arguments.length==1){
			throw new Error(JSON.stringify(arguments[0]));
		}
		let t =[];
		for(let i=0; i<arguments.length;i++){t.push(arguments[i]);}
		throw new Error(JSON.stringify(t));
	}
	/** §1
	* Exemple de fonction-embed synchrone appelée dans l'embed
	* Les erreurs sont traitée de façon classique par : throw new Error(votre_message_d-erreur);
	* 	=> l'erreur traversera tout le service-request pour être capturer par "catch" dans votre script d'appel.
	* Paramètres / obligatioires et uniques
	* - messages : message envoyé par l'utilisateur
	* Exemple de script utilisateur: 
	*		let result = window.wvEmbedRequest.postWait("Fait-il beau", "onEmbed2", 5000);
	*		- "il fait beau" sera placé dans messageP
	*		- result : recevra la valeur retournée : la réponse  2222	
	*/
	WvEmbedEvent.onEmbed2=function(messageP, returned){					// Exemple de fonction synchrone
		if(messageP===undefined || messageP===null || messageP==="new Error"){ 
			throw new Error("question absente.");				// L'erreur sera capturée par "catch" 
		}														// dans votre script d'appel.
		console.log("Oui je suis l'embed 2 "+messageP);
		return 2222;
	};
	/**  §1
	* Exemple de fonction-embed asynchrone appelée dans l'embed
	* Les erreurs sont traité de façon identique à la fonction synchrone
	* Paramètres / obligatioires et uniques
	* - messages : message envoyé par l'utilisateur
	* - returned : fonction d'envoi de réponse
	*		cette réponse sera reçu dans le script utilisateur, grâce à une égalité
	* Exemple de script utilisateur: 
	*		let result = window.wvEmbedRequest.postWait("Fait-il beau", "onEmbed1", 5000);
	*		- "il fait beau" sera placé dans messageP
	*		- result : recevra le paramètre de returned() : la réponse "ici Aussi"	
	*/
	WvEmbedEvent.onEmbed1=function(messageP, returned){			// *Exemple* de fonction-embed pour "question" :
		if(messageP===undefined || messageP===null || messageP==="new Error"){ 
			throw new Error("question absente.");				// L'erreur sera capturée par "catch" 
		}														// dans votre script d'appel.
		setTimeout(												
			(messageP,returned)=>{console.log("Oui je suis l'embed 1"+messageP);returned({tata:111,toto:222,titi:333})}
			, 3000, messageP, returned);						// Notez que le retour prend le chemin : returned(réponse)
	};	
//********************************************************************************************************************
//********************************************************************************************************************
// 														P R O G R A M M E
//********************************************************************************************************************
//********************************************************************************************************************

function AaaCristalputer(){}

const  WVEMBED_NAME		= "cristalputer";					// *PARAMETER_TODO* inscrirer le nom de l'embed
															//	 	Ce nom filtre les post envoyé par window pour
															// 		conserver uniquement ce traitement
const START_EMBEED_REQUEST_IMMEDIATE   = true;				// *PARAMETER_TODO* faut-il démarrer ce Service
															// 		automatiquement au chargement de l'embed*
															//      Sinon l'utilisateur pourra le démarrer par :
															//		- WvEmbedRequest.start()
															//		  IMPORTANT : ce démmarage doit s'effectuer
															// 					  DANS l'embed

/**_______________________________________________________________________________________________
 * Service de requète d'une page HTML vers un Embed
 * il est placé automatiquement dans la page HTML container ainsi que dans l'Embed
 * Il comporte 2 plateformes : le client et le serveur
 * Process :
 * - prend en charge les messages de l'utilisateurs
 *	 - transmet le message au serveur - empaqueté dans une "requète"
 *	 - recoit le paquet du serveur, paquet auquel est ajouté la réponse
 * - de plus, avant l'envoi au serveur, prend la précaution de conserver
 *   les informations utiles dans un bagage (waiter) placé en consigne (stockWaiters).
 *   Informations restituée lors du retour de la question.
 * - et enfin un service d'alerte limite le délai accordé au serveur avant de répondre 
 * Format des Messages
 *		- envoi traité immédiatement avec accusé reception
 *			postWait(messageP, eventEmbedNameP, delaiMax) 
 */
class WvEmbedRequest{

															// Construction du service de requète
	CLIENT_DELAY_DEFAULT	= 3000;							// *PARAMETER_TODO* inscrivez le delay d'attente maximale par défaut
	WVEMBED_SITE			= "http://localhost:81/";//"https://www.wvanim.fr";		// *PARAMETER_TODO* inscrivez l'url de votre site
															//________________________________________
	STEP_TO_CLIENT			= 1;							// Etapes du service requète
	STEP_RETURNED_CLIENT	= 2;

	WV_EMBED_ERROR_MESSAGE_ABSENT ="<no message>";			// Messages d'erreurs
	WV_EMBED_ERROR_ANSWER_ABSENT  ="<no answer>";
															// numéros des messages d'erreur
	ERROR_TIME_OUT			= 0;
	ERROR_MESSAGE_MISSING	= 1;
	ERROR_MESSAGE_TIMEOUT	= 2;
	ERROR_EVENT_UNKNOWN		= 3;
	ERROR_INSIDE			= 4;
	ERROR_UNKNOWN			= 5;
	ERROR_ERROR				= 6;
	ERROR_QUESTION			= 7;
	ERROR_ANSWER			= 8;
	ERROR_IN_EVENT			= 9;
	ERROR_MESSAGES=[										// *PARAMETER_TODO* Messages d'erreurs. A traduire.
		"Délay dépassé. Message supprimé :",
		"En retour de serveur, le message initialement envoyé est introuvable.",
		"message arrivé hors delai.",
		"Evenement '%1' de l'embed inconnu",
		"%1\nError in embed",
		"*ERROR* unknown",
		"*ERROR*",
		"message",
		"answer",
		"Erreur fonction embed :\n%1",
	];
	//------------------------------------------------------------------------
	//							  C O N S T R U C T O R
	//------------------------------------------------------------------------
	/**
	 * Construit le service d'échange "embed" pour le placer dans les 2 windows : 
	 * - container et embed
	 * Reference :
	 * - WvEmbedRequest.init()
	 *	 - pour la window-container
	 *	 - ET pour la window-embed
	 */
	constructor(windowP, embedNameP){
		this.ptWinTarget = windowP;							// Window de destination
		this.embedName	 = embedNameP;						// nom de l'embed pour ne sélectionner 
															// 		que les messages concernés
		this.stockWaiters = new this.StockWaiters(this);
		this.stockTimeout 	= new this.StockTimeout(this);
	};
	/**
	 * Fonction d'appel asynchrone 
	 * Envoie la question, puis attend une réponse
	 * Cette fonction gère les erreurs.
	 * Exemple de lance-requète (script utilisateur) :
	 * 	 	let result = await window.wvEmbedRequest.postWait(mess, func, delai);
	 *		- .then[0] => retourne la resultat à result
	 *		- .then[1] => lève une erreur qui sera interceptée 
	 *					   par 'try...catch(e)' du script utilisateur 
	 * Reference :
	 * - lance-requète de la page HTML container 
	 *---------------------------------------------------------------------------
	 * References then[0] :
	 * - receiveAnswer(request) 
	 *		retour de la réponse envoyée par le serveur, reçu par le client
	 * References then[0] :
	 * - errorsThrow(request)
	 *		- retour de la réponse envoyée par le serveur, reçu par le client
	 *		- alarme de délai dépassé.
	 */
	async postWait(message,eventEmbedNameP,delayMaxP) {
		let flagError=false;
															// Place la question dans la boite aux lettre du client
															// le service reste figé en attente de réponse
		const result = await this.postPromise(message,eventEmbedNameP,delayMaxP).
			then((p)=>{return p;},							// Une seule réponse asynchrone 
				 (p)=>{throw new Error(this.errorToString(p));}//JSON.stringify(p));}	// Sinon c'est une erreurr
				);
		return result;										// retourne le résultat

	}
	/**
	 * Fonction système utilisée pour les requètes asynchrone
	 * C'est la promise nécessaire à "async"
	 * Reference :
	 *	- postWait();
	 */
	postPromise=function(messageP, eventEmbedNameP, delayP){
		let service = this;
		return new Promise(
			(thenOk,thenError)=>{
				service.questionPost(messageP, eventEmbedNameP, thenOk, thenError, delayP);
			}  
		);
	};
	/**
	 * Réception de requète
	 * Il faut évidemment filtrer les reqètes pour ne traiter que celles de cette embed
	 * Ensuite nous l'orientons vers le client ou le serveur
	 * Reception d'évenement "message" ajouté dans window par : WvEmbedRequest.init()
	 * Reférence 
	 *	- window.postMessage( message )
	 *		événement déclenché par : 
	 *		- questionPost() - question envoyée par le client, reçu ici par le serveur 
	 *  	- answerPost()   - réponse envoyé par le serveur, reçu ici par le client
	 */
	receive(e){												
		let requestP = JSON.parse(e.data);						// Récupérer les données transmises
		if(requestP.embedName!=this.embedName) return;			// Sélectionne les requète de cet embed uniquement
		if(requestP.step==this.STEP_RETURNED_CLIENT){		//----------------------------------------
			this.receiveAnswer(requestP, this);					// Retour chez le client
			return;
		}														//----------------------------------------
		this.receiveQuestion(requestP);							// Arrivée dans le server
	}
	//************************************************************************************************
	//					   							SERVICE CLIENT
	//************************************************************************************************
	/**
	* Service pour le client.
	* Le client est l'appelant, celui qui déclenche cet échange de messages
	* Il envoie la requète et reçoit la réponse du serveur.
	* Et enfin retourne la réponse au lance-requète (script asynchrone de l'utilisateur).
	*/
	//************************************************************************// Request mémorisées chez le client
	//								M E S S A G E 							  // En vue de retrouver les données au retour
	//************************************************************************// Puis envoi de la requète sur le serveur (embed)
	/**_______________________________________________________________________________________________
	 *					   				P O S T E   L E   M E S S A G E
	 * poste un message-question du client vers le serveur.
	 * Et prépare un bagage (waiter) à placer dans la consigne (stockWaiters)
	 * - waiter : bagage mis-en-attente, déposé dans une consigne (stockWaiters) en attente du retour de requète.
	 *			  ce bagage contient les "then()" (listeners) pour répondre à l'utulisateur qui attend
	 *			  patiemment sa réponse dans sont script asyncrone.
	 * Paramètres :
	 * - message : message à envoyé, au format accepté par JSON (mais pas encore converti par JSON)
	 *             donc : nombre, texte, tableau de nombre texte (Array ou Map), tableau de tableaux
	 * - eventEmbedNameP : nom de la fonction-dans-l'embed déclenchée par cette requète 
	 * - thenOkP 	: postWait().then[0] -> envoie la réponse à l'utilisateur
	 * - thenErrorP : postWait().then[1] -> lève une erreur envoyée à l'utilisateur
	 * - delayP		: délai accordé au serveur pour répondre avant de déclencher l'alarme
	 * Reference :
	 * - postPromise()
	 */
	questionPost(messageP, eventEmbedNameP, thenOkP, thenErrorP, delayP){
		let request = {										// Construction de la requète envoyé au srveur
			message		: messageP,
			eventName	: eventEmbedNameP,
			embedName	: this.embedName,
			step		: this.STEP_TO_CLIENT
		}													
		let tictac=null;
		if (delayP){										// Lance l'alarme de depassement de délai
			tictac = setTimeout(this.onTimeOut, delayP, request, this );
		}													// Bagage en consigne le temps du retour de la réponse
		let waiter = {ok:thenOkP,error:thenErrorP, request:request, tictac:tictac};
		request.id = this.stockWaiters.add(waiter);			// Place le bagage dans la consigne
															// Poste la requète
		this.ptWinTarget.postMessage(JSON.stringify(request), this.WVEMBED_SITE);
	};
	/**_______________________________________________________________________________________________
	 *					   					R E T O U R   A U   C L I E N T
	 * Retour du serveur.
	 * La classe ayant été dénaturée par JSON lors du "postMessage()" 
	 * Le retour traite un tableau.
	 * Process :
	 * 1 ère opération : retrouver le waiter - bagage mise en consigne
	 * 2 - arrèter le délai de l'alarme 
	 * 3 - vérifier si une erreur est retournée
	 *     => lever cette erreur
	 * 4 - envoyer le retour 
	 *	   => wvEmbedRequest.postWait().then[0]
	 *		  qui retournera directement le message au lance-requète (instruction de l'utilisateur)
	 *		  cette reponse est transmise par un simple signe '='
	 *		  ex de lance-requète : 
	 *			let result = await window.wvEmbedRequest.postWait(mess, func, delai);
	 *			=> ici "questionP.waiter.ok({reponse,reponse})" envoie directement dans "result"
	 * Reference :
	 * - recieve()
	 */
	receiveAnswer(requestP){			
		let questionP = this.stockWaiters.getRequestReceived(requestP); 
		if(!questionP){
			if(requestP.errors) this.WvEmbedErrors.errorsThrow(requestP); 
			return;
		}						// Erreur : a disparu - timeout par exemple
		if(questionP.waiter.tictac){					// Arrête le délai de l'alarme				
			clearTimeout(questionP.waiter.tictac);							
		}												// Si nécessaire, lève une erreur	
		if(questionP.errors) this.WvEmbedErrors.errorsThrow(questionP); 
														// retoune la réponse - la requeste complète 
		questionP.waiter.ok({answer:questionP.answer, question:questionP.message});
	}
	//**************************************************************// Pour les 'questions', les informations	
	//								S T O C K 						// du message sont stockées en vu du
	//**************************************************************// du traitement de la réponse
	/**_______________________________________________________________________________________________
	/** 
	 * Mémorise les question traitées immédiatement, dès leur Arrivée
	 * Cette mémorisation se respecte aucun ordre. 
	 * Chaque question est ajoutée au tableau en attendant la réponse
	 * L'indexation s'effectue sur un nom donné à la requète.
	 * Ce nom suis la requète à chaque étape, aussi bien coté serveur
	 * que côté client.
	 * Ce service est transparent pour l'utilisateur de WvEmbedRequest 
	 */
	StockWaiters = class extends Map{
		static idCurr=0;
		//------------------------------------------------------------------------
		//							C O N S T R U C T O R
		//------------------------------------------------------------------------
		/**
		 * Référence
		 *		WvEmbedRequest.constructor()
		 */
		constructor(serviceP){super(); this.idCurr=0; this.service=serviceP;}
		/**
		 * Ajout une requète : en fait ne conserve que le listener
		 * Le reste suivra le process du service requète, et reviendra complet du serveur
		 * Reference :
		 * - questionPost()
		 */
		add(waiterP){										// Génération d'un indentifiant unique : type String
			waiterP.id = "i"+this.idCurr++;
			this[waiterP.id] = waiterP;
			return waiterP.id;		
		}
		/**
		 * La réponse est arrivée.
		 * Récupérer le listener de la requète
		 * Note : la réponse revient sans sa classe. Elle a disparu lors du 'postMessage()' 
		 * En entrée : request
		 * en Sortie : request+waiter (la requète en paramètre auquel est accroché le bagage (waiter))
		 * References
		 * - receiveAnswer()
		 * - onTimeOut()
		 */
		getRequestReceived(requestP){
			let waiter = this[requestP.id];					// Récupère le waiter de la question
			delete  this[requestP.id];						// Supprime la case du tableau
			if(waiter==null){								// Si absent vérifie si le délai est dépassé
				this.service.stockTimeout.verify(requestP);
				return null;
			}
			if(waiter===requestP)return requestP;
			waiter.request=null;
			requestP.waiter = waiter;
															// retoune la requète
			return requestP; 								// si la réponse à bien été reçue
		}	
	};
	/**_______________________________________________________________________________________________
	 * Vérifie si une requète est reçu après le temps limite
	 * Dans ce cas, il est inutile de retourner une erreur puisque
	 * l'erreur est déjà relevée lors du time-out
	 */
	StockTimeout = class extends Map{
		//------------------------------------------------------------------------
		//						C O N S T R U C T O R
		//------------------------------------------------------------------------
		/**
		 * Référence
		 *		WvEmbedRequest.constructor()
		 */
		constructor(serviceP){super();this.service=serviceP;}
		/**
		 * Lorsque qu'une reponse retournée est absente de la consigne (stockWaiters)
		 * elle est recherchée parmis les réponse "hors délai"
		 * Présente ou absente, elle ne sera pas traitée
		 * Seul le message inscrit dans la console du navigateur change.
		 * Reference :
		 * - getRequestReceived()
		 */
		verify(requestP){									
			let requestOut;									// Package inconnu dans les stockWaiters,
															// Mais présent dans le stock 'timeOut'
			if(requestP && requestP.id && (requestOut = this[requestP.id])){
				this[requestP.id] = undefined;				// - Supprime la case dans le tableau
				console.log(
						"message : /"+((requestP.message)? requestP.message : this.service.ERROR_MESSAGE_ABSENT)+"/\n"+
						"reponse : /"+((requestP.answer )? requestP.answer  : this.service.ERROR_ANSWER_ABSENT)+"/\n"+
						"error : "+ this.service.ERROR_MESSAGES[ this.service.ERROR_MESSAGE_TIMEOUT ]
				);
				return true;
			}else{											// Ho non!!!  absent du stock 'time out'				
				console.log("____________________________SYSTEM_ERROR____________________________\n"+
				"Untreated !\n"+ 
				"> message='"+requestP.message+"'\n> answer='"+requestP.answer+"'\n"+
						this.service.WvEmbedErrors.toString(requestP)+
						"--------------------------------------------------------------------");						
				return false;
			}
		}
	}	
	/**______________________________________________________________________
	 * déclenchement de l'arlarme 'délai max'
	 * 1 - extrait le bagage de la consiogne (waiter dans stockWaiters)
	 * 2 - Ajoute cette requète dans le stock de requète hors-délai
	 *     afin de retrouver la requète lorsqu'elle arrivera enfin.
	 * 3 - Ajoute l'erreur - hors délai à la requète
	 * 4 - lève l'erreur, envoyée dans le script asynchrone de l'utilisateur 
	 * Reference :
	 * - alarme enclenchée par : questionPost()
	 */
	onTimeOut(requestP, serviceP){							// Récupère le bagage de la consigne (waiter dans stockWaiters)
		let r = serviceP.stockWaiters.getRequestReceived(requestP);
		if(r!=null) serviceP.stockTimeout[r.id]=r;	// mémorise ce listener dans le stock-délai-dépassé
															// Ajoute l'erreur 
		serviceP.WvEmbedErrors.pushError(requestP,serviceP.ERROR_TIME_OUT, serviceP);
		serviceP.WvEmbedErrors.errorsThrow(requestP);		// Lève l'interruption de l'erreur
	}														// Elle est envoyée au script utilisateur
	//************************************************************************
	//								E R R E U R S 
	//************************************************************************
	/**
	 * Les erreurs sont traitées avec des fonctions statiques pour 
	 * éviter le typage non reconnu par Json
	 * Structure des tables d'Erreur
	 * [
	 *	[id:code_erreur, message:errerText, question:q, answer:a],
	 *	[id:code_erreur, message:errerText, question:q, answer:a],
	 *  ...
	 * ]
	 */
	WvEmbedErrors = class{
		/**______________________________________________________________________
		 * Ajout d'une Erreur
		 * 1 - si la requète ne comporte paas encore d'erreurr,
		 *     un tableau vide lui est accroché
		 * 2 - Création de l'erreur
		 * 3 - ajout de l'erreur
		 * Paramètres
		 * - requète qui recevra l'Erreur
		 * - le code d'Erreur - position dans le tableau des erreurs
		 * - mes paramètres
		 *		note : les paramètres son inclus dans le message au format C : %1
		 *			   ex : printf("il %1 beau", "fait");
		 * Références :
		 *	SERVEUR
		 *	- commandTimeout=function(requestP)
		 *  - receiveQuestion()
		 *	CLIENT
		 *	- onTimeOut()
		 *		 déclenchement de l'alarme de délai dépassé
		 */
		static pushError(requestP, errorMessageP, serviceP, paramsP){
			if(requestP.errors===null || requestP.errors===undefined) 
				requestP.errors = [];						// Ajoute le tableau d'erreurs si absent
			if(Number.isInteger(errorMessageP)){				// Si errorMessageP est un indice de tableau
				errorMessageP = serviceP.ERROR_MESSAGES[parseInt(errorMessageP)];
			}			
			let error = this.newErrorMessage(errorMessageP, paramsP, serviceP, requestP);	// Crée l'erreur
			requestP.errors.push(error);					// Ajoute l'erreur
		}
		/**______________________________________________________________________
		 * Lève les erreurs si elles sont présentes
		 * - Envoie ces erreurs au script de l'utilisateur
		 * - Arrète les times out, si ils sont encore en cours
		 * - Circuit d'erreur :
		 *		- utilise le "then[1]" de 'emdebRequest.postWait()'
		 *		  >requestP.error(requestP) / requestP.waiter.error(requestP)
		 *			- L'erreur est levée pour être envoyé au lance-requète (script de l'utilisateur) 
		 *			  >throw new Error(this.errorToString(p));
		 *				- intercepté par le gestionnaire d'erreur du script-l'utilisateur
		 *				  >catch(e){...}
		 * References : 
		 * 		receiveAnswer(requestP) : 
		 *			si le bagagae-waiter à disparu de la consigne-sotck
		 *			si la requète comporte des erreurs
		 *		onTimeOut() en cas de dépassement de délai (comme son nom l'indique)
		 */
		static errorsThrow(requestP){
			if(!requestP.errors) return;
			for(let i in requestP.errors){
				if(requestP.errors[parseInt(i)].tictac){clearTimeout(requestP.errors[i].tictac);}
				console.log("WvEmbedRequest.errors : "+requestP.id+" / "+requestP.question+"\n    /"+requestP.answer+"/");
			}
			if(requestP.error)
				requestP.error(requestP);		// lève l'erreur -> envoi au 'catch' du script utilisateur
			else 
				if(requestP.waiter && requestP.waiter.error) requestP.waiter.error(requestP);
		}
		/**______________________________________________________________________
		/**
		 * Créationd e méssage
		 * Recherche le texte du message d'erreur en fonction de son code(numéro dans la table des erreurs)
		 * Intègre les paramètres dans le message - si nécessaire
		 * Reference
		 * - pushError()
		 */
		static newErrorMessage(errorMessageP, paramsP, serviceP, requestP){
			if(requestP==null || requestP==undefined) return;
			let error = {};

			if(paramsP){									// intègre les paramètres
				for (let i in paramsP) {					// inclus dans le message au format C : %1
					errorMessageP=errorMessageP.replace('%'+(parseInt(i)+1),paramsP[i]);// ex : printf("il %1 beau", "fait");
				}
			}
			error.message  = errorMessageP;
			error.question = requestP.message;				// ajoute la question à l'erreur
			error.answer   = requestP.answer;				// ajoute la réponse à l'erreur
															// Recupère le timer de délai-max
			if(requestP.waiter) error.tictac = requestP.waiter.tictac;
			return error;									// retourne l'erreur
		}
		static toString(requestP, separP){
			if(!requestP) return null;
			let errs = requestP.errors; if(!errs) return null;
			if(!separP) separP='\n';
			let message = "";
			let e;
			for(let i in errs){
				e = errs[i]; if(!e) continue;
				message+=e.message+separP;
			}
			return message;
		}
	}
	errorToString(p){		
		if(!p){return this.ERROR_MESSAGES[this.ERROR_UNKNOWN];}
		
		let message = this.ERROR_MESSAGES[this.ERROR_ERROR];
		if(p.message){
			message+="\n> "+this.ERROR_MESSAGES[this.ERROR_QUESTION]+" : /"+JSON.stringify(p.message)+"/";
		}
		if(p.answert){
			message+="\n> "+this.ERROR_MESSAGES[this.ERROR_ANSWER]+" : /"+JSON.stringify(p.message)+"/";
		}
		if(p.errors){
			message+="\n"+this.WvEmbedErrors.toString(p);
		}
		return message;
	}
	//************************************************************************************************
	//					   						   S E R V E R
	//************************************************************************************************
	/**
	 * Plateau du serveur (embed)
	 * 1 - Recoit la requète	
	 *		- receiveQuestion(requestP)
	 * 2 - encapsule le process dans un traitement asynchrone 
	 *     + qui interceptera les potentielles erreurs 
	 *		- commandTimeout()
	 * 3 - exécute la fonction-cible
	 *		- WvEmbedEvent[requestP.eventName](requestP.message,o);
	 * 4 - post la réponse vers le client
	 *		- answerPost(requestP)
	 */
	 
	/**______________________________________________________________________
	 * Reçoit la requète
	 * Execute une fonction asynchrone en attente de reponse
	 * Utilise la Promise "commandTimeout"
	 * Reference :
	 * - receive()
	 * ______________________
	 * .then[0]
	 * References :
	 * - commandTimeout()
	 * - les fonctions du serveur 
	 *	 ce 'then[0]' est transmis en paramètre à la fonction requise par la requète 
	 */
	receiveQuestion(requestP){
		if(WvEmbedEvent[requestP.eventName]==null){
			this.WvEmbedErrors.pushError(requestP, this.ERROR_EVENT_UNKNOWN, this, [requestP.eventName]);
			this.answerPost(requestP);
			return;
		}
		this.commandTimeout(requestP).then(		
															// Réception de réponse 
				(p)=>{requestP.answer = p; this.answerPost(requestP)},
															// Réception d'erreur
				/* La promise n'utilise 1 seul then.
				   Les erreurs sont traitée de façon classique "try...catch -> throw"
				(p)=>{this.WvEmbedErrors.pushError(requestP,this.ERROR_INSIDE,this,p); 
					  this.answerPost(requestP);
					 }
				*/
			);	
	}
	/**______________________________________________________________________
	/**
	 * Fonction Promise pour le traitement asynchrone
	 * la fonction-then 'o()' retourne la réponse
	 * la fonction-then 'n()' retourne l'erreur
	 * Reference : 
	 * - receiveQuestion()
	 */
	commandTimeout=function(requestP){
		return new Promise(   
			(o)=>{			
				let result = WvEmbedEvent[requestP.eventName](requestP.message,o);
				if (result!=null && result!=undefined) o(result);
			}  
		).catch((e)=>{										// Intercepte les erreur levée par les fonctions-embed
			let errorMessage=JSON.parse(e.message);

			if(Array.isArray(errorMessage)){				// L'erreur générée par la fonction embed est un tableau 
				if(errorMessage.length>1){					// Il comporte des variables à intégrer
					if(Array.isArray(errorMessage[1]))		// format [texte,[var1,var2,var3,...]]
						errorMessage = errorMessage[0].wvVarC(errorMessage[1]);				
					else
						errorMessage = errorMessage[0].wvVarC(errorMessage, 1);			// format [texte,var1,var2,var3,...] 
				}
			}
			this.WvEmbedErrors.pushError(requestP, this.ERROR_IN_EVENT, this, [errorMessage]);
			this.answerPost(requestP);
		})
	};
	/**______________________________________________________________________
	/**
	 * Referme de service coté serveur
	 * Information transmises
	 *		- requestP.step : la reponse est retournée
	 * Reference :
	 * - receiveQuestion()
	 * - commandTimeout()
	 */
	answerPost(requestP){
		requestP.step = this.STEP_RETURNED_CLIENT;
		requestP=JSON.stringify(requestP);
		this.ptWinTarget.postMessage(requestP, WvEmbedRequest.WVEMBED_SITE); 
	}
}
//--------------------------------------------------------------------------------------------------------------------
// 											CONSTRUCTION DU SERVICE REQUEST
//--------------------------------------------------------------------------------------------------------------------
WvEmbedRequest.MESSAGES = [									// *PARAMETER_TODO* A traduire ou modifer
"   ***Erreur***\nCette page n'est pas un Embed\nServic e de requète non démarré.\n______________________"
];
WvEmbedRequest.init=function(embedNameP){
	if(parent==window){
		console.log(WvEmbedRequest.MESSAGES[0]);
		return;
	}
	let addEvent=function(eventEmbedNameP, windowP, actionP){
		var addListener = windowP.addEventListener? "addEventListener": "attachEvent";
		if(addListener === "attachEvent") eventEmbedNameP= "on"+eventEmbedNameP;
		windowP[addListener](eventEmbedNameP, actionP);
	};
	parent.wvEmbedRequest = new WvEmbedRequest(window, embedNameP);
	window.wvEmbedRequest = new WvEmbedRequest(parent, embedNameP);
	addEvent("message", window, (e)=>parent.wvEmbedRequest.receive(e));
	addEvent("message", parent, (e)=>window.wvEmbedRequest.receive(e));
};
WvEmbedRequest.start=function(){WvEmbedRequest.init(WVEMBED_NAME);};
if(START_EMBEED_REQUEST_IMMEDIATE) WvEmbedRequest.start();

//--------------------------------------------------------------------------------------------------------------------
//   						            E X E M P L E   D E   S C R I P T S   C L I E N T
//--------------------------------------------------------------------------------------------------------------------
/*********************************************************************************************************************
 *										 *Exemple* de script de messagerie asynchrone
 *											  A INSCRIRE DANS LA PAGE CONTAINER
 ********************************************************************************************************************/
 /* §3
 // Exempled e script asynchrone d'envoi de requète à l''embed
 // Point d'entrée de la requète : window.wvEmbedRequest.postWait 
 // Paramètres
 // - Message
 // - nom de la fonction exécutée dans l'embed
 // - délai (optionnel) : délai maximum d'attente
 //                       si omis la valeur par défaut est de 3 secondes 
async function testA(){										// Fonction asynchrone
	try{													// Gestion des erreurs classique
		let embed_ = window.wvEmbedRequest;			// Appel dans une variable : pour lisibilité
		alert('Je fais de triucs avant');					// Exemple d'action précédant le 1er appel
															//________________________________________
															// 1ère requète
															// La fonstion appelée dans l'embed pause 2 secondes
															//   message  fonction ici	 délai max							
		let result = await embed_.postWait("Il fait beau", "onEmbed1", 1000000);
		alert("A fin "+result.answer);						// La réponse est placée dans le "retour"
															// 		Note : ce "retour" est composé de 
															//      result.answer et result.question
															//________________________________________
															// 2ème requète
		result = await embed_.postWait("Il fait beau2", "onEmbed2", 1000000,);
		alert("A fin2 "+result.answer);						// Traitement de la réponse
	}catch(e){
		alert("FIN "+e);									// Traitement des erreurs.
	}														// - e : est un tableau 
};															//   - e.result.answer
															//   - e.result.question
															//   - e.result.errors
															//		- e.result.errors[0][0] 1er  message d'erreur
															//		- e.result.errors[1][0] 2ème message d'erreur
//testA();
*/	
