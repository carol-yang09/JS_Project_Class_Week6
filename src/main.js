/* eslint-disable no-unused-vars */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import {
  ValidationProvider, ValidationObserver, extend, localize, configure,
} from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import 'vue-loading-overlay/dist/vue-loading.css';
import TW from 'vee-validate/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

// vue-axios 設定
Vue.use(VueAxios, axios);

// vue-loading-overlay 設定
Vue.component('Loading', Loading);

// vee-validate 設定
localize('zh_TW', TW);

extend('email', email);
extend('required', {
  ...required,
  message: '{_field_} 欄位不能空白',
});

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
