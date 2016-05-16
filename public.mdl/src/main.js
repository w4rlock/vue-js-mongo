import Vue from 'vue'
import Mdl from 'vue-mdl'
import Vhttp from 'vue-resource'
import App from './App'
import dfo from './directives/focusout'
import foc from './directives/focus'

Vue.use(Mdl);
Vue.use(Vhttp);

Vue.directive('focus', foc);
Vue.directive('onfocusout', dfo);

/*
 *Vue.http.interceptors.push(() => { 
 *  return {
 *    request(req){
 *      return req;
 *    },
 *    response(res){
 *    
 *    }		
 *  }
 *
 *});
 */

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
