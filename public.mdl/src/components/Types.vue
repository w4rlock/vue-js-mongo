<script>
export default {
  props: ['show'],
  components: {
    
  },

  methods: {
    clickCancel(){
      this.error = null;
      this.$dispatch('clickcancel');
    },

    clickSelect(index, isPrimate){
      setTimeout(() => {
        this.$dispatch('select', this.primateTypes[index], isPrimate);
      }, 350);
    
      
    }
  },

  data () {
    return {
      error: null,
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
</style>

<template lang='jade'>
  .mdl-card.mdl-shadow--2dp.full(v-show='show')
    .mdl-grid
      .mdl-cell.mdl-cell--12-col
        mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary) 
          i.material-icons keyboard_arrow_left
        h4.title Field Type:
        .separator
        ol.demo-list-item.mdl-list
          li.mdl-list__item(v-for='t in primateTypes')
            mdl-button(@click='clickSelect(this.$index, true)', v-mdl-ripple-effect, raised) {{ t }}
</template>
