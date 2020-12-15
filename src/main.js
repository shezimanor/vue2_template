import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import Vuelidate from 'vuelidate';
import '@/assets/css/tailwind.css';
import '@/assets/css/nprogress.css';


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(Vuelidate);


const requireComponent = require.context('./components', false, /Base[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')));

  Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
