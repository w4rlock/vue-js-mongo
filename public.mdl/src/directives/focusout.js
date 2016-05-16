import Vue from 'vue'

export default function(callback){
   Vue.nextTick(() => 
       this.el.addEventListener('focusout', callback)
   );
}
