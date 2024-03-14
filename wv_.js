function Test001(){
		this.a=10;
	}
	;
	String.prototype.wvGetIndex=function(errorValue){
		if(this.wvIndex!=null){
			return this.wvIndex;
		}
		var pos=this.wvGetPosIndex();
		if(pos==null)return errorValue;
		this.wvPrefixe=this.substring(0,pos);
		return this.wvIndex=parseInt(this.substring(pos));
	};
	String.prototype.substr=function(start,nb){
		if(start<0)start=this.length+start;
		if(start<0)start=0;
		if(nb==null)return this.substring(start);
		return this.substring(start,start+nb);
	};
	String.prototype.wvGetPrefixe=function(){
		if(this.wvPrefixe!=null)return this.wvPrefixe;
		var pos=this.wvGetPosIndex();
		if(pos==null||pos==0)return this;
		this.wvIndex=parseInt(this.substring(pos));
		return this.wvPrefixe=this.substring(0,pos);
	};
	String.prototype.wvGetPosIndex=function(){
		var car;
		var pos=-1;
		var lg=this.length;
		for(var i=lg-1;i>=0;i--){
			car=this.charCodeAt(i);
			if(car>=48&&car<=57)continue;
			pos=i;
			break;
		}
		return(pos>=0&&pos<lg-1)?pos+1:null;
	};
	function WvString(){
	};
	WvString.digit2=function(num){
		if(typeof(num)=='string'){
			numTxt=num.trim();
			num=parseInt(numTxt);
		}
		else{
			numTxt=num.toString();
		}
		if(num<10)numTxt='0'+numTxt;
		return numTxt;
	};
	WvString.codeToCharUp=function(codeP,carSpecP){
		if(codeP>=97&&codeP<=122)codeP-=32;
		if((codeP>=65&&codeP<=90)||(codeP>=48&&codeP<=57)||codeP==36)return String.fromCharCode(codeP);
		codeP=String.fromCharCode(codeP);if(carSpecP){
			var nb=carSpecP.length;
			for(i=0;i<nb;i++){
				if(codeP==carSpecP[i][0])return carSpecP[i][1];
			}
		}
		return null;
	};
	Number.prototype.digit2=function(){
		if(this<10)return '0'+String(this);
		return this;
	};
	String.prototype.digit2=function(){
		var txt=this.trim();
		if(txt.length<2)return '0'+txt;
		return txt;
	};
	WvString.startInput=function(event,inLineP){
		var div_=this;
		this.WvInput=true;
		this.style.backgroundColor=this.wvInputColor;
		if(document.WvInput){
			document.WvInput.style.backgroundColor=null;
			document.WvInput.WvInput=null;
		}
		document.WvInput=this;
		document.wvOnkeypressMemo=document.onkeypress;
		document.onkeypress=function(event,inlineP){
			var code=event.keyCode;
			if(code==0&&event.key.length>0){
				code=event.key.charCodeAt(0)}
			var car=WvString.codeToCharUp(code);
			if(car){
				if(!inLineP)div_.innerHTML=car;
				else div_.line0.innerHTML=car;
			}
		}
		;
		document.onmousedown=function(event){
			var div_=event.target;
			while(div_&&div_!=document){
				if(div_.WvInput)return;
				div_=div_.parentNode;
			}
			document.onkeypress=document.wvOnkeypressMemo;
			if(document.WvInput){
				document.WvInput.style.backgroundColor=null;
				document.WvInput.WvInput=null;
				document.WvInput=null;
			}
		};
	}
	;
	WvString.toListValues=function(textP,valueP){
		var nbSeq=textP.length;
		var optionsScript="";
		var nb=valueP.length;
		for(var i=0;i<nb;){
			var val=valueP[i];
			optionsScript+=textP[0];
			for(var j=1;j<nbSeq;j++){
				if(i<nb)optionsScript+=valueP[i++];
				optionsScript+=textP[j];
			}
		}
		return optionsScript;
	};
	function WvSql(){
	};
	WvSql.test=function(){
		alert("Hello word");
	};
	WvSql.reqPhp=function(urlP,paramsP,thisDivP,listenerP){
		var req=WvSql.getRequest();
		if(req==null)return;
		req.open('POST',urlP,true);
		req.onreadystatechange=function(aEvt){
			if(req.readyState==4){
				thisDivP.fc__=listenerP;
				if(req.status==200)thisDivP.fc__(paramsP,req.responseText);
				else thisDivP.fc__(paramsP,null);
			}
		}
		;
		req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		var script=WvArray_S.toStringSepar(paramsP,'=','&');
		req.send(script);
	};
	WvSql.getRequest=function(){
		if(!window.XMLHttpRequest&& !window.ActiveXObject){
			alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
			return null;
		}
		if(window.ActiveXObject){
			try{
				return new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e){
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		return new XMLHttpRequest();
	};
	function WvFile(path){
		this.path=path;
		var posName=path.lastIndexOf('/');
		if(posName==null)posName=path.lastIndexOf('\\');
		if(posName==null){
			this.folder=null;
			this.name=path;
		}
		else{
			this.folder=path.substring(0,posName+1);
			this.name=path.substring(posName+1);
		}
	};
	WvFile.prototype.getName=function(){
		return this.name;
	};
	WvFile.prototype.getAudio=function(){
		var son=new Audio();
		son.src=this.path;
		return son;
	};
	function WvDate(fcP,digitP){
		if(fcP==null)return new Date();
		var num=new Date()[fcP]();
		if(digitP==2){
			return((num<10)?"0":"")+num;
		}
		return num;
	};
	function Wv2n(num){
		return((num<10)?"0":"")+num;
	};
	function WvAnim(){
	};
	function WvObject(){
	};
	function DoOncePh(){
	};
	DoOncePh.alert=function(text){
		console.log(text);
	};
	function alert_(messageP,a,b,c,d,e,f){
		console.log(messageP);
	};
	var SCALE100=100;
	WvTree.getDiv=function(){
		var currentScript=document.currentScript||(scripts=document.getElementsByTagName('script'))[scripts.length-1];
		var wvDiv=currentScript.parentNode;
		if(wvDiv.wvDivOfScript!=null){
			wvDiv.wvIsDivOpened=null;
			;
			document.wvDivCurr=wvDiv.wvDivOfScript;
			return wvDiv.wvDivOfScript;
		}
		var notNodeElement=currentScript.previousElementSibling;
		if(notNodeElement==null){
			wvDiv.wvDivOfScript=currentScript.parentNode;
			return currentScript.parentNode;
		}
		wvDiv.wvDivOfScript=notNodeElement;
		return notNodeElement;
	};
	WvTree.getDivPrevious=function(){
		var currentScript=document.currentScript||(scripts=document.getElementsByTagName('script'))[scripts.length-1];
		return currentScript.previousElementSibling;
	};
	WvTree.getWvChilds=function(divP){
		var childs=[];
		var nb=divP.childNodes.length;
		for(var i=0;i<nb;i++){
			var child=divP.childNodes[i];
			if(child==null||child.wvComponent==null)continue;
			childs.push(child);
		}
		return(childs.length>0)?childs:null;
	};
	WvTree.getDivClose=function(){
		var currentScript=document.currentScript||(scripts=document.getElementsByTagName('script'))[scripts.length-1];
		var wvDiv=currentScript.parentNode;
		if(wvDiv.wvDivOfScript!=null){
			wvDiv.wvIsDivOpened=null;
			;
			document.wvDivCurr=wvDiv.wvDivOfScript;
			return wvDiv.wvDivOfScript;
		}
		var notNodeElement=currentScript.previousElementSibling;
		if(notNodeElement.wvDivOfScript!=null){
			notNodeElement.wvIsDivOpened=null;
			;
			document.wvDivCurr=notNodeElement.wvDivOfScript;
			return notNodeElement.wvDivOfScript;
		}
		if(notNodeElement==null){
			wvDiv.wvDivOfScript=currentScript.parentNode;
			return currentScript.parentNode;
		}
		wvDiv.wvDivOfScript=notNodeElement;
		return notNodeElement;
	};
	WvTree.testInit=function(){
		if(this.inFcInit!=null){
			this.inFcInit=null;
			return;
		}
		var currentScript=document.currentScript||(scripts=document.getElementsByTagName('script'))[scripts.length-1];
		this._div=currentScript.parentNode;
		this._div.wvFcInit=currentScript;
	};
	WvTree.onload=function(){
		var body_=document.body;
		if(body_.onload!=null){
			body_.onWvloadSys=body_.onload;
		}
		body_.wvLoaders=[];
		body_.wvLoaders.push(WvTree.getDiv());
		body_.onload=function(){
			body_=document.body;
			if(body_.onWvloadSys)body_.onWvloadSys();
			var nb=body_.wvLoaders.length;
			var div;
			for(var i=0;i<nb;i++){
				div=body_.wvLoaders[i];
				if(div==null)continue;
				div.style.visibility='hidden';
			}
		};
		WvTree.onload=function(){
			document.body.wvLoaders.push(WvTree.getDiv());
		};
	};
	WvTree.getWindow=function(_div){
		return _div.ownerDocument.defaultView;
	};
	WvTree.getWvWindow=function(_div){
		return _div.ownerDocument.defaultView.wvWindow;
	};
	function WvWindow(meP){
		this.me=meP;
		this.wvOnInit=[];
		this.wvOnInitParam=[];
		this.wvOnFocus=[];
		this.wvOnFocusParam=[];
		this.addOnFocus(meP.onfocus,null);
		this.wvOnBlur=[];
		this.wvOnBlurParam=[];
		this.addOnBlur(meP.onblur,null);
	};
	WvWindow.prototype.addOnInit=function(onInitP,paramP){
		if(onInitP==null)return;
		this.wvOnInit.push(onInitP);
		this.wvOnInitParam.push(paramP);
	};
	WvWindow.prototype.addOnFocus=function(onFocusP,paramP){
		if(onFocusP==null||this.wvOnFocus.indexOf(onFocusP)>=0)return;
		this.wvOnFocus.push(onFocusP);
		this.wvOnFocusParam.push(paramP);
	};
	WvWindow.prototype.addOnBlur=function(onBlurP,paramP){
		if(onBlurP==null||this.wvOnBlur.indexOf(onBlurP)>=0)return;
		this.wvOnBlur.push(onBlurP);
		this.wvOnBlurParam.push(paramP);
	};
	this.wvWindow=new WvWindow(this);
	this.onInit=function(param){
		var nb=this.wvWindow.wvOnInit.length;
		for(var i=0;i<nb;i++){
			this.fcUt=this.wvWindow.wvOnInit[i];
			if(this.fcUt!=null)this.fcUt(this.wvWindow.wvOnInitParam[i],param);
		}
	};
	this.onfocus=function(){
		var nb=this.wvWindow.wvOnFocus.length;
		for(var i=0;i<nb;i++){
			this.fcUt=this.wvWindow.wvOnFocus[i];
			if(this.fcUt==null)continue;
			var param=this.wvWindow.wvOnBlurParam[i];
			if(param==null)this.fcUt();
			else this.fcUt(param);
		}
	};
	this.onblur=function(){
		var nb=this.wvWindow.wvOnBlur.length;
		for(var i=0;i<nb;i++){
			this.fcUt=this.wvWindow.wvOnBlur[i];
			if(this.fcUt==null)continue;
			var param=this.wvWindow.wvOnBlurParam[i];
			if(param==null)this.fcUt();
			else this.fcUt(param);
		}
	};
	WvTree.debug=function(){
		console.log("debug");
	};
	WvTree.isPieceWithfaces=function(){
		console.log("debug");
	};
	WvTree.wvEventFrame=function(a,b){
		this.wvNumAction=a;
		if(this.wvNumAction!=null){
			new WvAction(this.onWvFrame[this.wvNumAction],this,0);
		}
	};
	function WvAction(action,div_,priority){
		this.action=action;
		this.div=div_;
		this.priority=priority;
		if(div_.wvIsVisible){
			if(WvAction.immediates==null)WvAction.immediates=[];
			WvAction.immediates.push(this);
		}
		div_.wvActionOnVisible=action;
	};
	WvTree.removeActionsOfDiv=function(divP){
		var actions=WvAction.immediates;
		if(actions==null)return;
		var nb=actions.length;
		for(var i=0;i<nb;i++){
			var action=actions[i];
			if(action==null)continue;
			if(action.div===divP)actions[i]='';
		}
		WvAction.immediates=actions.filter(function(val){
			return val!=='';
		}
		);
	}
	;
	WvTree.pushActionInit=function(action,div_,priority){
		new WvAction(action,div_,priority);
	};
	WvAction.actionInit=function(){
		var actions=WvAction.immediates;
		if(actions==null)return;
		var nb=actions.length;
		var action;
		for(var i=0;i<nb;i++){
			action=actions[i];
			if(action==null)continue;
			action.div.wvFc=action.action;
			action.div.wvFc();
		}
		WvAction.immediates=null;
	};
	HTMLDivElement.prototype.pieceLinkPieceChild=function(pieceChild){
		this.addPieceChild(pieceChild);
		if(this.pieceLinkPieceChildExists(pieceChild))return;
		this[pieceChild.id]=pieceChild;
		if(this.wvPiecesDebug==null)this.wvPiecesDebug=[];
		this.wvPiecesDebug.push(pieceChild);
	};
	HTMLDivElement.prototype.pieceLinkPieceChildExists=function(pieceChild){
		var pieceChildOld=this[pieceChild.id];
		if(pieceChildOld==null)return false;
		if(pieceChildOld===pieceChild)return true;
		if(this.wvPiecesDebug==null){
			WvTree.error("Builing tree WhenViewer : link-child for div "+pieceChild.id+" error. Variable "+pieceChild.id+" is already used in the div "+this.id);
		}
		if(this.wvPiecesDebug!=null){
			var nb=this.wvPiecesDebug.length;
			for(var i=0;i<nb;i++){
				if(this.wvPiecesDebug[i].id==pieceChild.id)return true;
			}
		}
		WvTree.error("Builing tree WhenViewer : link-child for div "+pieceChild.id+" error. Variable "+pieceChild.id+" is already used in the div "+this.id);
		return true;
	};
	function WvConst(){
	};
	WvConst.SCAN_ALL_ACTION=7;
	WvConst.SCAN_VISIBLE=15;
	HTMLDivElement.prototype.groupLinkPieceChild=function(pieceChild){
		this.addPieceChild(pieceChild);
	};
	HTMLDivElement.prototype.addPieceChild=function(pieceChild){
		if(this.wvPieces==null)this.wvPieces=[];
		if(this.wvPieces.indexOf(pieceChild)>=0){
			return;
		}
		this.wvPieces.push(pieceChild);
	};
	HTMLDivElement.prototype.pieceLinkFace=function(face,numFace){
		if(this[face.id]!=null)return;
		this[face.id]=face;
		if(this.wvIsGroup)return;
		if(this.wvFaces==null)this.wvFaces=[];
		if(numFace==null){
			this.wvFaces.push(face);
			this.wvNumFaceCurr=0;
		}
		else this.wvFaces[numFace]=face;
	};
	function WvVars(){
	};
	HTMLDivElement.prototype.wvVars=new WvVars();
	HTMLDivElement.prototype.groupLinkGroupChild=function(groupChild){
	};
	function WvType(){
	};
	HTMLDivElement.prototype.wvBuildRoot=function(nbFrames,frameSpeed){
		new WvRoot(nbFrames,frameSpeed,this);
	};
	HTMLDivElement.prototype.wvBuildGroup=function(nbFrames){
		new WvGroup(nbFrames,this);
	};
	HTMLDivElement.prototype.wvBuildFace=function(){
		if(this.wvComponent!=null)return;
		new WvFace(this);
	};
	HTMLSelectElement.prototype.wvBuildFace=function(){
		if(this.wvComponent!=null)return;
		new WvFace(this);
	};
	HTMLInputElement.prototype.wvBuildFace=function(){
		if(this.wvComponent!=null)return;
		new WvFace(this);
	};
	HTMLTextAreaElement.prototype.wvBuildFace=function(){
		if(this.wvComponent!=null)return;
		new WvFace(this);
	};
	HTMLDivElement.prototype.wvBuildDrop=function(){
		new WvFace(this);
		this.wvDrop=new WvDrop(this);
	};
	HTMLDivElement.prototype.wvBuildTree=function(isEnd){
		this.wvUt=WvTree.treeBuild;
		this.wvUt();
		if(isEnd){
			WvTree.wvRoot=null;
			WvAction.actionInit();
			if(this._root.initiator!=null)this._root.initiator.start();
			this._root.wvIsInit=true;
		}
	};
	function WvTree(){
	}
	;
	var ua=navigator.userAgent;
	WvTree.isSafari=(ua.indexOf("Chrome")==-1&&ua.indexOf("Safari")>=0);
	WvTree.wvXXX_2_DivParent=function(){
		if(this.style!=null)return;
		this.parentNode=this._div.parentNode;
	};
	WvTree.initTransform=function(div_,rotationP,xScaleP,yScaleP){
		if(rotationP!=null)this._rotationOld=div_._rotationPh=rotationP;
		if(xScaleP!=null)div_._xscaleOld=div_._xscalePh=xScaleP/100;
		if(yScaleP!=null)div_._yscaleOld=div_._yscalePh=yScaleP/100;
	};
	WvTree.stateLinkPiece=function(){
		this._div.wvPiece=this._div.parentNode.wvPiece;
		this._div.wvPiece.pieceLinkFace(this._div);
	};
	WvTree.groupStateLinkGroup=function(){
		this._div.wvGroup=this._div;
	};
	WvTree.stateLinkGroup=function(){
		this._div.wvGroup=WvNull.null;
	};
	WvTree.groupLinkGroupParent=function(){
		this._div.wvGroupParent=this._div.parentNode.wvGroupParent;
		this._div.wvGroupParent.groupLinkGroupChild(this._div);
	};
	WvTree.stateLinkGroupParent=function(){
		this._div.wvGroupParent=this._div.parentNode.wvGroupParent;
	};
	WvTree.pieceGroupLinkGroupParent=function(){
		var _div=this._div;
		var grParent=_div.wvGroupParent=_div.parentNode.wvGroup;
		grParent.groupLinkGroupChild(_div);
		grParent.groupLinkPieceChild(_div);
	};
	WvTree.linkGroupParent=WvTree.pieceGroupLinkGroupParent;
	WvTree.linkPieceParent=function(){
		this._div._parent=this._div.wvGroupParent.wvPiece;
	};
	WvTree.pieceLinkPieceParent=function(){
		this._div._parent=this._div.parentNode.wvPiece;
		this._div._parent.pieceLinkPieceChild(this._div);
	};
	WvTree.linkRoot=function(){
		this._div._root=this._div.parentNode._root;
	};
	WvTree.groupLinkPieceParent=function(){
		this._div._parent=this._div.wvGroupParent.wvPiece;
	};
	WvTree.initPiecePropertiesDefault=function(){
		WvTree.debugDefineProperty(this._div);
		Object.defineProperty(this._div,"_group",{
			get:function(){
				return this._wvGroup;
			}
			,set:function(gr_){
				if(gr_.id=="f__0"){
					console.log("_group=f__0");
				}
				this._wvGroup=gr_;
			}
		}
		);
		Object.defineProperty(this._div,"_name",{
			get:function(){
				return this.id;
			}
			,set:function(name_){
				this.id=name_;
			}
		}
		);
		Object.defineProperty(this._div,"_x",{
			get:function(){
				return this._xPh=parseFloat(this.style.left);
			}
			,set:function(x_){
				this._xOld=this.style.left=""+x_+"px";
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_y",{
			get:function(){
				return this._yPh=parseFloat(this.style.top);
			}
			,set:function(y_){
				this._yOld=this.style.top=""+y_+"px";
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_xscale",{
			get:function(){
				return((this._xscalePh!=null)?this._xscalePh:this._xscalePh=1)*SCALE100;
			}
			,set:function(x_){
				this._xscalePh=x_/SCALE100;
				this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh);
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_yscale",{
			get:function(){
				if(this._yscalePh==null)this._yscalePh=1;
				return this._yscalePh*SCALE100;
			}
			,set:function(y_){
				this._yscalePh=y_/SCALE100;
				this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh);
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_rotation",{
			get:function(){
				if(this._rotationPh==null)this._rotationPh=0;
				return this._rotationPh;
			}
			,set:function(r_){
				this._rotationPh=r_;
				this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh);
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_visible",{
			get:function(){
				return this.wvIsVisible;
			}
			,set:function(v_){
				if(v_){
					this.wvIsVisibleProg=v_;
					this.wvShowTree();
				}
				else this.wvHideTree();
				this.wvIsVisible=v_;
				this.wvIsVisibleProg=v_;
			}
		}
		);
		Object.defineProperty(this._div,"_width",{
			get:function(){
				var h=this.style.width;
				if(h.length>0)return parseFloat(h);
				var chs=this.children;
				var x=0;
				var lg;
				var xCurr;
				for(var i=0;i<chs.length;i++){
					var ch=chs[i];
					if(ch==null)continue;
					if((xCurr=ch.style.left)!=null)if((xCurr=parseFloat(xCurr))<x)x=xCurr;
					if((h=ch.style.width).length>0){
						if(lg<x-xCurr+h)lg<x-xCurr+h;
					}
				}
				this.style.width=lg+"px";
				return lg;
			}
			,set:function(x_){
				alert("div._width=N => Not accepted");
			}
		}
		);
		Object.defineProperty(this._div,"_height",{
			get:function(){
				var h=this.style.height;
				if(h.length>0)return parseFloat(h);
				var chs=this.children;
				var x=0;
				var lg=0;
				var xCurr;
				for(var i=0;i<chs.length;i++){
					var ch=chs[i];
					if(ch==null)continue;
					if((xCurr=ch.style.top)!=null)if((xCurr=parseFloat(xCurr))<x)x=xCurr;
					if((h=ch.style.height).length>0){
						if(lg<x-xCurr+h)lg<x-xCurr+h;
					}
				}
				this.style.height=lg+"px";
				return lg;
			}
			,set:function(x_){
				alert("div._height=N => Not accepted");
			}
		}
		);
		Object.defineProperty(this._div,"_alpha",{
			get:function(){
				return(this._alphaCurr!=null)?this._alphaCurr:this._alphaCurr=((this.style.opacity!=null&&this.style.opacity.length>0)?this.style.opacity:1)*100;
			}
			,set:function(alpha){
				this._alphaCurr=alpha;
				if(this.funcSetOpacity!=null)this.funcSetOpacity(alpha/100);
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_xmouse",{
			get:function(){
				return WvTree.getXmouse(this,null);
			}
			,}
		);
		Object.defineProperty(this._div,"_ymouse",{
			get:function(){
				return WvTree.getYmouse(this,null);
			}
			,}
		);
	}
	;
	WvTree.initPiecePropertiesSafari=function(){
		WvTree.debugDefineProperty(this._div);
		Object.defineProperty(this._div,"_group",{
			get:function(){
				return this._wvGroup;
			}
			,set:function(gr_){
				if(gr_.id=="f__0"){
					console.log("_group="+gr_);
				}
				this._wvGroup=gr_;
			}
		}
		);
		Object.defineProperty(this._div,"_name",{
			get:function(){
				return this.id;
			}
			,set:function(name_){
				this.id=name_;
			}
		}
		);
		Object.defineProperty(this._div,"_x",{
			get:function(){
				return this._xPh=parseFloat(this.style.left)+this.xTranslate;
			}
			,set:function(x_){
				this.xTranslatePx=String(this.xTranslate=x_-parseFloat(this.style.left))+"px";
				this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
				this._xOld=x_+"px";
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_y",{
			get:function(){
				return this._yPh=parseFloat(this.style.top)+this.yTranslate;
			}
			,set:function(y_){
				this.yTranslatePx=String(this.yTranslate=y_-parseFloat(this.style.top))+"px";
				this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
				this._yOld=y_+"px";
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_xscale",{
			get:function(){
				if(this._xscalePh==null)this._xscalePh=1;
				return this._xscalePh*SCALE100;
			}
			,set:function(x_){
				this._xscalePh=x_/SCALE100;
				this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_yscale",{
			get:function(){
				if(this._yscalePh==null)this._yscalePh=1;
				return this._yscalePh*SCALE100;
			}
			,set:function(y_){
				this._yscalePh=y_/SCALE100;
				this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_rotation",{
			get:function(){
				if(this._rotationPh==null)this._rotationPh=0;
				return this._rotationPh;
			}
			,set:function(r_){
				this._rotationPh=r_;
				this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_visible",{
			get:function(){
				return this.wvIsVisible;
			}
			,set:function(v_){
				if(v_){
					this.wvIsVisibleProg=v_;
					this.wvShowTree();
				}
				else this.wvHideTree();
				this.wvIsVisible=v_;
				this.wvIsVisibleProg=v_;
			}
		}
		);
		Object.defineProperty(this._div,"_width",{
			get:function(){
				var h=this.style.width;
				if(h.length>0)return parseFloat(h);
				var chs=this.children;
				var x=0;
				var lg;
				var xCurr;
				for(var i=0;i<chs.length;i++){
					var ch=chs[i];
					if(ch==null)continue;
					if((xCurr=ch.style.left)!=null)if((xCurr=parseFloat(xCurr))<x)x=xCurr;
					if((h=ch.style.width).length>0){
						if(lg<x-xCurr+h)lg<x-xCurr+h;
					}
				}
				this.style.width=lg+"px";
				return lg;
			}
			,set:function(x_){
				alert("div._width=N => Not accepted");
			}
		}
		);
		Object.defineProperty(this._div,"_height",{
			get:function(){
				var h=this.style.height;
				if(h.length>0)return parseFloat(h);
				var chs=this.children;
				var x=0;
				var lg=0;
				var xCurr;
				for(var i=0;i<chs.length;i++){
					var ch=chs[i];
					if(ch==null)continue;
					if((xCurr=ch.style.top)!=null)if((xCurr=parseFloat(xCurr))<x)x=xCurr;
					if((h=ch.style.height).length>0){
						if(lg<x-xCurr+h)lg<x-xCurr+h;
					}
				}
				this.style.height=lg+"px";
				return lg;
			}
			,set:function(x_){
				alert("div._height=N => Not accepted");
			}
		}
		);
		Object.defineProperty(this._div,"_alpha",{
			get:function(){
				return(this._alphaCurr!=null)?this._alphaCurr:this._alphaCurr=100;
			}
			,set:function(alpha){
				this._alphaCurr=alpha;
				if(this.funcSetOpacity!=null)this.funcSetOpacity(alpha/100);
				this.wvFreezeCss=true;
			}
		}
		);
		Object.defineProperty(this._div,"_xmouse",{
			get:function(){
				return WvTree.getXmouse(this,null);
			}
			,}
		);
		Object.defineProperty(this._div,"_ymouse",{
			get:function(){
				return WvTree.getYmouse(this,null);
			}
			,}
		);
	}
	;
	if(WvTree.isSafari){
		WvTree.initPieceProperties=WvTree.initPiecePropertiesSafari;
	}
	else{
		WvTree.initPieceProperties=WvTree.initPiecePropertiesDefault;
	}
	WvTree.linkInit=function(_div,isRoot){
		if(_div!=null&&_div.style!=null){
			this._div=_div;
		}
		else{
			var scripts;
			var currentScript=document.currentScript||(scripts=document.getElementsByTagName('script'))[scripts.length-1];
			this._div=_div=currentScript.parentNode;
			if(_div.isRoot)return false;
		}
		_div.wvComponent=true;
		_div.aa_wvId=_div.id;
		this.wvXXX_2_DivParent();
		if(isRoot==null&&_div.parentNode.wvComponent==null){
			var parent=_div.parentNode;
			if(parent!=null&&parent.wvComponent==null&&parent.isRoot==null){
				parent.wvUt=WvTree.treeNodeBuildParent;
				parent.wvUt();
			}
		}
		this.linkPiece();
		this.LinkGroup();
		this.linkGroupParent();
		this.linkPieceParent();
		_div._group=_div._parent;
		this.linkRoot();
		if(_div._root.w_loader_wv){
			if(!_div._root.w_loader_cpt)_div._root.w_loader_cpt=0;
			_div._root.w_loader_message.innerHTML=""+(++_div._root.w_loader_cpt)+"/";
		}
		var path=[];
		var pathPt=[];
		var iPath=0;
		var divPath=_div;
		while(divPath!=_div._root){
			pathPt[iPath]=divPath;
			path[iPath++]=divPath.id;
			divPath=divPath.parentNode;
		}
		if(_div._root){
			pathPt[iPath]=_div._root;
			path[iPath++]=_div._root.id;
		}
		_div.aaPath=path;
		_div.aaPathDiv=pathPt;
		this.showHide();
		_div.wvIsVisible=(_div.style.visibility=="visible");
		_div.wvIsVisibleProg=true;
		if(WvTree.isSafari){
			this.xTranslate=0;
			this.xTranslatePx="0px";
			this.yTranslate=0;
			this.yTranslatePx="0px";
		}
		return true;
	};
	WvTree.treeBuild=function(){
		if(this.wvShowTreeSingular)this.wvShowTreeSingular.exec();
		var parent=this;
		if(!this.isRoot){
			parent=this.parentNode;
			if(parent==null){
				WvTree.error(this.id+'.treeBuild() error : "root" is unknown, '+this.id+' is not inside WhenViewer-tree.');
				return;
			}
			if(parent.wvComponent==null||parent.isRoot==null){
				parent.wvUt=WvTree.treeNodeBuildParent;
				parent.wvUt();
				this._root=parent._root;
			}
			else{
				this._root=parent;
			}
		}
		this.wvUt=WvTree.treeNodeBuildTree;
		this.wvUt(this._root,parent);
	};
	WvTree.treeNodeBuildParent=function(){
		if(this.isRoot){
			this._root=this;
			return;
		}
		if(this.wvComponent==null){
			new WvFace(this);
			return;
		}
		if(this.wvIsFace&&this.wvIsGroup==null)this.wvIsGroup=true;
		var parent=this.parentNode;
		if(parent!=null){
			if(parent.wvComponent==null&&parent.isRoot==null){
				parent.wvUt=WvTree.treeNodeBuildParent;
				parent.wvUt();
			}
			this._root=parent._root;
		}
		else{
			WvTree.error(this.id+'.treeBuild() error : "root" is unknown, '+this.id+' is not inside WhenViewer-tree.');
		}
		if(this.wvGroup==null)this.wvGroup=this;
		if(this.wvGroupParent==null)this.wvGroupParent=parent.wvGroup;
		if(this.wvComponent==null){
			this.wvUt=WvTree.treeNodeInit;
			this.wvUt(parent._root,parent);
		}
	};
	WvTree.treeNodeBuildTree=function(root,parent){
		if(this.wvIsBuild)return;
		if(this.wvShowTreeSingular&&this.style.visibility=='visible')this.wvShowTreeSingular.exec();
		this.wvIsBuild=true;
		this.__wvId=this.id;
		var chs=this.children;
		var cpt=0;
		if(chs!=null){
			var ch;
			for(var cpt=0,i=0,nb=chs.length;i<nb;i++){
				ch=chs[i];
				if(ch==null||(Object.prototype.toString.apply(ch)!='[object HTMLDivElement]'&&(ch.dataset==null||ch.dataset.wvispiece==null)))continue;
				if(ch.id=="line"&&ch.firstElementChild.tagName=="svg")continue;
				ch.wvIsDiv=true;
				cpt++;
			}
		}
		if(cpt==0){
			this.wvIsFace=true;
			if(this.wvComponent==null){
				if(this.wvGroupParent==null)this.wvGroupParent=parent.wvGroup;
				if(this.wvGroup==null)this.wvGroup=WvNull.null;
				this.wvUt=WvTree.treeNodeInit;
				this.wvUt(root,parent);
			}
			return;
		}
		if(this.wvComponent==null){
			this.wvGroup=this;
			this.wvGroupParent=parent.wvGroup;
			this.wvUt=WvTree.treeNodeInit;
			this.wvUt(root,parent);
		}
		var nb=chs.length;
		for(var i=0;i<nb;i++){
			var ch=chs[i];
			if(ch==null||ch.wvIsDiv==null)continue;
			ch.wvUt=WvTree.treeNodeBuildTree;
			ch.wvUt(root,this);
		}
	};
	WvTree.treeNodeInit=function(root,parent){
		this.wvPiece=this;
		this._parent=parent.wvPiece;
		this._root=root;
		this._div=this;
		this.wvUt=WvTree.initPieceProperties;
		this.wvUt();
		this.wvComponent="true";
		this.show=WvTree.show;
		this.hide=WvTree.hide;
		this._parent.pieceLinkFace(this);
		if(this.wvGroupParent&&this.wvGroupParent.groupLinkPieceChild)this.wvGroupParent.groupLinkPieceChild(this);
	};
	WvTree.error=function(message){
		console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ERROR  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		console.error(message);
		console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	};
	function WvOnAnim(){
		this.divs=[];
		this.actions=[];
		this.info=[];
		this.onlyOnce=[];
		this.frameCurr=[];
		this.framesActives=[];
		this.nb=0;
	}
	;
	function WvRoot(nbFrames,frameSpeed,div_){
		div_.onAnim=new WvOnAnim();
		var _div=this._div=div_;
		if(!_div.classList.__proto__.replace){
			DOMTokenList.prototype.replace=function(oldP,newP){
				this.remove(oldP);
				this.add(newP);
			};
		}
		_div.wvIsFace=true;
		_div.wvIsGroup=true;
		_div.wvIsPiece=true;
		_div.wvIsTransformer=false;
		_div.wvIsState=false;
		WvTree.wvRoot=_div;
		this.initPieceProperties();
		this.init=WvTree.linkInit;
		this.init(div_,true);
		_div.wvFrameSpeed=frameSpeed||40;
		_div.wvFrameGroup=0;
		_div.wvFramesNb=nbFrames;
		WvTree.getWindow(_div).onInit(_div);
		this._div.__wvIdDebug=((this._div.wvPiece._parent!=null)?this._div.wvPiece._parent.id:"/")+'/'+this._div.wvPiece.id+'/'+this._div.id;
	};
	WvRoot.prototype.LinkGroup=function(){
		this._div.wvGroup=this._div;
	};
	WvRoot.prototype.linkPiece=function(){
		this._div.wvPiece=this._div;
	};
	WvRoot.prototype.wvXXX_2_DivParent=function(){
	};
	WvRoot.prototype.linkGroupParent=function(){
		this._div.wvGroupParent=this._div;
	};
	WvRoot.prototype.linkPieceParent=function(){
		this._div._parent=this._div;
	};
	WvRoot.prototype.linkRoot=function(){
		this._div._root=this._div;
		this._div.isRoot=true;
	};
	WvRoot.prototype.showHide=function(){
		this._div.wvShowTree=WvTree.showWvTreeRoot;
		this._div.hideWvTree=WvTree.hideWvTreeRoot;
	};
	WvRoot.prototype.initPieceProperties=WvTree.initPieceProperties;
	WvTree.showWvTreeRoot=function(){
		if(!this.wvIsVisible){
			this.style.visibility="visible";
			this.wvIsVisible=true;
			if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
			if(this.onWvVisible!=null)this.onWvVisible();
		}
		if(this.wvPieces==null)return;
		var pieces=(this.wvPiecesVisiblesInGroup||WvTree.selectPiecesVisibles(this));
		var nbPieces=pieces.length;
		var piece;
		for(var i=0;i<nbPieces;i++){
			piece=pieces[i];
			if(piece==null)continue;
			piece.wvShowTree();
		}
	};
	WvTree.selectPiecesVisibles=function(divP){
		if(divP.wvPieces==null)return null;
		var pieces=divP.wvPieces;
		var piecesVisibles=[];
		var p;
		for(var i=0;i<pieces.length;i++){
			p=pieces[i];
			if(p==null||(p.id.indexOf("f__")==0&&p.parentNode.wvIsTransformer))continue;
			piecesVisibles.push(p);
		}
		return divP.wvPiecesVisiblesInGroup=piecesVisibles;
	};
	WvTree.hideWvTreeRoot=function(noDelay){
		if(this.wvIsVisible){
			if(noDelay==null&&this.wvHideDelay!=null){
				setTimeout(function(div_){
					div_.hideWvTree(true)}
				,this.wvHideDelay,this);return;
			}
			this.style.visibility="hidden";
			this.wvIsVisible=false;
			if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.stop(true);
			if(this.wvHideTreeSingular!=null)this.wvHideTreeSingular.exec();
		}
		var pieces=div.wvPieces;
		if(pieces==null)return;
		var nbPieces=pieces.length;
		var piece;
		for(var i=0;i<nbPieces;i++){
			piece=pieces[i];
			if(piece==null)continue;
			piece.hideWvTree();
		}
	};
	WvTree.hideWvTreeSingulary=function(fc,div_){
	};
	function WvGroup(nbFrames,div_){
		var _div=this._div=div_;
		_div.wvIsPiece=true;
		_div.wvIsFace=true;
		_div.wvIsGroup=true;
		_div.wvIsTransformer=false;
		_div.wvIsState=false;
		this.initPieceProperties();
		this.init=WvTree.linkInit;
		if(!this.init(div_))return;
		_div.wvFramesNb=nbFrames;
		if(_div.wvIsVisible)_div.wvFrameGroup=0;
		_div.__wvIdDebug=((_div.wvPiece._parent!=null)?_div.wvPiece._parent.id:"/")+'/'+_div.wvPiece.id+'/'+_div.id;
		var width=_div.style.width;
		if(width!=null&&width.length>0&&_div.wvOrigin==null){
			_div.wvOrigin=true;
			if(_div.classList.length==0){
				_div.style.transformOrigin="0px 0px";
				_div.style.webkitTransformOrigin="0px 0px";
				_div.style.mozTransformOrigin="0px 0px";
				_div.style.oTransformOrigin="0px 0px";
				_div.style.msTransformOrigin="0px 0px";
			}
		}
	};
	WvGroup.prototype.LinkGroup=function(){
		this._div.wvGroup=this._div;
	};
	WvGroup.prototype.linkPiece=function(){
		this._div.wvPiece=this._div;
	};
	WvGroup.prototype.wvXXX_2_DivParent=WvTree.wvXXX_2_DivParent;
	WvGroup.prototype.linkGroupParent=WvTree.pieceGroupLinkGroupParent;
	WvGroup.prototype.linkPieceParent=WvTree.pieceLinkPieceParent;
	WvGroup.prototype.linkRoot=WvTree.linkRoot;
	WvGroup.prototype.initPieceProperties=WvTree.initPieceProperties;
	WvGroup.prototype.showHide=function(){
		this._div.wvShowTree=WvTree.showWvTreeGroupInit;
		this._div.wvHideTree=WvTree.hideWvTreeGroup;
	};
	WvTree.showWvTreeGroupInit=function(){
		if(!this.wvIsVisibleProg)return;
		this.wvShowTree=WvTree.showWvTreeGroupInitRun;
		this.wvShowTree();
	};
	WvTree.showWvTreeGroupInitRun=function(){
		if(!this.wvIsVisibleProg)return;
		if(this.wvFrameCurrent==null)wvFrameCurrent=0;
		if(this.wvTracks!=null&&this.wvTracks[0]!=null){
			this.wvShowTree=WvTree.showWvTreeGroupTracks;
			if(this.wvGroupContainer==null)this.wvGetGroupContainer();
			this.wvShowTree();
			return;
		}
		if(this.wvFrameVisibleStart!=null){
			if(this.onWvFrame!=null&&this.onWvFrame.length>1&&this.wvTracks==null){
				if(this.wvActionOnVisible==null)this.wvActionOnVisible=this.onWvFrame[1];
			}
			this.wvShowTree=WvTree.showWvTreeGroupLimits;
			if(this.wvGroupContainer==null)this.wvGetGroupContainer();
			this.wvShowTree();
			return;
		}
		this.wvShowTree=WvTree.showWvTreeGroupFixe;
		this.wvShowTree();
	};
	WvTree.showWvTreeGroupTracks=function(){
		if(!this.wvIsVisibleProg)return;
		if(!this.wvIsVisible){
			var numFrame;
			if((numFrame=this.wvGroupContainer.wvFrameGroup)==null||numFrame==null)numFrame=0;
			if(this.wvTracks!=null&&this.wvTracks[0]!=null&&this.wvTracks[0][numFrame]==null){
				return false;
			}
			this.style.visibility="visible";
			this.wvIsVisible=true;
			if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
			if(this.onWvVisible!=null)this.onWvVisible();
		}
		if(this.wvPieces==null)return;
		var pieces=(this.wvPiecesVisiblesInGroup||WvTree.selectPiecesVisibles(this));
		var nbPieces=pieces.length;
		var piece;
		for(var i=0;i<nbPieces;i++){
			piece=pieces[i];
			if(piece==null)continue;
			piece.wvShowTree();
			piece.wvFrameSetMovement(this.wvFrameGroup);
		}
		this.wvFrameGroup= -1;
	};
	WvTree.showWvTreeGroupLimits=function(){
		if(!this.wvIsVisibleProg)return;
		if(!this.wvIsVisible){
			var numFrame;
			if((numFrame=this.wvGroupContainer.wvFrameGroup)==null||numFrame==null)numFrame=0;
			if(numFrame<this.wvFrameVisibleStart||numFrame>=this.wvFrameVisibleEnd)return;
			this.style.visibility="visible";
			this.wvIsVisible=true;
			if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
			if(this.onWvVisible!=null)this.onWvVisible();
			this.wvFrameGroup=0;
			if(this.wvActionOnVisible&&numFrame==this.wvFrameVisibleStart){
				WvActionsOnFrame.add(this,this.wvActionOnVisible);
			}
		}
		if(this.wvPieces==null)return;
		var pieces=(this.wvPiecesVisiblesInGroup||WvTree.selectPiecesVisibles(this));
		var nbPieces=pieces.length;
		var piece;
		for(var i=0;i<nbPieces;i++){
			piece=pieces[i];
			if(piece==null)continue;
			piece.wvShowTree();
			piece.wvFrameSetMovement(this.wvFrameGroup);
		}
	};
	WvTree.showWvTreeGroupFixe=function(){
		if(!this.wvIsVisibleProg)return;
		if(!this.wvIsVisible){
			this.style.visibility="visible";
			this.wvIsVisible=true;
			if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
			if(this.onWvVisible!=null)this.onWvVisible();
			this.wvFrameGroup=0;
			if(this.wvActionOnVisible){
				WvActionsOnFrame.add(this,this.wvActionOnVisible);
			}
		}
		if(this.wvPieces==null)return;
		var pieces=(this.wvPiecesVisiblesInGroup||WvTree.selectPiecesVisibles(this));
		var nbPieces=pieces.length;
		var piece;
		for(var i=0;i<nbPieces;i++){
			piece=pieces[i];
			if(piece==null)continue;
			piece.wvShowTree();
			if(piece.wvFrameSetMovement)piece.wvFrameSetMovement(this.wvFrameGroup);
		}
	};
	WvTree.hideWvTreeGroup=function(noDelay){
		if(!this.wvIsVisibleProg)return;
		if(this.wvIsVisible){
			if(noDelay==null&&this.wvHideDelay!=null&&this._parent.wvIsVisible==true){
				setTimeout(function(div_){
					div_.wvHideTree(true)}
				,this.wvHideDelay,this);return;
			}
			this.style.visibility="hidden";
			this.wvIsVisible=false;
			if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.stop(true);
			if(this.wvHideTreeSingular!=null)this.wvHideTreeSingular.exec();
			if(this.wvOnHidden!=null)this.wvOnHidden();
			if(this.wvActionLoop!=null){
				clearInterval(this.wvActionLoop);
				this.wvActionLoop=null;
			}
		}
		var pieces=this.wvPieces;
		if(pieces==null)return;
		var nbPieces=pieces.length;
		var piece;
		for(var i=0;i<nbPieces;i++){
			piece=pieces[i];
			if(piece==null)continue;
			piece.wvHideTree();
		}
		this.wvFrameCurrent=null;
		this.wvStateCurrent=null;
		this.wvFrameGroup=null;
		this.wvFreeze=null;
		WvStream.close(this);
	};
	function WvFace(div_){
		var _div=this._div=div_;
		_div.wvIsFace=true;
		_div.wvIsGroup=false;
		_div.wvIsPiece=true;
		_div.wvIsTransformer=false;
		_div.wvIsState=false;
		this.initPieceProperties();
		this.init=WvTree.linkInit;
		this.init(div_);
		_div.__wvIdDebug=((this._div.wvPiece._parent!=null)?this._div.wvPiece._parent.id:"/")+'/'+this._div.wvPiece.id+'/'+this._div.id;
	};
	WvFace.prototype.linkPiece=function(){
		this._div.wvPiece=this._div;
	}
	;
	WvFace.prototype.wvXXX_2_DivParent=WvTree.wvXXX_2_DivParent;
	WvFace.prototype.LinkGroup=WvTree.stateLinkGroup;
	WvFace.prototype.linkGroupParent=WvTree.linkGroupParent;
	WvFace.prototype.linkPieceParent=WvTree.pieceLinkPieceParent;
	WvFace.prototype.linkRoot=WvTree.linkRoot;
	WvFace.prototype.initPieceProperties=WvTree.initPieceProperties;
	WvFace.prototype.showHide=function(){
		this._div.wvShowTree=WvTree.showWvTreeFaceInit;
		this._div.wvHideTree=WvTree.hideWvTreeFace;
	};
	WvTree.showWvTreeFaceInit=function(){
		if(!this.wvIsVisibleProg)return;
		if(this.wvTracks!=null&&this.wvTracks[0]!=null){
			this.wvShowTree=WvTree.showWvTreeFaceTracks;
			if(this.wvGroupContainer==null)this.wvGetGroupContainer();
			this.wvShowTree();
			return;
		}
		if(this.wvFrameVisibleStart!=null){
			if(this.onWvFrame!=null&&this.onWvFrame.length>1&&this.wvTracks==null){
				if(this.wvActionOnVisible!=null)this.wvActionOnVisible=this.onWvFrame[1];
			}
			this.wvShowTree=WvTree.showWvTreeFaceLimits;
			if(this.wvGroupContainer==null)this.wvGetGroupContainer();
			this.wvShowTree();
			return;
		}
		this.wvShowTree=WvTree.showWvTreeFaceFixe;
		this.wvShowTree();
	};
	WvTree.showWvTreeFaceTracks=function(){
		if(this.wvIsVisible|| !this.wvIsVisibleProg){
			return}
		var numFrame;
		if((numFrame=this.wvGroupContainer.wvFrameGroup)==null||numFrame==null)numFrame=0;
		if(this.wvTracks!=null&&this.wvTracks[0]!=null&&this.wvTracks[0][numFrame]==null){
			return false;
		}
		this.style.visibility="visible";
		this.wvIsVisible=true;
		if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
		if(this.onWvVisible!=null)this.onWvVisible();
		if(this.children.line!=null){
			this.children.line.style.visibility="visible";
			this.children.line.wvIsVisible=true;
		}
	};
	WvTree.showWvTreeFaceLimits=function(){
		if(this.wvIsVisible|| !this.wvIsVisibleProg)return;
		var numFrame;
		if((numFrame=this.wvGroupContainer.wvFrameGroup)==null||numFrame==null)numFrame=0;
		if(numFrame<this.wvFrameVisibleStart||numFrame>=this.wvFrameVisibleEnd)return;
		this.style.visibility="visible";
		this.wvIsVisible=true;
		if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
		if(this.onWvVisible!=null)this.onWvVisible();
		if(this.children.line!=null){
			this.children.line.style.visibility="visible";
			this.children.line.wvIsVisible=true;
		}
		if(this.wvActionOnVisible&&numFrame==this.wvFrameVisibleStart){
			WvActionsOnFrame.add(this,this.wvActionOnVisible);
		}
	};
	WvTree.showWvTreeFaceFixe=function(){
		if(this.wvIsVisible|| !this.wvIsVisibleProg){
			return;
		}
		this.style.visibility="visible";
		this.wvIsVisible=true;
		if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
		if(this.onWvVisible!=null)this.onWvVisible();
		if(this.children.line!=null){
			this.children.line.style.visibility="visible";
			this.children.line.wvIsVisible=true;
		}
		if(this.wvActionOnVisible){
			WvActionsOnFrame.add(this,this.wvActionOnVisible);
		}
	};
	WvTree.hideWvTreeFace=function(noDelay){
		if(!this.wvIsVisible){
			return;
		}
		if(noDelay==null&&this.wvHideDelay!=null&&this._parent.wvIsVisible==true){
			setTimeout(function(div_){
				div_.hideWvTreeFace(true)}
			,this.wvHideDelay,this);return;
		}
		this.style.visibility="hidden";
		this.wvIsVisible=false;
		if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.stop(true);
		if(this.wvHideTreeSingular!=null)this.wvHideTreeSingular.exec();
		var line;
		if((line=this.children.line)!=null){
			line.style.visibility="hidden";
			line.wvIsVisible=false;
			if(line.wvShowTreeSingular!=null)line.wvShowTreeSingular.stop(true);
			if(line.wvHideTreeSingular!=null)line.wvHideTreeSingular.exec();
		}
		this.wvFrameAttrDisplayed= -1;
		WvStream.close(this);
		if(this.wvActionLoop!=null){
			clearInterval(this.wvActionLoop);
			this.wvActionLoop=null;
		}
	};
	function WvTreeNode(infos,tab){
		this.tab=tab;
		this.infos=infos;
	};
	HTMLDivElement.prototype.wvToTreePiece=function(pack,action){
		if(pack==null){
			pack=[];
			var isRoot=true;
		}
		var tab=[];
		var index=0;
		var nb;
		var t;
		var isTab=false;
		if(this.wvFaces!=null){
			nb=this.wvFaces.length;
			var face;
			for(var i=0;i<nb;i++){
				isTab=true;
				face=this.wvFaces[i];
				if(face==null)continue;
				t=face.wvToTreePiece(pack,action);
				pack[0]=null;
				if(t!=null)tab[index++]=new WvTreeNode(face[action](),t);
			}
		}
		if(this.wvPieces!=null){
			nb=this.wvPieces.length;
			var piece;
			for(var i=0;i<nb;i++){
				isTab=true;
				piece=this.wvPieces[i];
				if(piece==null)continue;
				t=piece.wvToTreePiece(pack,action);
				tab[index++]=(pack[0]!=1)?new WvTreeNode(piece[action](),t):[piece[action]()];
				pack[0]=null;
			}
		}
		if(index==0){
			tab[index++]=this[action]();
			pack[0]=1;
		}
		if(isRoot!=null){
			tab=new WvTreeNode(this[action](),tab)}
		return tab;
	};
	HTMLDivElement.prototype.wvDraggable_=function(dropName,onDropTrue,onDropFalse,onDropOut){
		return new WvDrag(this,dropName,onDropTrue,onDropFalse,onDropOut);
	};
	HTMLDivElement.prototype.wvDraggable=function(dropName,params){
		if(params==null){
			return new WvDrag(this,dropName);
		}
		if(typeof(params)=="number"){
			return new WvDrag(this,dropName,(params&1)>0,(params&2)>0);
		}
		var onDropTrue=params["onDropTrue"];
		var onDropFalse=params["onDropFalse"];
		var onDropOut=params["onDropOut"];
		var dropOutOrg=params["org"];
		var dropCenter=params["center"];
		return new WvDrag(this,dropName,dropOutOrg,dropCenter,onDropTrue,onDropFalse,onDropOut);
	};
	function WvDrag(_div,dropName,dropOutOrg,dropCenter,onDropTrue,onDropFalse,onDropOut){
		this._div=_div;
		_div.wvDrag=this;
		this.dropName=dropName;
		this.dropOutOrg=dropOutOrg;
		this.dropCenter=dropCenter;
		this.xOrg=this._div.style.left;
		this.yOrg=this._div.style.top;
		if(onDropTrue!=null)this.onDropTrue=onDropTrue;
		if(onDropFalse!=null)this.onDropFalse=onDropFalse;
		if(onDropOut!=null)this.onDropOut=onDropOut;
		_div.onmousedown=function(e){
			this.wvDrag.init(e);
		}
		;
	};
	WvDrag.prototype.init=function(e){
		this.drops=this._div.wvGroupParent.wvDrops;
		this._div.onmousedown=WvDrag.wvStartDrag;
		this._div.wvFc=WvDrag.wvStartDrag;
		this._div.wvFc(e);
	};
	WvDrag.TRUE=1;
	WvDrag.FALSE=2;
	WvDrag.OUT=4;
	WvDrag.prototype.insideDrop=function(x,y){
		var dragDiv=this._div;
		if(this.dropName==null){
			if(this.onDropTrue!=null){
				this.insideDrop=function(){
					if(dragDiv.wvOnDropTrue)dragDiv.wvOnDropTrue(x,y);
					dragDiv.cfUt=this.onDropTrue;
					return dragDiv.cfUt();
				}
				;
			}
			else{
				this.insideDrop=function(){
					if(dragDiv.wvOnDropTrue)dragDiv.wvOnDropTrue(x,y);
					this._div.wvDropResult=WvDrag.TRUE;
					return null;
				}
				;
			}
			return this.insideDrop();
		}
		var drops=this.drops;
		if(drops==null){
			this.insideDrop=function(){
				if(dragDiv.wvOnDropTrue)dragDiv.wvOnDropTrue(x,y);
			}
			;
			return this.insideDrop();
		}
		if(this.dropName.indexOf(',')>=0){
			drops.tabNameToDiv(this.dropName.split(','),this._div);
		}
		else{
			var pos;
			if((pos=this.dropName.trim().indexOf('*'))>=0){
				drops.nameExpToDiv(this.dropName.split('*')[(pos>0)?0:1]. trim(),this._div);
			}
			else{
				var name=this.dropName;
				this.dropsOk=[];
				this.dropsOk[name]=drops.dropsPt[name];
			}
		}
		this.insideDrop=function(x,y){
			var dragDiv=this._div;
			var drop=drops.contains(x,y);
			if(drop==null){
				if(dragDiv.wvOnDropOut)dragDiv.wvOnDropOut(x,y);
				if(this.dropOutOrg){
					dragDiv.style.left=this.xOrg;
					dragDiv.style.top=this.yOrg;
				}
				if(this.onDropOut){
					dragDiv.cfUt=this.onDropOut;
					return dragDiv.cfUt(this);
				}
				else{
					dragDiv.wvDropResult=WvDrag.OUT;
				}
				return;
			}
			if(this.dropCenter){
				dragDiv.style.left=(parseFloat(drop.div.style.left)+(drop.lg/2)-(dragDiv.offsetWidth/2))+"px";
				dragDiv.style.top=(parseFloat(drop.div.style.top)+(drop.ht/2)-(dragDiv.offsetHeight/2))+"px";
			}
			if(this.dropsOk[drop.id]){
				if(dragDiv.wvOnDropOut)dragDiv.wvOnDropTrue(x,y);
				if(this.onDropTrue){
					dragDiv.cfUt=this.onDropTrue;
					return dragDiv.cfUt(this,drop.id);
				}
				else{
					dragDiv.wvDropResult=WvDrag.TRUE;
				}
				return;
			}
			if(dragDiv.wvOnDropFalse)dragDiv.wvOnDropFalse(x,y);
			if(this.onDropFalse){
				dragDiv.cfUt=this.onDropFalse;
				return dragDiv.cfUt(this,drop);
			}
			else{
				dragDiv.wvDropResult=WvDrag.FALSE;
			}
		}
		;
		this.insideDrop(x,y);
	};
	WvDrag.wvStartDrag=function(e){
		if(this.mouseOverToTopPh)this.wvToTop();
		console.log("WvDrag.wvStartDrag");
		WvDrag.pieceDragXorg=parseFloat(this.style.left);
		WvDrag.pieceDragYorg=parseFloat(this.style.top);
		WvDrag.mouseDragXorg=e.clientX;
		WvDrag.mouseDragYorg=e.clientY;
		WvDrag.divDragged=this;
		var x=null;
		var y=null;
		document.wvOnMouseMove=new WvMouseEventList(document,document.onmousemove,document.wvOnMouseMove);
		document.onmousemove=function(e){
			if(document.wvOnMouseMove.func!=document.onmousemove)document.wvOnMouseMove.exec(e);
			else document.wvOnMouseMove=null;
			var divDragged=WvDrag.divDragged;
			if(divDragged==null){
				return;
			}
			x=e.clientX-WvDrag.mouseDragXorg+WvDrag.pieceDragXorg;
			divDragged.style.left=x+"px";
			y=e.clientY-WvDrag.mouseDragYorg+WvDrag.pieceDragYorg;
			divDragged.style.top=y+"px";
			if(divDragged.wvOnDrag!=null)divDragged.wvOnDrag(x,y);
		}
		;
		document.onmouseup=function(e){
			var divDragged=WvDrag.divDragged;
			WvDrag.divDragged=null;
			divDragged.style.left=(e.clientX-WvDrag.mouseDragXorg+WvDrag.pieceDragXorg)+"px";
			divDragged.style.top=(e.clientY-WvDrag.mouseDragYorg+WvDrag.pieceDragYorg)+"px";
			if(x!=null&&divDragged.wvOnDrag!=null)divDragged.wvOnDrag(x,y);
			if(document.wvOnMouseMove){
				document.onmousemove=document.wvOnMouseMove.func;
				document.wvOnMouseMove=document.wvOnMouseMove.next;
			}
			else{
				document.onmousemove=WvTree.onMouseMoveDefault;
			}
			document.onmouseup=null;
			divDragged.wvDrag.insideDrop(e.clientX,e.clientY);
		}
		;
	}
	;
	document.onmousemove=function(e){
		if(document.wvOnMouseMove&&document.wvOnMouseMove.next){
			document.wvOnMouseMove.next.exec(e);
		}
		document.wvXmouse=e.clientX;
		document.wvYmouse=e.clientY;
	};
	WvTree.onMouseMoveDefault=function(e){
		document.wvXmouse=e.clientX;
		document.wvYmouse=e.clientY;
		if(document.wvOnMouseMove.funcSys)document.wvOnMouseMove.funcSys(e);
	};
	if(!document.wvOnMouseMove){
		document.wvOnMouseMove=new WvMouseEventList(document,WvTree.onMouseMoveDefault,null,document.onmousemove);
	}
	function WvDrop(_div){
		this.div=_div;
		this.id=_div.id;
		var group=_div.wvGroupParent;
		if(group.wvDrops==null)this.drops=new WvDrops(group);
		this.index=group.wvDrops.push(this)-1;
	};
	WvDrop.prototype.getBounds=function(){
		var coords=WvTree.wvGetPositionAbsolute(this.div);
		this.x=coords[0];
		this.y=coords[1];
		this.lg=this.div.offsetWidth;
		this.ht=this.div.offsetHeight;
	};
	WvDrop.prototype.contains=function(x,y){
		this.getBounds();
		return x>=this.x&&y>=this.y&&x<this.x+this.lg&&y<this.y+this.ht;
	};
	function WvDrops(group){
		group.wvDrops=this;
		this.drops=[];
		this.dropsPt=[];
	};
	WvDrops.prototype.push=function(_div){
		this.dropsPt[_div.id]=_div;
		this.drops.push(_div);
	};
	WvDrops.prototype.indexOf=function(_div){
		return this.drops.indexOf(_div);
	};
	WvDrops.prototype.tabNameToDiv=function(names,dragDiv){
		if(names==null)return null;
		var drag=dragDiv.wvDrag;
		var nb=names.length;
		var drop;
		for(var i=0;i<nb;i++){
			var name=names[i].trim();
			drop=this.dropsPt[name];
			if(names[i]==null){
				console.error("wv_tree.js/WvDrops.tabNameToDiv("+names+") '"+names[i].trim()+"' is unknown.");
				continue;
			}
			if(drag.dropsOk==null){
				drag.dropsOk=[];
			}
			if(drag.dropsOk[name]==null)drag.dropsOk[name]=drop;
			else console.error("wv_tree.js/WvDrops.nameToDiv() drag OK '"+name+"' already used")}
	};
	WvDrops.prototype.nameExpToDiv=function(name,dragDiv){
		if(name==null)return null;
		name=name.trim();
		var drag=dragDiv.wvDrag;
		var nb=this.drops.length;
		for(var i=0;i<nb;i++){
			var drop=this.drops[i];
			if(drop.id.indexOf(name)>=0){
				if(drag.dropsOk==null)drag.dropsOk=[];
				drag.dropsOk[drop.id]=drop;
			}
		}
	};
	WvDrops.prototype.contains=function(x,y){
		var nb=this.drops.length;
		for(var i=0;i<nb;i++){
			var drop=this.drops[i];
			if(drop==null)continue;
			if(drop.contains(x,y))return drop;
		}
	};
	WvTree.wvGetPositionAbsolute=function(_div){
		var x=0;
		var y=0;
		while(_div.offsetParent!=null){
			x+=_div.offsetLeft+((_div.clientLeft!=null)?_div.clientLeft:0);
			y+=_div.offsetTop+((_div.clientTop!=null)?_div.clientTop:0);
			_div=_div.offsetParent;
		}
		return[x,y];
	};
	WvTree.linkEanim=function(targetP,urlP){
		if(targetP==null||targetP==""){
			document.location=urlP;
		}
		else{
			var lgP=800;
			var htP=600;
			var newWindow=window.open(urlP,targetP);
			newWindow.focus();
			void(0);
		}
	};
	HTMLDivElement.prototype.wvGetGroupContainer=function(){
		return this.wvGroupContainer=this.wvGroupParent;
	};
	HTMLDivElement.prototype.wvToTop=function(){
		if(!this.style.zIndex||this.style.zIndex==""&&this.id.substring(0,3)=='f__'){
			var piece=this.wvPiece;
			if(piece.wvStates==null){
				piece.wvUt=WvTransformer.buildStates;
				piece.wvUt();
			}
			var index=0;
			for(var i=piece.wvStatesNb-1;i>=0;i--){
				piece.wvStates[i].style.zIndex=(index++);
			}
		}
		HTMLDivElement.prototype.wvToTop=function(){
			var group=this.wvGroupParent;
			var pieceTopOld=group.wvPieceOnTop;
			if(pieceTopOld==this){
				return;
			}
			if(pieceTopOld!=null)pieceTopOld.wvQuitTop();
			this.wvZorgTop=parseInt(this.style.zIndex);
			if(isNaN(this.wvZorgTop)){
				if(this.wvIsState){
					this.style.zIndex=(this.wvZorgTop=this.id.wvGetIndex(0)). toString();
				}
				else{
					this.wvZorgTop=null;
				}
			}
			if(this.wvZtop==null)this.wvZtop=WvButton_S.getZtop(this);
			var zTime=this._z=this.wvZtop+1;
			group.wvPieceOnTop=this;
			this._z=this.zOld=this.style.zIndex=zTime;
		}
		;
		this.wvToTop();
	};
	HTMLDivElement.prototype.wvQuitTop=function(){
		if(this.wvZorgTop==null){
			this.wvZorgTop=parseInt(this.style.zIndex);
		}
		this._zOld=this.style.zIndex=this._z=this.wvZorgTop;
		this.wvZorgTop=null;
		var group=this.wvGroupParent;
		if(group.wvPieceOnTop==this)group.wvPieceOnTop=null;
	};
	HTMLDivElement.prototype.wvStream=function(divStream,attrs,divEnd,delayStart,delayEnd){
		var stream=this.children.stream;
		divStream.wv_Stream=stream;
		stream.div=divStream;
		stream.permanent=(attrs&1)>0;
		stream.endPlay=(attrs&2)>0;
		if(divEnd!=null){
			if(Array.isArray(divEnd)){
				stream.divEndPlayTab=divEnd;
			}
			else{
				stream.divEndPlay=divEnd;
			}
		}
		if(delayStart!=null)stream.delayStart=delayStart;
		if(delayEnd!=null){
			stream.delayEnd=delayEnd;
		}
		divStream.audioPlay=WvTree.streamPlay;
		divStream.audioStop=function(){
			this.wv_Stream.pause();
		};
		divStream.audioPause=function(){
			this.wv_Stream.pause();
		};
		divStream.audioRestart=WvTree.streamRestart;
		divStream.audioSeek=function(time){
			this.wv_Stream.currentTime=time;
		};
		divStream.videoPlay=WvTree.streamPlay;
		divStream.videoStop=function(){
			this.wv_Stream.pause();
		};
		divStream.videoPause=function(){
			this.wv_Stream.pause();
		};
		divStream.videoRestart=WvTree.streamRestart;
		divStream.videoSeek=function(time){
			this.wv_Stream.currentTime=time;
		};
		divStream.wvShowTree=WvTree.showWvTreeStream;
		divStream.wvHideTree=WvTree.hideWvTreeStream;
	};
	WvTree.streamPlay=function(){
		stream.isEnded=null;
		this.wv_Stream.currentTime=0;
		this.wv_Stream.play();
	};
	WvTree.streamPlay_=function(playerP){
		try{
			var playPromise=playerP.play();
		}
		catch(error){
			console.log("WvTree.streamPlay_ : "+error);
			setTimeout(WvTree.streamPlay_,500,playerP);
		}
		if(playPromise!==undefined){
			playPromise.then(_=>{
			}
			). catch(error=>{
				setTimeout(WvTree.streamPlay_,500,playerP);
			}
			);
		}
	};
	WvTree.streamRestart=function(){
		stream.isEnded=null;
		this.wv_Stream.play();
	};
	WvTree.showWvTreeStream=function(){
		this.wvIsVisible=true;
		this.style.visibility="visible";
		var stream=this.wv_Stream;
		if(stream!=null&&stream.play!=null){
			stream.play();
			stream.isEnded=null;
			if(stream.delayStart>0){
				stream.currentTime=stream.delayStart/1000;
			}
		}
	};
	WvTree.hideWvTreeStream=function(){
		this.wvIsVisible=false;
		this.style.visibility="hidden";
		console.log('***DEBUG*** WvTree.hideWvTreeStream -> SON-STOP');
		WvStream.stop(this.wv_Stream,false);
		WvStream.close(this);
	};
	WvStream.close=function(group){
		if(group.wvFilesPath==null)return;
		var nb=group.wvFilesStream.length;
		for(var i=0;i<nb;i++){
			if(group.wvFilesPath[i]==WvStream.wvAudioCurrent)WvStream.wvAudioCurrent=null;
			var stream=group.wvFilesStream[i];
			if(stream==null||stream.ended)continue;
			console.log('***DEBUG*** WvStream.close -> SON-STOP');
			WvStream.stop(stream,false);
		}
	};
	function WvStream(){
	};
	WvStream.stop=function(stream,lockPlayAtEnd){
		if(stream==null||stream.isEnded){
			return;
		}
		if(stream.divEndPlayTab){
			stream.divEndPlay=WvArray_S.tabToDiv(stream.divEndPlayTab);
			stream.divEndPlayTab=null;
		}
		if(!lockPlayAtEnd&&stream.endPlay&&stream.divEndPlay!=null){
			if(stream.divEndPlay.isPathInit){
				stream.divEndPlay=stream.divEndPlay.getDiv();
			}
			if(stream.divEndPlay){
				var div_=stream.divEndPlay;
				if(div_.wvIsTransformer){
					div_=div_.wvStateGet(div_.wvStateCurrent)}
				if(div_.wvFreeze)div_.play();
				else{
					div_.wvStreamIgnoreStop=this;
					console.log("---------"+div_.aaPath.toString());
				}
			}
		}
		if(stream.pause!=null)stream.pause();
		stream.currentTime=0;
		stream.previousTime=null;
		stream.isEnded=true;
	};
	WvStream.pause=function(stream){
		if(stream==null||stream.isEnded){
			return;
		}
		if(stream.pause!=null)stream.pause();
	};
	WvStream.update=function(stream){
		if(stream.divEndPlayTab){
			stream.divEndPlay=WvArray_S.tabToDiv(stream.divEndPlayTab);
			stream.divEndPlayTab=null;
		}
		if(stream.divEndPlay!=null&& !stream.divEndPlayIsInit){
			stream.divEndPlayIsInit=true;
			if(stream.divEndPlay.isPathInit){
				stream.divEndPlay=stream.divEndPlay.getDiv();
			}
			if(stream.divEndPlay!=null){
				if(stream.divEndPlay.wvIsTransformer){
					stream.divEndPlay.getStateNav();
				}
			}
			else{
				console.log("WvStream.update() - divEndPlay is path-init -> produce 'null'");
			}
		}
		var duration=stream.duration*1000;
		var time=stream.currentTime*1000;
		if(stream.delayStart==null&&stream.delayEnd==null&&stream.divEndPlay==null)return;
		if(stream.delayStart!=null&&stream.delayStart>time){
			stream.currentTime=(time=stream.delayStart)/1000;
		}
		else{
			time=stream.currentTime*1000;
		}
		stream.previousTime=time;
		var end=(stream.delayEnd!=null)?stream.delayEnd:duration;
		if(stream.delayEnd!=null&&end<time){
			console.log('***DEBUG*** WvStream.update -> SON-STOP -> stream.delayEnd!=null && end<time');
			WvStream.stop(stream,false);
			return;
		}
		var fraction=time/end;
		var percent=Math.ceil(fraction*100);
		if(percent>=100){
			console.log('***DEBUG*** WvStream.update -> SON-STOP -> percent>=100');
			WvStream.stop(stream,false);
		}
		else{
			if(percent>1&&stream.isEnded)stream.isEnded=null;
		}
	};
	WvStream.getAudio=function(group,fileName){
		if(group.wvFilesPath==null){
			group.wvFilesPath=[];
			group.wvFilesStream=[];
		}
		var pos=group.wvFilesPath.indexOf(fileName);
		if(pos>=0){
			return group.wvFilesStream[pos];
		}
		pos=group.wvFilesPath.push(fileName)-1;
		var audio=new Audio();
		audio.src=fileName;
		group.wvFilesStream.push(audio);
		return audio;
	};
	function Mp3Play(fileName){
		WvStream.mp3Play(document,fileName);
	};
	WvAnim.Mp3Play=function(fileName){
		WvStream.mp3Play(document,fileName);
	};
	function Mp3Stop(){
		WvStream.mp3Stop();
	};
	WvAnim.Mp3Stop=function(){
		WvStream.mp3Stop();
	};
	WvStream.mp3Play=function(group,fileName){
		if(WvStream.wvAudioCurrent!=null){
			WvStream.mp3Stop(group,WvStream.wvAudioCurrent);
		}
		WvStream.wvGroupAudioCurrent=group;
		WvStream.wvAudioCurrent=fileName;
		var wvaudio;
		if((wvaudio=WvStream.getAudio(group,fileName))!=null){
			wvaudio.isEnded=false;
			wvaudio.play();
		}
	};
	WvStream.mp3Restart=function(group){
		var fileName=WvStream.wvAudioCurrent;
		if(fileName==null)return;
		group=WvStream.wvGroupAudioCurrent;
		var audio=WvStream.getAudio(group,fileName);
		if(audio==null){
			return;
		}
		audio.play();
	};
	WvStream.mp3Stop=function(group,fileName){
		if(fileName==null){
			fileName=WvStream.wvAudioCurrent;
			if(fileName==null)return;
			group=WvStream.wvGroupAudioCurrent;
		}
		var audio=WvStream.getAudio(group,fileName);if(audio!=null){
			WvStream.stop(audio,true);
		}
	};
	WvStream.mp3Pause=function(group){
		var fileName=WvStream.wvAudioCurrent;
		if(fileName==null)return;
		group=WvStream.wvGroupAudioCurrent;
		var audio=WvStream.getAudio(group,fileName);
		if(audio==null){
			return;
		}
		WvStream.pause(audio);
	};
	WvStream.mp3PlayRepeat=function(group,fileName){
		WvStream.mp3Play(group,fileName);
		var audio=WvStream.getAudio(group,fileName);
		audio.loop=true;
	};
	WvStream.videoInit=function(videoBufferTime,videoAction,group){
		console.log("wv_tree.js/WvStream.VideoInit() TODO ");
	};
	WvStream.videoVolume=function(group,volP){
		if(volP==null)return;
		var volume=volP/100;
		if(volume<0)volume=0;
		else if(volume>1)volume=1;
		WvStream.searchVideo(group).volume=volume;
	};
	WvStream.videoVolumeGet=function(group){
		if(group==null)return;
		return WvStream.searchVideo(group).volume;
	};
	WvStream.videoVolumeDown=function(group,volP){
		var volume=WvStream.searchVideo(group).volume-(volP/100);
		if(volume<0)volume=0;
		WvStream.searchVideo(group).volume=volume;
	};
	WvStream.videoVolumeUp=function(group,volP){
		var volume=WvStream.searchVideo(group).volume+(volP/100);
		if(volume>1)volume=1;
		WvStream.searchVideo(group).volume=volume;
	};
	WvStream.VideoSetAudio=function(mc_audioP){
		console.log("wv_tree.js/WvStream.VideoSetAudio() TODO (voir : ea_video.set_video_audio(mc_audioP))");
	};
	WvStream.videoPlay=function(videoP){
		var video=WvStream.searchVideo(videoP);
		if(video&&video.play)video.play();
	};
	WvStream.videoPause=function(videoP){
		WvStream.searchVideo(videoP).pause();
	};
	WvStream.videoRestart=function(videoP){
		WvStream.searchVideo(videoP).play();
	};
	WvStream.videoClose=function(videoP){
		console.log("wv_tree.js/WvStream.VideoStop() TODO ");
	};
	WvStream.VideoSetDuration=function(durationP,audioP){
		console.log("wv_tree.js/WvStream.VideoSetDuration() TODO ");
	};
	WvStream.searchVideoPiece=function(videoP){
		var pieces=videoP.children;
		var nbPieces=pieces.length;
		var piece;
		for(var i=0;i<nbPieces;i++){
			piece=pieces[i];
			if(piece!=null&&(piece.video_display||piece.w_video_display)!=null)return piece;
		}
		return null;
	};
	WvStream.searchVideoChild=function(divP){
		if(divP==null)return null;
		if(divP.w_video_display||divP.video_display){
			return divP}
		var childs=WvTree.getWvChilds(divP);
		if(childs==null)return null;
		var nb=childs.length;
		var video_;
		for(var i=0;i<nb;i++){
			var child=childs[i];
			if(video_=WvStream.searchVideoChild(child))return video_;
		}
		return null;
	};
	WvStream.searchVideoParent=function(divP){
		if(divP==null)return null;
		var _root=divP._root;
		var d;
		while((divP.video_display||divP.w_video_display)==null){
			d=WvStream.searchVideoPiece(divP);
			if(d!=null){
				divP=d;
				break;
			}
			if(divP==_root){
				divP=null;
				break;
			}
			divP=divP._parent;
		}
		return divP;
	};
	WvStream.searchVideo=function(videoP){
		if(videoP.id=='w_video_display'||videoP.id=='video_display')return videoP.stream.children.stream;
		var divVideo=WvStream.searchVideoChild(videoP);
		if(divVideo)return(divVideo.w_video_display||divVideo.video_display).stream.children.stream;
		divVideo=WvStream.searchVideoParent(videoP);
		if(divVideo!=null)return(divVideo.w_video_display||divVideo.video_display).stream.children.stream;
		if(videoP.volume!=null){
			return videoP;
		}
		if(videoP.children.volume!=null&&videoP.children.stream.volume!=null){
			return videoP.children.stream;
		}
		if(videoP.stream!=null&&videoP.stream.children.stream!=null&&videoP.stream.children.stream.volume!=null){
			return videoP.stream.children.stream.volume;
		}
		console.log("WvStream.searchVideo() : video unknown");
		return videoP;
	};
	WvStream.searchVideoNamed=function(nameP, videoP){
		if(videoP.id==nameP||videoP.id==nameP)return videoP.stream.children.stream;
		var divVideo=WvStream.searchVideoChildNamed(nameP, videoP);
		if(divVideo)return divVideo[nameP].stream.children.stream;
		divVideo=WvStream.searchVideoParent(videoP);
		if(divVideo!=null)return divVideo[nameP].stream.children.stream;
		if(videoP.volume!=null){
			return videoP;
		}
		if(videoP.children.volume!=null&&videoP.children.stream.volume!=null){
			return videoP.children.stream;
		}
		if(videoP.stream!=null&&videoP.stream.children.stream!=null&&videoP.stream.children.stream.volume!=null){
			return videoP.stream.children.stream.volume;
		}
		console.log("WvStream.searchVideo() : video unknown");
		return videoP;
	};
		WvStream.searchVideoChildNamed=function(nameP, divP){
		if(divP==null)return null;
		if(divP[nameP]||divP[nameP]){
			return divP}
		var childs=WvTree.getWvChilds(divP);
		if(childs==null)return null;
		var nb=childs.length;
		var video_;
		for(var i=0;i<nb;i++){
			var child=childs[i];
			if(video_=WvStream.searchVideoChildNamed(nameP, child))return video_;
		}
		return null;
	};
	
	function WvPathInit(divOrgP,pathTabP){
		this.isPathInit=true;
		this.divOrg=divOrgP;
		this.pathTab=pathTabP;
	};
	WvPathInit.prototype.getDiv=function(){
		if(this.divOrg==null||this.divOrg.id==null){
			console.log("***ERROR*** path-init 'null/"+this.pathTab+"' is unknown");
			return null;
		}
		if(this.pathTab==null||this.pathTab.length==0)return this.divOrg;
		var nbPathes=this.pathTab.length;
		var div=this.divOrg;
		var divChild;
		for(var i=0;i<nbPathes;i++){
			divChild=div[this.pathTab[i]];
			if(divChild==null)div=div.children[this.pathTab[i]];
			else div=divChild;
			if(div==null){
				console.log("***ERROR*** path-init '"+this.divOrg.id+"/"+this.pathTab+"' - '"+this.pathTab[i]+"'is unknown");
				return null;
			}
		}
		return div;
	};
	function WvTextVar(div){
		this.divs=[];
		this.divs.push(div);
		this.text=div.innerText;
	};
	WvFace.initTextVar=function(divText,divVar,nomVar){
		Object.defineProperty(divText,"_text",{
			get:function(){
				return divText.innerText;
			}
			,set:function(txt){
				divText.innerText=txt;
				if(divText.wvVarText!=null){
					var divs=divText.wvVarText.divs;
					var nb=divs.length;
					for(var i=0;i<nb;i++)divs[i].innerText=txt;
				}
			}
		}
		);
		Object.defineProperty(divText,"text",{
			get:function(){
				return divText.innerText;
			}
			,set:function(txt){
				divText.innerText=txt;
				if(divText.wvVarText!=null){
					var divs=divText.wvVarText.divs;
					var nb=divs.length;
					for(var i=0;i<nb;i++)divs[i].innerText=txt;
				}
			}
		}
		);
		Object.defineProperty(divText,"textModified",{
			get:function(){
				return divText.innerText;
			}
			,set:function(txt){
				divText.innerText=txt;
				if(divText.wvVarText!=null){
					var divs=divText.wvVarText.divs;
					var nb=divs.length;
					for(var i=0;i<nb;i++)divs[i].innerText=txt;
				}
			}
		}
		);
		if(divVar!=null&&(nomVar=nomVar.trim()).length>1&&nomVar!="null"&&nomVar!="*"){
			var nomVarPh=nomVar+"ph";
			if(divVar[nomVarPh]!=null){
				divVar[nomVarPh].divs.push(div);
				return;
			}
			divText.wvVarText=divVar[nomVarPh]=new WvTextVar(divVar);
			Object.defineProperty(divVar,nomVar,{
				get:function(){
					return divVar[nomVarPh].divs[0]. innerText;
				}
				,set:function(text){
					var divs=divVar[nomVarPh].divs;
					var nb=divs.length;
					for(var i=0;i<nb;i++)divs[i].innerText=text;
				}
			}
			);
		}
	};
	HTMLDivElement.prototype.getNextHighestDepth=function(){
		if(this.children==null)return 0;
		var nb=this.children.length;
		var child;
		var zIndex=0;
		for(var i=0;i<nb;i++){
			if((child=this.children[i])==null||child.style==null||child.style.zIndex==null||zIndex>=child.style.zIndex)continue;
			zIndex=child.style.zIndex;
		}
		return zIndex;
	};
	HTMLDivElement.prototype.getDepth=function(){
		return parseInt(this.style.zIndex);
	};
	HTMLDivElement.prototype.swapDepths=function(z){
		if(z.style){
			zDiv=this.style.zIndex;
			this.style.zIndex=z.style.zIndex;
			z.style.zIndex=zDiv;
			return;
		}
		if(this.style.zIndex==z)return;
		var parent=this.parentNode;
		var children=parent.children;
		var nb=children.length;
		var div_;
		var child;
		for(var i=0;i<nb;i++){
			child=children[i];
			if(child==null||(Object.prototype.toString.apply(child)!='[object HTMLDivElement]')||child.style.zIndex!=z)continue;
			div_=child;
			break;
		}
		if(div_==null){
			this.style.zIndex=z;
			return;
		}
		div_.style.zIndex=this.style.zIndex;
		this.style.zIndex=z;
	};
	WvTree.debugDefineProperty=function(div_){
		Object.defineProperty(div_,"wvFrameGroup",{
			get:function(){
				return this.wvFrameGroup_;
			}
			,set:function(value_){
				this.wvFrameGroup_=value_;
			}
		}
		);
		Object.defineProperty(div_,"wvFreeze",{
			get:function(){
				return this.wvFreezePh;
			}
			,set:function(val){
				this.wvFreezePh=val;
			}
		}
		);
	};
	WvTree.buildChildren=function(tab){
		this.wvHideTree=WvTree.hideWvTreeGroup;
		var nb=tab.length;
		if(this.wvPieces==null)this.wvPieces=[];
		for(var i=0;i<nb;i++){
			this.wvPieces[i]=this["car"+i]=tab[i];
			tab[i].funcSetTransFormPh=WvAnim.setTransForm;
			tab[i].funcSetOpacity=WvAnim.setOpacityDefault;
			tab[i].wvShowTree=function(){
				this.wvIsVisible=true;
			}
			;
			tab[i].wvHideTree=WvTree.hideWvTreeFace;
			tab[i].wvFrameSetMovement=function(){
			}
			;
			WvTree.debugDefineProperty(tab[i]);
			Object.defineProperty(tab[i],"_name",{
				get:function(){
					return this.id;
				}
				,set:function(name_){
					this.id=name_;
				}
			}
			);
			Object.defineProperty(tab[i],"_x",{
				get:function(){
					return this._xPh=parseFloat(this.style.left);
				}
				,set:function(x_){
					this._xOld=this.style.left=""+x_+"px";
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_y",{
				get:function(){
					return this._yPh=parseFloat(this.style.top);
				}
				,set:function(y_){
					this._yOld=this.style.top=""+y_+"px";
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_xscale",{
				get:function(){
					if(this._xscalePh==null)this._xscalePh=1;
					return this._xscalePh*SCALE100;
				}
				,set:function(x_){
					this._xscalePh=x_/SCALE100;
					this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh);
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_yscale",{
				get:function(){
					if(this._yscalePh==null)this._yscalePh=1;
					return this._yscalePh*SCALE100;
				}
				,set:function(y_){
					this._yscalePh=y_/SCALE100;
					this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh);
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_rotation",{
				get:function(){
					if(this._rotationPh==null)this._rotationPh=0;
					return this._rotationPh;
				}
				,set:function(r_){
					this._rotationPh=r_;
					this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh);
				}
			}
			);
			Object.defineProperty(tab[i],"_visible",{
				get:function(){
					return this.style.visibility=="visible";
				}
				,set:function(v_){
					if(v_){
						this.wvIsVisibleProg=v_;
						this.style.visibility="visible";
					}
					else this.style.visibility="hidden";
					this.wvIsVisible=v_;
					this.wvIsVisibleProg=v_;
				}
			}
			);
			Object.defineProperty(tab[i],"_alpha",{
				get:function(){
					return(this._alphaCurr!=null)?this._alphaCurr:this._alphaCurr=100;
				}
				,set:function(alpha){
					this._alphaCurr=alpha;
					if(this.funcSetOpacity!=null)this.funcSetOpacity(this._alphaCurr/100);
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_xmouse",{
				get:function(){
					return WvTree.getXmouse(this,null);
				}
				,}
			);
			Object.defineProperty(tab[i],"_ymouse",{
				get:function(){
					return WvTree.getYmouse(this,null);
				}
				,}
			);
		}
	};
	WvTree.buildChildrenSafari=function(tab){
		this.wvHideTree=WvTree.hideWvTreeGroup;
		var nb=tab.length;
		if(this.wvPieces==null)this.wvPieces=[];
		for(var i=0;i<nb;i++){
			this.wvPieces[i]=this["car"+i]=tab[i];
			tab[i].funcSetTransFormPh=WvAnim.setTransFormSafari;
			tab[i].funcSetOpacity=WvAnim.setOpacitySafari;
			tab[i].wvShowTree=function(){
				this.wvIsVisible=true;
			}
			;
			tab[i].wvHideTree=WvTree.hideWvTreeFace;
			tab[i].wvFrameSetMovement=function(){
			}
			;
			WvTree.debugDefineProperty(tab[i]);
			Object.defineProperty(this.tab[i],"_name",{
				get:function(){
					return this.id;
				}
				,set:function(name_){
					this.id=name_;
				}
			}
			);
			Object.defineProperty(tab[i],"_x",{
				get:function(){
					return this._xPh=parseFloat(this.style.left)+this.xTranslate;
				}
				,set:function(x_){
					this.xTranslatePx=String(this.xTranslate=x_-parseFloat(this.style.left))+"px";
					this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
					this._xOld=x_+"px";
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_y",{
				get:function(){
					return this._yPh=parseFloat(this.style.top)+this.yTranslate;
				}
				,set:function(y_){
					this.yTranslatePx=String(this.yTranslate=y_-parseFloat(this.style.top))+"px";
					this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
					this._yOld=y_+"px";
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_xscale",{
				get:function(){
					if(this._xscalePh==null)this._xscalePh=1;
					return this._xscalePh*SCALE100;
				}
				,set:function(x_){
					this._xscalePh=x_/SCALE100;
					this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh0,this.xTranslatePx,this.yTranslatePx);
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_yscale",{
				get:function(){
					if(this._yscalePh==null)this._yscalePh=1;
					return this._yscalePh*SCALE100;
				}
				,set:function(y_){
					this._yscalePh=y_/SCALE100;
					this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_rotation",{
				get:function(){
					if(this._rotationPh==null)this._rotationPh=0;
					return this._rotationPh;
				}
				,set:function(r_){
					this._rotationPh=r_;
					this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_visible",{
				get:function(){
					return this.style.visibility=="visible";
				}
				,set:function(v_){
					if(v_){
						this.wvIsVisibleProg=v_;
						this.style.visibility="visible";
					}
					else this.style.visibility="hidden";
					this.wvIsVisible=v_;
					this.wvIsVisibleProg=v_;
				}
			}
			);
			Object.defineProperty(tab[i],"_alpha",{
				get:function(){
					return(this._alphaCurr!=null)?this._alphaCurr:this._alphaCurr=100;
				}
				,set:function(alpha){
					this._alphaCurr=alpha;
					if(this.funcSetOpacity!=null)this.funcSetOpacity(this._alphaCurr/100);
					this.wvFreezeCss=true;
				}
			}
			);
			Object.defineProperty(tab[i],"_xmouse",{
				get:function(){
					return WvTree.getXmouse(this,null);
				}
				,}
			);
			Object.defineProperty(tab[i],"_ymouse",{
				get:function(){
					return WvTree.getYmouse(this,null);
				}
				,}
			);
		}
	};
	if(WvTree.isSafari){
		HTMLDivElement.prototype.buildChildren=WvTree.buildChildrenSafari;
	}
	else{
		HTMLDivElement.prototype.buildChildren=WvTree.buildChildren;
	}
	HTMLDivElement.prototype.getNextHighestDepth=function(){
		return null;
	};
	HTMLDivElement.prototype.getZMax=function(){
		if(this.wvPieces==null){
			console.error("***ERROR*** group.getZMax() : group is not a group.");
			return 0;
		}
		var nb=this.wvPieces.length;
		var p;
		var z;
		var zMax= -1000000;
		for(var i=0;i<nb;i++){
			p=this.wvPieces[i];
			if(p==null||p==this.wvPieceOnTop)continue;
			if((z=p._z)>zMax)zMax=z;
		}
		return(zMax>=0)?zMax:0;
	};
	HTMLDivElement.prototype.duplicateMovieClip=function(nameP,levelNotUsed){
		return this.wvCopy(nameP);
	};
	HTMLDivElement.prototype.wvCopy=function(nameP){
		var z=(this.wvGroupParent)?this.wvGroupParent.getZMax():10;
		var divCopy=this.cloneNode(true);
		this.parentNode.appendChild(divCopy);
		divCopy.id=nameP;
		divCopy._z=z+1;
		divCopy.style.location="absolute";
		divCopy.wvTreeInit(this);
		this.wvDisplayTree(this,"->");
		this.wvUt=WvTree.treeBuild;
		this.wvUt();
		return divCopy;
	};
	WvTree.wvBandCompletes=function(divP,prefixeP,lgLogoP,lgVisible,durationP,accelerationP){
		var nbLogosInitP=0;
		for(var i=0;i<10000;i++){
			var n=prefixeP+i;
			if(divP[n]==null){
				break;
			}
			nbLogosInitP++;
		}
		var rest=lgVisible%lgLogoP;
		var nbCopys=(rest>0)?((lgVisible-rest)/lgLogoP)+1:lgVisible/lgLogoP;
		var xNew=nbLogosInitP*lgLogoP;
		for(var i=0;i<nbCopys;i++){
			var n=prefixeP+i;
			var p=divP[n];
			if(p==null)continue;
			var pNew=p.wvCopy(prefixeP+(i+nbLogosInitP));
			pNew.style.left=""+xNew+"px";
			xNew+=lgLogoP;
		}
		WvTree.initMouseSpeed(divP,lgVisible,durationP*1000,accelerationP);
	};
	WvTree.getXmouse=function(divP,e){
		var x=divP.offsetLeft;
		while((divP=divP.parentNode)&&(divP.style)){
			x+=divP.offsetLeft;
		}
		return((e)?e.clientX:document.wvXmouse)-x;
	};
	WvTree.getYmouse=function(divP,e){
		var y=divP.offsetTop;
		while((divP=divP.parentNode)&&(divP.style)){
			y+=divP.offsetTop;
		}
		return((e)?e.clientY:document.wvYmouse)-y;
	};
	WvTree.mouseAction=function(divP,lgAreaP,duration,accelerationP,e){
		var x=divP.offsetLeft;
		var div=divP;
		while((div=div.parentNode)&&(div.style)){
			x+=div.offsetLeft;
		}
		xMouse=e.clientX-x;
		divP.style.animationPlayState='running';
		divP.style.animationPlayState='paused';
	};
	WvTree.initMouseSpeed=function(divP,lgAreaP,durationP,accelerationP){
		var mid=lgAreaP/2;
		divP.onmouseenter=function(){
			this.onmousemove=function(e){
				WvTree.mouseAction(this,lgAreaP,durationP,accelerationP,e);
			}
			;
		}
		;
		divP.onmouseleave=function(){
			this.style.animationPlayState='running';
			this.style.animationDuration=""+parseInt(durationP)+"ms";
		}
		;
	};
	HTMLDivElement.prototype.wvTreeInit=function(divModelP){
		if(divModelP==null)return;
		this.wvDivModel=(divModelP.wvDivModel||divModelP);
		if(this.wvDivModel!=null&&(this.fcUt=this.wvDivModel.wvDivOpen)!=null){
			this.fcUt();
		}
		var chsModel=divModelP.children;
		var chs=this.children;
		if(chs!=null){
			var ch;
			var chModel;
			for(var i=0,nb=chs.length;i<nb;i++){
				if((ch=chs[i])==null||(chModel=chsModel[i]).wvTreeInit==null)continue;
				ch.wvTreeInit(chModel);
			}
		}
		if(divModelP.wvDivClose!=null){
			this.fcUt=divModelP.wvDivClose;
			this.fcUt();
		}
	};
	HTMLDivElement.prototype.wvDisplayTree=function(divModelP,marginP){
		if(divModelP==null)return;
		console.log(marginP+divModelP.id);
		var chsModel=divModelP.children;
		var chs=this.children;
		if(chs!=null){
			var ch;
			var chModel;
			for(var i=0,nb=chs.length;i<nb;i++){
				if((ch=chs[i])==null||(chModel=chsModel[i]).wvDisplayTree==null)continue;
				ch.wvDisplayTree(chModel,marginP+"    ");
			}
		}
	};
	HTMLDivElement.prototype.removeMovieClip=function(){
		if(this.wvTreeInit==null)return;
		this.wvBubblePieceSuppr();
		this.parentNode.removeChild(this);
		this._parent[this.id]=null;
	};
	HTMLDivElement.prototype.createEmptyMovieClip=function(nameP,depthNotUsed){
		var z=this.getZMax();
		var divNew=document.createElement("div");
		this.appendChild(divNew);
		divNew._z=z;
		divNew.wvBuildGroup(1);
		WvFace.initTextVar(divNew);
		divNew.id=nameP;
		divNew.style.position="absolute";
		return divNew;
	};
	HTMLDivElement.prototype.testSvgDraw=function(nameP,depthNotUsed){
		var svg=document.getElementsByTagName('svg')[0];
		var newElement=document.createElementNS("http://www.w3.org/2000/svg",'path');
		newElement.setAttribute("d","M 0 0 L 10 10");
		newElement.style.stroke="#000";
		newElement.style.strokeWidth="5px";
		svg.appendChild(newElement);
	};
	HTMLDivElement.prototype.testAddImage=function(urlP){
		var img=document.createElement("img");
		img.src=urlP;
		this.appendChild(img);
		img.style.position="absolute";
		img.style.top="0px";
		img.style.left="0px";
		return img;
	};
	WvTree.WvInitCars=function(div_,styleP,visibleP){
		var tab=[];
		var num;
		var ch=div_.children;
		var nb=ch.length;
		var car;
		var id;
		for(var i=0;i<nb;i++){
			car=ch[i];
			if(car==null||(id=car.id)==null||id.indexOf("car")!=0)continue;
			num=parseInt(id.substring(3));
			if(isNaN(num)||num<0||num>5000)continue;
			tab[num]=car;
		}
		tab=WvArray.removeNull(tab);
		div_.wvCars=tab;
		var startAnimation=(div_.style.visibility=='visible');
		if(styleP!=null){
			var fontNames=styleP.fontNames;
			var fontNums=styleP.fontNums;
			var classes=styleP.classes;
			var classNb=classes.length;
			var coords=styleP.coords;
			var delays=styleP.delays;
			var st;
			nb=tab.length;
			for(var i=0,coord=0;i<nb;i++){
				car=tab[i];
				for(var cl=0;cl<classNb;cl++){
					car.classList.add(fontNames[fontNums[i]]);
				}
				st=car.style;
				st.position='absolute';
				st.top=(coords[coord++]/100). toString()+"px";
				st.left=(coords[coord++]/100). toString()+"px";
				st.animationDelay=(delays[i]/100). toString()+"s";
				st.visibility='hidden';
			}
			if(visibleP)div_.style.visibility="visible";
		}
	};
	WvTree.initApparition=function(divP,classNameP,durationP,onVisibleP){
		if(divP.wvIsVisible){
			divP.classList.add(classNameP);
			divP.style.visibility="hidden";
			divP.wvIsVisible=false;
		}
		if(onVisibleP[0]!=null)divP.wvShowTreeSingular=WvFunctions.add(onVisibleP[0],this.wvShowTreeSingular,this,"showTree");
		if(onVisibleP[1]!=null){
			divP.wvHideTreeSingular=WvFunctions.add(onVisibleP[1],this.wvHideTreeSingular,this,"hideTree");
		}
	};
	WvTree.onDelay=function(divP,actionSerialP){
		if(divP==null||actionDelayP==null)return;
		new wvSetTimeOut(divP,actionSerialP.action,actionSerialP.params,actionSerialP.delay);
	};
	WvTree.showCarsEffect=function(paramsThis,paramsFc){
		var className=paramsFc['className'];
		var car;
		var cars=this.wvCars;
		var nb=cars.length;
		for(var i=0;i<nb;i++){
			car=cars[i];
			if(car==null)continue;
			car.classList.add(className);
		}
	};
	WvTree.hideCarsEffect=function(paramsThis,paramsFc){
		var className=paramsFc['className'];
		var car;
		var cars=this.wvCars;
		var nb=cars.length;
		for(var i=0;i<nb;i++){
			car=cars[i];
			if(car==null)continue;
			car.style.visibility="hidden";
			car.wvVisibility=false;
			car.classList.remove(className);
		}
	};
	WvTree.addSubDiv=function(_div,_child){
		var children=_child.children;
		var nb=children.length;
		var child;
		for(var i=0;i<nb;i++){
			child=children[i];
			if(child==null||(Object.prototype.toString.apply(child)!='[object HTMLDivElement]'))continue;
			_div[child.id]=child;
			WvTree.addSubDiv(_div,child);
		}
	};
	HTMLDivElement.prototype.wvImagePreload=function(nbImagesP,divPreload){
		var root_=(this._root||WvTree.wvRoot);
		root_.wvDivPreload=divPreload;
		root_.wvNbImages=nbImagesP;
		if(root_.wvNbImagesLoaded==null){
			root_.wvNbImagesLoaded=0;
		}
		if(root_.wvNbImagesLoaded>=root_.wvNbImages){
			root_.play();
			WvTree.preloadOk=-1;
			return;
		}
		root_.wvPreloadInterval=setInterval(WvTree.PreloadStep,50,root_);
	};
	HTMLDivElement.prototype.wvImageLoaded=function(){
		if(WvTree.preloadOk==-1)return;
		var root_=(this._root||WvTree.wvRoot);
		if(this._root.wvNbImagesLoaded==null){
			this._root.wvNbImagesLoaded=0;
		}
		++root_.wvNbImagesLoaded;
		if(root_.wvNbImages!=null&&root_.wvNbImagesLoaded>=root_.wvNbImages){
			clearInterval(root_.wvPreloadInterval);
			WvTree.preloadOk=-1;
			root_.play();
		}
	};
	WvTree.PreloadStep=function(rootP){
		if(WvTree.preloadOk==-1)return;
		var val=rootP.wvNbImagesLoaded;
		var valMax=rootP.wvNbImages;
		if(rootP.preloadPos==null)rootP.preloadPos=0;
		var divPreload=rootP.wvDivPreload;
		var nbFrames=divPreload.wvFramesNb;
		var posLoadReal=Math.round(val/valMax*divPreload.wvFramesNb);
		var inc;
		if(rootP.preloadPos<posLoadReal){
			inc=Math.round((posLoadReal-rootP.preloadPos)/5);
		}
		else{
			var posLoadRealNext=Math.round((val+1)/valMax*divPreload.wvFramesNb);
			if(rootP.preloadPos<posLoadRealNext)inc=1;
			else return;
		}
		rootP.preloadPos+=(inc>0)?inc:1;
		divPreload.gotoAndStop(rootP.preloadPos);
		divPreload.preload.innerText=""+Math.round(rootP.preloadPos/nbFrames*100)+"%";
	};
	WvTree.defineVarText=function(divVarP,varNameP,divTextP){
		if(divVarP==null){
			alert("div-of-stockage for variable-text '"+varName+"' is unknown");
		}
		if(divTextP==null){
			alert("div of variable-text '"+varName+"' is unknown");
		}
		if(divTextP.children==null||divTextP.children.value==null||divTextP.children.value.value==null){
			divTextP=document.wvDivCurr;
			if(divTextP==null||divTextP.children==null||divTextP.children.value==null||divTextP.children.value.value==null){
				var id=(divTextP)?divTextP.id:"<null>";
				console.log("defineInputText("+id+") *** is not a text-input");
				if(divTextP==null)return;
				Object.defineProperty(divTextP,"_text",{
					get:function(){
						return "***error***";
					}
					,set:function(valueP){
						console.log("not-input");
					}
				}
				);
				Object.defineProperty(divTextP,"text",{
					get:function(){
						return "***error***";
					}
					,set:function(valueP){
						console.log("not-input");
					}
				}
				);
				return;
			}
		}
		if(divVarP.wvInputs_==null){
			var textAreas=divVarP.wvInputs_=new WvObject();
			var textsValue=divVarP.vwInputsValue_=new WvObject();
		}
		else{
			var textAreas=divVarP.wvInputs_;
			var textsValue=divVarP.vwInputsValue_;
		}
		if(textAreas[varNameP]==null){
			textAreas[varNameP]=[];
			textAreas[varNameP][0]=divTextP.children.value;
			textsValue[varNameP]=divTextP.children.value.value;
			Object.defineProperty(divVarP,varNameP,{
				get:function(){
					return divVarP.vwInputsValue_[varNameP];
				}
				,set:function(valueP){
					var textsValue=divVarP.vwInputsValue_;
					var textAreas=divVarP.wvInputs_;
					var textAreasOfVar=textAreas[varNameP];
					if(valueP==textsValue[varNameP])return;
					textsValue[varNameP]=valueP;
					var nb=textAreasOfVar.length;
					for(var i=0;i<nb;i++){
						textArea_=textAreasOfVar[i];
						if(textArea_==null||textArea_.value==valueP)continue;
						textArea_.value=valueP;
					}
				}
			}
			);
		}
		else{
			var textAreasOfVar=textAreas[varNameP];
			var valueP=textsValue[varNameP];
			var textArea_=divTextP.children.value;
			var nb=textAreasOfVar.length;
			for(var i=0;i<nb;i++){
				if(textAreasOfVar[i]===textArea_){
					WvTree.initText(divTextP);
					return;
				}
			}
			textAreasOfVar[nb]=textArea_;
			if(textArea_.value==valueP){
				WvTree.initText(divTextP);
				return;
			}
			valueP=textArea_.value;
			textsValue[varNameP]=valueP;
			var nb=textAreasOfVar.length;
			for(var i=0;i<nb;i++){
				textArea_=textAreasOfVar[i];
				if(textArea_==null||textArea_.value==valueP)continue;
				textArea_.value=valueP;
			}
		}
		Object.defineProperty(divTextP,"_text",{
			get:function(){
				return this.children.value.value;
			}
			,set:function(valueP){
				if(this.children.value.value==valueP)return;
				this.children.value.value=valueP;
			}
		}
		);
		Object.defineProperty(divTextP,"text",{
			get:function(){
				return this.children.value.value;
			}
			,set:function(valueP){
				if(this.children.value.value==valueP)return;
				this.children.value.value=valueP;
			}
		}
		);
		WvTree.initText(divTextP);
	};
	WvTree.initText=function(divTextP){
		divTextP.wvShowTreeMaster=divTextP.wvShowTree;
		divTextP.wvShowTree=function(){
			this.wvShowTreeMaster();
			this.children.value.style.visibility="visible";
		};
		divTextP.wvHideTreeMaster=divTextP.wvHideTree;
		divTextP.wvHideTree=function(){
			this.wvHideTreeMaster();
			this.children.value.style.visibility="hidden";
		};
		var pText=divTextP.children.value;
		pText.style.cursor="text";
		if(pText._group==null)pText._group=divTextP;
		if(pText._root==null)pText._root=divTextP._root;
	};
	WvTree.defineInputText=function(divTextP){
		if(divTextP==null||divTextP.children==null||divTextP.children.value==null||divTextP.children.value.value==null){
			divTextP=document.wvDivCurr;
			if(divTextP==null||divTextP.children==null||divTextP.children.value==null||divTextP.children.value.value==null){
				var id=(divTextP)?divTextP.id:"<null>";
				console.log("defineInputText("+id+") *** is not a text-input");
				if(divTextP==null)return;
				Object.defineProperty(divTextP,"_text",{
					get:function(){
						return "***error***";
					}
					,set:function(valueP){
						console.log("not-input");
					}
				}
				);
				Object.defineProperty(divTextP,"text",{
					get:function(){
						return "***error***";
					}
					,set:function(valueP){
						console.log("not-input");
					}
				}
				);
				return;
			}
		}
		Object.defineProperty(divTextP,"_text",{
			get:function(){
				return this.children.value.value;
			}
			,set:function(valueP){
				if(this.children.value.value==valueP)return;
				this.children.value.value=valueP;
			}
		}
		);
		Object.defineProperty(divTextP,"text",{
			get:function(){
				return this.children.value.value;
			}
			,set:function(valueP){
				if(this.children.value.value==valueP)return;
				this.children.value.value=valueP;
			}
		}
		);
		WvTree.initText(divTextP);
	};
	WvTree.setVar=function(varValueP,varNameP,groupP){
		if(groupP==null)return null;
		if(groupP.wvVars==null)groupP.wvVars=[];
		groupP.wvVars[varNameP]=varValueP;
		return true;
	};
	WvTree.getVar=function(varNameP,groupP){
		if(groupP==null||groupP.wvVars==null)return null;
		return groupP.wvVars[varNameP];
	};
	WvTree.getVars=function(groupP){
		if(groupP==null)return null;
		if(groupP.wvVars==null)groupP.wvVars=[];
		return groupP.wvVars;
	};
	function WvNull(){
		this.id="<null>";
	};
	WvTree.setTimeOut=function(_divP,fcP){
		var div_=fcP.groupPlay;
		setTimeout(function(div_){
			div_.play();
		}
		,fcP.timeOut,div_);
	};
	WvTree.space3D=function(div_,x,y,z){
		div_.style.perspective=""+z+"px";
		div_.style.transformStyle="preserve-3d";
		div_.style.perspectiveOrigin=" "+x+"% "+y+"%";
		div_.style.WebkitPerspective=""+z+"px";
		div_.style.WebkitTransformStyle="preserve-3d";
		div_.style.WebkitPerspectiveOrigin=" "+x+"% "+y+"%";
	};
	WvNull.null=new WvNull();
	function WvMouseEventList(orgP,funcP,nextP,funcSysP){
		this.func=funcP;
		this.org=orgP;
		this.funcSys=funcSysP;
		this.next=nextP;
	};
	WvMouseEventList.prototype.exec=function(e){
		if(this.func){
			this.org.fc=this.func;
			this.org.fc(e);
		}
		if(this.next)this.next.exec(e);
	};
	WvTree.isDuplicatedRandom2D=false;
	WvTree.duplicateRandom2D_3=function(nbP,divP,divGroupP,divAnimP,scaleInitP,skewXP,swingP,class0P,class1P,class2P,flagRotateP,flagToTopP){
		if(WvTree.isDuplicatedRandom2D)return;
		WvTree.isDuplicatedRandom2D=true;
		var divAnim1=divAnimP.wvCopy(divAnimP.id.wvGetPrefixe()+"a0");
		var divAnim2=divAnimP.wvCopy(divAnimP.id.wvGetPrefixe()+"b0");
		WvTree.duplicateRandom2D(nbP,divP,divGroupP,divAnimP,scaleInitP,skewXP,swingP,flagRotateP,flagToTopP);
		var flagMulti=Array.isArray(divP);
		var da=divAnim1;
		if(flagMulti){
			var model=[];
			var nbModels=divP.length;
			var scUt=scaleInitP;
			scaleInitP=[];
			for(var i=0;i<nbModels;i++){
				model.push(da.gr0a[divP[i].id]);
				scaleInitP[i]=scUt[i]/2;
			}
		}
		else{
			var model=da.gr0a[divP.id];
			scaleInitP=scaleInitP/2;
		}
		WvTree.duplicateRandom2D(nbP*2,model,da.gr0a,da,scaleInitP,skewXP,swingP/2,flagRotateP,flagToTopP);
		var da=divAnim2;
		if(flagMulti){
			var model=[];
			var nbModels=divP.length;
			var scUt=scaleInitP;
			scaleInitP=[];
			for(var i=0;i<nbModels;i++){
				model.push(da.gr0a[divP[i].id]);
				scaleInitP[i]=scUt[i]*2/3;
			}
		}
		else{
			var model=da.gr0a[divP.id];
			scaleInitP=scaleInitP*2/3}
		WvTree.duplicateRandom2D(nbP*3/2,model,da.gr0a,da,scaleInitP,skewXP,swingP*2/3,flagRotateP,flagToTopP);
		divAnimP.style.zIndex=2;
		divAnim1.style.zIndex=1;
		divAnim2.style.zIndex=0;
		divAnimP.classList.add(class0P);
		divAnimP.style.animationPlayState="running";
		divAnimP.style.webkitAnimationPlayState="running";
		divAnim1.classList.add(class1P);
		divAnim1.style.animationPlayState="running";
		divAnim1.style.webkitAnimationPlayState="running";
		divAnim2.classList.add(class2P);
		divAnim2.style.animationPlayState="running";
		divAnim2.style.webkitAnimationPlayState="running";
		WvTree.isDuplicatedRandom2D=false;
	};
	WvTree.duplicateRandom2D=function(nbP,divP,divGroupP,divAnimP,scaleInitP,skewXP,swingP,flagRotateP,flagToTopP){
		if(divP==null||divGroupP==null)return;
		if(flagRotateP==null)flagRotateP=true;
		divGroupP.style.width=""+(parseInt(divGroupP.style.width)+2*skewXP+2*swingP)+"px";
		divGroupP._x=-(skewXP)-swingP;
		divGroupP._y=0;
		if(Array.isArray(divP)){
			WvTree.duplicateMulti(divP,WvTree.random2D(nbP,divGroupP._width,divGroupP._height,scaleInitP,flagRotateP,flagToTopP),flagToTopP);
		}
		else{
			WvTree.duplicate(divP,WvTree.random2D(nbP,divGroupP._width,divGroupP._height,scaleInitP,flagRotateP,flagToTopP),flagToTopP);
		}
		var index=divGroupP.id.wvGetIndex(-1);
		var div=divGroupP.wvCopy(divGroupP.id.wvGetPrefixe()+(++index));
		div._x= -(2*skewXP)-swingP;
		div._y= -divGroupP._height;
		div.style.animationDelay=""+(Math.random()*10)+"s";
	};
	WvTree.random2D=function(nbP,lgP,htP,scaleInitP,flagRotateP,flagToTopP){
		if(lgP==null||lgP==null)return null;
		var coords=[];
		if(!Array.isArray(scaleInitP)){
			scaleInitP=[scaleInitP];
			var nbInits=1;
		}
		else{
			var nbInits=scaleInitP.length;
		}
		var numInit=0;
		for(var i=0;i<nbP;i++){
			var angle=(flagRotateP)?Math.random()*361:0;
			coords[i]=[Math.floor(Math.random()*(lgP+1)),Math.floor(Math.random()*(htP+1)),(flagToTopP)?angle+180:angle,parseInt(100*(Math.random()+0.5)*scaleInitP[numInit++])/100];
			if(numInit>=nbInits)numInit=0;
		}
		return coords;
	};
	WvTree.duplicate=function(divP,coordsP,flagToTopP){
		if(coordsP==null)return;
		nb=coordsP.length;
		divP._x=0;
		divP._y=0;
		var prefixe=divP.id.wvGetPrefixe();
		var index=divP.id.wvGetIndex(-1);
		for(var i=1;i<nb;i++){
			var div=divP.wvCopy(prefixe+(++index));
			var sc=(coordsP[i][3]>=1)?1:coordsP[i][3];
			div.style.transform="translate("+coordsP[i][0]+"px, "+coordsP[i][1]+"px) scale("+sc+","+sc+") rotate("+coordsP[i][2]+"deg)";
		}
		divP._x=coordsP[0][0];
		divP._y=coordsP[0][1];
		if(flagToTopP)divP._rotation=180;
	};
	WvTree.duplicateMulti=function(divP,coordsP,flagToTopP){
		if(coordsP==null)return;
		var nbModels=divP.length;
		nb=coordsP.length;
		var prefixe=divP[0]. id.wvGetPrefixe();
		var index=divP[0]. id.wvGetIndex(-1);
		if(flagToTopP){
			for(var i=0;i<nbModels;i++){
				var div=divP[i];
				div._rotation=180;
				div._x=0;
				div._y=0;
			}
		}
		var numModel=0;
		for(var i=nbModels;i<nb;i++){
			var div=divP[numModel++]. wvCopy(prefixe+"_fl_"+(++index));
			var sc=(coordsP[i][3]>=1)?1:coordsP[i][3];
			div.style.transform="translate("+coordsP[i][0]+"px, "+coordsP[i][1]+"px) scale("+sc+","+sc+") rotate("+coordsP[i][2]+"deg)";
			if(numModel>=nbModels)numModel=0;
		}
		for(var i=0;i<nbModels;i++){
			var div=divP[i];
			div._x=coordsP[i][0];
			div._y=coordsP[i][1];
		}
	};
	WvTree.classList=function(div_,name,flagTransform,flagOpacity,flagZindex){
		if(div_.wvAnimClassNameCurr){
			div_.classList.replace(div_.wvAnimClassNameCurr,name);
			div_.wvAnimClassNameCurr=name;
			return;
		}
		if(flagTransform)div_.style.transform=null;
		if(flagOpacity)div_.style.opacity=null;
		if(flagZindex)div_.style.zIndex=null;
		if(div_.flagAnimNull!=null){
			if(div_.flagAnimNull[0])div_.style.transform=null;
			if(div_.flagAnimNull[1])div_.style.opacity=null;
			if(div_.flagAnimNull[2])div_.style.zIndex=null;
		}
		div_.classList.add(div_.wvAnimClassNameCurr=name);
	};
	WvObject.imageCropReplace=function(urlP,imageP){
		var monImageJS=new Image;
		monImageJS.onload=function(){
			imageP.children.w_value.src=monImageJS.src;
			WvObject.imageCrop(imageP);
		};
		monImageJS.src=urlP;
	};
	WvObject.imageCrop=function(imageP){
		var im=imageP.children.w_value;
		if(im==null){
			setTimer(WvObject.imageCrop,100,imageP);
			return;
		}
		var areaProport=parseFloat(imageP.style.width)/parseFloat(imageP.style.height);
		var imProport=parseFloat(im.naturalWidth)/parseFloat(im.naturalHeight);
		var adjuster=(areaProport>imProport)?"imgadjustv":"imgadjusth";
		if(!im.classList.contains("wvcenter"))im.classList.add("wvcenter");
		im.classList.remove("imgadjustv");
		im.classList.remove("imgadjusth");
		im.classList.add(adjuster);
	};
	WvObject.imageCropInfo=function(imageP){
		alert("voir console");
		console.log("Ajuste une image dans une zone\n"+"Au préalable il faut créer les CSS :\n"+".imgadjusth{max-width: 100%;height: auto;}\n"+".imgadjustv{max-height: 100%;width: auto;}\n"+".wvcenter{margin: auto;}");
	};
	WvType.transformer=function(nbStates){
		var wvf=new WvTransformer(nbStates,this);
		return wvf._div;
	};
	WvType.groupState=function(nbFrames){
		var wvf=new WvGroupState(nbFrames,this);
		return wvf._div;
	};
	WvType.state=function(){
		var wvf=new WvState(this);
		return wvf._div;
	};
	WvTree.pieceLinkGroup=function(){
		this._div.wvGroup=(this.wvStatesNb!=null)?this._div:this._div.parentNode.wvGroup;
		this._div.wvGroup.groupLinkPieceChild(this._div);
	};
	HTMLDivElement.prototype.wvBuildTransformer=function(nbStates){
		new WvTransformer(nbStates,this);
	};
	HTMLDivElement.prototype.wvBuildGroupState=function(nbFrames){
		new WvGroupState(nbFrames,this);
	};
	HTMLDivElement.prototype.wvBuildState=function(){
		new WvState(this);
	};
	HTMLDivElement.prototype.wvStateGet=function(numStateP){
		if(this.wvStates==null)return null;
		if(this.wvStates._root!=null){
			return(numStateP!=null)?this.wvStates:null;
		}
		if(this.wvStates==null){
			var states=[];
			for(i=0;i<this.wvStatesNb;i++){
				states[i]=this["f__"+i];
			}
			this.wvStates=states;
		}
		return this.wvStates[numStateP];
	};
	function WvTransformer(nbStates,div_){
		var _div=this._div=div_;
		_div.wvIsPiece=true;
		_div.wvIsFace=false;
		_div.wvIsGroup=false;
		_div.wvIsTransformer=true;
		_div.wvIsState=false;
		this.initPieceProperties();
		WvTransformer.initProperties(div_);
		if(nbStates===true)nbStates=2;
		this.init=WvTree.linkInit;
		this.init(div_);
		_div.wvStatesNb=(nbStates!=null)?nbStates:null;
		if(_div.id=="pages_")_div.wvGroupParent.wvFreeze=_div.wvGroupParent.wvFrozen=true;
		if(_div.wvIsVisible){
			_div.wvStateCurrent=0;
			_div.wvFrameCurrent=0;
		}
		if(nbStates!=null){
			_div.wvSetStates(nbStates);
			_div.wvStates=[];
			for(var i=0;i<nbStates;i++){
				_div.wvStates[i]=_div.wvPiece["f__"+i];
			}
		}
		else{
			_div.wvStates=null;
		}
		_div.__wvIdDebug=((_div.wvPiece._parent!=null)?_div.wvPiece._parent.id:"/")+'/'+_div.wvPiece.id+'/'+_div.id;
	};
	WvTransformer.init=function(_div){
		_div._goto_=_div._wvDisplayState_;
		_div.gotoPage=_div.wvDisplayState;
		if(_div.wvFaces==null){
			_div.wvFaceName=(_div.page0!=null)?"page":"f__";
			_div.wvFaces=[];
			var f;
			for(var i=0;(f=_div[_div.wvFaceName+i])!=null;i++){
				_div.wvFaces.push(f);
			}
		}
		if(_div.wvStatesNb==null)_div.wvStatesNb=_div.wvFaces.length;
	};
	WvTransformer.prototype.linkPiece=function(){
		this._div.wvPiece=this._div;
	};
	WvTransformer.prototype.wvXXX_2_DivParent=WvTree.wvXXX_2_DivParent;
	WvTransformer.prototype.LinkGroup=WvTree.pieceLinkGroup;
	WvTransformer.prototype.linkGroupParent=WvTree.linkGroupParent;
	WvTransformer.prototype.linkPieceParent=WvTree.pieceLinkPieceParent;
	WvTransformer.prototype.linkRoot=WvTree.linkRoot;
	WvTransformer.prototype.initPieceProperties=WvTree.initPieceProperties;
	WvTransformer.prototype.showHide=function(_div){
		this._div.wvShowTree=WvTransformer.wvShowTreeInit;
		this._div.wvHideTree=WvTransformer.wvHideTreeInit;
	};
	WvTransformer.getText=function(txt){
		var divText=(this.wvStateCurrent!=null)?this["f__"+this.wvStateCurrent]:this.f__0;
		return divText.innerText;
	};
	WvTransformer.setText=function(txt){
		var divText=(this.wvStateCurrent!=null)?this["f__"+this.wvStateCurrent]:this.f__0;
		divText.innerText=txt;
		if(divText.wvVarText!=null){
			var divs=divText.wvVarText.divs;
			var nb=divs.length;
			for(var i=0;i<nb;i++)divs[i].innerText=txt;
		}
	};
	WvTransformer.initProperties=function(divTransform){
		Object.defineProperty(divTransform,"text",{
			get:WvTransformer.getText,set:WvTransformer.setText}
		);
		Object.defineProperty(divTransform,"_text",{
			get:WvTransformer.getText,set:WvTransformer.setText}
		);
	};
	WvTransformer.wvGetStateCurr=function(){
		if(this.wvStateCurrent==null)this.wvStateCurrent=0;
		try{
			return this.wvStates[this.wvStateCurrent];
		}
		catch(e){
			console.error("***ERROR*** div["+this.id+"].wvShowTree() - wvStates/"+this.wvStates+"/["+this.wvStateCurrent+"] unknown\n");
			return null;
		}
	};
	WvTransformer.wvGetStateTracks=function(){
		if(this.wvStateCurrent==null)this.wvStateCurrent=this.wvTracks[0][0];
		try{
			return(this.wvStateCurrent!=null)?this.wvStates[this.wvStateCurrent]:null;
		}
		catch(e){
			console.error("***ERROR*** div["+this.id+"].wvShowTree() - wvStates/"+this.wvStates+"/["+this.wvStateCurrent+"] unknown\n");
			return null;
		}
	};
	WvTransformer.wvGetStateLimits=function(){
		var numFrame=this.wvFrameGroup;
		if(numFrame==null){
			if(this.wvIsGroup)return null;
			numFrame=this.wvGroup.wvFrameGroup;
		}
		return(numFrame>=this.wvFrameVisibleStart&&numFrame<this.wvFrameVisibleEnd)?this.f__0:null;
	};
	WvTransformer.wvShowTreeInit=function(){
		if(!this.wvIsVisibleProg)return;
		this.wvGetState=(this.wvTracks!=null&&this.wvTracks[0]!=null)?WvTransformer.wvGetStateTracks:((this.wvFrameVisibleStart!=null)?WvTransformer.wvGetStateLimits:WvTransformer.wvGetStateCurr);
		;
		if(this.wvStates==null){
			this.wvUt=WvTransformer.buildStates;
			this.wvUt();
		}
		if(this.id=="page_saut_auto"){
			alert_("'page_saut_auto' init wvFaceAt0");
		}
		if(this.wvTracks!=null&&this.wvTracks[0]!=null){
			this.wvFaceAt_0=(this.wvTracks[0][0]!=null);
		}
		else{
			if(this.wvFrameVisibleStart!=null){
				this.wvFaceAt_0=(this.wvFrameVisibleStart==0);
			}
			else{
				this.wvFaceAt_0=true;
			}
		}
		this.wvStateCurrent=(this.wvFaceAt_0)?0:null;
		this.wvShowTree=function(){
			var state=this.wvGetState();
			if(!this.wvIsVisible){
				this.style.visibility="visible";
				this.wvIsVisible=true;
				if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
				if(this.onWvVisible!=null)this.onWvVisible();
			}
			else{
				if(state==null||state.wvIsVisible)return;
			}
			if(this.wvStates!=null&&this.wvStates.wvShowTree!=null){
				if(this.wvStates!=this)this.wvStates.wvShowTree();
				else console.error("***ERROR*** div["+this.id+"].wvShowTree() - wvStates/"+this.wvStates.id+"/ is same div\n");
				return;
			}
			if(state==null){
				return;
			}
			state.wvShowTree();
		}
		;
		this.wvShowTree();
	};
	HTMLDivElement.prototype.wvShowTreeState=function(state){
		if(!this.wvIsVisible){
			this.style.visibility="visible";
			this.wvIsVisible=true;
		}
		else{
			if(state==null||state.wvIsVisible)return;
		}
		if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
		if(this.onWvVisible!=null)this.onWvVisible();
		if(this.wvStates!=null&&this.wvStates.wvShowTree!=null){
			if(this.wvStates!=this)this.wvStates.wvShowTree();
			else console.error("***ERROR*** div["+this.id+"].wvShowTree() - wvStates/"+this.wvStates.id+"/ is same div\n");
			return;
		}
		if(state==null){
			return;
		}
		state.wvShowTree();
	};
	WvTransformer.buildStates=function(_div,numState){
		if(this.wvStates!=null||this.f__0==null)return null;
		this.wvStates=[];
		var i=-1;
		var state;
		while((state=this['f__'+(++i)])!=null){
			this.wvStates[i]=state;
		}
		this.wvStatesNb=i;
		try{
			return this.wvStates[numState];
		}
		catch(e){
			return null;
		}
	};
	WvTransformer.addState=function(transformer,_div){
		if(transformer.wvStates==null)transformer.wvStates=[];
		var name=_div.id;
		if(name.indexOf("f__")!=0){
			transformer.wvStates=null;
			return;
		}
		var index=parseInt(name.substring(3));
		if(index==null){
			transformer.wvStates=null;
			return;
		}
		transformer.wvStates[index]=_div;
		transformer.wvStatesNb=index+1;
	};
	WvTransformer.wvHideTreeInit=function(){
		this.wvHideTree=function(){
			if(!this.wvIsVisible)return;
			this.style.visibility="hidden";
			this.wvIsVisible=false;
			if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.stop(2);
			if(this.wvHideTreeSingular!=null)this.wvHideTreeSingular.exec();
			WvStream.close(this);
			var divBack=this;
			while(this.wvPageBack){
				this.wvPageBack.wvHideTree();
				this.wvPageBack=null;
			}
			this.wvFrameGroup=null;
			if(this.wvStateCurrent==null){
				if(this.f__0!=null&&this.f__0.wvIsVisible){
					this.f__0.wvHideTree();
				}
				return;
			}
			try{
				if(this.wvStates!=null)var state=this.wvStates[this.wvStateCurrent];
				else{
					this.wvUt=WvTransformer.buildStates;
					var state=this.wvUt(this,this.wvStateCurrent);
				}
			}
			catch(e){
				this.wvUt=WvTransformer.buildStates;
				var state=this.wvUt(this,this.wvStateCurrent);
			}
			if(state==null){
				console.error("***ERROR*** div["+this.id+"].wvHideTree() - wvStates/"+this.wvStates+"/["+this.wvStateCurrent+"] unknown");
				return;
			}
			this.wvStateCurrent=null;
			state.wvHideTree();
		}
		;
		this.wvHideTree();
	};
	function WvGroupState(nbFrames,div_){
		var _div=this._div=div_;
		_div.wvIsPiece=false;
		_div.wvIsFace=true;
		_div.wvIsGroup=true;
		_div.wvIsTransformer=false;
		_div.wvIsState=true;
		this.initPieceProperties();
		this.init=WvTree.linkInit;
		this.init(div_);
		_div.wvFramesNb=nbFrames;
		if(_div.wvIsVisible)_div.wvFrameGroup=0;
		_div.wvGroupParent.groupLinkGroupChild(_div);
		WvTransformer.addState(_div.wvPiece,_div);
		_div.__wvIdDebug=((_div.wvPiece._parent!=null)?_div.wvPiece._parent.id:"/")+'/'+_div.wvPiece.id+'/'+_div.id;
		var width=_div.style.width;
		if(width!=null&&width.length>0&&_div.wvOrigin==null){
			_div.wvOrigin=true;
			_div.style.transformOrigin="0px 0px";
			_div.style.webkitTransformOrigin="0px 0px";
			_div.style.mozTransformOrigin="0px 0px";
			_div.style.oTransformOrigin="0px 0px";
			_div.style.msTransformOrigin="0px 0px";
		}
	};
	WvGroupState.prototype.LinkGroup=WvTree.groupStateLinkGroup;
	WvGroupState.prototype.wvXXX_2_DivParent=WvTree.wvXXX_2_DivParent;
	WvGroupState.prototype.linkPiece=WvTree.stateLinkPiece;
	WvGroupState.prototype.linkGroupParent=WvTree.groupLinkGroupParent;
	WvGroupState.prototype.linkPieceParent=WvTree.groupLinkPieceParent;
	WvGroupState.prototype.linkRoot=WvTree.linkRoot;
	WvGroupState.prototype.initPieceProperties=WvTree.initPieceProperties;
	WvGroupState.prototype.showHide=function(_div){
		this._div.wvShowTree=WvGroupState.wvShowTreeInit;
		this._div.wvHideTree=WvGroupState.wvHideTreeInit;
	}
	;
	WvGroupState.wvShowTreeInit=function(){
		if(!this.wvIsVisibleProg)return;
		this.wvShowTree=function(){
			if(this.wvIsVisible)return;
			this.style.visibility="visible";
			this.wvIsVisible=true;
			if(this.wvShowTreeSingular!=null&&this.wvShowState!=null)this.wvShowTreeSingular.exec();
			if(this.onWvVisible!=null)this.onWvVisible();
			this.wvFrameGroup=0;
			if(this.wvPieces==null){
				if(this.wvPiece!=null&&this.wvPiece!=this){
					this.wvPiece.wvShowTree();
				}
				return;
			}
			var pieces=(this.wvPiecesVisiblesInGroup||WvTree.selectPiecesVisibles(this));
			var nbPieces=pieces.length;
			var p;
			for(var i=0;i<nbPieces;i++){
				p=pieces[i];
				if(p==null)continue;
				p.wvShowTree();
				if(p.wvFrameSetMovement)p.wvFrameSetMovement(0);
			}
		}
		;
		this.wvShowTree();
	};
	WvGroupState.wvHideTreeInit=function(){
		this.wvHideTree=function(){
			if(!this.wvIsVisible)return;
			this.style.visibility="hidden";
			this.wvIsVisible=false;
			if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.stop(2);
			if(this.wvHideTreeSingular!=null)this.wvHideTreeSingular.exec();
			if(this.wvOnHidden!=null)this.wvOnHidden();
			var pieces=this.wvPieces;
			if(pieces!=null){
				var nbPieces=pieces.length;
				var p;
				for(var i=0;i<nbPieces;i++){
					p=pieces[i];
					if(p==null)continue;
					p.wvHideTree();
				}
			}
			this.wvFrameCurrent=null;
			this.wvFrameGroup=null;
			if(!this.wvFrozen)this.wvFreeze=null;
			WvStream.close(this);
		}
		;
		this.wvHideTree();
	};
	function WvState(div_){
		var _div=this._div=div_;
		_div.wvIsPiece=false;
		_div.wvIsFace=true;
		_div.wvIsGroup=false;
		_div.wvIsTransformer=false;
		_div.wvIsState=true;
		this.initPieceProperties();
		if(_div.parentNode.id=='savant001'){
			console.log("wv_state.js/function WvState(div_) 'savant001'");
		}
		var stateStyle=_div.style;
		var transformerStyle=_div.parentNode.style;
		if(!transformerStyle.width){
			transformerStyle.width=stateStyle.width;
			transformerStyle.height=stateStyle.height;
		}
		transformerStyle.transformOrigin='center';
		stateStyle.transformOrigin='center';
		this.init=WvTree.linkInit;
		this.init(div_);
		_div.__wvIdDebug=((_div.wvPiece._parent!=null)?_div.wvPiece._parent.id:"/")+'/'+_div.wvPiece.id+'/'+_div.id;
	};
	WvState.prototype.wvXXX_2_DivParent=WvTree.wvXXX_2_DivParent;
	WvState.prototype.LinkGroup=WvTree.stateLinkGroup;
	WvState.prototype.linkPiece=WvTree.stateLinkPiece;
	WvState.prototype.linkGroupParent=WvTree.stateLinkGroupParent;
	WvState.prototype.linkPieceParent=WvTree.linkPieceParent;
	WvState.prototype.linkRoot=WvTree.linkRoot;
	WvState.prototype.initPieceProperties=WvTree.initPieceProperties;
	WvState.prototype.showHide=function(_div){
		this._div.wvShowTree=WvState.wvShowTreeInit;
		this._div.wvHideTree=WvState.wvHideTreeInit;
	}
	;
	WvState.wvShowTreeInit=function(){
		if(!this.wvIsVisibleProg)return;
		var ch=this.children.line;
		if(this.car0==null||this.car0.wvIsPiece!=null){
			this.wvShowTree=function(){
				if(this.wvIsVisible)return;
				this.style.visibility="visible";
				this.wvIsVisible=true;
				if(this.wvShowTreeSingular!=null&&this.wvShowState!=null)this.wvShowTreeSingular.exec();
				if(this.onWvVisible!=null)this.onWvVisible();
			}
			;
		}
		else{
			if(!this.wvSequences){
				this.wvShowTree=function(){
					if(this.wvIsVisible)return;
					this.style.visibility="visible";
					this.wvIsVisible=true;
					var c;
					for(var i=0;(c=this["car"+i])!=null;i++){
						c.style.visibility="visible";
						if(this.wvAnimationClass!=null)this.classList.add(this.wvAnimationClass);
						c.wvIsVisible=false;
					}
				};
			}
			else{
				this.wvShowTree=function(){
					if(this.wvIsVisible)return;
					this.wvShowTree.play();
					this.style.visibility="visible";
					this.wvIsVisible=true;
					var c;
					for(var i=0;(c=this["car"+i])!=null;i++){
						c.style.visibility="visible";
						if(this.wvAnimationClass!=null)this.classList.add(this.wvAnimationClass);
						c.wvIsVisible=false;
					}
				};
			}
		}
		this.wvShowTree();
	};
	WvState.wvHideTreeInit=function(){
		if(this.wvHideTree!=null)this.wvHideTree.next=this.wvHideTree;
		var ch=this.children.line;
		if(ch==null||ch.firstElementChild==null||ch.firstElementChild.tagName!="svg"){
			this.wvHideTree=function(){
				if(!this.wvIsVisible)return;
				this.style.visibility="hidden";
				this.wvIsVisible=false;
				WvStream.close(this);
				if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.stop(2);
				if(this.wvHideTreeSingular!=null)this.wvHideTreeSingular.exec();
				if(this.wvHideTree.next!=null)this.wvHideTree.next();
			}
			;
		}
		else{
			this.wvHideTree=function(){
				if(!this.wvIsVisible)return;
				this.style.visibility="hidden";
				this.wvIsVisible=false;
				this.children.line.style.visibility="hidden";
				WvStream.close(this);
				if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.stop(2);
				if(this.wvHideTreeSingular!=null)this.wvHideTreeSingular.exec();
				if(this.wvHideTree.next!=null)this.wvHideTree.next();
			}
			;
		}
		this.wvHideTree();
	};
	HTMLDivElement.prototype.wvClickState=function(){
		if(this.wvStateCurrent==null||this.wvStateCurrent<0||this.onWvClick==null)return;
		var pos=null;
		if(this.wvTracks!=null&&this.wvTracks[4]!=null){
			if(this.wvStateCurrent<this.wvTracks[4]. length){
				var pos=this.wvTracks[4][this.wvStateCurrent];
			}
		}
		else{
			pos=this.wvStateCurrent;
		}
		if(pos==null||pos<0||pos>=this.onWvClick.length)return;
		this.wvUt=this.onWvClick[pos];
		if(this.wvUt)this.wvUt();
	};
	HTMLDivElement.prototype.wvSearchTransformerParent=function(){
		var limit=100;
		while(div!=null&&div.wvStatesNb==null&&limit>0){
			div=div._parent;
			limit--;
		}
		if(limit<=0)return null;
		return null;
	};
	HTMLDivElement.prototype._wvDisplayState_=function(_this,numFrame){
		var numState=(this.wvTracks!=null)?this.wvTracks[0][numFrame]:((this.wvFrameVisibleStart)?((numFrame>=this.wvFrameVisibleStart&&numFrame<this.wvFrameVisibleEnd)?0:null):numFrame);
		return this.wvDisplayState(numState);
	};
	HTMLDivElement.prototype.wvDisplayState=function(numState){
		if(numState==this.wvStateCurrent)return(numState!=null)?this:false;
		if(numState==null){
			if(this.wvIsVisible){
				if(this.wvStates!=null&&this.wvStateCurrent!=null){
					this.wvStates[this.wvStateCurrent].wvHideTree();
				}
				this.wvHideTree();
			}
			return false;
		}
		if(this.wvStates==null){
			this.wvUt=WvTransformer.buildStates;
			var state=this.wvUt(this,numState);
		}
		try{
			var state=this.wvStates[numState];
		}
		catch(e){
			if(state==null){
				if(this.wvStates==null)console.error("*** ERROR div "+this.id+" this.wvStates[] extected");
				else console.error("*** ERROR div "+this.id+" / "+numState+" out of range this.wvStates["+this.wvStates.length+"]");
				if(this.wvIsVisible){
					if(this.wvStateCurrent!=null&&this.wvStates!=null)this.wvStates[this.wvStateCurrent].wvHideTree();
					this.wvHideTree();
				}
				return false;
			}
		}
		if(state==null){
			if(this["f__"+numState]!=null){
				this.wvStates=null;
				this.wvUt=WvTransformer.buildStates;
				var state=this.wvUt(this,numState);
			}
			else{
				console.error("*** ERROR div "+this.id+".wvStates["+numState+"] est à null");
				if(this.wvIsVisible){
					if(this.wvStateCurrent!=null){
						this.wvStates[this.wvStateCurrent].wvHideTree();
					}
					this.wvHideTree();
				}
				return false;
			}
		}
		if(!this.wvIsVisible){
			this.style.visibility="visible";
			this.wvIsVisible=true;
			if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
			if(this.onWvVisible!=null)this.onWvVisible();
		}
		if(this.wvOldState!=null&&this.wvOldState==state&&this.wvOldState.wvIsVisible){
			this.wvOldState=null;
			this.wvStates[this.wvStateCurrent].wvHideTree();
			console.log("wvOldState "+state.id+"  "+state.wvIsVisible);
			this.wvStateCurrent=numState;
			return;
		}
		this.wvOldState=this.wvStateCurrent;
		this.wvStateCurrent=numState;
		state.wvShowTree();
		WvTransformer.copyPieces(state.wvPieces,this);
		if(this.wvOldState!==null&&(this.wvOldState=this.wvStates[this.wvOldState])!=null&&this.wvNotHidePrevious==null){
			this.wvOldState.wvHideTree();
		}
		return this;
	};
	WvTransformer.copyPieces=function(pieceTabP,pieceDestP){
		if(pieceTabP==null||pieceDestP==null)return;
		var nb=pieceTabP.length;
		var p;
		for(var i=0;i<nb;i++){
			if((p=pieceTabP[i])==null)continue;
			pieceDestP[p.id]=p;
		}
	};
	HTMLDivElement.prototype.wvGroupState=function(numFrameP){
		if(this.wvFrameGroup!=null&&this.wvFrameGroup==numFrameP)return;
		this.wvFrameGroup=numFrameP;
		if(this.wvIsTransformer){
			this.wvGotoFrame(this.wvFrameGroup);
		}
		else{
			var pcs=this.wvPieces;
			if(pcs!=null){
				var p;
				var lg=pcs.length;
				if(this.wvPiecesNiv1==null){
					this.wvPiecesNiv1=[];
					for(var i=0;i<lg;i++){
						p=pcs[i];
						if(p!=null)this.wvPiecesNiv1[i]=(p.id.indexOf("f__")!=0);
					}
				}
				for(var i=0;i<lg;i++){
					p=pcs[i];
					if(p!=null&&this.wvPiecesNiv1[i])p.wvGotoFrame(this.wvFrameGroup);
				}
			}
		}
	};
	HTMLDivElement.prototype.wvSetStates=function(statesNb,stateDefault){
		this.wvStatesNb=statesNb;
		this.wvStateDefault=(stateDefault!=null)?stateDefault:0;
		this.wvStateCurrent=this.wvStateDefault;
	};
	WvState.gotoPageClic=function(numPageP,_this){
		_this._parent._goto_(null,numPageP);
		document.body.scrollTop='0px';
		document.body.scrollLeft='0px';
	};
	WvState.gotoPage=function(numPageP,_this){
		if(_this._goto_==null){
			if(_this.f__0==null)return;
			WvTransformer.init(_this);
		}
		_this._goto_(null,numPageP);
		document.body.scrollTop='0px';
		document.body.scrollLeft='0px';
	};
	WvState.gotoPageNext=function(_this,albumP){
		var stateNew=(albumP||_this.wvParent("pages_").wvPiece).jumpFrame(1,true);
		document.body.scrollTop='0px';
		document.body.scrollLeft='0px';
		return stateNew;
	};
	WvState.gotoPagePrevious=function(_this,albumP){
		(albumP||_this.wvParent("pages_").wvPiece).jumpFrame(-1,true);
		document.body.scrollTop='0px';
		document.body.scrollLeft='0px';
	};
	WvState.gotoSubPage=function(numPage,pagesName,this_){
		WvState.gotoPage(numPage,this_._parent[pagesName].pages_);
	};
	WvTree.setStates=function(statesNb,stateDefault){
		_div.wvSetStates(statesNb,stateDefault);
	}
	;
	WvGroup.prototype.setStates=WvTree.setStates;
	WvGroupState.prototype.setStates=WvTree.setStates;
	WvState.setAxis=function(divP,xOrgP,yOrgP){
		divP.style.transformOrigin=xOrgP+"px "+yOrgP+"px";
		return;
	}
	;
	function WvDiapo(this_,cssP,delayP,fcNextP,widthP,heightP,originP){
		this_.style.width=widthP;
		this_.style.height=heightP;
		this_.wvOrigin=true;
		this_.style.transformOrigin=originP;
		this.fcNext=(fcNextP!=null)?fcNextP:WvDiapo.setTimeOut;
		this_.wvDiapo=this;
		this.diapoDiv=this_;
		this.delay=(delayP>=0)?delayP:-delayP;
		this.css=cssP;
		if(this_.wvFramesNb<2){
			this_.play=WvDiapo.nextPage;
		}
		if(delayP>=0)this.transition=new WvTransition(this_,cssP,this,"Il fait beau");
		WvDiapo.hide=function(divP){
			this.diapoDiv.play();
		};
	}
	;
	WvDiapo.prototype.newTransition=function(){
		this.transition=new WvTransition(this_,this.css,this,"Il fait beau");
	};
	WvDiapo.prototype.transitionStarted=function(){
		this.transitionClosed();
	};
	WvDiapo.prototype.transitionClosed=function(){
		if(this.timer)clearTimeout(this.timer);
		this.timer=null;
		this.diapoDiv.wvOnStop=null;
	}
	;
	WvDiapo.get=function(diapos){
		return diapos.diapos.pages_["f__"+diapos.diapos.pages_.wvStateCurrent];
	};
	WvDiapo.prototype.transitionEnded=function(){
		if(!this.diapoDiv.wvIsVisible)return;
		this.fcNext();
	}
	;
	WvDiapo.nextNoAction=function(){
	};
	WvDiapo.nextPlay=function(){
		this.diapoDiv.play();
	};
	WvDiapo.nextTransitionOut=function(){
		var cssOut=(tr.cssEffect.indexOf("_effect"))?cssOut=tr.css+"out":cssOut=tr.cssEffect+"out";
		var div_=this.diapoDiv;
		var tr=div_.transition;
		if(!tr.cssOut){
			this.diapoDiv.play();
			return;
		}
		div_.classList.add(tr.css);
		if(tr.isAnimation)div_.addEventListener("animationend",WvDiapo.hide);
		else div_.addEventListener("transitionend",WvDiapo.hide);
	};
	WvDiapo.nextPage=function(){
		var div_=(this.wvDiapo!=null)?this:WvDiapo.page(true,this);
		if(div_==null||div_.wvDiapo==null)console.error("div des pages diapos est introuvable depuis : "+this.id);
		if(WvDiapo.isInTransition(div_)!=null)return;
		WvDiapo.endTimeOut(div_.wvDiapo,1);
	};
	WvDiapo.previousPage=function(){
		var div_=(this.wvDiapo!=null)?this:WvDiapo.page(true,this);
		if(div_==null||div_.wvDiapo==null)console.error("div des pages diapos est introuvable depuis : "+this.id);
		if(WvDiapo.isInTransition(div_)!=null)return;
		WvDiapo.endTimeOut(div_.wvDiapo,-1);
	};
	WvDiapo.gotoPage=function(numPage){
		var div_=(this.wvDiapo!=null)?this:WvDiapo.page(true,this);
		if(div_==null||div_.wvDiapo==null)console.error("div des pages diapos est introuvable depuis : "+this.id);
		var diapoP=div_.wvDiapo;
		WvDiapo.closeTimeOut(diapoP);
		var p;
		if(diapoP==null||diapoP.diapoDiv==null||(p=diapoP.diapoDiv.wvParent("pages_"))==null)return;
		p._group.gotoAndStop((numPage!=null)?numPage:0);
	};
	WvDiapo.setTimeOut=function(){
		if(this.delay==0)return;
		if(this.timer!=null)clearTimeout(this.timer);
		this.timer=setTimeout(WvDiapo.endTimeOut,this.delay,this);
		this.diapoDiv.wvOnStop=WvDiapo.onStop;
	};
	WvDiapo.endTimeOut=function(diapoP,numPage){
		WvDiapo.closeTimeOut(diapoP);
		var p;
		if(diapoP==null||diapoP.diapoDiv==null||(p=diapoP.diapoDiv.wvParent("pages_"))==null)return;
		p._group.jumpFrame((numPage!=null)?numPage:1,true);
	}
	;
	WvDiapo.closeTimeOut=function(diapoP){
		clearTimeout(diapoP.timer);
		diapoP.timer=null;
	};
	WvDiapo.onStop=function(){
		this.wvDiapo.transitionClosed();
	}
	;
	function WvTransition(this_,cssP,listenerP,initP){
		this.listener=listenerP;
		if(Array.isArray(cssP)){
			this.isAnimation=true;
			this.cssEffect=cssP[1];
			this.cssP=cssP[0];
		}
		else{
			this.isAnimation=false;
			this.cssP=cssP;
			this.cssEffect=cssP+"_effect";
		}
		this.transitionDiv=this_;
		this_.wvTransition=this;
		this.initPos=initP;
		this.transitionStart=function(div_){
			var tr=div_.wvTransition;
			console.log(initP);
			div_.wvToTop();
			div_.wvToFreeze=true;
			div_.classList.replace(tr.cssP,tr.cssEffect);
			if(tr.isAnimation)div_.addEventListener("animationend",WvTransition.transitionEnd);
			else div_.addEventListener("transitionend",WvTransition.transitionEnd);
			div_.wvOnTranstionEnd=WvTransition.transitionEnd;
			var l=div_.wvTransition.listener;
			if(l&&l.transitionStarted)l.transitionStarted();
		};
		this_.onWvVisible=function(){
			this.wvTransition.hideOther();
			this.wvTransition.transitionStart(this_);
		};
		WvTransition.transitionEnd=function(){
			if(this.wvTransition.isAnimation)this.removeEventListener("animationend",WvTransition.transitionEnd);
			else this.removeEventListener("transitionend",WvTransition.transitionEnd);
			this.wvOnTranstionEnd=null;
			var piece=this.wvPiece;
			try{
				var oldState;
				if((oldState=piece.wvOldState)!=null){
					oldState.wvHideTree();
					this.wvPiece.wvOldState=null;
				}
			}
			catch(e){
				console.error(e);
			}
			this.wvQuitTop();
			var l=this.wvTransition.listener;
			if(l&&l.transitionEnded)l.transitionEnded();
		}
		;
		this_.wvOnHidden=function(){
			var tr=this.wvTransition;
			if(this.wvOnTranstionEnd)this.wvOnTranstionEnd(null);
			this.classList.replace(tr.cssEffect,tr.cssP);
			this.wvQuitTop();
			if(tr.listener&&tr.listener.transitionClosed)tr.listener.transitionClosed();
		};
		if(this_.wvIsVisible)this_._root.onAnim.add(this_,this.transitionStart,"???",true,null);
	};
	WvTransition.prototype.hideOther=function(){
		var piece=this.transitionDiv.wvPiece;
		var oldStateMemo=piece.wvOldState;
		piece.wvOldState=null;
		for(var i=0;i<1000;i++){
			var f=piece["f__"+i];
			if(f==null)break;
			console.log("on visible old="+oldStateMemo);
			if(f==this.transitionDiv||i==oldStateMemo)continue;
			if(f.wvIsVisible){
				f.wvHideTree();
			}
		}
		piece.wvOldState=oldStateMemo;
	}
	;
	WvDiapo.isInTransition=function(diapo){
		var pages=(diapo.wvDiapo)?diapo:diapo.children.diapos.pages_;
		for(var i=0;true;i++){
			var page=pages["f__"+i];
			if(page==null)break;
			if(page.wvOnTranstionEnd!=null)return i;
		}
		return null;
	};
	WvDiapo.page=function(numP,diaposP){
		if(diaposP==null||diaposP.id==null){
			console.error("GetDiapo() : param #1 est le gadget diapositive");
			return null;
		}
		if(numP==null||numP<0){
			console.error("GetDiapo() : param #0 est le numéro de la diapositive,\n    il ne peut être à null\n    et doit être positif");
			return null;
		}
		if(numP===true){
			numP=WvAnim.get_currentframe(diaposP.children.diapos);
		}
		if(!Number.isInteger(numP)){
			console.error("GetDiapo() : param #0 est le numéro de la diapositive");
			return null;
		}
		return diaposP.children.diapos.pages_["f__"+numP];
	};
	WvDiapo.piece=function(numDiapoP,pieceNameP,diaposP){
		if(diaposP==null||diaposP.id==null){
			console.error("GetDiapo() : param #2 est le gadget diapositive");
			return null;
		}
		if(numDiapoP===null||numDiapoP<0){
			console.error("GetDiapo() : param #0 est le numéro POSITIF de la diapositive");
			return null;
		}
		if(numDiapoP===true){
			numDiapoP=WvAnim.get_currentframe(diaposP.children.diapos);
		}
		if(!Number.isInteger(numDiapoP)){
			console.error("GetDiapo() : param #0 est le numéro de la diapositive");
			return null;
		}
		var diapo=diaposP.children.diapos.pages_["f__"+numDiapoP];
		if(diapo==null)return null;
		return diapo.children[pieceNameP];
	};
	WvDiapo.life=function(numP,diaposP){
		var page=WvDiapo.page(numP,diaposP);
		if(page==null)return null;
		return page.wvDiapo;
	};
	WvDiapo.transition=function(numP,diaposP){
		var page=WvDiapo.page(numP,diaposP);
		if(page==null)return null;
		return page.wvTransition;
	};
	function WvStyle(){
	}
	;
	WvStyle.POS_P_IMAGE=0;
	WvStyle.POS_P_FORME=1;
	WvStyle.POS_P_COLORS=2;
	WvStyle.IS_LINEAR=0;
	WvStyle.IS_RADIAL=1;
	WvStyle.GRADIENT=["linear","radial"];
	WvStyle.POS_NB_PARAMS=[1,0];
	HTMLDivElement.prototype.wvSetStyleBackground=function(colorP,imageP,down){
		var st=this.style;
		if(imageP!=null){
			st.backgroundImage=WvStyle.getScriptImage(imageP,st);
		}
		if(colorP!=null)st.color=colorP;
		if(this.wvButtonCoords){
			this.wvButtonCoords.setTextsLocation(down||0);
		}
	};
	WvStyle.getScriptImage=function(imageP,st){
		if(!Array.isArray(imageP)){
			var pos;
			if((pos=st.backgroundImage.indexOf("linear-gradient"))>=0){
				return imageP+","+st.backgroundImage.substring(pos);
			}
			return imageP;
		}
		var image=imageP[WvStyle.POS_P_IMAGE];
		var bi=(image)?"url('"+image+"')":"";
		if(imageP.length<2)return bi+";";
		if(image)bi+=",";
		var forme=imageP[WvStyle.POS_P_FORME];
		bi+=WvStyle.GRADIENT[forme]+"-gradient(";
		switch(forme){
			case WvStyle.IS_LINEAR:bi+=((imageP[2])?imageP[2]:0)+"deg";
			break;
			case WvStyle.IS_RADIAL:;break;
		}
		var startColor=WvStyle.POS_P_COLORS+WvStyle.POS_NB_PARAMS[forme];
		var nb=imageP.length-startColor;
		for(var i=startColor;i<nb;){
			bi+=",rgb("+imageP[i++]+","+imageP[i++]+","+imageP[i++]+")";
		}
		return bi+");";
	};
	WvStyle.wvFacesSetVisible=function(facesP,isVisibleP){
		var isVisible=(isVisibleP=='visible');
		var nbFaces=facesP.length;
		for(var i=0;i<nbFaces;i++){
			facesP[i].style.visibility=isVisibleP;
			facesP[i].wvIsVisible=isVisible;
		}
	};
	WvButton_S.decalPush=1;
	function WvButton_S(){
	};
	WvButton_S.init=function(_div,isButton){
		if(!isButton){
			new WvRollOver(_div);
			return;
		}
		if(_div.buttonFacesState==null&&_div.libelle==null){
			new WvButtonAnimated(_div);
			return;
		}
		new WvButtonSimple(_div);
	};
	WvButton_S.initFlat=function(_div){
		if(_div.wvOrigin==null){
			_div.wvOrigin=true;
			_div.style.transformOrigin="0px 0px";
			_div.style.webkitTransformOrigin="0px 0px";
			_div.style.mozTransformOrigin="0px 0px";
			_div.style.oTransformOrigin="0px 0px";
			_div.style.msTransformOrigin="0px 0px";
		}
	};
	function WvAnim_S(){
	};
	WvAnim_S.DISPLAY_FREQUENCY=40;
	WvAnim_S.OVER_FREQUENCY=20;
	WvAnim_S.INT_NULL= -999999;
	WvAnim_S.Z_ORDER_ON_TOP=WvAnim_S.INT_NULL;
	function WvButtonSimple(_div){
		_div.wvButton=this;
		_div.wvIsButton=true;
		_div.wvIsButtonSimple=true;
		this.div=_div;
		this.fcUt=WvButtonSimple.WvButtonCummonInit;
		this.fcUt();
		this.wvPieceButton=this.wvPiece;
		var visible=(_div.style.visibility=="visible");
		var flagShowable=(WvButton_S.buildStatesTracks(_div)&&_div.wvTracks!=null&&_div.wvTracks[0]!=null)||this.div.wvFrameVisibleStart!=null;
		_div.wvShowTreeDiv=(flagShowable)?function(){
			if(this.wvIsVisible)return false;
			this.style.visibility="visible";
			this.wvIsVisible=true;
			return true;
		}
		:null;
		_div.wvShowTreeMouse=WvButton_S.showSimpleMouse;
		_div.wvShowTree=(_div.wvShowTreeDiv)?function(){
			if(this.wvShowTreeDiv())this.wvShowTreeMouse(0);
		}
		:function(){
			this.wvShowTreeMouse(0);
		};
		_div.wvFrameGroup=_div.wvStateCurrent=(visible)?0:null;
		_div._goto_=_div.wvDisplayState=_div.wvGroupState=(_div.wvShowTreeDiv)?((_div.wvFrameVisibleStart)?function(numFrameP){
			_div.wvStateCurrent=this.wvFrameGroup=numFrameP;
			if(numFrameP>=_div.wvFrameVisibleStart&&numFrameP<=_div.wvFrameVisibleEnd){
				if(this.wvIsVisible)return;
				this.style.visibility="visible";
				this.wvIsVisible=true;
				this.wvDisplayStateMouse(0);
			}
			else{
				if(!this.wvIsVisible)return;
				this.wvHideTreeMouse();
			}
		}
		:function(numFrameP){
			_div.wvStateCurrent=this.wvFrameGroup=numFrameP;
			if(this.wvTracks[0][numFrameP]){
				if(this.wvIsVisible)return;
				this.style.visibility="visible";
				this.wvIsVisible=true;
				this.wvDisplayStateMouse(0);
			}
			else{
				if(!this.wvIsVisible)return;
				this.wvHideTreeMouse();
			}
		}
		):function(){
			console.log("wv_button.js#WvButtonSimple() wvDisplayState() _goto()");
		}
		;
		WvButtonSimple.initBtMouse(_div);
		var btText=this.bttxt0;
		if(btText!=null){
			btText.wvIsVisible=visible;
		}
		var btrelief=this.btrelief||this.adjust;
		if(btrelief!=null){
			btrelief.wvIsVisible=visible;
		}
		var btImage=this.btimage;
		if(btImage!=null){
			btImage.wvIsVisible=visible;
		}
		if(_div.wvOrigin==null){
			_div.wvOrigin=true;
			_div.style.transformOrigin="0px 0px";
			_div.style.webkitTransformOrigin="0px 0px";
			_div.style.mozTransformOrigin="0px 0px";
			_div.style.oTransformOrigin="0px 0px";
			_div.style.msTransformOrigin="0px 0px";
		}
		if(_div.buttonFacesState!=null){
			var states=_div.buttonFacesState;
			var nbStates=states.length;
			var pieces;
			var state;
			var nbPieces;
			for(var s=0;s<nbStates;s++){
				pieces=states[s];
				nbPieces=pieces.length;
				for(var p=0;p<nbPieces;p++){
					state=pieces[p];
					if(state==null||state.wvIsVisible==true)continue;
					state.wvIsVisible=visible;
				}
				visible=false;
			}
		}
		_div.onmousedown=function(){
			this.wvButton.onmousedown();
		};
		_div.onmouseup=function(){
			this.wvButton.onmouseup();
		};
	};
	HTMLDivElement.prototype.wvBuildButton=function(){
		WvTree.addSubDiv(this,this);
	};
	WvButtonSimple.initBtMouse=function(_div){
		_div.wvHideTreeMouse=WvButton_S.hideSimpleMouse;
		_div.wvHideTree=(_div.wvShowTreeDiv)?function(){
			if(!this.wvIsVisible)return false;
			this.style.visibility="hidden";
			this.wvIsVisible=false;
			this.wvHideTreeMouse();
		}
		:function(){
			this.wvHideTreeMouse();
		};
		visible=(_div.style.visibility=="visible");
		_div.wvStateCurrentMouse=(visible)?0:null;
		_div._goto_Mouse=WvButton_S.showSimpleMouse;
		_div.wvDisplayStateMouse=WvButton_S.showSimpleMouse;
	};
	WvButtonSimple.prototype.onmouseover=function(){
		this.isMouseOverEvent=true;
		setTimeout(this.toMouseOver,0,this);
		if(this.wvPieceButton!=null)this.wvPieceButton.wvToTop();
	}
	;
	WvConst.NOT_VERIFY_NUM_STATE=true;
	WvButtonSimple.prototype.toMouseOver=function(button){
		if(!button.isMouseOverEvent||button.isMouseOverEvent==button.isMouseOver)return;
		button.isMouseOver=true;
		var div_=button.div;
		if(div_.parentNode.mouseOverToTopPh)div_.parentNode.wvToTop();
		var nbStatesMemo=div_.wvStatesNbMouse;
		div_.wvStatesNbMouse=3;
		div_.wvDisplayStateMouse(1,WvConst.NOT_VERIFY_NUM_STATE);
		div_.wvStatesNbMouse=nbStatesMemo;
		WvButton_S.pieceButton=div_.wvPieceButton;
	};
	WvButtonSimple.prototype.onmouseout=function(){
		this.isMouseOverEvent=false;
		setTimeout(this.toMouseOut,0,this);
		if(this.wvPieceButton!=null)this.wvPieceButton.wvToTop();
	}
	;
	WvButtonSimple.prototype.toMouseOut=function(button){
		var div_=button.div;
		if(button.isMouseOverEvent||button.isMouseOverEvent==button.isMouseOver)return;
		button.isMouseOver=false;
		var div_=button.div;
		if(!div_.wvIsVisible){
			return;
		}
		div_.wvDisplayStateMouse(0,WvConst.NOT_VERIFY_NUM_STATE);
		WvButton_S.pieceButton=div_.wvPieceButton;
	};
	WvButtonSimple.prototype.onmousedown=function(){
		if(!this.isMouseOver)return;
		setTimeout(this.toMouseDown,0,this);
	}
	;
	WvButtonSimple.prototype.toMouseDown=function(button){
		if(!button.isMouseOver)return;
		var div_=button.div;
		var nbStatesMemo=div_.wvStatesNbMouse;
		div_.wvStatesNbMouse=3;
		div_.wvDisplayStateMouse(2,WvConst.NOT_VERIFY_NUM_STATE);
		div_.wvStatesNbMouse=nbStatesMemo;
	};
	WvButtonSimple.prototype.onmouseup=function(){
		if(!this.isMouseOver)return;
		setTimeout(this.toMouseUp,0,this);
	}
	;
	WvButtonSimple.prototype.toMouseUp=function(button){
		if(!button.isMouseOver)return;
		var div_=button.div;
		if(!div_._visible||(!div_.wvIsPiece&& !div_.wvPiece._visible))return;
		var nbStatesMemo=div_.wvStatesNbMouse;
		div_.wvStatesNbMouse=3;
		button.div.wvDisplayStateMouse(1,WvConst.NOT_VERIFY_NUM_STATE);
		div_.wvStatesNbMouse=nbStatesMemo;
	};
	WvButton_S.showSimpleMouse=function(numStateMouse){
		var add=0;
		if(numStateMouse==null){
			if(this.wvIsVisible)return this;
			this.style.visibility="visible";
			this.wvIsVisible=true;
			numStateMouse=0;
		}
		else{
			var numStateOldMouse=this.wvStateCurrentMouse;
			if(numStateOldMouse==numStateMouse)return this;
			if(numStateOldMouse==2)add=0;
			else if(numStateMouse==2)add=2;
		}
		this.wvStateCurrentMouse=numStateMouse;
		if(this.wvStates!=null){
			if(numStateOldMouse!=null)this.wvStates[numStateOldMouse]._visible=false;
			if(this.wvStateCurrentMouse!=null)this.wvStates[this.wvStateCurrentMouse]._visible=true;
			return;
		}
		var btText=this.bttxt0;
		if(btText!=null&& !btText.wvIsVisible){
			btText.style.visibility="visible";
			btText.wvIsVisible=true;
		}
		var btrelief=this.btrelief||this.adjust;
		if(btrelief!=null&& !btrelief.wvIsVisible){
			btrelief.style.visibility="visible";
			btrelief.wvIsVisible=true;
		}
		var btImage=this.btimage;
		if(btImage!=null&& !btImage.wvIsVisible){
			btImage.style.visibility="visible";
			btImage.wvIsVisible=true;
		}
		if(this.buttonFacesState!=null){
			var states=this.buttonFacesState[numStateMouse];
			var nb=states.length;
			var state;
			for(var i=0;i<nb;i++){
				state=states[i];
				if(state.wvIsVisible){
					state.wvButtonStateVisible=true;
					continue;
				}
				state.style.visibility="visible";
				state.wvIsVisible=true;
			}
		}
		if(numStateOldMouse!=null){
			var states=this.buttonFacesState[numStateOldMouse];
			var nb=states.length;
			var state;
			for(var i=0;i<nb;i++){
				state=states[i];
				if(state.wvButtonStateVisible){
					delete state.wvButtonStateVisible;
					continue;
				}
				state.style.visibility="hidden";
				state.wvIsVisible=false;
			}
		}
		var libelle_=this.libelle;
		if(libelle_!=null&&this.libelle.buttonColors!=null){
			if(libelle_!=null&&libelle_.buttonColors!=null){
				var st=libelle_.style;
				if(st.visibility=='hidden'){
					st.visibility='visible';
					libelle_.wvIsVisible=true;
				}
				if(libelle_.xOrg==null)libelle_.xOrg=parseFloat(st.left);
				if(libelle_.yOrg==null)libelle_.yOrg=parseFloat(st.top);
				if(libelle_.buttonColors!=null&&libelle_.buttonColors[numStateMouse]!=null)st.color=libelle_.buttonColors[numStateMouse];
				var x=libelle_.xOrg+add;
				var y=libelle_.yOrg+add;
				st.left=''+x+'px';
				st.top=''+y+'px';
			}
		}
	};
	WvButton_S.buildStatesTracks=function(_div){
		if(_div.wvTracks==null||_div.wvTracks[0]==null){
			return false;
		}
		var f=_div.wvTracks[0];
		var nb=_div.wvFramesNb=f.length;
		for(var i=0;i<nb;i++){
			f[i]=(f[i]!=null&&f[i]>=0)?_div:null;
		}
		return true;
	};
	WvButton_S.showState=function(_div,numStateMouse){
	};
	WvButton_S.hideSimpleMouse=function(){
		if(this.wvIsVisible){
			this.style.visibility="hidden";
			this.wvIsVisible=false;
		}
		this.wvStateCurrentMouse=null;
		var btrelief=this.btrelief||this.adjust;
		if(btrelief!=null){
			btrelief.style.visibility="hidden";
			var ch=btrelief.children;
			btrelief.wvIsVisible=false;
			var btrelief_=ch.btrelief0||ch.adjust0;
			if(btrelief_!=null&&btrelief_.wvIsVisible){
				btrelief_.style.visibility="hidden";
				btrelief_.wvIsVisible=false;
			}
			btrelief_=ch.btrelief2||ch.adjust2;
			if(btrelief_!=null&&btrelief_.wvIsVisible){
				btrelief_.style.visibility="hidden";
				btrelief_.wvIsVisible=false;
			}
		}
		var btImage=this.btimage;
		if(btImage!=null){
			btImage.style.visibility="hidden";
			btImage.wvIsVisible=false;
			var btImage_=btImage.children.btimage0;
			if(btImage_!=null&&btImage_.wvIsVisible){
				btImage_.style.visibility="hidden";
				btImage_.wvIsVisible=false;
			}
			var btImage_=btImage.children.btimage1;
			if(btImage_!=null&&btImage_.wvIsVisible){
				btImage_.style.visibility="hidden";
				btImage_.wvIsVisible=false;
			}
			var btImage_=btImage.children.btimage2;
			if(btImage_!=null&&btImage_.wvIsVisible){
				btImage_.style.visibility="hidden";
				btImage_.wvIsVisible=false;
			}
		}
		var btText=this.bttxt0;
		if(btText!=null){
			btText.style.visibility="hidden";
			btText.wvIsVisible=false;
		}
		this.wvStateCurrentMouse=null;
	};
	function WvButtonAnimated(_div){
		_div.wvButton=this;
		_div.wvIsButton=true;
		this.div=_div;
		this.fcUt=WvButtonSimple.WvButtonCummonInit;
		this.fcUt();
		_div.wvPieceButton=_div.wvPiece.parentNode.wvPiece;
		_div.wvStates=[];
		var i=0;
		for(;true;i++){
			var state=_div["f__"+i];
			if(state==null)break;
			_div.wvStates[i]=state;
		}
		_div.wvStatesNb=i;
		WvButtonSimple.initBtMouse(_div);
		_div.wvShowTree=WvTransformer.wvShowTreeInit;
		_div.wvHideTree=WvTransformer.wvHideTreeInit;
		_div.onmousedown=function(){
			this.wvButton.onmousedown();
		};
		_div.onmouseup=function(){
			this.wvButton.onmouseup();
		};
		_div.wvDisplayStateMouse=_div.wvDisplayState;
	};
	WvButtonAnimated.prototype=WvButtonSimple.prototype;
	WvButtonAnimated.show=function(params,numState){
		if(!this.wvIsVisible){
			_div.style.visibility=="visible";
			this.wvIsVisible=true;
		}
		this.wvStates[numState||0]. wvShowTree();
	};
	WvButtonAnimated.hide=function(params,numState){
		if(this.wvIsVisible){
			_div.style.visibility=="hidden";
			this.wvIsVisible=false;
		}
		this.wvStates[numState||0]. wvHideTree();
	};
	function WvRollOver(_div){
		_div.wvButton=this;
		_div.wvIsButton=true;
		this.div=_div;
		this.fcUt=WvButtonSimple.WvButtonCummonInit;
		this.fcUt();
		_div.wvPieceButton=_div.wvPiece.parentNode.wvPiece;
		_div.wvStates=[];
		var i=0;
		for(;true;i++){
			var state=_div["f__"+i];
			if(state==null)break;
			_div.wvStates[i]=state;
		}
		_div.wvStatesNb=i;
		_div.wvShowTree=WvTransformer.wvShowTreeInit;
		_div.wvHideTree=WvTransformer.wvHideTreeInit;
		_div.wvDisplayStateMouse=_div.wvDisplayState;
	};
	WvRollOver.prototype=WvButtonSimple.prototype;
	WvButtonSimple.WvButtonCummonInit=function(){
		this.div.fcUt=WvButtonSimple.WvDivButtonCummonInit;
		this.div.fcUt();
		this.isMouseOver=false;
	};
	WvButtonSimple.WvDivButtonCummonInit=function(){
		this.wvIsVisible=(this.style.visibility=="visible");
		this.onmouseover=function(){
			this.wvButton.onmouseover();
		};
		this.onmouseout=function(){
			this.wvButton.onmouseout();
		};
	};
	function WvButtonCoords(_div){
		this._div=_div;
		var st=_div.style;
		this.textCoords=[];
		this.nbTexts=0;
		var setTransform=(WvTree.isSafari)?WvAnim.setTransFormSafari:WvAnim.setTransForm;
		for(this.nbTexts=0;this.nbTexts<10000;this.nbTexts++){
			var line=_div.children["line"+this.nbTexts];
			if(line==null)break;
			this.textCoords[this.nbTexts]=[line,parseFloat(line.style.left),parseFloat(line.style.top)];
			line.funcSetTransFormPh=setTransform;
			line._div=line;
			line.wvFc=WvTree.initPieceProperties;
			line.wvFc(0);
		}
		this.bordersColor=[_div.style.borderTopColor,_div.style.borderBottomColor];
	};
	WvButtonCoords.prototype.setTextsLocation=function(offsetP){
		for(var i=0;i<this.nbTexts;i++){
			var div_=this.textCoords[i][0];
			div_._x=this.textCoords[i][1]+offsetP;
			div_._y=this.textCoords[i][2]+offsetP;
		}
		var color1=(offsetP==0)?this.bordersColor[0]:this.bordersColor[1];
		var color2=(offsetP==0)?this.bordersColor[1]:this.bordersColor[0];
		var st=this._div.style;
		st.borderTopColor=color1;
		st.borderLeftColor=color1;
		st.borderBottomColor=color2;
		st.borderRightColor=color2;
	};
	WvButton_S.mouseButton=function(_this,colorsP,imagesP){
		if(_this.wvButtonCoords==null){
			_this.wvButtonCoords=new WvButtonCoords(_this);
		}
		if(_this.colorOut==null)_this.colorOut=_this.style.color;
		if(_this.imageOut==null)_this.imageOut=_this.style.backgroundImage;
		if(imagesP==null){
			if(colorsP!=null){
				if(colorsP.length==0){
					_this.onmouseup=_this.onmouseover=function(){
						this.wvSetStyleBackground(null,null);
					}
					;
					_this.onmousedown=function(){
						this.wvSetStyleBackground(null,null,WvButton_S.decalPush);
					}
					;
				}
				else{
					if(colorsP.length>0&&colorsP[0]!=null){
						_this.onmouseup=_this.onmouseover=function(){
							this.wvSetStyleBackground(colorsP[0],null);
						}
						;
					}
					if(colorsP.length>1&&colorsP[1]!=null){
						_this.onmousedown=function(){
							this.wvSetStyleBackground(colorsP[1],null,WvButton_S.decalPush);
						}
						;
					}
				}
			}
			else{
				_this.onmouseup=_this.onmouseover=function(){
					this.wvSetStyleBackground(null,null);
				}
				;
				_this.onmousedown=function(){
					this.wvSetStyleBackground(null,null,WvButton_S.decalPush);
				}
				;
			}
			_this.onmouseout=function(){
				this.wvSetStyleBackground(_this.colorOut,null);
			}
			;
			if(_this.onmouseover)_this.onmouseover();
			return;
		}
		if(colorsP==null){
			_this.onmouseover=function(){
				this.wvSetStyleBackground(null,'url('+imagesP[0]+')');
			}
			;
			_this.onmouseout=function(){
				this.wvSetStyleBackground(null,_this.imageOut);
			}
			;
			_this.onmousedown=function(){
				this.wvSetStyleBackground(null,'url('+imagesP[1]+')',WvButton_S.decalPush);
			}
			;
			_this.onmouseup=function(){
				this.wvSetStyleBackground(null,'url('+imagesP[0]+')');
			}
			;
			_this.onmouseover();
			return;
		}
		_this.onmouseover=function(){
			this.wvSetStyleBackground(colorsP[0],'url('+imagesP[0]+')');
		}
		;
		_this.onmouseout=function(){
			this.wvSetStyleBackground(_this.colorOut,_this.imageOut);
		}
		;
		_this.onmousedown=function(){
			this.wvSetStyleBackground(colorsP[1],'url('+imagesP[1]+')',WvButton_S.decalPush);
		}
		;
		_this.onmouseup=function(){
			this.wvSetStyleBackground(colorsP[0],'url('+imagesP[0]+')');
		}
		;
		_this.onmouseover();
	};
	WvButton_S.buttonSetTransformerChild=function(divTransformer){
		this.wvDivTransformer=divTransformer;
	};
	WvButton_S.buttonChangeStateChild=function(fNew){
		this.wvDivTransformer.buttonDisplayState(fNew);
	};
	WvButton_S.buttonDisplayState=function(fOld,fNew){
		if(fNew==null){
			fNew=fOld;
			fOld=this.wvStateCurrent;
		}
		if(this.style.visibility=="hidden"&&fNew==null&&fOld!=fNew){
			this.wvStateCurrent=fNew;
			return;
		}
		var toShow=(fOld==null||fOld==null&&fNew!=null);
		var toHide=(!toHide&&(fNew==null||fNew==null&&fOld!=null));
		if(toShow){
			this.style.visibility="visible";
			this.wvIsVisible=true;
		}
		else{
			if(toHide){
				this.style.visibility="hidden";
				this.wvIsVisible=false;
			}
		}
		var flagDefault=true;
		if(this.buttonFacesState!=null){
			flagDefault=false;
			if(fOld!=null)WvStyle.wvFacesSetVisible(this.buttonFacesState[fOld],"hidden");
			if(fNew!=null)WvStyle.wvFacesSetVisible(this.buttonFacesState[fNew],"visible");
		}
		var libelle_=this.libelle;
		if(libelle_!=null&&libelle_.buttonColors!=null){
			var st=libelle_.style;
			if(toShow){
				if(st.visibility=='hidden'){
					st.visibility='visible';
					libelle_.wvIsVisible=true;
				}
			}
			else{
				if(toHide){
					if(st.visibility=='visible'){
						st.visibility='hidden';
						libelle_.wvIsVisible=false;
					}
					return;
				}
			}
			if(st.visibility=='hidden')return;
			flagDefault=false;
			if(libelle_.xOrg==null)libelle_.xOrg=parseFloat(st.left);
			if(libelle_.yOrg==null)libelle_.yOrg=parseFloat(st.top);
			if(libelle_.buttonColors!=null&&libelle_.buttonColors[fNew]!=null)st.color=libelle_.buttonColors[fNew];
			var add=(fNew==2)?2:0;
			var x=libelle_.xOrg+add;
			var y=libelle_.yOrg+add;
			st.left=''+x+'px';
			st.top=''+y+'px';
		}
	}
	;
	WvButton_S.getZtop=function(group){
		return 100;
	};
	WvConst.LIST_ID_PREFIXE="wvi_";
	WvConst.LIST_TAB_PREFIXE="wvt_";
	function WvArray_S(){
	};
	WvArray_S.div=function(tab,div_,valdef){
		if(tab==null)return null;
		var nb=tab.length;
		var tabOut=[];
		for(var i=0;i<nb;i++){
			tabOut[i]=(tab[i]!=null)?tab[i]/div_:valdef;
		}
		return tabOut;
	};
	WvArray_S.toNum=function(tab,valdef){
		if(tab==null)return null;
		var nb=tab.length;
		var tabOut=[];
		for(var i=0;i<nb;i++){
			tabOut[i]=(tab[i]!=null)?parseFloat(tab[i]):valdef;
		}
		return tabOut;
	};
	WvArray_S.hide=function(tab){
		if(tab==null)return;
		var nb=tab.length;
		for(var i=0;i<nb;i++){
			tab[i].style.visibility="hidden";
			tab[i].wvIsVisible=false;
		}
		return;
	};
	WvArray_S.get=function(tabP,keyP,valueP){
		var nb=tabP.length;
		for(var i=0;i<nb;i++){
			if(tabP[i][keyP]==valueP)return tabP[i];
		}
		return tabP;
	};
	WvArray_S.toStringSepar=function(tabP,operatorP,separatorP){
		if(separatorP==null&&Array.isArray(tabP)){
			var nb=tabP.length;
			var text='';
			var s='';
			for(var i=0;i<nb;i++){
				text+=s+tabP[i];
				s=operatorP;
			}
			return text;
		}
		if(typeof(tabP)==='string'){
			return tabP;
		}
		var text='';
		var s='';
		if(tabP[0]==null||Array.isArray(tabP[0])){
			text+=s+tabP[0][0]+operatorP+tabP[0][1];
			s=separatorP;
			return text;
		}
		for(var k in tabP){
			if(!tabP.hasOwnProperty(k)){
				continue;}
			text+=s+k+operatorP+tabP[k];s=separatorP;
		}
		return text;
	};
	WvArray_S.split3level=function(chaine,separs){
		if(chaine==null)return null;
		var tabState=chaine.split(separs[0]);
		var nbStates=tabState.length;
		var tabStateOut=new Array(nbStates);
		for(var numState=0;numState<nbStates;numState++){
			var tabPath=tabState[numState].split(separs[1]);
			var nbPathes=tabPath.length;
			var tabPathOut=new Array(nbPathes);
			for(var numPath=0;numPath<nbPathes;numPath++){
				tabPathOut[numPath]=tabPath[numPath].split(separs[2]);
			}
			tabStateOut[numState]=tabPathOut;
		}
		return tabStateOut;
	}
	;
	WvArray_S.tab3levelToString=function(tab){
		var message="";
		var lgTab=tab.length;
		for(var i=0;i<lgTab;i++){
			var tab1=tab[i];
			var lgTab1=tab1.length;
			for(var j=0;j<lgTab1;j++){
				var tab2=tab1[j];
				var lgTab2=tab2.length;
				for(var k=0;k<lgTab2;k++){
					message+=tab2[k]+",";
				}
				message+="\n";
			}
			message+="----\n";
		}
		return message;
	}
	;
	WvArray_S.tabToDiv=function(tab,pieceP){
		var nbStates=tab.length;
		var states=new Array(nbStates);
		for(var numState=0;numState<nbStates;numState++){
			var tabState=tab[numState];
			var nbFaces=tabState.length;
			states[numState]=new Array(nbFaces);
			for(var numFace=0;numFace<nbFaces;numFace++){
				var tabPath=tabState[numFace];
				var nbSteps=tabPath.length;
				var p=pieceP;
				for(var numPath=0;numPath<nbSteps;numPath++){
					p=p.children[tabPath[numPath]];
				}
				states[numState][numFace]=p;
			}
		}
		return states;
	}
	;
	function WvArraySpeed(name){
		this.tab=[];
		this.tabFree=[];
		this.length=0;
		this.firstFree= -1;
		this.nbItems=0;
	};
	WvArraySpeed.prototype.add=function(item){
		this.nbItems++;
		if(this.firstFree<0){
			this.tab[this.length]=item;
			item[this.name]=this.length;
			return this.length++;
		}
		var free=this.firstFree;
		this.firstFree=this.tab[free];
		this.tab[free]=item;
		item[this.name]=free;
		this.tabFree[free]=false;
		return free;
	}
	;
	WvArraySpeed.prototype.pop=function(){
		return suppr(this.next[0]);
	};
	WvArraySpeed.prototype.suppr=function(num){
		if(num==null||num<0||num>=this.length||this.tabFree[num])return null;
		this.nbItems--;
		var item=this.tab[num];
		item[this.name]=null;
		this.tab[num]=this.firstFree;
		this.tabFree[num]=true;
		this.firstFree=num;
		return item;
	}
	;
	WvArraySpeed.prototype.replace=function(itemOld,itemNew){
		if(itemOld==null||itemNew==null)return;
		var index=itemOld[this.name];
		if(index==null||index<0||index>this.length||this.tab[index]!=itemOld)return;
		itemOld[this.name]=null;
		itemNew[this.name]=index;
		this.tab[index]=itemNew;
	};
	WvArraySpeed.prototype.display=function(){
		var text="";
		var separ="";
		for(var i=0;i<this.length;i++){
			text+=separ+this.tab[i];
			separ=" | ";
		}
	}
	;
	WvListSpeed.cpt=1000;
	function WvListSpeed(name,tab){
		this.aa_id=WvListSpeed.cpt++;
		this.name=name;
		this.tab=["reserved","reserved"];
		this.prev=[-1,0];
		this.next=[1,-1];
		this.tabFree=[false,false];
		this.length=2;
		this.firstFree= -1;
		this.nbItems=0;
		if(tab!=null)for(var i=0;i<tab.length;i++)this.add(tab[i]);
	};
	WvListSpeed.suppr_S=function(item){
		tab.suppr(index);
	};
	WvListSpeed.prototype.isEmpty=function(){
		return this.nbItems==0;
	};
	WvListSpeed.prototype.scan=function(action,params){
		for(var i=this.next[0];i!=1;i=this.next[i])this.tab[i].wvUt=action;
		this.tab[i].wvUt(params);
	};
	WvListSpeed.prototype.add=function(item){
		if(item==null)return;
		this.nbItems++;
		if(this.firstFree<0){
			this.tab[this.length]=item;
			index=this.length++;
		}
		else{
			var index=this.firstFree;
			this.firstFree=this.tab[index];
			this.tab[index]=item;
		}
		this.tabFree[index]=false;
		var next=this.next[index]=this.next[0];
		this.prev[index]=0;
		this.next[0]=index;
		this.prev[next]=index;
		return index;
	};
	WvListSpeed.prototype.suppr=function(index,item){
		if(index==null){
			if(item==null)return;
		}
		else{
			if(index<2||index>=this.length||this.tabFree[index])return;
			if(item==null){
				item=this.tab[index];
				if(item==null){
					if(isNaN(parseInt(index)))return;
				}
			}
			else{
			}
		}
		this.nbItems--;
		this.tab[index]=this.firstFree;
		this.firstFree=index;
		this.tabFree[index]=true;
		this.next[this.prev[index]]=this.next[index];
		this.prev[this.next[index]]=this.prev[index];
		return item;
	};
	WvListSpeed.prototype.pop=function(){
		return this.suppr(this.next[0]);
	};
	WvListSpeed.prototype.replace=function(itemOld,itemNew){
		if(itemOld==null||itemNew==null)return;
		var index=this.indexOf(itemOld);
		if(index>=0)this.tab[index]=itemNew;
	};
	WvListSpeed.prototype.display=function(){
		var text="";
		var separ="";
		for(var i=0;i<this.length;i++){
			text+=separ+this.tab[i];
			separ=" | ";
		}
		text="";
		separ="";
		for(var i=0;i<this.length;i++){
			text+=separ+this.tab[i];
			separ=" | ";
		}
		console.log('          ->['+text+"]");
	}
	;
	WvListSpeed.prototype.indexOf=function(item){
		var nb=this.tab.length;
		for(var i=2;i<nb;i++)if(this.tab[i]===item)return i;
		return-1;
	};
	function WvFunctions(idP,divP){
		this.tab=[];
		this.div_=divP;
		this.id=idP;
	};
	WvFunctions.prototype.addFunction=function(fcP,paramsP){
		return this.tab.push([fcP,paramsP]);
	};
	WvFunctions.add=function(fcP,paramsP,tabFuncP,divP,idP){
		if(tabFuncP==null){
			tabFuncP=new WvFunctions(idP,divP)}
		tabFuncP.tab.push([fcP,paramsP]);
		return tabFuncP;
	};
	WvFunctions.prototype.exec=function(paramsThisP){
		var lg=this.tab.length;
		var fc;
		for(var i=0;i<lg;i++){
			fc=this.tab[i];
			if(fc==null)continue;
			this.div_.fc=fc[0];
			this.div_.fc(paramsThisP,fc[1]);
		}
	};
	WvFunctions.prototype.stop=function(paramsThisP){
		var lg=this.tab.length;
		var fc;
		for(var i=0;i<lg;i++){
			fc=this.tab[i];
			if(fc==null)continue;
			this.div_.fc=fc[0];
			this.div_.fc(paramsThisP,fc[1]);
		}
	};
	function WvArray(){
	};
	WvArray.removeNull=function(tab,copyP){
		var max=tab.length;
		if(copyP==null||copyP!=true){
			var noNull=true;
			for(var i=0;i<max;i++){
				if((c=tab[i])!=null)continue;
				noNull=false;
				break;
			}
			if(noNull)return tab;
		}
		var tabCompressed=[];
		var c;
		for(var i=0,num=0;i<max;i++){
			if((c=tab[i])==null)continue;
			tabCompressed[num++]=c;
		}
		return tabCompressed;
	};
	WvArray_S.tabToDiv=function(tabP){
		var nb;
		if(tabP==null||(nb=tabP.length)<1)return null;
		if(nb==1)return tabP[0];
		var div=tabP[0];
		for(var i=1;i<nb;i++){
			if(div==null)return null;
			div=div[tabP[i]];
		}
		return div;
	};
	function WvBubblePlayer(_div){
		_div._root.wvPlayer=this;
		this._div=_div;
		this.actionsOnFocus=new WvActionsOnFrame(this);
		this.bubbleName='wvBubble_wvPlayerAnimation';
		WvTree.getWvWindow(_div).addOnFocus(function(bubblePlayer){
			bubblePlayer.wvPlayerAnimation.onFocus();
		}
		,_div);
		WvTree.getWvWindow(_div).addOnBlur(function(bubblePlayer){
			bubblePlayer.wvPlayerAnimation.onBlur();
		}
		,_div);
	};
	WvBubblePlayer.prototype.onFocus=function(){
		this.playStart();
	};
	WvBubblePlayer.prototype.onBlur=function(){
		this.playStop();
	};
	WvBubblePlayer.prototype.AnimationStep_=function(_div){
		if(!_div.wvIsInit){
			console.log("wv_anim_bubble.js/div["+_div.id+"].wvPlayProgressOneStep_Scan() ****NON INIT****");
			return;
		}
		if(WvBubblePlayer.isRunning!=null)return;
		WvBubblePlayer.isRunning=true;
		_div.wvPlayProgressOneStep_Scan();
		this.actionsOnFocus.play();
		WvBubblePlayer.isRunning=null;
	};
	WvActionsOnFrame.add=function(sourceP,fcP,params){
		sourceP._root.wvPlayer.actionsOnFocus.addAction(sourceP,fcP,params);
	};
	function WvActionsOnFrame(player){
		this.wvPlayer=player;
		this.tab=[];
	};
	function WvActionOnFrame(sourceP,fcP,paramsP){
		this.source=sourceP;
		this.fc=fcP;
		this.params=paramsP;
	};
	WvActionsOnFrame.prototype.addAction=function(sourceP,fcP,paramsP){
		this.tab.push(new WvActionOnFrame(sourceP,fcP,paramsP));
	};
	WvActionsOnFrame.prototype.play=function(){
		while(this.tab.length!=0){
			var fc=this.tab.shift();
			if(fc==null)continue;
			fc.play();
		}
	};
	WvActionOnFrame.prototype.play=function(){
		this.source.ut=this.fc;
		this.source.ut(this.params);
	};
	WvBubblePlayer.initRootBubble=function(animName,thisRoot){
		var bubbleTree=thisRoot.wvPlayerAnimation=new WvBubblePlayer(thisRoot);
		this.bubbleTree=bubbleTree;
		var bubble=thisRoot.wvBubble_wvPlayerAnimation=new WvBubbleAnim(thisRoot,bubbleTree);
		bubble.piecesAnimated=new WvListSpeed("pcewvPlayerAnimation");
		bubble.groupsAnimated=new WvListSpeed("grpwvPlayerAnimation");
		thisRoot.wvBubblePieceEmergeInThisGroup=function(bubblePiece){
			var bubble=thisRoot.wvBubble_wvPlayerAnimation;
			if(bubble.piecesAnimated==null){
				bubble.piecesAnimated=new WvListSpeed('pcewvPlayerAnimation');
			}
			bubble.piecesAnimated.add(bubblePiece);
		};
		setTimeout(WvBubblePlayer.refreshSynchro,500);
		bubbleTree.playStart();
	};
	WvBubblePlayer.prototype.playStart=function(){
		if(this.playerRun!=null||this.idPlayerRun!=null)return;
		WvBubblePlayer.flagStopRefresh=false;
		WvBubblePlayer.refreshor=this;
		this.idPlayerRun=requestAnimationFrame(WvBubblePlayer.AnimationStep);
	};
	WvBubblePlayer.prototype.playStop=function(){
		if(this.idPlayerRun==null)return;
		clearInterval(this.idPlayerRun);
		this.idPlayerRun=null;
		WvBubblePlayer.flagStopRefresh=true;
	};
	WvBubblePlayer.refreshMax=0;
	WvBubblePlayer.refreshCpt=1;
	WvBubblePlayer.refreshInit=0;
	WvBubblePlayer.refreshUser=25;
	WvBubblePlayer.refreshSynchro=function(){
		if(WvBubblePlayer.refreshMax>0)return;
		WvBubblePlayer.refreshInit=0;
		setTimeout(WvBubblePlayer.refreshSynchro2,500);
	}
	;
	WvBubblePlayer.refreshSynchro2=function(){
		WvBubblePlayer.refreshMax=parseInt((WvBubblePlayer.refreshInit*2)/WvBubblePlayer.refreshUser+0.5);
		if(WvBubblePlayer.refreshDebug)alert(WvBubblePlayer.refreshMax+"   "+(WvBubblePlayer.refreshInit));
	}
	;
	WvBubblePlayer.AnimationStep=function(){
		var _div=WvBubblePlayer.refreshor._div;
		WvBubblePlayer.divRefresh=_div;
		var root=_div._root;
		_div.wvFrameSpeed=(parseInt(_div.wvFrameSpeed/16.66))*16;
		WvBubblePlayer.AnimationStep=WvBubblePlayer.AnimationStepRun;
		if(root.wvPlayer!=null){
			WvBubblePlayer.AnimationStep();
		}
	};
	WvBubblePlayer.AnimationStepRun=function(){
		var _div=WvBubblePlayer.refreshor._div;
		var root=_div._root;
		root.wvPlayer.AnimationStep_(_div);
		root.onAnim.play();
		setTimeout(WvBubblePlayer.AnimationSpeed,_div.wvFrameSpeed);
	};
	WvBubblePlayer.AnimationSpeed=function(){
		if(WvBubblePlayer.flagStopRefresh){
			return;
		}
		this.idPlayerRun=requestAnimationFrame(WvBubblePlayer.AnimationStep);
	};
	WvOnAnim.prototype.add=function(divP,actionP,infoP,onlyOnceP,framesActivesP){
		this.divs[this.nb]=divP;
		this.actions[this.nb]=actionP;
		this.info[this.nb]=infoP;
		this.onlyOnce[this.nb]=onlyOnceP;
		this.frameCurr[this.nb]= -1;
		this.framesActives[this.nb]=framesActivesP;
		this.nb++;
	};
	WvOnAnim.prototype.play=function(){
		var decal=0;
		var j=-1;
		for(var i=0;i<this.nb;i++){
			if(this.framesActives[i]){
				var frameGroup=this.divs[i].wvFrameGroup;
				if(frameGroup==null){
					console.error("ERROR <onAnim> : this.divs[i] doit impérativement avoir une barre-de-temps\n"+this.info[i]);
					continue;
				}
				if(this.frameCurr[i]==this.divs[i].wvFrameGroup)continue;
				this.frameCurr[i]=this.divs[i].wvFrameGroup;
				if(this.framesActives!==true&& !this.framesActives[frameGroup]){
					continue;
				}
			}
			this.actions[i](this.divs[i]);
			if(this.onlyOnce[i]){
				if(j<0)j=i;
			}
			else{
				if(j>=0){
					this.divs[j]=this.divs[i];
					this.actions[j]=this.actions[i];
					this.info[j]=this.info[i];
					this.onlyOnce[j]=this.onlyOnce;
					[i];
					this.frameCurr[j]=this.frameCurr[i];
					this.framesActives[j]=this.framesActives[i];
					j++;
				}
			}
		}
		if(j>=0)this.nb=j;
	};
	this.wvWindow.addOnInit(WvBubblePlayer.initRootBubble,'wvPlayerAnimation');
	HTMLDivElement.prototype.wvBubblePieceStart=function(){
		if(this.wvfb_wvPlayerAnimation==true)return;
		this.wvfb_wvPlayerAnimation=true;
		this.wvGroupParent.wvBubblePieceEmergeInThisGroup(this);
	};
	HTMLDivElement.prototype.wvBubblePieceSuppr=function(){
		if(this.wvfb_wvPlayerAnimation==false)return;
		this.wvfb_wvPlayerAnimation=false;
		if(this.wvIsGroup){
			this.wvGroupParent.wvBubbleGroupSupprInThisGroup(this);
		}
		else{
			this.wvGroupParent.wvBubblePieceSupprInThisGroup(this);
		}
	};
	HTMLDivElement.prototype.FlipFlop=function(){
		if(this.wvfb_wvPlayerAnimation!=true){
			this.wvBubblePieceStart();
			return true;
		}
		this.wvBubblePieceSuppr();
		return false;
	};
	HTMLDivElement.prototype.wvBubblePieceEmergeInThisGroup=function(bubblePiece){
		var bubble=this.wvBubble_wvPlayerAnimation;
		if(bubble==null){
			bubble=this.wvBubble_wvPlayerAnimation=new WvBubbleAnim(this);
			bubble.addNewPiece(bubblePiece);
			this.wvGroupParent.wvBubbleGroupEmergeInThisGroup(this);
			return;
		}
		if(bubble.piecesAnimated!=null||this.wvPlayerAnimation!=null){
			bubble.addPiece(bubblePiece);
			return;
		}
		bubble.addNewPiece(bubblePiece);
		if(bubble.groupsAnimated.tab!=null)return;
		this.wvGroupParent.wvBubbleGroupExchangeInThisGroup(bubble.groupsAnimated,this);
	};
	HTMLDivElement.prototype.wvBubbleGroupExchangeInThisGroup=function(bubbleGroupOld,bubbleGroupNew){
		var bubble=this.wvBubble_wvPlayerAnimation;
		if(bubble.groupsAnimated.tab!=null){
			bubble.replaceGroup(bubbleGroupOld,bubbleGroupNew);
			return;
		}
		if(bubble.groupsAnimated!=bubbleGroupOld){
			WvTree.error('Bubble tree <wvPlayerAnimation>  '+this.id+'wvBubbleGroupExchangeInThisGroup('+bubbleGroupOld.id+','+bubbleGroupNew.id+') ');
			return;
		}
		bubble.groupsAnimated=bubbleGroupNew;
		if(bubble.piecesAnimated!=null||this.wvPlayerAnimation!=null){
			return;
		}
		this.wvGroupParent.wvBubbleGroupExchangeInThisGroup(bubbleGroupOld,bubbleGroupNew);
	};
	HTMLDivElement.prototype.wvBubbleGroupEmergeInThisGroup=function(bubbleGroup){
		var bubble=this.wvBubble_wvPlayerAnimation;
		if(bubble==null){
			bubble=this.wvBubble_wvPlayerAnimation=new WvBubbleAnim(this);
			bubble.addRelayGroup(bubbleGroup);
			this.wvGroupParent.wvBubbleGroupEmergeInThisGroup(bubbleGroup);
			return;
		}
		if(bubble.groupsAnimated==null){
			if(this.wvPlayerAnimation!=null){
				bubble.addNewGroup(bubbleGroup);
				return;
			}
			bubble.addRelayGroup(bubbleGroup);
			return;
		}
		if(bubble.groupsAnimated.tab!=null){
			bubble.addGroup(bubbleGroup);
			return;
		}
		if(bubble.piecesAnimated!=null){
			bubble.addNewGroup(bubbleGroup);
			return;
		}
		var bubbleRelay=bubble.groupsAnimated;
		bubble.addNewGroup(bubbleGroup);
		this.wvGroupParent.wvBubbleGroupExchangeInThisGroup(bubbleRelay,this);
	};
	HTMLDivElement.prototype.wvBubblePieceSupprInThisGroup=function(bubblePiece){
		var bubble=this.wvBubble_wvPlayerAnimation;
		if(bubble.supprPiece(bubblePiece)){
			return;
		}
		if(bubble.groupsAnimated==null){
			this.wvBubble_wvPlayerAnimation=null;
			if(this.wvPlayerAnimation!=null){
				return;
			}
			this.wvGroupParent.wvBubbleGroupSupprInThisGroup(this);
			return;
		}
		if(bubble.groupsAnimated.tab!=null){
			return;
		}
		this.wvGroupParent.wvBubbleGroupExchangeInThisGroup(this,bubble.groupsAnimated);
	};
	HTMLDivElement.prototype.wvBubbleGroupSupprInThisGroup=function(bubbleGroup){
		var bubble=this.wvBubble_wvPlayerAnimation;
		var groupsAnimated=bubble.groupsAnimated;
		if(groupsAnimated.tab==null){
			bubble.groupsAnimated=null;
			if(bubble.piecesAnimated!=null){
				return;
			}
			this.wvGroupParent.wvBubbleGroupSupprInThisGroup(bubbleGroup);
			this.wvBubble_wvPlayerAnimation=null;
			return;
		}
		bubble.supprGroup(bubbleGroup);
		if(groupsAnimated.nbItems>1){
			return;
		}
		var bubbleGroup=groupsAnimated.pop();
		bubble.groupsAnimated=bubbleGroup;
		if(bubble.piecesAnimated!=null){
			return;
		}
		if(this.wvPlayerAnimation==null)this.wvGroupParent.wvBubbleGroupExchangeInThisGroup(this,bubbleGroup);
	};
	function WvBubbleAnim(divGroup){
	};
	WvBubbleAnim.prototype.addNewPiece=function(bubblePiece){
		if(this.piecesAnimated==null)this.piecesAnimated=new WvListSpeed('pcewvPlayerAnimation');
		this.piecesAnimated.add(bubblePiece);
	};
	WvBubbleAnim.prototype.addPieces=function(div_){
		if(this.piecesAnimated==null)this.piecesAnimated=new WvListSpeed('pcewvPlayerAnimation');
		var pieces;
		if((pieces=div_.wvPieces)==null)return;
		var nb=pieces.length;
		for(var i=0;i<nb;i++){
			var p=pieces[i];
			if(this.piecesAnimated.indexOf(p)>=0)continue;
			this.piecesAnimated.add(p);
		}
	};
	WvBubbleAnim.prototype.addPiece=function(bubblePiece){
		this.piecesAnimated.add(bubblePiece);
	};
	WvBubbleAnim.prototype.supprPiece=function(bubblePiece){
		if(this.piecesAnimated==null)return false;
		this.piecesAnimated.suppr(null,bubblePiece);
		if(!this.piecesAnimated.isEmpty())return true;
		this.piecesAnimated=null;
		return false;
	};
	WvBubbleAnim.prototype.addNewGroup=function(bubbleGroup){
		var bubbleRelay=this.groupsAnimated;
		this.groupsAnimated=new WvListSpeed('grpwvPlayerAnimation');
		if(bubbleRelay==null){
			this.groupsAnimated.add(bubbleGroup);
			return;
		}
		if(bubbleRelay.wvi_grpwvPlayerAnimation!=null&&bubbleRelay.wvt_grpwvPlayerAnimation==this.groupsAnimated){
			this.groupsAnimated.suppr(null,bubbleRelay);
		}
		this.groupsAnimated.add(bubbleRelay);
		if(bubbleGroup.wvi_grpwvPlayerAnimation!=null&&bubbleGroup.wvt_grpwvPlayerAnimation==this.groupsAnimated){
			this.groupsAnimated.suppr(null,bubbleGroup);
		}
		this.groupsAnimated.add(bubbleGroup);
	};
	WvBubbleAnim.prototype.addGroup=function(bubbleGroup){
		if(bubbleGroup.wvi_grpwvPlayerAnimation!=null&&bubbleGroup.wvt_grpwvPlayerAnimation==this.groupsAnimated){
			this.groupsAnimated.suppr(null,bubbleGroup);
		}
		this.groupsAnimated.add(bubbleGroup);
	};
	WvBubbleAnim.prototype.supprGroup=function(bubbleGroup){
		this.groupsAnimated.suppr(null,bubbleGroup);
	};
	WvBubbleAnim.prototype.replaceGroup=function(bubbleGroupOld,bubbleGroupNew){
		if(bubbleGroupNew.wvt_grpwvPlayerAnimation!=null){
			bubbleGroupNew.wvt_grpwvPlayerAnimation.suppr(bubbleGroupNew.wvi_grpwvPlayerAnimation);
		}
		if(this.groupsAnimated.indexOf(bubbleGroupOld)>=0){
			this.groupsAnimated.replace(bubbleGroupOld,bubbleGroupNew);
		}
		else{
			this.groupsAnimated.add(bubbleGroupNew);
		}
	};
	WvBubbleAnim.prototype.addRelayGroup=function(bubbleGroup){
		this.groupsAnimated=bubbleGroup;
	};
	WvBubbleAnim.prototype.supprRelayGroup=function(group){
		var bubbleRelay=this.groupsAnimated;this.groupsAnimated=null;
	};
	HTMLDivElement.prototype.wvBubbleAnimScan=function(actionGroup,actionPiece,paramsGroup,paramsPiece){
		var bubble=this.wvBubble_wvPlayerAnimation;
		if(bubble==null)return;
		var grs=bubble.groupsAnimated;
		if(grs!=null){
			var next=grs.next;
			var tab=grs.tab;
			var next=this.wvGroupsAnimated.next;
			if(actionGroup!=null){
				aaaa;
			}
			for(var i=next[0];i!=1;i=next[i])tab[i].wvBubbleAnimScan(actionGroup,actionPiece,paramsGroup,paramsPiece);
		}
		var pcs=bubble.piecesAnimated;
		if(pcs!=null){
			var next=pcs.next;
			var tab=pcs.tab;
			var next=this.wvGroupsAnimated.next;
			for(var i=next[0];i!=1;i=next[i])pcs=tab[i].wvUt=action;
			tab[i].wvUt(actionPiece,paramsPiece);
		}
	};
	HTMLDivElement.prototype.wvPlayProgressOneStep_Scan=function(){
		var bubble=this.wvBubble_wvPlayerAnimation;
		if(bubble==null)return;
		if(this.wvToVisible!=null){
			this.wvToVisible=null;
			this.style.visibility='visible';
			this.wvIsVisible=true;
		}
		else{
			if(!this.wvIsVisible)return;
		}
		if(!this.wvFreeze&&bubble.piecesAnimated==null){
			this.wvFreeze=true;
		}
		if(this.wvFramesNb>1&& !this.wvFreeze&& !this.wvToFreeze){
			if(this.wvFrameGroup==null)this.wvFrameGroup=0;
			else{
				if(this.wvReview==null){
					if(++this.wvFrameGroup>=this.wvFramesNb)this.wvFrameGroup=0;
				}
				else{
					if(--this.wvFrameGroup>=this.wvFramesNb)this.wvFrameGroup=0;
				}
			}
		}
		var grs=bubble.groupsAnimated;
		if(grs!=null){
			if(grs.wvPlayProgressOneStep_Scan!=null){
				grs.wvPlayProgressOneStep_Scan();
			}
			else{
				var next=grs.next;
				var tab=grs.tab;
				for(var i=next[0];i!=1;i=next[i]){
					tab[i].wvPlayProgressOneStep_Scan();
				}
			}
		}
		if(this.wvFreeze==null||this.wvToFreeze){
			if(this.wvToFreeze){
				this.wvToFreeze=null;
				this.wvFreeze=true;
			}
			var pcs=bubble.piecesAnimated;
			if(pcs!=null){
				var next=pcs.next;
				var tab=pcs.tab;
				for(var i=next[0];i!=1;i=next[i])pcs=tab[i].wvGotoFrame(this.wvFrameGroup);
			}
		}
	};
	HTMLDivElement.prototype.wvGroupGotoFrame=function(numFrameP,bubble){
		if(this.wvIsTransformer){
			this.getStateNav().wvGroupGotoFrame(numFrameP,bubble);
			return;
		}
		if(this.wvFrameGroup!=null&&this.wvFrameGroup==numFrameP)return;
		if(bubble==null){
			var bubble=this.wvBubble_wvPlayerAnimation;
			if(bubble==null){
				if(this.wvFramesNb!=null&&this.wvFramesNb>1){
					this.wvGroupGotoFrame=function(){
						this.wvGroupState(numFrameP);
					}
					;
					this.wvGroupGotoFrame();
				}
				return;
			}
		}
		this.wvFrameGroup=numFrameP;
		var pcs=bubble.piecesAnimated;
		if(pcs==null){
			bubble.addPieces(this);
			pcs=bubble.piecesAnimated;
		}
		var next=pcs.next;
		var tab=pcs.tab;
		for(var i=next[0];i!=1;i=next[i]){
			pcs=tab[i].wvGotoFrame(this.wvFrameGroup);
		}
	};
	HTMLDivElement.prototype.wvPlayProgressOneStep=function(){
		if(this.wvTracks==null)return;
	};
	var TIMEBAR_FACE=parseInt(0);
	var TIMEBAR_X=1;
	var TIMEBAR_Y=2;
	var TIMEBAR_Z=3;
	var TIMEBAR_ACTION=4;
	var TIMEBAR_X_SCALE=5;
	var TIMEBAR_ROTATION=6;
	var TIMEBAR_OPACITY=7;
	var TIMEBAR_Y_SCALE=8;
	HTMLDivElement.prototype.wvAnimInit=function(debug){
		this.wvIsAnimated=true;
		this.wvGroupParent.wvIsAnimated=true;
		if(this.wvTracks==null){
			var framesNb=1;
			this.attrsFreezePh=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
		}
		else{
			this.attrsFreezePh=[];
			var framesNb=1;
			var nb=this.wvTracks.length;
			for(var i=0;i<nb;i++){
				if(this.wvTracks[i]!=null){
					this.attrsFreezePh[i]=false;
					if(framesNb<this.wvTracks[i].length)framesNb=this.wvTracks[i].length;
				}
				else{
					this.attrsFreezePh[i]=true;
				}
			}
			if(this.wvTracks[0]!=null){
				var numFaces=this.wvTracks[0];
				var statesNb=0;
				var facesFlags=[];
				var numFace;
				for(var i=0;i<framesNb;i++){
					if((numFace=numFaces[i])!=null&&numFace>=0){
						if(facesFlags[numFace])continue;
						facesFlags[numFace]=true;
						statesNb++;
					}
					else{
						numFaces[i]=null;
					}
				}
				if(this.wvStatesNb==null){
					this.wvStatesNb=statesNb;
				}
				if(this.wvIsVisible)this.wvStateCurrent=this.wvTracks[0][0];
			}
		}
		this.xTime=this._xOld=this.style.top;
		this.yTime=this._yOld=this.style.left;
		if(this.wvIsVisible)this.wvFrameCurrent=0;
		this.wvBubblePieceStart();
		if(this.wvIsVisible&&this.wvTracks!=null){
			var transformText="";
			var xInit=(this.wvTracks[1]!=null)?this.wvTracks[1][0]:null;
			var yInit=(this.wvTracks[2]!=null)?this.wvTracks[2][0]:null;
			var xScaleInit=(this.wvTracks[5]!=null&&this.wvTracks[5][0]!=100)?this.wvTracks[5][0]/100:null;
			var yScaleInit=(this.wvTracks[8]!=null&&this.wvTracks[8][0]!=100)?this.wvTracks[8][0]/100:null;
			var rotateInit=(this.wvTracks[6]!=null&&this.wvTracks[6][0]!=0)?this.wvTracks[6][0]/10:null;
			if(xInit)if(yInit!=null)transformText+="translate ("+xInit+","+yInit+") ";
			else transformText+="translateX("+xInit+") ";
			else transformText+="translateY("+yInit+") ";
			if(xScaleInit!=null){
				if(yScaleInit!=null)transformText+="scale("+xScaleInit+","+yScaleInit+") ";
				else transformText+="scaleX("+xScaleInit+") ";
			}
			else{
				if(yScaleInit!=null)transformText+="scaleY("+yScaleInit+") ";
			}
			if(rotateInit!=null){
				transformText+=" rotate("+rotateInit+"deg) ";
			}
			if(transformText.length>0){
				this.style.transform=transformText;
				this.style.webkitTransform=transformText;
			}
		}
	};
	HTMLDivElement.prototype.wvDisplayFrame=function(numFrame){
		if(this.id=='w_p_vign_def_html0'&&numFrame==4){
			console.log("wv_anim.js#wvDisplayFrame() test vignette apparaissent");
		}
		if(this.wvTracks!=null){
			if(this.wvTracks[0]!=null){
				if(this.wvStatesNb==1||this.wvStatesNb==null){
					if(this.wvIsTransformer){
						this.wvDisplayFrame=function(numFrame){
							if(this.wvFaceName==null)this.wvFaceName=(this.page0!=null)?"page":"f__";
							return this._wvDisplayState_(null,numFrame);
						};
					}
					else{
						this.wvDisplayFrame=function(numFrame){
							try{
								var numState=this.wvTracks[0][numFrame];
							}
							catch(e){
								var numState=null;
							}
							if(numState==null){
								if(this.wvIsVisible)this.wvHideTree();
								return null;
							}
							this.wvShowTree();
							return this;
						}
						;
					}
				}
				else{
					this.wvDisplayFrame=function(numFrame){
						var numFace=this.wvTracks[0][numFrame];
						return this.wvDisplayState(numFace);
					}
					;
				}
			}
			else{
				if(this.wvStatesNb==1||this.wvStatesNb==null){
					this.wvDisplayFrame=function(numFrame){
						this.wvShowTree();
						return this;
					}
					;
				}
				else{
					this.wvDisplayFrame=function(numFrame){
						if(this.wvFaceName==null)this.wvFaceName=(this.page0!=null)?"page":"f__";
						return this.wvDisplayState(numFrame);
					}
					;
				}
			}
		}
		else{
			if(this.wvFrameVisibleStart!=null){
				this.wvDisplayFrame=function(numFrame){
					if(numFrame<this.wvFrameVisibleStart||numFrame>=this.wvFrameVisibleEnd){
						this.wvHideTree();
						this.wvStateCurrent=null;
						return false;
					}
					this.wvStateCurrent=0;
					if(this.f__0){
						this.wvShowTreeState(this.f__0);
					}
					else{
						this.wvShowTree();
					}
					return this;
				}
				;
			}
			else{
				if(this.wvStatesNb==1||this.wvStatesNb==null){
					if(this.wvIsGroup){
						this.wvDisplayFrame=function(numFrame){
							this.wvShowTree();
							return this;
						}
						;
					}
					else{
						this.wvDisplayFrame=function(numFrame){
							if(this.wvIsVisible){
								return;
							}
							this.style.visibility="visible";
							this.wvIsVisible=true;
							if(this.wvShowTreeSingular!=null)this.wvShowTreeSingular.exec();
							if(this.onWvVisible!=null)this.onWvVisible();
						};
					}
				}
				else{
					this.wvDisplayFrame=function(numFrame){
						if(this.wvFaceName==null)this.wvFaceName=(this.page0!=null)?"page":"f__";
						var face=this[this.wvFaceName+numFrame];
						return this.wvDisplayState(numFrame);
					}
					;
				}
			}
		}
		return this.wvDisplayFrame(numFrame);
	};
	HTMLDivElement.prototype.wvFramesVisibles=function(start,end){
		this.wvFrameVisibleStart=start;
		this.wvFrameVisibleEnd=end;
		this.wvFrameCurrent=0;
		this.wvStateCurrent=(start==0)?0:null;
		this.wvFaceAt_0=(start==0);
		if(start!=0&&this.wvTracks==null&&this.onWvFrame!=null){
			for(var i=0;i<this.onWvFrame.length;i++){
				if(this.onWvFrame[i]==null)continue;
				this.onWvVisible=this.onWvFrame[i];
				break;
			}
		}
		this.wvBubblePieceStart();
	};
	WvTree.gotoFrameLimits=function(numFrame){
		if(this.wvFrameCurrent==numFrame)return;
		this.wvFrameCurrent=numFrame;
		if(numFrame>=this.wvFrameVisibleStart&&numFrame<this.wvFrameVisibleEnd){
			if(this.wvIsVisible)return;
			this.wvShowTree();
			this.wvStateCurrent=0;
			return;
		}
		if(!this.wvIsVisible)return true;
		this.wvHideTree();
		this.wvStateCurrent=null;
	};
	HTMLDivElement.prototype.wvGotoFrame=function(numFrame){
		if(!this.wvDisplayFrame(numFrame)){
			this.wvFrameCurrent=numFrame;
			return;
		}
		this.wvFrameCurrent=numFrame;
		this.wvFrameSetMovement(numFrame);
	};
	WvAnim.frameSetMovementSafari=function(numFrameP){
		if(this.wvFrameAttrDisplayed!=null&&this.wvFrameAttrDisplayed==numFrameP)return;
		this.wvFrameAttrDisplayed=numFrameP;
		var tracks=this.wvTracks;
		if(tracks==null||this.attrsFreezePh==null){
			this.animatedPh=false;
			return;
		}
		var nbTracks=this.attrsFreezePh.length;
		if(nbTracks<=TIMEBAR_X)return;
		var styleDiv=this.style;
		var flagTransform;
		var attrsFreezePh=this.attrsFreezePh;
		if(tracks[TIMEBAR_X]!=null&& !attrsFreezePh[TIMEBAR_X]){
			if(this.xTime!=this._xOld){
				attrsFreezePh[TIMEBAR_X]=true;
			}
			else{
				this.xTime=tracks[TIMEBAR_X][numFrameP];
				if(this.xTime!=null){
					if(this.xTime!=this._xOld){
						this._xOld=this.xTime;
						this.xTranslatePx=String(this.xTranslate=(parseFloat(this.xTime)-parseFloat(styleDiv.left)))+"px";
						flagTransform=true;
					}
				}
				else{
					this.xTime=this._xOld;
				}
			}
		}
		if(nbTracks<=TIMEBAR_Y)return;
		if(tracks[TIMEBAR_Y]!=null&& !attrsFreezePh[TIMEBAR_Y]){
			if(this.yTime!=this._yOld){
				attrsFreezePh[TIMEBAR_Y]=true;
			}
			else{
				this.yTime=tracks[TIMEBAR_Y][numFrameP];
				if(this.yTime!=null){
					if(this.yTime!=this._yOld){
						this._yOld=this.yTime;
						this.yTranslatePx=String(this.yTranslate=(parseFloat(this.yTime)-parseFloat(styleDiv.top)))+"px";
						flagTransform=true;
					}
				}
				else{
					this.yTime=this._yOld;
				}
			}
		}
		if(flagTransform){
			if(this.xTranslatePx==null){
				this.xTime=tracks[TIMEBAR_X][numFrameP];
				this._xOld=this.xTime;
				this.xTranslatePx=String(this.xTranslate=parseFloat(this.xTime)-parseFloat(styleDiv.left))+"px";
			}
			else{
				if(this.yTranslatePx==null){
					this.yTime=tracks[TIMEBAR_Y][numFrameP];
					this._yOld=this.yTime;
					this.yTranslatePx=String(this.yTranslate=(parseFloat(this.yTime)-parseFloat(styleDiv.top)))+"px";
				}
			}
		}
		if(this.onWvFrame!=null&&!attrsFreezePh[TIMEBAR_ACTION]&&tracks[TIMEBAR_ACTION]!=null){
			var numAction=tracks[TIMEBAR_ACTION][numFrameP];
			if(numAction!=null){
				this.wvUt=this.onWvFrame[numAction];
				this.wvUt();
			}
		}
		if(nbTracks<=TIMEBAR_Z){
			if(flagTransform>0){
				if(this._xscalePh==0)this._xscalePh=null;
				if(this._yscalePh==0)this._yscalePh=null;
				this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
			}
			return;
		}
		if(!attrsFreezePh[TIMEBAR_Z]&&tracks[TIMEBAR_Z]!=null){
			if(this._z!=this._zOld){
				attrsFreezePh[TIMEBAR_Z]=true;
			}
			else{
				var zTime=this._z=tracks[TIMEBAR_Z][numFrameP];
				if(this.wvGroupParent.pieceOnTop!=null&&this.wvGroupParent.pieceOnTop!=this){
					this._zOld=zTime;
				}
				else{
					if(this._zOld!=zTime){
						this._zOld=zTime;
						if(zTime!=null){
							styleDiv.zIndex=zTime;
						}
					}
				}
				this._zReal=zTime;
				if(this.wvGroupParent.pieceOnTop==this&&zTime!=pieceP.wvGroupParent.zTop+1){
					this.wvGroupParent.pieceOnTop=null;
				}
			}
		}
		if(nbTracks<=TIMEBAR_X_SCALE){
			if(flagTransform>0){
				if(this._xscalePh==0)this._xscalePh=null;
				if(this._yscalePh==0)this._yscalePh=null;
				this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
			}
			return;
		}
		if(!attrsFreezePh[TIMEBAR_X_SCALE]&&tracks[TIMEBAR_X_SCALE]!=null&&tracks[TIMEBAR_X_SCALE][numFrameP]!=null){
			if(this._xscalePh!=this._xscaleOld){
				attrsFreezePh[TIMEBAR_X_SCALE]=true;
			}
			else{
				this._xscalePh=tracks[TIMEBAR_X_SCALE][numFrameP]/100;
				var xScale=this._xscalePh=(this._xscalePh!=null)?this._xscalePh:1;
				if(this._xscaleOld!=xScale){
					this._xscaleOld=xScale;
					flagTransform=true;
				}
			}
		}
		if(!attrsFreezePh[TIMEBAR_Y_SCALE]&&tracks[TIMEBAR_Y_SCALE]!=null&&tracks[TIMEBAR_Y_SCALE][numFrameP]!=null){
			if(this._yscalePh!=this._yscaleOld){
				attrsFreezePh[TIMEBAR_Y_SCALE]=true;
			}
			else{
				this._yscalePh=tracks[TIMEBAR_Y_SCALE][numFrameP]/100;
				var yScale=this._yscalePh=(this._yscalePh!=null)?this._yscalePh:1;
				if(this._yscaleOld!=yScale){
					this._yscaleOld=yScale;
					flagTransform=true;
				}
			}
		}
		if(nbTracks<=TIMEBAR_ROTATION){
			if(flagTransform>0)this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
			return;
		}
		if(!attrsFreezePh[TIMEBAR_ROTATION]&&tracks[TIMEBAR_ROTATION]!=null){
			if(this._rotationPh!=this._rotationOld){
				attrsFreezePh[TIMEBAR_ROTATION]=true;
			}
			else{
				this._rotationPh=tracks[TIMEBAR_ROTATION][numFrameP]/10;
				var angleFace=this._rotationPh=(this._rotationPh!=null)?this._rotationPh%360:0;if(this._rotationOld!=angleFace){
					this._rotationOld=angleFace;
					flagTransform=true;
				}
			}
		}
		if(flagTransform>0)this.funcSetTransFormPh(this._rotationPh,this._xscalePh,this._yscalePh,this.xTranslatePx,this.yTranslatePx);
		if(nbTracks<=TIMEBAR_OPACITY){
			return;
		}
		if(!attrsFreezePh[TIMEBAR_OPACITY]&&tracks[TIMEBAR_OPACITY]!=null){
			if(this._alphaCurr!=this._alphaOld){
				attrsFreezePh[TIMEBAR_OPACITY]=true;
			}
			else{
				var alpha=this._alphaCurr=tracks[TIMEBAR_OPACITY][numFrameP]/100;
				if(this._alphaOld!=alpha){
					this._alphaOld=alpha;
					if(alpha!=null){
						this.funcSetOpacity(alpha);
					}
				}
			}
		}
		return true;
	};
	WvAnim.frameSetMovement=function(numFrameP){
		if(this.id=="bras0"){
			alert_("bras0 vw_anim#frameSetMovement("+numFrameP+") -> frame group="+this.wvFrameGroup+"   piece="+this.wvFrameCurrent);
		}
		if(this.id=="bras01_"){
			alert_("bras01_ vw_anim#frameSetMovement("+numFrameP+") -> frame group="+this.wvFrameGroup+"   piece="+this.wvFrameCurrent);
		}
		if(this.wvFreezeCss||(this.wvFrameAttrDisplayed!=null&&this.wvFrameAttrDisplayed==numFrameP))return;
		this.wvFrameAttrDisplayed=numFrameP;
		var tracks=this.wvTracks;
		if(tracks==null||this.attrsFreezePh==null){
			this.animatedPh=false;
			return;
		}
		var attrsFreezePh=this.attrsFreezePh;
		var offset;
		if(this.wvAnimClassName!=null){
			var num=(this.wvTrackClass!=null&&(offset=this.wvTrackClass[numFrameP])>=0)?numFrameP:(this.wvAnimClassNameCurr==null||this.wvAnimClassNameCurr!=this.wvAnimClassName+(numFrameP+offset))?numFrameP+offset:-1;
			this.wvNumFrameCss=numFrameP;
			if(num>=0){
				var name=this.wvAnimClassName+num;
				if(!this.wvAnimClassNameCurr){
					if(this.flagAnimNull[0])this.style.transform=null;
					if(this.flagAnimNull[1])this.style.opacity=null;
					if(this.flagAnimNull[2])this.style.zIndex=null;
					this.classList.add(this.wvAnimClassNameCurr=name);
				}
				else{
					this.classList.replace(this.wvAnimClassNameCurr,name);
					this.wvAnimClassNameCurr=name;
				}
			}
		}
		if(this.onWvFrame!=null&&!attrsFreezePh[TIMEBAR_ACTION]&&tracks[TIMEBAR_ACTION]!=null){
			var numAction=tracks[TIMEBAR_ACTION][numFrameP];
			if(numAction!=null)WvActionsOnFrame.add(this,this.onWvFrame[numAction]);
		}
		return true;
	};
	if(WvTree.isSafari)HTMLDivElement.prototype.wvFrameSetMovement=WvAnim.frameSetMovementSafari;
	else HTMLDivElement.prototype.wvFrameSetMovement=WvAnim.frameSetMovement;
	WvAnim.setTransFormSafari=function(angleP,scaleXP,scaleYP,xP,yP){
		var this_style=this.style;
		var transformP="";
		if(xP!=null||yP!=null){
			if(xP!=null&&yP!=null)transformP+="translate("+xP+","+yP+") ";
			else{
				if(xP!=null)transformP+="translateX("+xP+") ";
				if(yP!=null)transformP+="translateY("+yP+") ";
			}
		}
		transformP+=(angleP!=null)?"rotate( "+angleP+"deg ) ":"";
		if(scaleXP!=null||scaleYP!=null){
			if(scaleXP!=null&&scaleYP!=null)transformP+="scale("+scaleXP+","+scaleYP+") ";
			else{
				if(scaleXP!=null)transformP+="scaleX("+scaleXP+((scaleXP==1)?".0":"")+") ";
				if(scaleYP!=null)transformP+="scaleY("+scaleYP+((scaleYP==1)?".0":"")+") ";
			}
		}
		if(transformP.length==0)return;
		if(this.wvOrigin==null){
			this.wvOrigin=true;
			this.style.webkitTransformOrigin="50% 50%";
		}
		this_style.webkitTransform=transformP;
	};
	WvAnim.setTransForm=function(angleP,scaleXP,scaleYP){
		var this_style=this.style;
		var transformP=(angleP!=null)?"rotate( "+angleP+"deg ) ":"";
		if(scaleXP!=null||scaleYP!=null){
			if(scaleXP!=null&&scaleYP!=null)transformP+="scale("+scaleXP+","+scaleYP+")";
			else{
				if(scaleXP!=null)transformP+="scaleX("+scaleXP+((scaleXP==1)?".0":"")+")";
				if(scaleYP!=null)transformP+="scaleY("+scaleYP+((scaleYP==1)?".0":"")+")";
			}
		}
		if(transformP.length==0)return;
		if(this.wvIsTransformer){
			if(this.wvFaces==null){
				if(this.f__0){
					this.wvFaces=[];
					for(var i=0;true;i++){
						if(this["f__"+i]==null)break;
						this.wvFaces.push(this["f__"+i]);
					}
					this.wvStatesNb=this.wvFaces.length;
				}
			}
			if(this.wvFaces!=null){
				for(var i=0;i<this.wvFaces.length;i++){
					if(this.wvFaces[i].wvOrigin==null){
						this.wvFaces[i].wvOrigin=true;
						this.wvFaces[i].style.webkitTransformOrigin="50% 50%";
					}
					this_style=this.wvFaces[i].style;
					this_style.transform=transformP;
					this_style.webkitTransform=transformP;
					this_style.mozTransform=transformP;
					this_style.oTransform=transformP;
					this_style.msTransform=transformP;
				}
			}
		}
		else{
			if(this.wvOrigin==null){
				this.wvOrigin=true;
				this.style.webkitTransformOrigin="50% 50%";
			}
			this_style.transform=transformP;
			this_style.webkitTransform=transformP;
			this_style.mozTransform=transformP;
			this_style.oTransform=transformP;
			this_style.msTransform=transformP;
		}
	};
	WvAnim.setOpacityDefault=function(opacity){
		if(opacity==0.99)opacity=1;
		this.style["filter"]="alpha(opacity="+(opacity*100)+")";
		this.style["opacity"]=opacity;
	};
	WvAnim.setOpacitySafari=function(opacity){
		if(opacity==0.99)opacity=1;
		this.style.opacity=opacity;
	};
	if(WvTree.isSafari){
		HTMLDivElement.prototype.funcSetTransFormPh=WvAnim.setTransFormSafari;
		HTMLDivElement.prototype.funcSetOpacity=WvAnim.setOpacitySafari;
	}
	else{
		HTMLDivElement.prototype.funcSetTransFormPh=WvAnim.setTransForm;
		HTMLDivElement.prototype.funcSetOpacity=WvAnim.setOpacityDefault;
	}
	HTMLDivElement.prototype.wvClickAnimated=function(){
		if(this.wvTracks==null||this.onWvClick==null)return;
		var frame=(this.wvFrameCurrent||0);
		if(this.wvTracks[4]!=null&&this.wvTracks[4][frame]!=null){
			this.wvUt=this.onWvClick[this.wvTracks[4][frame]];
			this.wvUt();
			return;
		}
		this.wvClickState();
	};
	HTMLDivElement.prototype.getStateNav=function(){
		if(this.wvStateCurrent==null){
			return this.f__0;
		}
		if(this.wvStates==null){
			this.wvUt=WvTransformer.buildStates;
			this.wvUt();
		}
		return this.wvStates[this.wvStateCurrent];
	};
	HTMLDivElement.prototype.stop=function(){
		if(this.wvIsTransformer){
			this.getStateNav().stop();
			return;
		}
		if(this.wvStreamIgnoreStop&&this.wvStreamIgnoreStop.isEnded){
			this.wvStreamIgnoreStop=null;
			this.wvFreeze=null;
			return;
		}
		if(this.wvSequences)this.wvSequences.pause();
		this.wvFreeze=true;
		if(this.wvOnStop)this.wvOnStop();
	};
	HTMLDivElement.prototype.play=function(){
		if(this.wvIsTransformer){
			this.getStateNav().play();
			return;
		}
		if(this.wvFrameGroup==null||this.wvFrameGroup<0)this.wvFrameGroup=0;
		this.wvFreeze=null;
		if(this.wvSequences)this.wvSequences.play();
	};
	HTMLDivElement.prototype.jumpFrame=function(numFrame,loopP){
		if(this.wvIsTransformer){
			return this.getStateNav().jumpFrame(numFrame,loopP);
		}
		if(this.wvFrameGroup==null||this.wvFrameGroup<0)this.wvFrameGroup=0;
		if(this.wvIsAnimated){
			this.wvFrameGroup+=numFrame;
			if(this.wvFrameGroup>=this.wvFramesNb){
				this.wvFrameGroup=(loopP)?0:this.wvFramesNb-1;
			}
			else{
				if(this.wvFrameGroup<0){
					this.wvFrameGroup=(loopP)?this.wvFramesNb-1:0;
				}
			}
			this.wvToFreeze=true;
			return this.wvFrameGroup;
		}
		numFrame=this.wvFrameGroup+numFrame;
		if(numFrame>=(this.wvFramesNb||this.wvStatesNb)){
			numFrame=(loopP)?0:this.wvFramesNb-1;
		}
		else{
			if(numFrame<0){
				numFrame=(loopP)?this.wvFramesNb-1:0;
			}
		}
		this.wvGroupState(numFrame);
		return numFrame;
	};
	HTMLDivElement.prototype.gotoAndPlay=function(numFrame){
		if(this.wvIsTransformer){
			this.getStateNav().gotoAndPlay(numFrame);
			return;
		}
		if(this.wvFrameGroup==null||this.wvFrameGroup<0)this.wvFrameGroup=0;
		if(this.wvIsAnimated){
			this.wvFrameGroup=numFrame-1;
			this.wvFreeze=null;
			this.wvToFreeze=false;
			return;
		}
		this.wvGroupState(numFrame);
	};
	HTMLDivElement.prototype.gotoAndStop=function(numFrame){
		if(this.wvIsTransformer){
			this.getStateNav().gotoAndStop(numFrame);
			return;
		}
		if(this.wvFrameGroup==null||this.wvFrameGroup<0)this.wvFrameGroup=0;
		if(!this.wvIsAnimated){
			this.gotoAndStop=function(numFrame){
				this.wvGroupState(numFrame);
			}
			;
			this.gotoAndStop(numFrame);
			return;
		}
		if(this.wvTracks==null||this.wvTracks[TIMEBAR_FACE]==null){
			var ch=this.children;
			if(ch!=null){
				var isPages=false;
				var nb=ch.length;
				var child;
				for(var i=0;i<nb;i++){
					if((child=ch[i])==null)continue;
					if(child.f__0&&child.f__0.onmouseover){
					}
					else{
						if(child.f__0||child.f__1||child.page0||child.page1){
							isPages=true;
							break;
						}
					}
				}
				if(isPages){
					this.gotoAndStop=function(numFrame){
						this.wvGroupState(numFrame);
						this.wvFrameGroup=numFrame;
						this.wvToStop();
					}
					;
					this.gotoAndStop(numFrame);
					return;
				}
			}
		}
		this.gotoAndStop=function(numFrame){
			this.wvFrameGroup=numFrame;
			this.wvToStop();
		}
		;
		this.gotoAndStop(numFrame);
	};
	HTMLDivElement.prototype.goto=function(numFrame){
		if(this.wvIsTransformer){
			this.getStateNav().goto(numFrame);
			return;
		}
		if(this.wvIsAnimated){
			this.wvFrameGroup=numFrame;
			if(this.wvFreeze)this.wvToFreeze=true;
			return;
		}
		this.wvGroupState(numFrame);
	};
	HTMLDivElement.prototype.wvParent=function(ParentName){
		var d=this;
		var gr=null;
		while(d!=null&&d.id!=ParentName){
			d=(gr=d).parentNode;
		}
		if(d==null){
			console.error(this.id+".wvParent("+ParentName+") is unknown");
		}
		return d;
	};
	HTMLDivElement.prototype.getNumFrame=function(){
		if(this.wvIsTransformer){
			return this.getStateNav().wvFrameGroup;
		}
		return this.wvFrameGroup;
	};
	HTMLDivElement.prototype.getNbFrames=function(){
		if(this.wvIsTransformer){
			return this.getStateNav().wvFramesNb;
		}
		return this.wvFramesNb;
	};
	WvAnim.goto_and_stop=function(numFrameP,groupP){
		groupP.wvGroupGotoFrame(numFrameP);
		groupP.stop();
	}
	;
	WvAnim.goto_and_play=function(numFrameP,groupP){
		groupP.wvGroupGotoFrame(numFrameP);
		groupP.play();
	}
	;
	WvAnim.get_totalframes=function(groupP){
		return groupP.getNbFrames();
	};
	WvAnim.get_currentframe=function(groupP){
		return groupP.getNumFrame();
	};
	WvAnim.set_currentframe=function(numFrameP,groupP){
		groupP.gotoAndPlay(Math.round(numFrameP));
	};
	WvAnim.set_currentframe_stop=function(numFrameP,groupP){
		groupP.gotoAndStop(Math.round(numFrameP));
	};
	WvAnim.gotoGroup=function(groupP,numFrameP){
		groupP.wvGroupGotoFrame(numFrameP);
		groupP.stop();
	};
	WvAnim.next_frame=function(groupP){
		groupP.jumpFrame(1,true);
	};
	WvAnim.previous_frame=function(groupP){
		groupP.jumpFrame(-1,true);
	};
	WvAnim.play_=function(groupP){
		groupP.play();
	};
	WvAnim.stopGroup=function(groupP){
		groupP.stop();
	};
	HTMLDivElement.prototype.wvToStop=function(){
		this.wvFreeze=false;
		this.wvToFreeze=true;
	};
	var TIMEBAR_ACTION=4;
	function WvAnimCss(){
	};
	WvAnimCss.NAME=["x","y","z","scalex","scaley","rotatex","rotatey","rotatez","opacity","color","visibility","duration","speeder","delay","rewind","next","","","","","","","","","","","","","",""];
	WvAnimCss.UNITE=["px","px","px","","","deg","deg","deg","","","","ms","","ms","","","","","","","","","","","","","","","","",""];
	WvAnimCss.put=function(piece,css,cssId,visual,visualId){
		if(css&&cssId){
			var nb=cssId.length;
			for(var i=0;i<nb;i++){
				var id=cssId[i];
				if(WvAnimCss.ACTION[id]){
					piece.fc=WvAnimCss.ACTION[id];
					piece.fc(css[id]);
				}
				else{
					if(css[id]){
						piece.style.setProperty("--wv-"+WvAnimCss.NAME[id],css[id]+WvAnimCss.UNITE[id]);
					}
				}
			}
		}
		if(visual){
			var nb=visualId.length;
			for(var i=0;i<nb;i++){
				var id=visualId[i];
				if(visual[id]){
					piece.style.setProperty("--wv-"+WvAnimCss.NAME[id],visual[id]+WvAnimCss.UNITE[id]);
				}
			}
		}
	}
	;
	WvAnimCss.visible=function(value){
		if(value==0){
			this.style.setProperty("--wv-visible","hidden");
			return;
		}
		if(value==1){
			this.style.setProperty("--wv-visible","visible");
			return;
		}
		this.style.setProperty("--wv-visible",value);
	}
	;
	WvAnimCss.jump=function(tempo){
		setTimeout(WvAnimCss.jump_,tempo,this._group,1);
	}
	;
	WvAnimCss.jump_=function(piece,step){
		piece.jumpFrame(step,true);
	}
	;
	HTMLDivElement.prototype.wvGotoFrame=function(numFrame){
		if(!this.wvDisplayFrame(numFrame)){
			this.wvFrameCurrent=numFrame;
			return;
		}
		this.wvFrameCurrent=numFrame;
		if(!this.wvCssTimeline){
			this.wvFrameSetMovement(numFrame);
		}
		else{
			this.wvFc=WvAnimCss.actionExec;
			this.wvFc(numFrame);
		}
	}
	;
	WvAnimCss.actionExec=function(numFrameP){
		if(this.wvFreezeCss||(this.wvFrameAttrDisplayed!=null&&this.wvFrameAttrDisplayed==numFrameP))return;
		this.wvFrameAttrDisplayed=numFrameP;
		var tracks=this.wvTracks;
		if(tracks==null||this.attrsFreezePh==null){
			this.animatedPh=false;
			return;
		}
		var attrsFreezePh=this.attrsFreezePh;
		if(this.onWvFrame!=null&& !(attrsFreezePh[TIMEBAR_ACTION])&&tracks[TIMEBAR_ACTION]!=null){
			var numAction=tracks[TIMEBAR_ACTION][numFrameP];
			if(numAction!=null){
				WvActionsOnFrame.add(this,this.onWvFrame[numAction]);
			}
		}
	}
	;
	WvAnimCss.ACTION=[,,,,,,,,,,WvAnimCss.visible,,,,,WvAnimCss.jump,,,,,,,,,,,,,,,,,,,,,,,,,,,""];
	
