## Vanilla javascript library of Hapi Form

```npm
npm i hapiform.js or yarn add hapiform.js
``` 

> Create hapi form from [here](https://hapiform.sg)


> Add reference of `hapiform.css` & `hapiform.js` into your pages.

```javascript
<script src="./hapiform.js"></script>
<script>
  /**
  * Parameters/config of HapiForm
  * @param hapiFormID - required - form id, like: '40552337-abcd-abcd-abcd-e4bc28e9c874'
  * @param formSelector? - optional - selector of Form Element. default: '#hapi-form'
  * @param redirectUrl? - optional - redirect to page, default: '/thank-you.html'
  * @param i18nLocale? - optional - i18n locale code
  */
  new HapiForm(
    {
      hapiFormID: '40552337-abcd-abcd-abcd-e4bc28e9c874',
      redirectUrl:'/thank-you.html'
    }
  );
</script>

```

> Multiple forms in one page:

```javascript

/*
* using `formSelector` for multiple forms in one page.
* */

<script src="./hapiform.js"></script>
<script>
  /* form 1 */
  new HapiForm(
    {
      formSelector: '#hapi-form-1',
      hapiFormID: '40552337-abcd-abcd-abcd-e4bc28e9c874', // todo: replace your real form Id
      redirectUrl: '/thank-you.html',
    }
  );
  
  /* form 2 */
  new HapiForm(
    {
      formSelector: '#hapi-form-2',
      hapiFormID: '40552337-abcd-abcd-abcd-e4bc28e9c874', // todo: replace your real form Id
      redirectUrl: '/thank-you.html',
    }
  );
</script>

```

> Demo - Download the source code and open `index.html` you will see 2 forms as bellow:

![Multiple Enquiry Form Demo](demo.png)


