System.register("core", [], function (exports_1, context_1) {
    "use strict";
    var ERROR_CLASS_NAME, Core;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ERROR_CLASS_NAME = 'hapi-form-input-error';
            Core = /** @class */ (function () {
                function Core(hapiFormID, redirectUrl, formSelector) {
                    this.thankPageUrl = redirectUrl || '/thank-you/';
                    this._formElement = document.querySelector(formSelector);
                    // endpoint of api calling
                    this.apiEndpoint = "https://hapiform.sg/api/" + hapiFormID;
                    // backend endpoint for annie checking
                    this.backendEndpoint = "https://hapiform.sg/" + hapiFormID;
                    // thank you page url
                    this.thankPageUrl = window.location.origin + redirectUrl;
                }
                Core.prototype.disableSubmitButtons = function () {
                    // disable submit button
                    this._formElement.querySelectorAll('button[type=submit],input[type=submit]').forEach(function (submitBtn) {
                        submitBtn.setAttribute('disabled', String(true));
                    });
                };
                Core.prototype.enableSubmitButtons = function () {
                    // disable submit button
                    this._formElement.querySelectorAll('button[type=submit],input[type=submit]').forEach(function (submitBtn) {
                        submitBtn.removeAttribute('disabled');
                    });
                };
                Core.prototype.handleSubmission = function () {
                    var _this = this;
                    this._formElement.addEventListener('submit', function (event) {
                        event.preventDefault();
                        //disable submit buttons
                        _this.disableSubmitButtons();
                        var form = event.currentTarget;
                        var formData = new FormData(form);
                        // Append x_origin to formData
                        var currentUrl = new URL(window.location.href);
                        formData.append('x_origin', currentUrl.origin + currentUrl.pathname);
                        //
                        // const plainFormData = Object.fromEntries(formData.entries());
                        // const formDataJsonString = JSON.stringify(plainFormData);
                        var object = {};
                        formData.forEach(function (value, key) { return object[key] = value; });
                        var formDataJsonString = JSON.stringify(object);
                        // send post request
                        fetch(_this.apiEndpoint, {
                            method: 'POST',
                            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                            body: formDataJsonString
                        }).then(function (response) { return response.json(); }).then(function (res) {
                            var statusCode = res.status;
                            if (statusCode === 200) {
                                // redirect to thank you page
                                window.location.href = _this.thankPageUrl;
                            }
                            else {
                                // check & display error messages
                                if (res.errors) {
                                    // console.log(res.errors);
                                    _this.showError(res.errors);
                                }
                            }
                        })["catch"](function (error) {
                            console.error(error);
                        })["finally"](function () {
                            // enable submit button
                            _this.enableSubmitButtons();
                        });
                    });
                };
                Core.prototype.removeError = function () {
                    var errorDivs = this._formElement.querySelectorAll('.' + ERROR_CLASS_NAME);
                    errorDivs.forEach(function (div) {
                        div.parentNode.removeChild(div);
                    });
                };
                Core.prototype.showError = function (errors) {
                    var errorKeys = Object.keys(errors);
                    errorKeys.forEach(function (key) {
                        // console.log(key);
                        var errorDiv = document.createElement('div');
                        errorDiv.setAttribute('class', ERROR_CLASS_NAME);
                        errorDiv.innerText = errors[key][0];
                        errorDiv.setAttribute('style', 'color:red');
                        document.getElementById(key).parentNode.appendChild(errorDiv);
                    });
                };
                return Core;
            }());
            exports_1("Core", Core);
        }
    };
});
