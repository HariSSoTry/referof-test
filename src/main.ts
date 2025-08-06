import { createApp } from 'vue';
import App from './App.vue';
import { configure } from 'vee-validate';

// Настройка VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

createApp(App).mount('#app');