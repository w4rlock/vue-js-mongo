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


  methods:{
    setDefaults(){
      return {
        model: {}
      , base: {}
      , keys: []
      , selectedrel: { views: [], viewname: '', jsonfield: '' }
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
        StoreCol.addDocument(this.base.dbcollection, this.model)
                .then(this.clickCancel);
      },


      open(baseModel, model = null){
        this.base = baseModel;
        this.keys = filter(this.base.attrs, 'isObject', false);
        this.relations = filter(this.base.attrs, 'isObject', true) || [];

        if (this.relations.length > 0){
          this.tabs = this.relations.map(r => r.viewname);
          this.tabs.splice(0,0,this.base.viewcollection);
        }

        //edit mode - open existent model
        if (model){
          this.model = model;
        }
        else{
          this.initializeFormModel();
        }
        this.upgradeComponents();
      },


      initializeFormModel(){
        this.relations.forEach((o) => this.model[o.jsonfield] = []);

        this.keys.forEach((o) => {
          if (o.type == 'Boolean'){
            this.model[o.jsonfield] = false;
          }
          else{
            this.model[o.jsonfield] = null
          }
        });
      },

      clickTab(index, name){
        if (index > 0){
          this.selectedrel.jsonfield = this.relations[index-1].type.toLowerCase();
          this.selectedrel.viewname = this.relations[index-1].viewname;
          this.selectedrel.views = this.relations[index-1].views;
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
      .mdl-cell.mdl-cell--6-col
        mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary)
          i.material-icons keyboard_arrow_left
        mdl-button.flat(@click='clickSave', v-mdl-ripple-effect)
          i.material-icons cloud_upload

    .mdl-grid.w100
      .mdl-cell.mdl-cell--11-col.mdl-cell--11-col-tablet.ml50
        .mdl-tabs.mdl-js-tabs.mdl-js-ripple-effect
          tab-bar(v-ref:tabbar, :names.sync='tabs', v-on:clicktab='clickTab', :cclass='"bar"')

          .mdl-tabs__panel(:id='"panel-"+base.dbcollection', :class='{"mt90": (relations.length > 0), "is-active": this.$refs.tabbar.selectedTab == 0 }')

            h4.err(v-show='error') {{ error }}
            h5(v-if='model._id') {{ base.viewcollection }}: {{ model._id }}
            h5(v-else) New {{ base.viewcollection }}

            .frm
              div(v-for='k in keys')
                div(v-if='k.type=="Boolean"')
                  .mdl-textfield--floating-label.is-focused {{ k.viewname }}
                  mdl-switch(:checked.sync='model[k.jsonfield]', value='true')

                div(v-else)
                  img.ico(v-if='isImage(model[k.name])', :src='model[k.jsonfield]')

                  mdl-textfield(floating-label,
                    :class='{ "color": k.type == "Color" }',
                    :type.sync='k.type'
                    :label.sync='k.viewname',
                    :value.sync='model[k.jsonfield]')

          .mdl-tabs__panel.absolute(:class='{ "is-active": this.$refs.tabbar.selectedTab != 0 }')
            data-grid(v-ref:datagrid,
              :showheads='false',
              :heads.sync='selectedrel.views',
              :checks='model[selectedrel.jsonfield] || []',
              :entity='selectedrel.jsonfield',
              :showidcol='false')

      .mdl-cell.mdl-cell--1-col.mdl-cell--1-col-tablet.ml50

</template>

<style lang='stylus'>
.mdl-tabs__panel
  min-height 350px

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
  input
    width 50px
    height 50px

</style>
