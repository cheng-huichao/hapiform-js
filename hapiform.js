var Core=function(){function t(t){this.input_error_class_name="hapi-form-input-error",this.thankPageUrl=t.redirectUrl||"/thank-you/",this._formElement=document.querySelector(t.formSelector||"#hapi-form"),this.i18nLocale=t.i18nLocale,this.apiEndpoint=this.getApiEndPoint(t.hapiFormID),this.backendEndpoint="https://hapiform.sg/"+t.hapiFormID,this.thankPageUrl=window.location.origin+t.redirectUrl}return t.prototype.getApiEndPoint=function(t){var n=new URL("https://hapiform.sg/api/"+t);return"localhost"!=window.location.hostname&&"127.0.0.1"!=window.location.hostname||n.searchParams.set("test",String(1)),this.i18nLocale&&n.searchParams.set("locale",this.i18nLocale),n.href},t.prototype.disableSubmitButtons=function(){this._formElement.querySelectorAll("button[type=submit],input[type=submit]").forEach((function(t){t.setAttribute("disabled",String(!0))}))},t.prototype.enableSubmitButtons=function(){this._formElement.querySelectorAll("button[type=submit],input[type=submit]").forEach((function(t){t.removeAttribute("disabled")}))},t.prototype.handleSubmission=function(){var t=this;this._formElement.addEventListener("submit",(function(n){n.preventDefault(),t.disableSubmitButtons(),t.removeError();var e=n.currentTarget,o=new FormData(e),i=new URL(window.location.href);o.append("x_origin",i.origin+i.pathname);var r={};o.forEach((function(t,n){return r[n]=t}));var a=JSON.stringify(r);fetch(t.apiEndpoint,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:a}).then((function(t){return{data:t.json(),status:t.status}})).then((function(n){var e=n.status;200===e?window.location.href=t.thankPageUrl:422===e?n.data.then((function(n){n.errors&&t.showError(n.errors)})):console.error(n),t.enableSubmitButtons()})).catch((function(n){console.log(n),t.enableSubmitButtons()}))}))},t.prototype.removeError=function(){this._formElement.querySelectorAll("."+this.input_error_class_name).forEach((function(t){t.parentElement.removeChild(t)}))},t.prototype.showError=function(t){var n=this;Object.keys(t).forEach((function(e){var o=document.createElement("div");o.setAttribute("class",n.input_error_class_name),o.innerText=t[e][0],o.setAttribute("style","color:red"),n._formElement.querySelector('[name="'+e+'"]').parentElement.appendChild(o)}))},t}(),HapiForm=function(){function t(t){var n=this;this.hapi=new Core(t),window.addEventListener("load",(function(){n.displayEndpoints(),n.onSubmission()}))}return t.prototype.displayEndpoints=function(){console.log("🚀 ",this.hapi.thankPageUrl),console.log("🚀 ",this.hapi.backendEndpoint)},t.prototype.onSubmission=function(){this.hapi.handleSubmission()},t}();