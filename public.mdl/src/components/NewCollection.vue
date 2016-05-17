<script>
import Loader from './Loader.vue'
import Types from './Types.vue'
import RowKeyType from './RowKeyType.vue'
import StoreCol from '../stores/Collections'
import { clone } from '../utils/Utils'

export default {
  components: {
    Types,
    Loader,
    RowKeyType
  },

  created(){
    this.setDefaults();
  },


  data () {
    return {
      index: 0,
      model: {},
      error: null,
      selectedRow: null,
      loading: false,
      baseModel: {
          name: ''
        , type: 'String'
        , isObject: false
        , required: false 
        , views: []
      },
      primateTypes: [
          'id'
        , 'Boolean'
        , 'Number'
        , 'String'
        , 'Date'
        , 'Url'
        , 'Email'
      ]
    }
  },



	/*Form Events*/
  methods: {
    setDefaults(){
      this.error = null;
      this.loading = false;
      this.selectedRow = null,
      this.model = { 
          collection:'' 
        , attrs: [ clone(this.baseModel) ]
      }
    },
    
    //edit mode
    open(bmodel){
      this.model = bmodel;
    },


    selectType(elem, isObject){
      //name recommended for sub-objects
      if (isObject){
        this.selectedRow.name = elem;
      }
      this.selectedRow.type = elem;
      this.selectedRow.isObject = isObject;
    },


    openType(index, item) {
      this.index = index;
      this.selectedRow = item;
      this.$refs.types.open(item);
    },


    close(name_event){
      return () => {
        this.setDefaults();
        this.$dispatch(name_event);
      };
    },


    isValidForm(){
      return (document.querySelector('.invalid') == null);
    },


    clickErase(){
      this.loading = true;
      StoreCol.remove(this.model.collection)
              .then(r => StoreCol.removeDocument('model', this.model._id))
              .then(this.close('clickerase'))
              .catch(this.showErrorDB);
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
                .catch(this.showErrorDB);
      }
      else{
        StoreCol.create(this.model.collection)
                .then(r=> StoreCol.addDocument('model',this.model))
                .then(this.close('clickadded'))
                .catch(this.showErrorDB);
      }
    },


    showErrorDB(err){
      this.loading = false;
      this.error = err.data;
    },



    open(mod){
      this.model = mod;
      this.entries = Object.entries(mod);
      this.upgradeComponents();
    },

    upgradeComponents(){
      setTimeout(() => componentHandler.upgradeAllRegistered(), 200);
    }
  }
}
</script>

<template lang='jade'>
  .mdl-card.mdl-shadow--4dp.full.mh700
    .overlay-wrap(v-show='loading')
      Loader(:show='true')
    .container
      .mdl-grid.w100
        .mdl-cell.mdl-cell--12-col.mdl-cell
          mdl-button(@click='close("clickcancel")()', v-mdl-ripple-effect, raised, primary)
            i.material-icons keyboard_arrow_left

          mdl-button.flat(@click='clickSave', v-mdl-ripple-effect)
            i.material-icons cloud_upload
          mdl-button.flat(v-if='model._id', @click='clickErase', v-mdl-ripple-effect)
            i.material-icons delete_forever


    .mdl-grid
      h4.err(v-show='error') {{ error }}
      .mdl-cell.mdl-cell--12-col.mdl-cell--12-col-tablet
        h3(v-if='model._id') {{ model.collection }}

        #txtCName.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.is-dirty.is-focused(
        v-else, v-bind:class="{ 'invalid': !model.collection }")
          input.mdl-textfield__input(v-model='model.collection')
          label.mdl-textfield__label Collection Name

        row-key-type(
          :autoremove='true',
          :attrs.sync='model.attrs', 
          :basemodel='baseModel',
          v-on:clicktype='openType')

    .mdl-grid
      .mdl-cell.mdl-cell--12-col.mdl-cell--12-col-tablet.black
        Types.popup(
          v-ref:types,
          v-on:select='selectType')

</template>

<style lang='stylus'>
.cName
  width 100%
  margin-bottom 30px

.full
  top 32px
  width: 100%
  margin-bottom 32px

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
