<template lang='jade'>
.mdl-tabs__tab-bar(v-show='show')
  a.mdl-tabs__tab(v-for='n in names', 
    @click='clickTab($index)',
    :class='{ "is-active": selectedTab == $index }',
    :href='"#panel-"+ n') {{ n }}
</template>

<script>
export default {
  props: {
		show: Boolean,
    names: {
      type: Array,
      required: true
    }
  },

  data() {
    return this.defaults();
  },

  reset(){
    this.$data = this.defaults();
  },

	watch: {
		names(){
			this.show = (this.names && this.names.length > 0);
		}
	},

  methods:{
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
