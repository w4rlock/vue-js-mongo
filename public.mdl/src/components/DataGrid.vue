<script>
import Db from '../stores/Db'
import Loader from './Loader.vue'
import { isImage } from '../utils/Utils'


export default{
  components: {
    Loader
  },

  props:{
    showheads: Boolean,
    checks: { type: Array },
    heads: { type: Array, required: true },
    entity: { type: String, required: true },
    showidcol: { type: Boolean, required: true }
  },

  data(){
    return this.defaults();
  },

  events: {
    'filter:changed': function(val){
      this.filterKey = val;
    }
  },

  watch: {
    entity(){
      if (!this.entity) {
        return;
      }
      this.search();
    }
  },


  methods:{
    defaults(){
      return {
        rows: [],
        show: false,
        filterKey: '',
        result: null,
        notDataFound: null,
        loading: false,
        isImage: isImage
      }
    },

    reset(){
      this.heads = [];
      this.checks= [];
      this.$data = this.defaults();
    },

    search(){
			this.loading = true;
      Db.getDocuments(this.entity).then(r => {
        this.result = r.data.data;
        this.rows = this.result.map(this.mapRow);
        this.notDataFound = (this.rows.length == 0);

        setTimeout(() => {
          componentHandler.upgradeAllRegistered()
          this.loading = false;
        }, 100);
      });
    },

    mapRow(row){
      if (this.heads[0] != '_id'){
        this.heads.splice(0,0,'_id');
      }

      if (this.heads && this.heads.length > 0){
        return this.heads.map(k => row[k]);
      }

      return row;
    }
  }
}
</script>
<style>
.searchbtn{
  min-width: 30px;
  min-height: 30px;
  width: 37px;
  height: 36px;
  margin-right: 20px;
}
</style>

<template lang='jade'>
div(v-show='show')
  Loader(:show='loading', :type='"spinner"')

  table.mdl-data-table.mdl-js-data-table.ml-table-striped.mdl-shadow--1dp
    thead(v-if='showheads')
      tr
        th.mdl-data-table__cell--non-numeric
        th.mdl-data-table__cell--non-numeric(v-for='head in heads', track-by='$index', v-if='showidcol || $index!=0') {{ head }}
    tbody  
      tr(v-for='row in rows | filterBy filterKey')
        td
          mdl-checkbox(:value='row[0]', :checked.sync='checks')
        td.mdl-data-table__cell--non-numeric(v-for='val in row', track-by='$index', v-if='showidcol || $index != 0')
          img.ico(v-if='isImage(val)', v-bind:src='val')
          span(v-else){{ val }}
</template>
