// Función para mover el fondo con el movimiento del ratón
window.onload = function() {
    document.onmousemove = function(e) {
        var x = -(e.clientX/5);
        var y = -(e.clientY/5);
        this.body.style.backgroundPosition = x + 'px ' + y + 'px';
	};
	// Función para solicitar permisos de notificacion push
	if(!Push.permission.GRANTED){
		Push.permission.request();
	 }
};

// Funciones para check único y cambio automático del mismo
function check1(){
	if(document.fUmbral.Modo2.checked == true){
		document.fUmbral.Modo2.checked = false;
	}
}
function check2(){
	if(document.fUmbral.Modo1.checked == true){
		document.fUmbral.Modo1.checked = false;
	}
}

// Función de validacion de umbral y opciones del mismo
function validar(){
	if(document.fUmbral.Modo1.checked == false && document.fUmbral.Modo2.checked == false){
		alert("Debe seleccionar una opcion Historico/Actual")
		return false;
	}
	else{
		if(document.fUmbral.umbral.value.length == 0){
			alert("Debe introducir un umbral")
			return false;
		}
		else if(document.fUmbral.umbral.value >= 100){
			alert("Ha introducido el valor maximo o un numero mayor. Nunca se superara");
			return false;
		}
		else if(document.fUmbral.umbral.value < 0){
			alert("El umbral debe ser un numero positivo menor de 100");
			alert(document.fUmbral.umbral.value);
			return false;
		}
		else{
			localStorage.UmbralActual = document.fUmbral.Modo2.checked;
			localStorage.ValorUmbral = document.fUmbral.umbral.value;
			alert("primero")
			var bbt = require('beebotte');
			alert("esa nataliaa")
			var bbt = new BBT('acf58919629d0c03c6499ad25d366389');
			alert("uoooo")
			<!-- bbt.subscribe({channel: 'BDext', resource: 'num', read: true, write: true}, function(msg) {AvisoPush();}); -->
			bbt.subscribe({
			  channel: 'BDext',
			  resource: 'num',
			}, function(msg){
			  /* Will get here every time a new resource data is written or published */
			  alert("EEEENGAAAA");
			  alert(msg);
			  alert(resource);
			  AvisoPush();
			});
			alert("FIN")
			document.fUmbral.submit();
		}
	}
}	

function AvisoPush(){
	var ValActual = 38;
	var UmbActual = JSON.parse(localStorage.UmbralActual); //string to boolean
    var ValUmbral = Number(localStorage.ValorUmbral); //string to number
	
	if(UmbActual == true){
		if(Number(ValActual) > ValUmbral){
			alert("SUPERADO")
			Push.create("UMBRAL SUPERADO",{
					body: "Se acaba de superar el umbral introducido",
					icon: "static/pics/ok.jpg",
					timeout: 5000
			});
		}
	}
}

// Función para la notificaión push
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):t.Push=i()}(this,function(){"use strict";var t={errors:{incompatible:"PushError: Push.js is incompatible with browser.",invalid_plugin:"PushError: plugin class missing from plugin manifest (invalid plugin). Please check the documentation.",invalid_title:"PushError: title of notification must be a string",permission_denied:"PushError: permission request declined",sw_notification_error:"PushError: could not show a ServiceWorker notification due to the following reason: ",sw_registration_error:"PushError: could not register the ServiceWorker due to the following reason: ",unknown_interface:"PushError: unable to create notification: unknown interface"}},i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e=(function(){function t(t){this.value=t}function i(i){function e(o,r){try{var s=i[o](r),c=s.value;c instanceof t?Promise.resolve(c.value).then(function(t){e("next",t)},function(t){e("throw",t)}):n(s.done?"return":"normal",s.value)}catch(t){n("throw",t)}}function n(t,i){switch(t){case"return":o.resolve({value:i,done:!0});break;case"throw":o.reject(i);break;default:o.resolve({value:i,done:!1})}(o=o.next)?e(o.key,o.arg):r=null}var o,r;this._invoke=function(t,i){return new Promise(function(n,s){var c={key:t,arg:i,resolve:n,reject:s,next:null};r?r=r.next=c:(o=r=c,e(t,i))})},"function"!=typeof i.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(i.prototype[Symbol.asyncIterator]=function(){return this}),i.prototype.next=function(t){return this._invoke("next",t)},i.prototype.throw=function(t){return this._invoke("throw",t)},i.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}),n=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}(),o=function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function, not "+typeof i);t.prototype=Object.create(i&&i.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),i&&(Object.setPrototypeOf?Object.setPrototypeOf(t,i):t.__proto__=i)},r=function(t,i){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!i||"object"!=typeof i&&"function"!=typeof i?t:i},s=function(){function t(i){e(this,t),this._win=i,this.GRANTED="granted",this.DEFAULT="default",this.DENIED="denied",this._permissions=[this.GRANTED,this.DEFAULT,this.DENIED]}return n(t,[{key:"request",value:function(t,i){return arguments.length>0?this._requestWithCallback.apply(this,arguments):this._requestAsPromise()}},{key:"_requestWithCallback",value:function(t,i){var e=this,n=this.get(),o=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e._win.Notification.permission;void 0===n&&e._win.webkitNotifications&&(n=e._win.webkitNotifications.checkPermission()),n===e.GRANTED||0===n?t&&t():i&&i()};n!==this.DEFAULT?o(n):this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission?this._win.webkitNotifications.requestPermission(o):this._win.Notification&&this._win.Notification.requestPermission?this._win.Notification.requestPermission().then(o).catch(function(){i&&i()}):t&&t()}},{key:"_requestAsPromise",value:function(){var t=this,i=this.get(),e=function(i){return i===t.GRANTED||0===i},n=i!==this.DEFAULT,o=this._win.Notification&&this._win.Notification.requestPermission,r=this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission;return new Promise(function(s,c){var a=function(t){return e(t)?s():c()};n?a(i):r?t._win.webkitNotifications.requestPermission(function(t){a(t)}):o?t._win.Notification.requestPermission().then(function(t){a(t)}).catch(c):s()})}},{key:"has",value:function(){return this.get()===this.GRANTED}},{key:"get",value:function(){return this._win.Notification&&this._win.Notification.permission?this._win.Notification.permission:this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission?this._permissions[this._win.webkitNotifications.checkPermission()]:navigator.mozNotification?this.GRANTED:this._win.external&&this._win.external.msIsSiteMode?this._win.external.msIsSiteMode()?this.GRANTED:this.DEFAULT:this.GRANTED}}]),t}(),c=function(){function t(){e(this,t)}return n(t,null,[{key:"isUndefined",value:function(t){return void 0===t}},{key:"isString",value:function(t){return"string"==typeof t}},{key:"isFunction",value:function(t){return t&&"[object Function]"==={}.toString.call(t)}},{key:"isObject",value:function(t){return"object"===(void 0===t?"undefined":i(t))}},{key:"objectMerge",value:function(t,i){for(var e in i)t.hasOwnProperty(e)&&this.isObject(t[e])&&this.isObject(i[e])?this.objectMerge(t[e],i[e]):t[e]=i[e]}}]),t}(),a=function t(i){e(this,t),this._win=i},u=function(t){function i(){return e(this,i),r(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return o(i,a),n(i,[{key:"isSupported",value:function(){return void 0!==this._win.Notification}},{key:"create",value:function(t,i){return new this._win.Notification(t,{icon:c.isString(i.icon)||c.isUndefined(i.icon)?i.icon:i.icon.x32,body:i.body,tag:i.tag,requireInteraction:i.requireInteraction})}},{key:"close",value:function(t){t.close()}}]),i}(),f=function(i){function s(){return e(this,s),r(this,(s.__proto__||Object.getPrototypeOf(s)).apply(this,arguments))}return o(s,a),n(s,[{key:"isSupported",value:function(){return void 0!==this._win.navigator&&void 0!==this._win.navigator.serviceWorker}},{key:"getFunctionBody",value:function(t){var i=t.toString().match(/function[^{]+{([\s\S]*)}$/);return void 0!==i&&null!==i&&i.length>1?i[1]:null}},{key:"create",value:function(i,e,n,o,r){var s=this;this._win.navigator.serviceWorker.register(o),this._win.navigator.serviceWorker.ready.then(function(o){var a={id:i,link:n.link,origin:document.location.href,onClick:c.isFunction(n.onClick)?s.getFunctionBody(n.onClick):"",onClose:c.isFunction(n.onClose)?s.getFunctionBody(n.onClose):""};void 0!==n.data&&null!==n.data&&(a=Object.assign(a,n.data)),o.showNotification(e,{icon:n.icon,body:n.body,vibrate:n.vibrate,tag:n.tag,data:a,requireInteraction:n.requireInteraction,silent:n.silent}).then(function(){o.getNotifications().then(function(t){o.active.postMessage(""),r(t)})}).catch(function(i){throw new Error(t.errors.sw_notification_error+i.message)})}).catch(function(i){throw new Error(t.errors.sw_registration_error+i.message)})}},{key:"close",value:function(){}}]),s}(),l=function(t){function i(){return e(this,i),r(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return o(i,a),n(i,[{key:"isSupported",value:function(){return void 0!==this._win.navigator.mozNotification}},{key:"create",value:function(t,i){var e=this._win.navigator.mozNotification.createNotification(t,i.body,i.icon);return e.show(),e}}]),i}(),h=function(t){function i(){return e(this,i),r(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return o(i,a),n(i,[{key:"isSupported",value:function(){return void 0!==this._win.external&&void 0!==this._win.external.msIsSiteMode}},{key:"create",value:function(t,i){return this._win.external.msSiteModeClearIconOverlay(),this._win.external.msSiteModeSetIconOverlay(c.isString(i.icon)||c.isUndefined(i.icon)?i.icon:i.icon.x16,t),this._win.external.msSiteModeActivate(),null}},{key:"close",value:function(){this._win.external.msSiteModeClearIconOverlay()}}]),i}(),v=function(t){function i(){return e(this,i),r(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return o(i,a),n(i,[{key:"isSupported",value:function(){return void 0!==this._win.webkitNotifications}},{key:"create",value:function(t,i){var e=this._win.webkitNotifications.createNotification(i.icon,t,i.body);return e.show(),e}},{key:"close",value:function(t){t.cancel()}}]),i}();return new(function(){function i(t){e(this,i),this._currentId=0,this._notifications={},this._win=t,this.Permission=new s(t),this._agents={desktop:new u(t),chrome:new f(t),firefox:new l(t),ms:new h(t),webkit:new v(t)},this._configuration={serviceWorker:"/serviceWorker.min.js",fallback:function(t){}}}return n(i,[{key:"_closeNotification",value:function(i){var e=!0,n=this._notifications[i];if(void 0!==n){if(e=this._removeNotification(i),this._agents.desktop.isSupported())this._agents.desktop.close(n);else if(this._agents.webkit.isSupported())this._agents.webkit.close(n);else{if(!this._agents.ms.isSupported())throw e=!1,new Error(t.errors.unknown_interface);this._agents.ms.close()}return e}return!1}},{key:"_addNotification",value:function(t){var i=this._currentId;return this._notifications[i]=t,this._currentId++,i}},{key:"_removeNotification",value:function(t){var i=!1;return this._notifications.hasOwnProperty(t)&&(delete this._notifications[t],i=!0),i}},{key:"_prepareNotification",value:function(t,i){var e=this,n=void 0;return n={get:function(){return e._notifications[t]},close:function(){e._closeNotification(t)}},i.timeout&&setTimeout(function(){n.close()},i.timeout),n}},{key:"_serviceWorkerCallback",value:function(t,i,e){var n=this,o=this._addNotification(t[t.length-1]);navigator&&navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",function(t){var i=JSON.parse(t.data);"close"===i.action&&Number.isInteger(i.id)&&n._removeNotification(i.id)}),e(this._prepareNotification(o,i))),e(null)}},{key:"_createCallback",value:function(t,i,e){var n=this,o=null,r=void 0;if(i=i||{},r=function(t){n._removeNotification(t),c.isFunction(i.onClose)&&i.onClose.call(n,o)},this._agents.desktop.isSupported())try{o=this._agents.desktop.create(t,i)}catch(o){var s=this._currentId,a=this.config().serviceWorker,u=function(t){return n._serviceWorkerCallback(t,i,e)};this._agents.chrome.isSupported()&&this._agents.chrome.create(s,t,i,a,u)}else this._agents.webkit.isSupported()?o=this._agents.webkit.create(t,i):this._agents.firefox.isSupported()?this._agents.firefox.create(t,i):this._agents.ms.isSupported()?o=this._agents.ms.create(t,i):(i.title=t,this.config().fallback(i));if(null!==o){var f=this._addNotification(o),l=this._prepareNotification(f,i);c.isFunction(i.onShow)&&o.addEventListener("show",i.onShow),c.isFunction(i.onError)&&o.addEventListener("error",i.onError),c.isFunction(i.onClick)&&o.addEventListener("click",i.onClick),o.addEventListener("close",function(){r(f)}),o.addEventListener("cancel",function(){r(f)}),e(l)}e(null)}},{key:"create",value:function(i,e){var n=this,o=void 0;if(!c.isString(i))throw new Error(t.errors.invalid_title);return o=this.Permission.has()?function(t,o){try{n._createCallback(i,e,t)}catch(t){o(t)}}:function(o,r){n.Permission.request().then(function(){n._createCallback(i,e,o)}).catch(function(){r(t.errors.permission_denied)})},new Promise(o)}},{key:"count",value:function(){var t=0,i=void 0;for(i in this._notifications)this._notifications.hasOwnProperty(i)&&t++;return t}},{key:"close",value:function(t){var i=void 0;for(i in this._notifications)if(this._notifications.hasOwnProperty(i)&&this._notifications[i].tag===t)return this._closeNotification(i)}},{key:"clear",value:function(){var t=void 0,i=!0;for(t in this._notifications)this._notifications.hasOwnProperty(t)&&(i=i&&this._closeNotification(t));return i}},{key:"supported",value:function(){var t=!1;for(var i in this._agents)this._agents.hasOwnProperty(i)&&(t=t||this._agents[i].isSupported());return t}},{key:"config",value:function(t){return(void 0!==t||null!==t&&c.isObject(t))&&c.objectMerge(this._configuration,t),this._configuration}},{key:"extend",value:function(i){var e,n={}.hasOwnProperty;if(!n.call(i,"plugin"))throw new Error(t.errors.invalid_plugin);n.call(i,"config")&&c.isObject(i.config)&&null!==i.config&&this.config(i.config),e=new(0,i.plugin)(this.config());for(var o in e)n.call(e,o)&&c.isFunction(e[o])&&(this[o]=e[o])}}]),i}())("undefined"!=typeof window?window:global)});
//# sourceMappingURL=push.min.js.map