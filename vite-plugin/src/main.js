import { createApp } from 'vue'
import App from './App.vue'
import myExample from 'virtual-module'
/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */

console.log('myExample', myExample);
createApp(App).mount('#app')
