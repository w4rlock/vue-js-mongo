<script>
import Loader from './Loader.vue'
import Db from '../stores/Db'
import StoreCol from '../stores/Collections'
import { filter } from '../utils/Utils'

export default {
  components: {
    Loader
  },


  created(){
    this.loadData();
  },

  data () {
    return {
      relations: [],
      gridKeys: [],
      gridHeads: [],
      notDataFound: false,
      data: {},
      checks: [],
      loading: false,
      bmodel: null
    };
  },

  methods: {
    setModel(c){
      this.bmodel = c;
      this.gridHeads = c.attrs;//filter(c.attrs,'isObject', false);
    },


    // @param {Number} p is page number
    search(p = 1){
      this.checks = [];
      this.loading = true;

      Db.getDocuments(this.bmodel.dbcollection, p).then(r => {
        this.data = r.data.data || [];
        this.notDataFound = (this.data.length == 0);
        this.loading = false;

        setTimeout(() => { componentHandler.upgradeAllRegistered() }, 100);

      });
    },

    // @param {Object} r is the currentRow for grid
    // @param {Object} m is the model for grid
    labelForType(r, m){
      if (!r[m.jsonfield]){
        return '';
      }

      if (!this.hasChild(r[m.jsonfield])){
        return r[m.jsonfield];
      }

      let cant = (Array.isArray(r[m.jsonfield])) ? r[m.jsonfield].length : 0;
      return `[ ${cant} ]`;
    },

    hasChild(field){
      return ((typeof field == 'object')
           || (Array.isArray(field)));
    },


    loadData(){
      this.checks = [];
    },


    clickRefresh(){
      this.search();
    },


    clickOpen(){
      let pos = this.checks[0];
      let w = this.data[pos];

      this.$dispatch('clickopen', w);
    },


    clickNew(){
      this.$dispatch('clicknew');
    },


    clickDelete(){
      this.checks.forEach((i) => {
        let id = this.data[i]._id;
        StoreCol.removeDocument(this.bmodel.dbcollection, id);
      });
      setTimeout(() => { this.search(); }, 300);
    },


    checkColor(index){
      if (index > 0){
        //$index-1 ya que no tengo el attrib _id en el modelo
        let attr = this.gridHeads[index];
        return (attr && attr.type == "Color");
      }
      return false;
    },


    checkImage(val){
      if (!val || Array.isArray(val)) return false;
      return val.match(/(.png|.jpg|.gif|jpeg|.svg)/i);
    }
  }
}
</script>

<style lang="stylus">
table
  margin-top 20px
  margin-bottom 30px
  width 100%

.mdl-data-table
  border 0 !important

.mdl-data-table td
  border-top 1px solid rgba(141, 141, 141, 0.12) !important
  border-bottom 1px solid rgba(141, 141, 141, 0.12) !important

.md-full-card
  width 100%

.profile_img
  width 52px
  height 60px

.tc
  font-size 18px
  font-weight bold

.separator
  width: 100%
  border-top: 1px solid gainsboro

h3.info
  text-align center

td .color
  width 50px
  height 30px

</style>


<template lang='jade'>
  .mdl-card.md-full-card.mh500
    Loader(:show='loading')
    .mdl-grid.w100
      .mdl-cell.mdl-cell--12-col
        mdl-button(@click='clickNew', v-mdl-ripple-effect, raised, primary)
          i.material-icons add

        mdl-button(@click='clickOpen', v-mdl-ripple-effect, raised, primary v-show='this.checks.length == 1')
          i.material-icons mode_edit

        mdl-button(@click='clickDelete', v-mdl-ripple-effect, raised, primary, v-show='this.checks.length > 0')
          i.material-icons delete

        mdl-button(@click='clickRefresh', v-mdl-ripple-effect, raised, primary)
          i.material-icons refresh

        mdl-button.flat(@click='this.$dispatch("clickeditmodel")', v-mdl-ripple-effect)
          i.material-icons view_list

    .mdl-cell.mdl-cell--12-col(v-if='data.length > 0')
      mdl-button(v-mdl-ripple-effect, raised, v-for='r in relations') {{ r }}
      table.mdl-data-table.mdl-js-data-table.ml-table-striped.mdl-shadow--1dp
        thead
          tr
            th.mdl-data-table__cell--non-numeric
            th.mdl-data-table__cell--non-numeric(id='col_id') _id
              .mdl-tooltip.mdl-tooltip--large(for='col_id') Internal mongodb id
            th.mdl-data-table__cell--non-numeric(v-for='attr in gridHeads', :id='attr._uid') {{ attr.viewname }}
              .mdl-tooltip.mdl-tooltip--large(v-if='attr.comment', :for='attr._uid') {{ attr.comment }}


        tbody
          tr(v-for='row in data')
            td
              mdl-checkbox(:value='$index', :checked.sync='checks')

            td.mdl-data-table__cell--non-numeric
                span(v-else){{ row['_id'] }}

            td.mdl-data-table__cell--non-numeric(v-for='val in gridHeads', track-by='$index')
              .color(v-if='checkColor(this.$index)', v-bind:style="{ background: row[val.jsonfield] }")
              div(v-else)
                img.ico(v-if='checkImage(row[val.jsonfield])', v-bind:src='row[val.jsonfield]')
                span(v-else){{ labelForType(row, val) }}

    .mdl-cell.mdl-cell--12-col(v-if='notDataFound')
      h3.info Not Data Found
</template>
