/**
 * Interface of HapiForm Core
 */
interface IHapiFormCore {

  apiEndpoint: string;

  thankPageUrl: string;

  backendEndpoint: string;

  i18nLocale?: string;

  handleSubmission();

  showError(errors: object);

  removeError();

}

/**
 * /**
 * Parameters/config of HapiForm
 * @param hapiFormID - hapi form id, like '40552337-cfc0-4efe-8e09-e4bc28e9c874'
 * @param formSelector - selector of Form Element. default: '#hapi-form'
 * @param redirectUrl - redirect to page, default: '/thank-you/'
 * @param i18nLocale - i18n locale code
 */
interface IHapiParam {
  hapiFormID: string;
  formSelector?: string;
  redirectUrl?: string;
  i18nLocale?: string;
}

/**
 * Hapi Form Core
 */
class Core implements IHapiFormCore {

  readonly input_error_class_name = 'hapi-form-input-error'

  apiEndpoint: string;

  backendEndpoint: string;

  i18nLocale?: string;

  thankPageUrl: string;


  _formElement: HTMLElement;


  /**
   * HapiParam Core
   * @param params - IHapiParam
   */
  constructor(params: IHapiParam) {
    this.thankPageUrl = params.redirectUrl || '/thank-you/';
    this._formElement = document.querySelector(params.formSelector || '#hapi-form');
    this.i18nLocale = params.i18nLocale;

    // endpoint of api calling
    this.apiEndpoint = this.getApiEndPoint(params.hapiFormID);

    // backend endpoint for annie checking
    this.backendEndpoint = `https://hapiform.sg/${params.hapiFormID}`;

    // thank you page url
    this.thankPageUrl = window.location.origin + params.redirectUrl;
  }

  getApiEndPoint(formId: string): string {
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


  disableSubmitButtons() {
    // disable submit button
    this._formElement.querySelectorAll('button[type=submit],input[type=submit]').forEach(submitBtn => {
      submitBtn.setAttribute('disabled', String(true));
    });
  }

  enableSubmitButtons() {
    // disable submit button
    this._formElement.querySelectorAll('button[type=submit],input[type=submit]').forEach(submitBtn => {
      submitBtn.removeAttribute('disabled');
    });
  }

  handleSubmission() {
    this._formElement.addEventListener('submit', (event: Event) => {
      event.preventDefault();

      //disable submit buttons
      this.disableSubmitButtons();

      this.removeError();

      const form = <HTMLFormElement>event.currentTarget;
      let formData = new FormData(form);
      // Append x_origin to formData
      let currentUrl = new URL(window.location.href);
      formData.append('x_origin', currentUrl.origin + currentUrl.pathname);
      //
      // const plainFormData = Object.fromEntries(formData);
      // const formDataJsonString = JSON.stringify(plainFormData);
      let object = {};
      formData.forEach((value, key) => object[key] = value);
      let formDataJsonString = JSON.stringify(object);

      // send post request
      fetch(this.apiEndpoint,
        {
          method: 'POST',
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: formDataJsonString,
        },
      ).then((response) => {
        return {data: response.json(), status: response.status}
      }).then((res) => {
        const statusCode = res.status;

        if (statusCode === 200) {

          // redirect to thank you page
          window.location.href = this.thankPageUrl;

        } else if (statusCode === 422) {
          // form validation errors

          res.data.then(data => {
            // check & display error messages
            if (data.errors) {

              // console.log(res.errors);
              this.showError(data.errors);
            }
          });


        } else {
          // other errors
          // like 466, domain errors
          console.error(res);
        }

        // enable submit button
        this.enableSubmitButtons();

      }).catch((error) => {
        console.log(error);
        // enable submit button
        this.enableSubmitButtons();
      })
      //   .finally(() => {
      //   // enable submit button
      //   this.enableSubmitButtons();
      // });

    })
  }

  removeError(): void {
    let errorDivs = this._formElement.querySelectorAll('.' + this.input_error_class_name);
    errorDivs.forEach((div: HTMLDivElement) => {
      div.parentElement.removeChild(div);
    });
  }

  showError(errors: object): void {

    let errorKeys = Object.keys(errors);
    errorKeys.forEach((key: string) => {

      let errorDiv: HTMLDivElement = document.createElement('div');
      errorDiv.setAttribute('class', this.input_error_class_name);
      errorDiv.innerText = errors[key][0];
      errorDiv.setAttribute('style', 'color:red');

      this._formElement.querySelector(`[name="${key}"]`).parentElement.appendChild(errorDiv);

    });
  }


}

/**
 * HapiForm Main Class
 */
class HapiForm {
  hapi: Core;

  /**
   * Constructor of HapiForm
   * @param params - IHapiParam
   * hapiFormId - form id, like: '40552337-cfc0-4efe-8e09-e4bc28e9c874'
   *  hapiFormID - hapi form id, like '40552337-cfc0-4efe-8e09-e4bc28e9c874'
   *  formSelector - selector of Form Element. default: '#hapi-form'
   *  redirectUrl - redirect to page, default: '/thank-you/'
   *  i18nLocale - i18n locale code
   */
  constructor(params: IHapiParam) {
    this.hapi = new Core(params);

    window.addEventListener('load', () => {
      // display endpoints
      this.displayEndpoints();

      // handle submissions
      this.onSubmission();
    })

  }

  /**
   * Display endpoints
   */
  displayEndpoints() {
    // thank you page url
    console.log('🚀 ', this.hapi.thankPageUrl);

    // backend endpoint
    console.log('🚀 ', this.hapi.backendEndpoint);
  }

  /**
   * Handle Submission
   */
  onSubmission() {
    this.hapi.handleSubmission();
  }

}

