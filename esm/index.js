"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hapiForm = void 0;
const coreEsm_1 = __importDefault(require("./coreEsm"));
class HapiFormEsm {
    /**
     * Constructor of HapiForm
     * @param params - IHapiParam[]: array
     *  hapiFormId - form id, like: '40552337-xxxx-4efe-8e09-e4bc28e9c874'
     *  hapiFormID - hapi form id, like '40552337-yyyy-4efe-8e09-e4bc28e9c874'
     *  formSelector - selector of Form Element. default: '#hapi-form'
     *  redirectUrl - redirect to page, default: '/thank-you/'
     *  i18nLocale - i18n locale code
     */
    constructor(params) {
        var _a;
        this.isValidParams = false;
        this.handleParamCheck(params);
        if (this.isValidParams) {
            // create instances of Core class of HapiForm
            for (let index in params) {
                let hapi = new coreEsm_1.default(params[index]);
                // check form element exists or not
                let formSelector = (_a = params[index].formSelector) !== null && _a !== void 0 ? _a : hapi.default_form_selector;
                let formElement = document.querySelector(formSelector);
                if (formElement === null) {
                    console.error("can't find the form by selector", formSelector);
                    break;
                }
                // add core functions on window.load event
                window.addEventListener('load', () => {
                    // display endpoints
                    // thank you page url
                    console.info('🚀 hapi form ', hapi.thankPageUrl);
                    // backend endpoint
                    console.info('🚀 hapi form ', hapi.backendEndpoint);
                    // handle submissions
                    hapi.handleSubmission();
                });
            }
        }
    }
    handleParamCheck(params) {
        // not an array list
        if (!Array.isArray(params)) {
            console.error('invalid parameters of HapiForm constructor');
            return;
        }
        // empty array []
        if (params.length === 0) {
            console.error('empty parameters of HapiForm constructor');
            return;
        }
        // missing hapiFormID params
        let errorsNoHapiFormID = [];
        for (let index in params) {
            if (params[index].hapiFormID != null && params[index].hapiFormID.trim().length > 0) {
                // valid
            }
            else {
                console.error('No HapiFormID provided');
                errorsNoHapiFormID.push(1);
            }
        }
        if (errorsNoHapiFormID.length > 0) {
            return;
        }
        this.isValidParams = true;
    }
}
exports.hapiForm = {
    data: [],
    setup: (forms) => {
        new HapiFormEsm(forms || exports.hapiForm.data);
        console.info('Hapi Form started.');
    }
};
