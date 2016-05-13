<script>
import { filter } from '../utils/Utils'

export default {
  props: {
    show: Boolean
  },


  events:{
    onLoadModels(models){
      this.collections = models;
    }
  },

  methods: {
    open(selected){
      this.show = true;
      this.selected = selected;
      this.loadAttrs(selected.type);
    },

    loadAttrs(modelName){
      this.viewAttrs = filter(this.collections, 'collection', modelName, 1).attrs;
    },

    clickCancel(){
      this.setDefaults();
      this.show = !this.show;
    },
    
    setDefaults(){
      this.error = null;
      this.viewAttrs = [];
    },

    clickSelect(name, isObject){
      this.selected.isObject = isObject;

      if (isObject){
        this.setDefaults();
        this.selected.type = name;
        this.selected.attrs = [];
        this.selected.views = [];
        this.loadAttrs(name);
        return;
      }
      setTimeout(() => { 
        this.$dispatch('select', name, isObject); 
        this.show = !this.show 
        this.viewAttrs = [];
      }, 350); 
    }
  },

  data () {
    return {
      error: null,
      viewAttrs: [],
      selected: null,
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

.active{
  background: grey !important;
}
.flat{
	background: rgba(158,158,158,.2);
  display: inline-block;
}
</style>

<template lang='jade'>
  .mdl-card.mdl-shadow--2dp.full(v-show='show')
    .mdl-grid.w100
      .mdl-cell.mdl-cell--5-col
        mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary) 
          i.material-icons keyboard_arrow_left

    .mdl-grid.w100
      .mdl-cell.mdl-cell--1-col
      .mdl-cell.mdl-cell--10-col
        h5.title Data Type:
        .separator
        ol.demo-list-item.mdl-list
          li.mdl-list__item(v-for='t in primateTypes')
            mdl-button.flat(v-bind:class="{ 'active': selected && t == selected.type }",
              @click='clickSelect(t, false)', v-mdl-ripple-effect) {{ t }}

        .space50(v-show='collections.length > 0')
          h5.title Relational Type:
          .separator
          ol.demo-list-item.mdl-list
            li.mdl-list__item(v-for='t in collections')
              mdl-button.flat(v-bind:class="{ 'active': selected && t.collection == selected.type }",
                @click='clickSelect(t.collection, true)', v-mdl-ripple-effect) {{ t.collection }}

          div(v-show='viewAttrs && viewAttrs.length > 0')
            div(v-for='a in viewAttrs')
              mdl-checkbox(:value='a.name', :checked.sync='selected.views')
                span.mdl-checkbox__label
                  {{ a.name }}
</template>
