<script>
import Loader from './Loader.vue'
import Types from './Types.vue'
import StoreCol from '../stores/Collections'

export default {
  components: {
    Types,
    Loader
  },

  created(){
    this.setDefaults();
  },

  data () {
    return {
      loading: false,
      error: null,
      showTypes: false,
      index: 0,
      model: {},
      primateTypes: [
        'id'
      , 'Boolean'
      , 'Number'
      , 'String'
      , 'Date'
      , 'Url'
      , 'Email'
      ],
      complexTypes: []
    }
  },



	/*Form Events*/
  methods: {
    setDefaults(){
      this.model = { collection:'', attrs: [ this.newEmptyModel() ]};
      this.error = null;
      this.loading = false;
    },
    
    open(bmodel){
      this.model = bmodel;
    },
    

    selectType(elem, isPrimate){
      this.model.attrs[this.index].type = elem;
      this.showTypes = false;
    },

    openType(index){
      this.index = index;
      this.showTypes = true;
    },

    close(name_event){
      return () => {
        this.setDefaults();
        this.$dispatch(name_event);
      };
    },

    newEmptyModel(){
      return { name: '', type: 'String', required: false };
    },

    clickAddNew(){
      this.model.attrs.push(this.newEmptyModel());
      this.upgradeComponents();
    },

    clickRemove(index){
      this.model.attrs.splice(index, 1);
    },


    isValidForm(){
      return (document.querySelector('.invalid') == null);
    },

    clickErase(){
      this.loading = true;
      StoreCol.remove(this.model.collection)
              .then(r=>StoreCol.removeDocument('model', this.model._id))
              .then(this.close('clickerase'))
              .catch(this.showError);
    },

    clickSave(){
			if (!this.isValidForm()){
			 return;
      }

      this.error = null;
      this.loading = true;
      if (this.model._id){
        StoreCol.updateDocument('model', this.model)
                .then(this.close('clickcancel'))
                .catch(this.showError);
      }
      else{
        StoreCol.create(this.model.collection)
                .then(r=> StoreCol.addDocument('model',this.model))
                .then(this.close('clickadded'))
                .catch(this.showError);
      }
    },

    showError(err){
      this.loading = false;
      this.error = err.data;
    },

    closeDelay(){
      setTimeout(() => {
        this.loading = false;
        this.clickCancel();
      }, 400);
    },

    eraseDelay(){
      setTimeout(() => {
        this.loading = false;
        this.closeByErase();
      }, 400);
    },

    open(document){
      this.model = document;
      this.entries = Object.entries(document);
      this.upgradeComponents();
    },

    upgradeComponents(){
      setTimeout(() => componentHandler.upgradeAllRegistered(), 200);
    }
  }
}
</script>

<template lang='jade'>
  .mdl-card.mdl-shadow--4dp.full.mh500
    .overlay-wrap(v-show='loading')
      Loader(:show='true')
    .container
      .mdl-grid
        .mdl-cell.mdl-cell--2-col
        .mdl-cell.mdl-cell--3-col.mdl-cell.mdl-cell--4-col-tablet
          mdl-button(@click='close("clickcancel")()', v-mdl-ripple-effect, raised, primary)
            i.material-icons keyboard_arrow_left

          mdl-button(@click='clickSave', v-mdl-ripple-effect, raised, primary)
            i.material-icons cloud_upload

        .mdl-cell.mdl-cell--2-col
          mdl-button(v-if='model._id', @click='clickErase', v-mdl-ripple-effect, raised)
            i.material-icons delete_forever

    .mdl-grid
      h4.err(v-show='error') {{ error }}
      .mdl-cell.mdl-cell--12-col.mdl-cell--12-col-tablet
        h3(v-if='model._id') {{ model.collection }}

        #txtCName.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.is-dirty(
        v-else, v-bind:class="{ 'invalid': !model.collection }")
          input.mdl-textfield__input(v-model='model.collection')
          label.mdl-textfield__label Collection Name

        div(v-for='item in model.attrs')
          .rowInput
            .mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.is-dirty(v-bind:class="{ 'invalid': !item.name }")
              input.mdl-textfield__input(v-model='item.name')
              label.mdl-textfield__label Key Name


            mdl-button.btnType(@click='openType(this.$index)', v-mdl-ripple-effect) {{ item.type }}
            mdl-button(v-if="this.$index > 0", @click='clickRemove(this.$index)', v-mdl-ripple-effect)
              i.material-icons delete

        mdl-button(@click='clickAddNew', v-mdl-ripple-effect, fab)
          i.material-icons add

    .mdl-grid
      .mdl-cell.mdl-cell--12-col.mdl-cell--12-col-tablet.black
        Types.popup(v-on:clickcancel='showTypes=false', :show='showTypes', v-on:select='selectType')
</template>

<style lang='stylus'>
.cName
  width 100%
  margin-bottom 30px

.full
  top 32px
  width: 100%
  margin-bottom 32px

.rowInput
  display inline-block

.mdl-textfield
  display inline-block

.btnType
  width 120px
  text-align left

.popup
	position: absolute;
	background: white;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
</style>
