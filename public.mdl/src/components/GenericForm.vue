<script>
import Loader from './Loader.vue'
import StoreCol from '../stores/Collections'
import TabBar from './TabBar'
import DataGrid from './DataGrid'
import Db from '../stores/Db'
import { isImage, clone, filter } from '../utils/Utils'


export default {
	components: {
		Loader,
    DataGrid,
    TabBar
	},

  data() {
    return this.setDefaults();
  },

  events:{
    onLoadModels(models){
      this.models = models;
    }
  },


	/*Form Events*/
	methods: {
    setDefaults(){
      return {
        model: {}
      , base: {}
      , keys: []
      , selectedrel: { keys: [], entity: '', name: '' }
      , relations: []
      , error: null
      , isImage: isImage
      , loading: false
      , tabs: []
      , showsearchinput: false
      }
    },

		clickCancel(){
      this.$refs.datagrid.show = false;
      this.$refs.tabbar.reset();

      this.$data = this.setDefaults();
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
      this.relations = filter(this.base.attrs, 'isObject', true) || [];

      if (this.relations.length > 0){
        this.relations.forEach((o) => this.model[o.name] = []);

        this.tabs = this.relations.map(r => r.type);
        this.tabs.splice(0,0,this.base.collection);
      }

      //edit mode - open existent model
      if (model){
        this.model = model;
      }
      else{
        this.keys.forEach((o) => this.model[o.name] = null );
      }
      this.upgradeComponents();
    },


    clickTab(index, name){
      if (index > 0){
        this.selectedrel.entity = name;
        this.selectedrel.name = this.relations[index-1].name;
        this.selectedrel.keys = this.relations[index-1].views;
      }

      this.$refs.datagrid.show = (index > 0);
    },

    upgradeComponents(){
      setTimeout(() => componentHandler.upgradeAllRegistered(), 500);
    }
  }
}
</script>

<template lang='jade'>
  .mdl-card.mdl-shadow--4dp.full.mh700
    .overlay-wrap(v-show='loading')
      Loader(:show='true')
    .mdl-grid.w100
      .mdl-cell.mdl-cell--1-col
        mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary)
          i.material-icons keyboard_arrow_left
      .mdl-cell.mdl-cell--3-col.tac
        mdl-button(@click='clickSave', v-mdl-ripple-effect, raised, primary)
          i.material-icons cloud_upload

    .mdl-grid.w100
      .mdl-cell.mdl-cell--11-col.mdl-cell--11-col-tablet.ml50
        .mdl-tabs.mdl-js-tabs.mdl-js-ripple-effect
          tab-bar(v-ref:tabbar, :names.sync='tabs', v-on:clicktab='clickTab', :cclass='"bar"')
          .mdl-tabs__panel.mt90(:id='"panel-"+base.collection', :class='{ "is-active": this.$refs.tabbar.selectedTab == 0 }') 
            h4.err(v-show='error') {{ error }}
            h5(v-if='model._id') {{ base.collection }}: {{ model._id }}
            h5(v-else) New {{ base.collection }}

            .frm
              div(v-for='k in keys')
                img.ico(v-if='isImage(model[k.name])', :src='model[k.name]')
                mdl-textfield(floating-label, 
                  :type.sync='k.type'
                  :label.sync='k.name',
                  :value.sync='model[k.name]')

          .mdl-tabs__panel.is-active.absolute

            data-grid(v-ref:datagrid,
              :showheads='false', 
              :heads.sync='selectedrel.keys', 
              :checks='model[selectedrel.name] || []', 
              :entity='selectedrel.entity', 
              :showidcol='false')

      .mdl-cell.mdl-cell--1-col.mdl-cell--1-col-tablet.ml50

</template>

<style lang='stylus'>
.mt90
  margin-top 90px

.mt50
  margin-top 50px

.bar
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: 85px;
  border-top: 1px solid #e0e0e0;

.absolute
  width 100%
  position absolute
  left 0
  right 0
  top 150px

.ml50
  margin-left 50px

.mt35
  margin-top 35px

.tal
  text-align left

.err
  color red

.color
  width 40px
  height 30px
</style>
