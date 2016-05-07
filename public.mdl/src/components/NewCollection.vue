<script>
import Loader from './Loader.vue'
import Types from './Types.vue'
import StoreCol from '../stores/Collections'

export default {
  components: {
    Types,
    Loader
  },

  created(){
    this.setDefaults();
  },

  data () {
    return {
      loading: false,
      error: null,
      showTypes: false,
      index: 0,
			validForm: false,
      model: {},
      primateTypes: [
        'id'
      , 'Boolean'
      , 'Number'
      , 'String'
      , 'Date'
      , 'Url'
      , 'Email'
      ],
      complexTypes: []
    }
  },



	/*Form Events*/
  methods: {
    setDefaults(){
      this.model = { collection:'', attrs: [ this.newEmptyModel() ]};
      this.error = null;
			this.validForm = false;
    },
    
    open(bmodel){
      this.model = bmodel;
    },
    

    selectType(elem, isPrimate){
      this.model.attrs[this.index].type = elem;
      this.showTypes = false;
    },

    openType(index){
      this.index = index;
      this.showTypes = true;
    },

    clickCancel(){
      this.setDefaults();
      this.$dispatch('clickcancel');
    },

    newEmptyModel(){
      return { name: '', type: 'String', required: false };
    },

    clickAddNew(){
      this.model.attrs.push(this.newEmptyModel());
    },

    clickRemove(index){
      this.model.attrs.splice(index, 1);
    
    },


		validate(){
			if (!this.model.collection){
				return false;
			}

			let i=0;
			while(this.model.attrs[i]){
				if (!this.model.attrs[i].name){
					return false;
				}
				i++;
			}

			return true;
		},

    clickErase(){
      this.loading = true;
      StoreCol.remove(this.model.collection)
      .then(r => StoreCol.removeDocument('model', this.model._id))
      .then(this.closeDelay);
    },

    clickSave(){
			this.validForm = this.validate();
			if (!this.validForm) return;

      this.error = null;
      this.loading = true;

      if (this.model._id){
        StoreCol.updateDocument('model', this.model).then(this.closeDelay);
      }
      else{
        StoreCol.create(this.model.collection).then(dat => {
          StoreCol.addDocument('model',this.model).then(this.closeDelay);
        });
      }
    },

    closeDelay(){
      setTimeout(() => {
        this.loading = false;
        this.clickCancel();
      }, 400);
    },

    open(document){
      this.model = document;
      this.entries = Object.entries(document);
    }
  }
}
</script>

<template lang='jade'>
  .overlay-wrap(v-show='loading')
    Loader(:show='true')
  .mdl-card.mdl-shadow--4dp.full.mh500
    .container
      .mdl-grid
        .mdl-cell.mdl-cell--2-col
        .mdl-cell.mdl-cell--7-col
          mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary)
            i.material-icons keyboard_arrow_left

          mdl-button(@click='clickSave', v-mdl-ripple-effect, raised, primary)
            i.material-icons cloud_upload

        .mdl-cell.mdl-cell--2-col
          mdl-button(@click='clickErase', v-mdl-ripple-effect, raised)
            i.material-icons delete_forever

    .mdl-grid
      h4.err(v-show='error') {{ error }}
      .mdl-cell.mdl-cell--12-col.mdl-cell--12-col-tablet
        h3(v-if='model._id') {{ model.collection }}
        mdl-textfield.cName(v-else,
          id='txtCName', floating-label, label='Collection Name', :value.sync='model.collection', 
        )

        div(v-for='item in model.attrs')
          .rowInput
                mdl-textfield(floating-label, label='Key Name', :value.sync='item.name')
                mdl-button.btnType(@click='openType(this.$index)', v-mdl-ripple-effect) {{ item.type }}
                mdl-button(@click='clickRemove(this.$index)', v-mdl-ripple-effect)
                  i.material-icons delete

        mdl-button(@click='clickAddNew', v-mdl-ripple-effect, fab)
          i.material-icons add

    .mdl-grid
      .mdl-cell.mdl-cell--12-col.mdl-cell--12-col-tablet.black
        Types.popup(v-on:clickcancel='showTypes=false', :show='showTypes', v-on:select='selectType')
</template>

<style lang='stylus'>
.overlay-wrap
  position absolute
  z-index 113
  width 70%
  height 100%
  @media(max-width: 730px)
    width 95%

.cName
  width 100%
  margin-bottom 30px

.full
  top 32px
  width: 100%

.rowInput
  display inline-block

.mdl-textfield
  display inline-block

.btnType
  width 150px
  text-align left

.popup
	position: absolute;
	background: white;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
</style>
