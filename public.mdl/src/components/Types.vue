<script>
export default {
  props: ['show'],

  events:{
    onLoadModels(models){
      this.collections = models;
    }
  },

  methods: {
    clickCancel(){
      this.error = null;
      this.$dispatch('clickcancel');
    },

    clickSelect(name, isObject){
      setTimeout(() => { this.$dispatch('select', name, isObject); }, 350); 
    }
  },

  data () {
    return {
      error: null,
      collections: [],
      primateTypes: [
        'Boolean'
      , 'Number'
      , 'String'
      , 'Date'
      , 'Url'
      , 'Email'
      , 'Color'
      ]
    }
  }
}

</script>

<style>
.mdl-list__item{
  padding: 0;
	display: inline-block;
}

.separator{
  width: 100%;
  border-top: 1px solid gainsboro;
}

.title{
  margin-bottom: 7px;
}

.space50{
  margin-top: 50px
}
</style>

<template lang='jade'>
  .mdl-card.mdl-shadow--2dp.full(v-show='show')
    .mdl-grid
      .mdl-cell.mdl-cell--12-col
        mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary) 
          i.material-icons keyboard_arrow_left
        h4.title Data Type:
        .separator
        ol.demo-list-item.mdl-list
          li.mdl-list__item(v-for='t in primateTypes')
            mdl-button(@click='clickSelect(t, false)', v-mdl-ripple-effect, raised) {{ t }}

        .space50(v-show='collections.length > 0')
          h4.title Relational Type:
          .separator
            ol.demo-list-item.mdl-list
              li.mdl-list__item(v-for='t in collections')
                mdl-button(@click='clickSelect(t.collection, true)', v-mdl-ripple-effect, raised) {{ t.collection }}
        
</template>
