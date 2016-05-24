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
    },

    onDragStart(e){
      e.currentTarget.classList.add('dragging');
      this.$data.dragged = e.currentTarget;
    },

    onDragEnd(e){
      e.currentTarget.classList.remove('dragging');
      console.log(e);
      console.log(e);
    }
  }
}

</script>

<style lang='stylus'>
.rowInput
  display inline-block

  .mdl-textfield
    width 120px
    margin-right 30px


  .docs
    width 270px
    margin-right 0px

.dragging
  opacity: 0.95
  border 1px solid grey
  border-style dashed

</style>

<template lang='jade'>
div(v-for='item in attrs', track-by="$index")
  .rowInput(draggable='true', @dragstart='onDragStart', @dragleave='onDragEnd')
    .mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.is-dirty(
      v-bind:class="{ 'invalid': !item.viewname,'is-dirty': item.viewname }")
      input.mdl-textfield__input(v-model='item.viewname')
      label.mdl-textfield__label Visual Name

    .mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.is-dirty(
      v-bind:class="{ 'invalid': !item.jsonfield,'is-dirty': item.jsonfield }")
      input.mdl-textfield__input(v-model='item.jsonfield')
      label.mdl-textfield__label Json Field

    .mdl-textfield.docs.mdl-js-textfield.mdl-textfield--floating-label.is-dirty(
      v-bind:class="{ 'is-dirty': item.comment }")
      input.mdl-textfield__input(v-model='item.comment')
      label.mdl-textfield__label Comment (docs)

    mdl-button.btnType(@click='clickType(this.$index, item)', v-mdl-ripple-effect) {{ item.type }}
    mdl-button(@click='clickRemove(this.$index)', v-mdl-ripple-effect)
      i.material-icons delete

mdl-button(@click='clickAddNew', v-mdl-ripple-effect, fab)
  i.material-icons add
</template>
