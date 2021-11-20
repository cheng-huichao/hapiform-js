## Vanilla javascript library of Hapi Form

> add reference of `hapiform.css` & `hapiform.js` into your pages.

```javascript
<script src="./hapiform.js"></script>
<script>
  /**
  * Parameters/config of HapiForm
  * @param hapiFormID - form id, like: '40552337-abcd-abcd-abcd-e4bc28e9c874'
  * @param formSelector? - selector of Form Element. default: '#hapi-form'
  * @param redirectUrl? - redirect to page, default: '/thank-you.html'
  * @param i18nLocale? - i18n locale code
  */
  new HapiForm({hapiFormID: '40552337-abcd-abcd-abcd-e4bc28e9c874', redirectUrl:'/thank-you.html'});
</script>

```

> Multiple forms in one page:

```javascript

/*
* using `formSelector` for multiple forms in one page.
* */

<script src="./hapiform.js"></script>
<script>
  new HapiForm({formSelector: 'hapi-form-1', hapiFormID: '40552337-0000-0000-0000-e4bc28e9c874',  redirectUrl:'/thank-you.html'});
  new HapiForm({formSelector: 'hapi-form-2', hapiFormID: '40552337-1111-1111-1111-e4bc28e9c874', redirectUrl:'/thank-you.html'});
</script>

```

