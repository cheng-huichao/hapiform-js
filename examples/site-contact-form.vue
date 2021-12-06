<template>
  <div>
    <form id="hapi-form" class="contact-form">
      <div class="">
        <div class="contact-form-group">
          <input id='name' name="name" type="text" class="contact-form-input" placeholder=" ">
          <label for="name" class="contact-form-label">Name</label>
        </div>
      </div>

      <div class="">
        <div class="contact-form-group">
          <input id='contact_no' name="contact" type="tel" class="contact-form-input" placeholder=" ">
          <label for="contact_no" class="contact-form-label">Contact No.</label>
        </div>
      </div>

      <div class="">
        <div class="contact-form-group">
          <input id='email' name="email" type="email" class="contact-form-input" placeholder=" ">
          <label for="email" class="contact-form-label">Email</label>
        </div>
      </div>

      <div class="">
        <div class="contact-form-group">
          <textarea id='message' name="message" class="contact-form-input" placeholder=" "></textarea>
          <label for="message" class="contact-form-label">Message</label>
        </div>
      </div>
      <div class="">
        <button type="submit" class="relative mt-5 uppercase btn">
          <span class="lg:text-lg">Submit</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>

// install hapiform.js first
// yarn add hapiform.js

import {hapiForm} from 'hapiform.js';

export default {
  data() {
    return {};
  },
  mounted() {

    hapiForm.setup([
      {
        formSelector: '#hapi-form',
        hapiFormID: 'adaf0cf3-aaaa-aaaa-aaaa-e180e734f588',
        redirectUrl: '/thank-you/',
      }],
    );

  },
};
</script>

<style scoped>

.contact-form {
  @apply relative space-y-3 lg:space-y-5;
}

.contact-form-group {
  @apply relative rounded;
}

.contact-form-input {
  @apply block px-3 py-2 w-full appearance-none focus:outline-none text-[#4b599e];
  appearance: none;
  z-index: 1;
}

.contact-form-label {
  z-index: 0;
  transform-origin: 0%;
  @apply absolute top-0 bg-white rounded px-3 py-2 duration-300 text-[#4b599e];

}


.contact-form-input:focus-within ~ label,
.contact-form-input:not(:placeholder-shown) ~ label {
  @apply z-0 px-1 py-0 ml-3 transform scale-75 -translate-y-4;
  transform-origin: 0%;
}


.hapi-form-input-error{

}

</style>
