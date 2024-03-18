/*ea_import WvEmbed*/

alert("start");
function WER(){};
WER.TYPE_FC = "WvEmbedEvent.";
WER.TYPE_FC_LG = WER.TYPE_FC.length;
WER.FC_NAME1 = "exSynchro";
WER.FC_NAME2 = "exA_Synchro";
 
WER.fcCurr = "exSynchro";
WER.scs = {};
WER.messageSys=[
	"		// Exemple de fonction synchrone / traitement immédiat, sans delai d'attente.\n",	
	"		// Exemple de fonction asynchrone / traitement avec delai d'attente ou interruption\n"+	
		"		//   Ici 'setTimeout(), mais ce pourrait être requète PHP...'\n",
	"// IMPORTANT : retour avec 'returned()'",
	"// Params pour callback de setTimeout : message et returned",
	"Script d'exemple impossible à supprimer.",
	"Supprimer ",
	"Script d'exemple impossible à modifier.",
	"Modifier ",
];
WER.init=function(grP){
	alert("WVINIT");
	WvEmbedEvent.exSynchro = function(messageP){
		alert("sync : "+messageP);
		return 'OK sans délai';
	};
	WvEmbedEvent.exA_Synchro = function(messageP){
		alert("async : "+messageP);
		return 'OK avec délai';
	};
	WER.scs.exSynchro =
		WER.messageSys[0]+
		"WvEmbedEvent."+WER.FC_NAME1+"=function(messageP){\n"+
		"    alert(messageP);\n"+
		"	return 'OK sans délai'\n"+
		"}";
	WER.scs.exA_Synchro =	
		WER.messageSys[1]+
		"WvEmbedEvent."+WER.FC_NAME2+"=function(messageP, returned){\n"+
		"	let fcDelai = function(messageP, returned){\n"+
		"		alert('tempo='+messageP);\n"+
		"		returned('OK' avec delai);	"+WER.messageSys[2]+"\n"+
		"	};							"+WER.messageSys[3]+"\n"+								
		"	setTimeout(fcDelai,2000,messageP, returned);\n"+
		"}";
	grP.embedfc = WER.scs.exSynchro;

}
WER.supprimer=function(){
	let name = WER.fcCurr;
	if(name==WER.FC_NAME1 || name==WER.FC_NAME2){
		alert(WER.messageSys[4]);
		return;
	}
	if (!confirm(WER.messageSys[5]+WER.fcCurr+' ?')) {return;}
	WER.next.call(this);
	delete WER.scs[WER.fcCurr];
	delete WvEmbedEvent[WER.fcCurr];
}
WER.next=function(){
	let nameCurr=null;					// Recherche la fonctions suivante
	let name1;							// Mémorise le nom de la 1ère fonction
	let vu = false;
	for(let name in WER.scs){
		if(name1==null) name1=name;
		if(vu){
			nameCurr=name;
			break;
		}
		if(name==WER.fcCurr){
			vu=true;
		}
	}
	if(nameCurr==null){					// Si non trouvée, récupère la 1ère
		nameCurr=name1;
	}
	WER.fcCurr = nameCurr;
	this.embedfc = WER.scs[WER.fcCurr];
}


WER.ajouter=function(){
	
					//WvEmbedEvent.
	let sc = this.embedfc.trim();
	//let sc = 'WvEmbedEvent.aa=function(bb,cc){alert("ddd")}'
	let posStartFc=sc.indexOf(WER.TYPE_FC); 
	if(posStartFc<0){
		alert("la fonction doit être placée dans WvEmbedEvent\n"+
			"    ex : WvEmbedEvent.maFonc=function(messageP, returnP){...}");
		return;
	} 
	posStartFc+=WER.TYPE_FC_LG;
					// NOM
	let pos = sc.indexOf("=", posStartFc);
	if(pos<0){ alert("'=' est attendu après le nom de fonction;"); return;}
	let nom = sc.substring(posStartFc,pos).trim();
	
	if(nom==WER.FC_NAME1 || nom==WER.FC_NAME2){
		alert(WER.messageSys[6]);
		return;
	}
					// PARAMS
	pos = pos = sc.indexOf("(", pos);
	let posFin = sc.indexOf(")", ++pos);
	let params=[];
	let posNext;
	while((posNext=sc.indexOf(',',pos)) >=0 && posNext<posFin){
		params.push(sc.substring(pos, posNext).trim());
		pos= posNext+1;
	}
	let paramFin=sc.substring(pos,posFin).trim();
	if(paramFin.length>0){
		params.push(paramFin);
	}
					// BODY
	pos = sc.indexOf("{", posFin); if(pos<0){ alert("'{' attendu"); return;}
	posFin = sc.lastIndexOf("}"); if(pos>posFin){ alert("'}' attendu après '{'"); return;};
	let body =  sc.substring(pos, posFin+1);
	
	//let newFonc=function(params, body){return new Function("new Function("+params+",'"+body+"')");};
	let newFonc;
	switch(params.length){
		case 0 : newFonc=new Function(body); break;
		case 1 : newFonc=new Function(params[0],body); break;
		case 2 : newFonc=new Function(params[0],params[1],body); break;
	}
															// Déjà présent ?
	for(let nameI in WER.scs){
		if(nameI!==nom)continue;
		if (!confirm(WER.messageSys[7]+nom+' ?')) {return;}
		delete WER.scs[nom];
		delete WvEmbedEvent[nom];
		break;
	}	
	WER.scs[nom]=sc;
	WvEmbedEvent[nom]=newFonc;
	WER.fcCurr = nom;

};
