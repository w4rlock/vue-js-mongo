<template lang='jade'>
.searchwrap(:class='{ "w100": showInput}', v-show='show')
  mdl-button.flat(v-mdl-ripple-effect, @click='showInput=true') 
    i.material-icons search

  input(type='search', 
    v-focus='showInput',
    v-model='filter', 
    v-show='showInput',
    v-onfocusout='focusout',
    placeholder='Search...',
    @keydown.enter='showInput=false'
  )

</template>

<script>
export default{
  data(){
    return this.defaults();
  },

  watch: {
    filter(){
      this.$root.$broadcast('filter:changed', this.filter);
    }
  },

  methods:{
    hide(hide){
      this.show = !hide;
    },

    reset(){
      this.$data = this.defaults();
    },

    defaults(){
      return {
        show: false,
        filter: '',
        showInput: false
      }
    },

    focusout(){
      this.showInput = false;
    },

    clickClean(){
      this.filter = '';
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
		//border: 1px solid #9F9F9F

  .searchclosebtn
    position: absolute
    right: 0
    top: 0

  input
    height 42px
    padding-left 15px
    width: calc(100% - 84px)
    font-family: "Roboto","Helvetica","Arial",sans-serif
    font-size: 18px
    appearance: none
    border: 0

    &:focus
       outline: none
</style>
