function WvEmbedMaster(){}
WvEmbedMaster.test=function(){testA(); alert("Hello OK");}
WvEmbedMaster.mess1="Ho ho ho ho";
WvEmbedMaster.mess2="Il fait beau";
WvEmbedMaster.fonc1="onEmbed1";
WvEmbedMaster.fonc2="onEmbed2";
WvEmbedMaster.delai1="1000";
WvEmbedMaster.delai2="1000000";

/*********************************************************************************************************************
 *										 *Exemple* de script de messagerie asynchrone
 ********************************************************************************************************************/
 // Exempled e script asynchrone
 // Point d'entrée de la requète : window.wvEmbedRequest.postWait 
 // Paramètres
 // - Message
 // - nom de la fonction exécutée dans l'embed
 // - délai (optionnel) : délai maximum d'attente
 //                       si omis la valeur par défaut est de 3 secondes 
async function testA(){										// Fonction asynchrone
	try{													// Gestion des erreurs classique
		let embed_ = window.wvEmbedRequest;					// Appel dans une variable : pour lisibilité
		alert('Je fais de triucs avant '+WvEmbedMaster.mess1);// Exemple d'action précédant le 1er appel
															//________________________________________
															// 1ère requète
															// La fonstion appelée dans l'embed pause 2 secondes
															//   message  fonction ici	 délai max							
		let result = await embed_.postWait(WvEmbedMaster.mess1, WvEmbedMaster.fonc1, parseInt(WvEmbedMaster.delai1));
		alert("A fin1 "+result.answer["titi"]);						// La réponse est placée dans le "retour"
															// 		Note : ce "retour" est composé de 
															//      result.answer et result.question
															//________________________________________
															// 2ème requète
		result = await embed_.postWait(WvEmbedMaster.mess2, WvEmbedMaster.fonc2, parseInt(WvEmbedMaster.delai2));
		alert("A fin2 "+result.answer);						// Traitement de la réponse
	}catch(e){
		alert("ERROR "+e);									// Traitement des erreurs.
	}														// - e : est un tableau 
};															//   - e.result.answer
															//   - e.result.question
															//   - e.result.errors
															//		- e.result.errors[0][0] 1er  message d'erreur
															//		- e.result.errors[1][0] 2ème message d'erreur
/*****
window.wvEmbedRequest.postWait("Coucou", fonc1)
*****/