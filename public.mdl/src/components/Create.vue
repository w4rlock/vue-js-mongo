<script>
import Loader from './Loader.vue'
import http from '../services/http'


export default {
	components: {
		Loader
	},


  data () {
    return {
		 	loading: false,
      error: null,
      model: null,
      entries: []
		}
  },



	/*Form Events*/
	methods: {
		clickCancel(){
      this.model = {};
      this.error = null;
			this.$dispatch('clickcancel');
		},


		clickSave(){
      this.error = null;
      this.loading = true;
      let method = this.model.id ? 'put' : 'post'

			http[method]('/api/wags', this.model, (res) => { 
        setTimeout(() => { 
           this.loading = false;
           this.clickCancel() 
        }, 700);

      }, (er) => {
        setTimeout(() => { 
          this.error = er.data.err;
          this.loading = false; 
        }, 700);
      });
		},


    open(document){
      this.model = document;
      this.entries = Object.entries(document);
    },
	}


}
</script>

<template lang='jade'>
  .overlay-wrap(v-show='loading')
    Loader(:show='true')
  .mdl-card.mdl-shadow--2dp.full
    .mdl-grid
      .mdl-cell.mdl-cell--12-col
        .mdl-cell.mdl-cell--12-col
          mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary) 
            i.material-icons keyboard_arrow_left

          mdl-button(@click='clickSave', v-mdl-ripple-effect, raised, primary)
            i.material-icons cloud_upload

        .mdl-cell.mdl-cell--12-col.mdl-cell--12-col-tablet.black
          h4.err(v-show='error') {{ error }}
          div(v-if='model.id')
            h3 {{ model.name }}

          mdl-textfield(floating-label, label='Name', :value.sync='model.name', v-else)
          mdl-textfield(floating-label, v-for='item in entries', :label.sync='item[0]', :value.sync='item[1]')
</template>

<style lang='stylus'>
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

img.profile
  width 100px
  height 120px

img.banner
  width 370px
  height 120px
  
.mt-50
  margin-top 50px

.pl-27
  padding-left 27px
</style>
