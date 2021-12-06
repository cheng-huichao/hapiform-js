/**
 * Interface of HapiForm Core
 */
interface IHapiFormCoreEsm {

  apiEndpoint: string;

  thankPageUrl: string;

  backendEndpoint: string;

  i18nLocale?: string;

  handleSubmission();

  resetInputs();

  showError(errors: object);

  removeError();

  redirectToThankYouPage();

}

/**
 * /**
 * Parameters/config of HapiForm
 * @param hapiFormID - hapi form id, like '40552337-cfc0-4efe-8e09-e4bc28e9c874'
 * @param formSelector - selector of Form Element. default: '#hapi-form'
 * @param redirectUrl - redirect to page, default: '/thank-you/'
 * @param i18nLocale - i18n locale code
 */
type HapiParamEsm = {
  hapiFormID: string;
  formSelector?: string;
  redirectUrl?: string;
  i18nLocale?: string;
}
