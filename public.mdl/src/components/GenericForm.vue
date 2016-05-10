<script>
import Loader from './Loader.vue'
import StoreCol from '../stores/Collections'
import { clone, filter } from '../utils/Utils'



export default {
	components: {
		Loader
	},


  data () {
    return {
		 	loading: false,
      error: null,
      model: {},
      base: {},
      keys: [],
      relations: [],
      models: []
		}
  },

  events:{
    onLoadModels(models){
      this.models = models;
    }
  },




	/*Form Events*/
	methods: {
		clickCancel(){
      this.model = {};
      this.keys = [];
      this.relations = [];
      this.error = null;
			this.$dispatch('clickcancel');
		},


		clickSave(){
      this.error = null;
      StoreCol.addDocument(this.base.collection, this.model)
              .then(this.clickCancel);
		},


    open(baseModel, model = null){
      this.base = baseModel;
      this.keys = filter(this.base.attrs, 'isObject', false);
      if (!baseModel.isChildren)
      this.relations = filter(this.base.attrs, 'isObject', true);

      if (model){
        this.model = model;
      }
      else{
        this.keys.forEach((o, i) => {
          this.model[o.name] = o.isObject ? {} : null;
        });
      }
    },

    
    clickRelation(name){
      let m = filter(this.models, 'collection', name, 1);
      m.isChildren = true
      this.open(m);
    },

    isImage(val){
      if (!val) return false;
      return val.match(/(.png|.jpg|.gif|jpeg|.svg)/i);
    }
  }
}
</script>

<template lang='jade'>
  .mdl-card.mdl-shadow--4dp.full.mh500
    .overlay-wrap(v-show='loading')
      Loader(:show='true')
    .mdl-grid.w100
      .mdl-cell.mdl-cell--3-col
        mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary)
          i.material-icons keyboard_arrow_left
      .mdl-cell.mdl-cell--5-col.tac
        mdl-button(@click='clickSave', v-mdl-ripple-effect, raised, primary)
          i.material-icons cloud_upload

    .mdl-grid.w100
      .mdl-cell.mdl-cell--3-col.mdl-cell--3-col-tablet
        div(v-for='k in relations')
          mdl-button.w100.tal(@click='clickRelation(k.name)', v-mdl-ripple-effect) {{ k.name }}

      .mdl-cell.mdl-cell--8-col.mdl-cell--8-col-tablet.ml50
        h4.err(v-show='error') {{ error }}
        h4(v-if='model._id') {{ base.collection }}: {{ model._id }}
        h4(v-else) New {{ base.collection }}

        .frmDoc
          div(v-for='k in keys')
            img.ico(v-if='isImage(model[k.name])', v-bind:src='model[k.name]')
            mdl-textfield(floating-label, 
              :type.sync='k.type'
              :label.sync='k.name',
              :value.sync='model[k.name]')
</template>

<style lang='stylus'>
.mt50
  margin-top 50px

.ml50
  margin-left 50px

.mt35
  margin-top 35px

.tal
  text-align left

.err
  color red

.frmDoc
  .mdl-textfield
    display block

.color
  width 40px
  height 30px
</style>
