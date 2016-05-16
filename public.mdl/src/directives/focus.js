import Vue from 'vue'

export default {
    update(val){
        if (!val) return;
        Vue.nextTick(() => this.el.focus());
    }
};
