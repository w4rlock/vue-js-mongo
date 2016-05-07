<script>
import Loader from './Loader.vue'
import StoreCol from '../stores/Collections'


export default {
	components: {
		Loader
	},


  data () {
    return {
		 	loading: false,
      error: null,
      model: {},
      base: {},
      keys: []
		}
  },



	/*Form Events*/
	methods: {
		clickCancel(){
      this.model = {};
      this.keys = [];
      this.error = null;
			this.$dispatch('clickcancel');
		},


		clickSave(){
      this.error = null;
      StoreCol.addDocument(this.base.collection, this.model)
							.then(resp => {
				this.clickCancel();
			});
		},


    open(baseModel, model = null){
      this.base = baseModel;
      this.keys = baseModel.attrs.filter(item => item.name);

      if (model){
        this.model = model;
      }
      else{
        this.keys.forEach((o, i) => {
          if (o.name){
            this.model[o.name] = null;
          }
        });
      }
    },
	}


}
</script>

<template lang='jade'>
  .overlay-wrap(v-show='loading')
    Loader(:show='true')
  .mdl-card.mdl-shadow--4dp.full.mh500
    .mdl-grid
      .mdl-cell.mdl-cell--12-col
        .mdl-cell.mdl-cell--12-col
          mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary)
            i.material-icons keyboard_arrow_left

          mdl-button(@click='clickSave', v-mdl-ripple-effect, raised, primary)
            i.material-icons cloud_upload

        .mdl-cell.mdl-cell--12-col.mdl-cell--12-col-tablet.mt50
          h4.err(v-show='error') {{ error }}
          h4(v-if='model._id') {{ base.collection }}: {{ model._id }}
          h4(v-else) New {{ base.collection }}
          .frmDoc
            mdl-textfield(floating-label, v-for='k in keys',
              :type.sync='k.type'
              :label.sync='k.name',
              :value.sync='model[k.name]')
</template>

<style lang='stylus'>
.mt50
  margin-top 50px

.overlay-wrap
  position absolute
  z-index 113
  width 70%
  height 100%
  @media(max-width: 730px)
    width 95%

.full
  width: 100%

.err
  color red

.frmDoc
  .mdl-textfield
    display block

</style>
