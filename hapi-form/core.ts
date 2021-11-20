


export default class Core {

  readonly ERROR_CLASS_NAME = 'hapi-form-input-error'

  apiEndpoint: string;

  backendEndpoint: string;

  thankPageUrl: string;

  _formElement: HTMLElement;

  constructor(hapiFormID: string, redirectUrl: string, formSelector: string) {
    this.thankPageUrl = redirectUrl || '/thank-you/';
    this._formElement = document.querySelector(formSelector);

    // endpoint of api calling
    this.apiEndpoint = `https://hapiform.sg/api/${hapiFormID}`;

    // backend endpoint for annie checking
    this.backendEndpoint = `https://hapiform.sg/${hapiFormID}`;

    // thank you page url
    this.thankPageUrl = window.location.origin + redirectUrl;
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
    this._formElement.addEventListener('submit', (event) => {
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
      // const plainFormData = Object.fromEntries(formData.entries());
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
      ).then((response) => response.json()).then((res) => {
        const statusCode = res.status;
        if (statusCode === 200) {

          // redirect to thank you page
          window.location.href = this.thankPageUrl;

        } else {

          // check & display error messages
          if (res.errors) {

            // console.log(res.errors);
            this.showError(res.errors);
          }
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
    let errorDivs = this._formElement.querySelectorAll('.' + this.ERROR_CLASS_NAME);
    errorDivs.forEach((div) => {
      div.parentNode.removeChild(div);
    });
  }

  showError(errors: any): void {
    let errorKeys = Object.keys(errors);
    errorKeys.forEach((key) => {
      // console.log(key);
      let errorDiv = document.createElement('div');
      errorDiv.setAttribute('class', this.ERROR_CLASS_NAME);
      errorDiv.innerText = errors[key][0];
      errorDiv.setAttribute('style', 'color:red');
      document.getElementById(key).parentNode.appendChild(errorDiv);
    });
  }


}


