<script>
import { clone } from '../utils/Utils'

export default {
  props: { 
    basemodel: { type: Object, required: true },
    attrs: { type: Array, required: true },
    autoremove: Boolean,
  },

  methods: {
    clickType(index, item){
      this.$dispatch('clicktype', index, item);
    },

    clickAddNew(){
      this.attrs.push(clone(this.basemodel));
      this.upgradeComponents();
    },

    clickRemove(index){
      if (this.autoremove){
        this.attrs.splice(index, 1);
      }
      this.$dispatch('clickRemove', index);
    },

    upgradeComponents(){
      setTimeout(() => componentHandler.upgradeAllRegistered(), 200);
    }
  }
}

</script>

<style lang='stylus'>
.rowInput
  display inline-block

</style>

<template lang='jade'>
div(v-for='item in attrs', track-by="$index")
  .rowInput
    .mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.is-dirty(
      v-bind:class="{ 'invalid': !item.name,'is-dirty': item.name }")
      input.mdl-textfield__input(v-model='item.name')
      label.mdl-textfield__label Key Name


    mdl-button.btnType(@click='clickType(this.$index, item)', v-mdl-ripple-effect) {{ item.type }}
    mdl-button(v-if="this.$index > 0", @click='clickRemove(this.$index)', v-mdl-ripple-effect)
      i.material-icons delete

mdl-button(@click='clickAddNew', v-mdl-ripple-effect, fab)
  i.material-icons add
</template>
