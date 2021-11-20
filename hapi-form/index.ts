import Core from "./core";

export class HapiForm {
  hapi: Core;

  /**
   * Constructor of HapiForm
   * @param hapiFormId - form id, like: '40552337-cfc0-4efe-8e09-e4bc28e9c874'
   * @param redirectUrl - redirect to page, default: '/thank-you/'
   * @param selector - selector of Form Element. default: '.hapi-form'
   */
  constructor(hapiFormId: string, redirectUrl: string, selector: string) {
    this.hapi = new Core(hapiFormId, redirectUrl, selector);

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





