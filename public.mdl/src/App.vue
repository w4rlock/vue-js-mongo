<script>
import list from './components/GenericList'
import FormDocument from './components/GenericForm'
import FormCollection from './components/NewCollection'
import Db from './stores/Db'

export default {
  components: {
    list,
    FormDocument,
    FormCollection
  },


  created(){
    this.loadData();
  },


  data(){
    return {
      transition: 'fade',
      showNewForm: false,
      showFormCollection: false,
      dbstats: {},
      models: [],
      colSelected: null,
      currentIndex: 0
    }
  },


  methods: {
    loadData(){
      this.showNewForm = false;
      this.showFormCollection = false; 

      Db.getStats().then(res => {
        this.dbstats = res.data;
        Db.getModels().then(res => {
          this.models = res.data.data;
          this.$broadcast('onLoadModels', this.models);
          this.clickCollection(0);
        });
      });
    },


    closeNewForm(){
      this.showNewForm = false
    },


    clickcancel(){
      this.showNewForm = false;
      this.showFormCollection = false; 
      if (!this.colSelected) return;
      this.$refs.list.clickRefresh()
    },


    newDocument(){
      this.$refs.formdocument.open(this.colSelected);
      this.showNewForm = !this.showNewForm
    },


    // @param <Object> m - row grid selected
    clickopen(m){
      this.showNewForm = !this.showNewForm;
      this.$refs.formdocument.open(this.colSelected, m)
    },


    clickeditmodel(){ 
      this.$refs.formcollection.open(this.colSelected);
      this.showFormCollection = true;
    },


    clickCollection(index){
      this.currentIndex = index;
      this.colSelected = this.models[index];
      if (!this.colSelected) {
        return;
      }

      this.$refs.list.setModel(this.colSelected);
      this.$refs.list.search();
    },
  }
}
</script>

<style lang="stylus">
wh(w, h)
  width w
  height h

html
  height: 100%

.w100
  width: 100%

.tar
  text-align right

.tac
  text-align center

.ico
  width 70px
  height 80px

.blur8
  filter: blur(8px);

.mh500
  min-height 500px

.mh700
  min-height 700px

.modal
  width: 80%
  z-index: 111
  height 100%
  @media(max-width: 730px)
    width 95%

.section
	border 1px solid #E1E1E1
	.frm
		padding 30px
		.mdl-textfield
			display block

	h4
		margin-top: -20px;
		margin-bottom: 0px;
		margin-left: -1px;
		padding-right: 20px;
		background: #333;
		color: #fff;
		font-size: 13px;
		line-height: 17px;
		font-weight: bold;
		padding: 7.5px 20px;
		display: -moz-inline-stack;
		display: inline-block;
		vertical-align: middle;
		display: -moz-inline-stack;


#app
  color: #2c3e50
  margin: 20px

a
  color: #7B7B7B;
  text-decoration: none;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;

a.is-active
    color black

.logo
  width: 100px;
  height: 100px

.mdl-button
  margin 3px

.center
  display flex
  align-items center
  justify-content center
  position absolute
  top 0
  left 0
  width 100%
  height 100%

.top-bar
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.83);
  margin: 0;
  padding-left: 50px;
  border-bottom: 1px solid #ECECEC;
  z-index: 1111;

.selectedBtn
  background-color: rgba(158,158,158,.2);

.mdl-textfield.invalid .mdl-textfield__input 
  border-color #d50000
  box-shadow none

.mdl-textfield--floating-label.invalid .mdl-textfield__label 
  color: #d50000
  font-size: 12px

.mdl-textfield.invalid .mdl-textfield__label:after
    background-color: #d50000;

.overlay-wrap
  position absolute
  z-index 113
  width 100%
  bottom 32px
  height 100%
  @media(max-width: 730px)
    width 95%

.flat
  background: rgba(158,158,158,.2)
  display: inline-block

.frm .mdl-textfield
	display block
</style>

<template lang='jade'>
  #app(@keydown.esc='closeNewForm')
    div(v-bind:class='{ blur8: showNewForm || showFormCollection }')
      .mdl-grid
        .mdl-cell.mdl-cell--12-col.top-bar
          mdl-button(v-for='m in models',
            v-mdl-ripple-effect
            v-bind:class="{ 'selectedBtn': this.$index == currentIndex }",
            @click='clickCollection(this.$index)') {{ m.viewcollection }}

          mdl-button(@click='showFormCollection=true', v-mdl-ripple-effect)
            i.material-icons add

      .mdl-grid
        .mdl-cell.mdl-cell--12-col
          list(
             v-ref:list
           , v-on:clicknew='newDocument'
           , v-on:clickopen='clickopen'
           , v-on:clickeditmodel='clickeditmodel')

    .center(v-show='showNewForm')
      .modal
        form-document(v-ref:FormDocument,
          v-on:clickcancel='clickcancel')

    .center(v-show='showFormCollection')
      .modal
        form-collection(
            v-ref:FormCollection
          , v-on:clickerase='loadData'
          , v-on:clickadded='loadData'
          , v-on:clickcancel='clickcancel')

</template>
