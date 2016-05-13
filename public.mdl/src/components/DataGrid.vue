<script>
import Db from '../stores/Db'
import { isImage } from '../utils/Utils'

export default{
  props:{
    heads: { type: Array, required: true },
    checks: { type: Array },
    entity: { type: String, required: true },
    showidcol: { type: Boolean, required: true }
    
  },

  data(){
    return this.defaults();
  },

  watch: {
    entity(){
			if (!this.entity) 
				return
      this.search();
    }
  },


  methods:{
    defaults(){
      return {
        show: false,
        result: null,
        notDataFound: null,
        loading: false,
        rows: [],
        isImage: isImage
      }
    },

    reset(){
      this.heads = [];
			this.checks= [];
      this.$data = this.defaults();
    },

    search(){
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

<template lang='jade'>
table.mdl-data-table.mdl-js-data-table.ml-table-striped.mdl-shadow--1dp(v-show='show')
  thead
    tr
      th.mdl-data-table__cell--non-numeric
      th.mdl-data-table__cell--non-numeric(v-for='head in heads', track-by='$index', v-if='showidcol || $index!=0') {{ head }}
  tbody  
    tr(v-for='row in rows')
      td
        mdl-checkbox(:value='row[0]', :checked.sync='checks')
      td.mdl-data-table__cell--non-numeric(v-for='val in row', track-by='$index', v-if='showidcol || $index != 0')
        img.ico(v-if='isImage(val)', v-bind:src='val')
        span(v-else){{ val }}
</template>
