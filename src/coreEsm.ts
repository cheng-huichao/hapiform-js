export default class CoreEsm implements IHapiFormCoreEsm {

  readonly input_error_class_name = 'hapi-form-input-error'
  readonly default_form_selector = '#hapi-form';

  apiEndpoint: string;

  backendEndpoint: string;

  i18nLocale?: string;

  thankPageUrl: string;

  _formElement: HTMLFormElement;


  /**
   * HapiParam Core
   * @param params - IHapiParam
   */
  constructor(params: HapiParamEsm) {
    this.thankPageUrl = params.redirectUrl ?? '/thank-you.html';
    this._formElement = <HTMLFormElement>document.querySelector(params.formSelector ?? this.default_form_selector);

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
      const object: { [key: string]: any } = {};
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

        if (statusCode === 201) {
          // statuscode 201, fulfilled and created.

          //reset inputs. only when successful submission
          // user can edit the inputs when unsuccessful submit
          // no need to key in again
          this.resetInputs();

          // redirect to thank you page
          this.redirectToThankYouPage();

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
          console.error('statusCode: ', statusCode, 'Response: ', res);
        }

        // enable submit button
        this.enableSubmitButtons();

      }).catch((error) => {
        console.error(error);
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
    let errorDivs = this._formElement.querySelectorAll<HTMLDivElement>('.' + this.input_error_class_name);
    errorDivs.forEach((div: HTMLElement) => {
      div?.parentElement?.removeChild(div);
    });
  }

  showError(errors: any): void {

    let errorKeys = Object.keys(errors);
    errorKeys.forEach((key: string) => {

      let errorDiv: HTMLDivElement = document.createElement('div');
      errorDiv.setAttribute('class', this.input_error_class_name);
      errorDiv.innerText = errors[key][0];
      errorDiv.setAttribute('style', 'color:red');

      this._formElement.querySelector<HTMLElement>(`[name="${key}"]`)?.parentElement?.appendChild(errorDiv);

    });
  }

  redirectToThankYouPage() {
    // redirect to thank you page
    window.location.href = this.thankPageUrl;
  }
}

