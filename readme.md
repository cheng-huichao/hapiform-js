## Vanilla javascript library of Hapi Form

```npm
npm i hapiform.js or yarn add hapiform.js
``` 

> Create hapi form from [here](https://hapiform.sg)


> Add reference of [hapiform.css](https://unpkg.com/hapiform.js@latest/hapiform.css) & [hapiform.js](https://unpkg.com/hapiform.js@latest/hapiform.js) unpkg cdn.

```html
<!--unpkg cdn-->

<link rel="stylesheet" href="https://unpkg.com/hapiform.js@latest/hapiform.css">

<script src="https://unpkg.com/hapiform.js@latest/hapiform.js"></script>
```

> Parameters of HapiForm - Array list. 
 
  * hapiFormID - required - form id, like: '40552337-abcd-abcd-abcd-e4bc28e9c874'
  * formSelector? - optional - selector of Form Element. default: '#hapi-form'
  * redirectUrl? - optional - redirect to page, default: '/thank-you.html'
  * i18nLocale? - optional - i18n locale code
   
_parameters with `?` means it is optional parameter_

```javascript

// set up one ot more forms
let formConfig= [  
  {
    hapiFormID: '40552337-abcd-abcd-abcd-e4bc28e9c874', // todo: replace your real form Id
    redirectUrl:'/success/'
  },
  {
    formSelector: '#hapi-form-2',
    hapiFormID: '40552337-bbbb-bbbb-bbbb-e4bc28e9c874', // todo: replace your real form Id
    redirectUrl: '/thank-you.html',
  },
]

// use class to initial hapiform
new HapiForm(formConfig)

/* or */

// use function to initial hapiform
initHapiForm(formConfig);



```
 
 

> Demo - Download the source code and open `index.html` you will see 2 forms as bellow:

![Multiple Enquiry Form Demo](demo.png)


