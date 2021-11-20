System.register("interface", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("core", [], function (exports_2, context_2) {
    "use strict";
    var ERROR_CLASS_NAME, Core;
    var __moduleName = context_2 && context_2.id;
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
            exports_2("Core", Core);
        }
    };
});
System.register("index", ["core"], function (exports_3, context_3) {
    "use strict";
    var core_1, HapiForm;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            HapiForm = /** @class */ (function () {
                /**
                 * Constructor of HapiForm
                 * @param hapiFormId - form id, like: '40552337-cfc0-4efe-8e09-e4bc28e9c874'
                 * @param redirectUrl - redirect to page, default: '/thank-you/'
                 * @param selector - selector of Form Element. default: '.hapi-form'
                 */
                function HapiForm(hapiFormId, redirectUrl, selector) {
                    var _this = this;
                    this.hapi = new core_1.Core(hapiFormId, redirectUrl, selector);
                    window.addEventListener('load', function () {
                        // display endpoints
                        _this.displayEndpoints();
                        // handle submissions
                        _this.onSubmission();
                    });
                }
                /**
                 * Display endpoints
                 */
                HapiForm.prototype.displayEndpoints = function () {
                    // thank you page url
                    console.log('🚀 ', this.hapi.thankPageUrl);
                    // backend endpoint
                    console.log('🚀 ', this.hapi.backendEndpoint);
                };
                /**
                 * Handle Submission
                 */
                HapiForm.prototype.onSubmission = function () {
                    this.hapi.handleSubmission();
                };
                return HapiForm;
            }());
            exports_3("HapiForm", HapiForm);
        }
    };
});
