<template lang='jade'>
.searchwrap(:class='{ "w100": showInput}')
  mdl-button.flat(v-mdl-ripple-effect, @click='showInput=true') 
    i.material-icons search
  mdl-textfield(v-show='showInput', :value.sync='filter')
</template>

<script>
export default{
  data(){
    return this.defaults();
  },

  watch: {
    filter(){
      if (!this.filter){
        this.showInput = false;
      }
      this.$root.$broadcast('filter:changed', this.filter);
    }
  },

  methods:{
    reset(){
      this.$data = this.defaults();
    },

    defaults(){
      return {
        filter: '',
        showInput: false
      }
    }
  }
}
</script>

<style lang='stylus'>
.searchwrap
  position absolute
  background white
  z-index 111
  height 100%
  left 0
  top 0

  .mdl-button
    height 100%
    margin 0px
    border-radius 0px
    background: rgb(213, 213, 213)

  .mdl-textfield
    position absolute
    padding-left 15px
    width: 100%

</style>
