## javascript library of Hapi Form

```bash
npm i hapiform.js or yarn add hapiform.js
```


### For ESM usage

```javascript

import {hapiForm} from 'hapiform.js';

hapiForm.setup([
  {
    formSelector: '#hapi-form',
    hapiFormID: 'adaf0cf3-aaaa-aaaa-aaaa-e180e734f588',
    redirectUrl: '/thank-you/',
  }]
);


```

### For HTML project 
```html
<!--unpkg cdn-->

<link rel="stylesheet" href="https://unpkg.com/hapiform.js@latest/hapiform.css">

<script src="https://unpkg.com/hapiform.js@latest/hapiform.js"></script>
```

```javascript

// set up one or more forms
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
// use function to initial hapiform
initHapiForm(formConfig);

```

### Parameters

* hapiFormID - required - form id, like: '40552337-abcd-abcd-abcd-e4bc28e9c874'
* formSelector? - optional - selector of Form Element. default: '#hapi-form'
* redirectUrl? - optional - redirect to page, default: '/thank-you/'
* i18nLocale? - optional - i18n locale code

_parameters with `?` means it is optional parameter_



