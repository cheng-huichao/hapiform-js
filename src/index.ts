import CoreEsm from "./coreEsm";

class HapiFormEsm {

  private isValidParams: boolean = false;

  /**
   * Constructor of HapiForm
   * @param params - IHapiParam[]: array
   *  hapiFormId - form id, like: '40552337-xxxx-4efe-8e09-e4bc28e9c874'
   *  hapiFormID - hapi form id, like '40552337-yyyy-4efe-8e09-e4bc28e9c874'
   *  formSelector - selector of Form Element. default: '#hapi-form'
   *  redirectUrl - redirect to page, default: '/thank-you/'
   *  i18nLocale - i18n locale code
   */
  constructor(params: HapiParamEsm[]) {

    this.handleParamCheck(params);

    if (this.isValidParams) {
      // create instances of Core class of HapiForm
      for (let index in params) {
        let hapi: CoreEsm = new CoreEsm(params[index]);

        // check form element exists or not
        let formSelector: string = params[index].formSelector ?? hapi.default_form_selector;
        let formElement: HTMLFormElement | null = document.querySelector(formSelector);

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
        })

      }
    }
  }

  handleParamCheck(params: HapiParamEsm[]) {

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
    let errorsNoHapiFormID: Number[] = [];
    for (let index in params) {
      if (params[index].hapiFormID != null && params[index].hapiFormID.trim().length > 0) {
        // valid
      } else {
        console.error('No HapiFormID provided')
        errorsNoHapiFormID.push(1);
      }
    }
    if (errorsNoHapiFormID.length > 0) {
      return;
    }

    this.isValidParams = true;
  }

}

export const hapiForm = {
  data: [],
  setup: (forms?: HapiParamEsm[]) => {

    new HapiFormEsm(forms || hapiForm.data)

    console.info('Hapi Form started.');
  }
}



