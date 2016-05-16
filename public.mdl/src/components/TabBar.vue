<template lang='jade'>
.mdl-tabs__tab-bar(v-show='show', :class="cclass")
  search-input(v-ref:searchinput)
  a.mdl-tabs__tab(v-for='n in names', 
    @click='clickTab($index)',
    :class='{ "is-active": selectedTab == $index }',
    :href='"#panel-"+ n') {{ n }}

</template>

<script>
import SearchInput from './SearchInput'

export default {
  components: {
    SearchInput  
  },

  props: {
		show: Boolean,
    cclass: String,
    names: {
      type: Array,
      required: true
    }
  },

  data() {
    return this.defaults();
  },

	watch: {
		names(){
			this.show = (this.names && this.names.length > 0);
		}
	},

  methods:{
    reset(){
      this.$data = this.defaults();
      this.$refs.searchinput.reset();
    },

    defaults(){
      return {
        current: 0,
        selectedTab: 0
      }
    },

    clickTab(index){
      this.current = index-1;
      this.selectedTab = index;
      this.$dispatch('clicktab', index, this.names[index]);
    }  
  },

  ready(){
    setTimeout(() =>
    componentHandler.upgradeElements(this.$el)
    , 1400);
  }
}
</script>

<style>
.searchinput{
	position: absolute;
	left: 5px;
	top: 3px;
}
</style>
