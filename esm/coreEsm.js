"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CoreEsm {
    /**
     * HapiParam Core
     * @param params - IHapiParam
     */
    constructor(params) {
        var _a, _b;
        this.input_error_class_name = 'hapi-form-input-error';
        this.default_form_selector = '#hapi-form';
        this.thankPageUrl = (_a = params.redirectUrl) !== null && _a !== void 0 ? _a : '/thank-you.html';
        this._formElement = document.querySelector((_b = params.formSelector) !== null && _b !== void 0 ? _b : this.default_form_selector);
        this.i18nLocale = params.i18nLocale;
        // endpoint of api calling
        this.apiEndpoint = this.getApiEndPoint(params.hapiFormID);
        // backend endpoint for annie checking
        this.backendEndpoint = `https://hapiform.sg/${params.hapiFormID}`;
        // thank you page url
        this.thankPageUrl = window.location.origin + params.redirectUrl;
    }
    getApiEndPoint(formId) {
        let endpoint = `https://hapiform.sg/api/${formId}`;
        let url = new URL(endpoint);
        if (window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1") {
            url.searchParams.set("test", String(1));
        }
        if (this.i18nLocale) {
            url.searchParams.set("locale", this.i18nLocale);
        }
        return url.href;
    }
    resetInputs() {
        this._formElement.reset();
    }
    disableSubmitButtons() {
        // disable submit button
        this._formElement.querySelectorAll('[type=submit]').forEach((submitBtn) => {
            submitBtn.setAttribute('disabled', String(true));
            // submitBtn.innerText = 'please wait...';
        });
    }
    enableSubmitButtons() {
        // disable submit button
        this._formElement.querySelectorAll('[type=submit]').forEach(submitBtn => {
            submitBtn.removeAttribute('disabled');
        });
    }
    handleSubmission() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            //disable submit buttons
            this.disableSubmitButtons();
            this.removeError();
            const form = event.currentTarget;
            let formData = new FormData(form);
            // Append x_origin to formData
            let currentUrl = new URL(window.location.href);
            formData.append('x_origin', currentUrl.origin + currentUrl.pathname);
            //
            // const plainFormData = Object.fromEntries(formData);
            // const formDataJsonString = JSON.stringify(plainFormData);
            const object = {};
            formData.forEach((value, key) => object[key] = value);
            let formDataJsonString = JSON.stringify(object);
            // send post request
            fetch(this.apiEndpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: formDataJsonString,
            }).then((response) => {
                return { data: response.json(), status: response.status };
            }).then((res) => {
                const statusCode = res.status;
                if (statusCode === 201) {
                    // statuscode 201, fulfilled and created.
                    //reset inputs. only when successful submission
                    // user can edit the inputs when unsuccessful submit
                    // no need to key in again
                    this.resetInputs();
                    // redirect to thank you page
                    this.redirectToThankYouPage();
                }
                else if (statusCode === 422) {
                    // form validation errors
                    res.data.then(data => {
                        // check & display error messages
                        if (data.errors) {
                            // console.log(res.errors);
                            this.showError(data.errors);
                        }
                    });
                }
                else {
                    // other errors
                    // like 466, domain errors
                    console.error('statusCode: ', statusCode, 'Response: ', res);
                }
                // enable submit button
                this.enableSubmitButtons();
            }).catch((error) => {
                console.error(error);
                // enable submit button
                this.enableSubmitButtons();
            });
            //   .finally(() => {
            //   // enable submit button
            //   this.enableSubmitButtons();
            // });
        });
    }
    removeError() {
        let errorDivs = this._formElement.querySelectorAll('.' + this.input_error_class_name);
        errorDivs.forEach((div) => {
            var _a;
            (_a = div === null || div === void 0 ? void 0 : div.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(div);
        });
    }
    showError(errors) {
        let errorKeys = Object.keys(errors);
        errorKeys.forEach((key) => {
            var _a, _b;
            let errorDiv = document.createElement('div');
            errorDiv.setAttribute('class', this.input_error_class_name);
            errorDiv.innerText = errors[key][0];
            errorDiv.setAttribute('style', 'color:red');
            (_b = (_a = this._formElement.querySelector(`[name="${key}"]`)) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(errorDiv);
        });
    }
    redirectToThankYouPage() {
        // redirect to thank you page
        window.location.href = this.thankPageUrl;
    }
}
exports.default = CoreEsm;
