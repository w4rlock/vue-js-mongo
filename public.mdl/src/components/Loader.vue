<template lang='jade'>
.overlay-spinner.center-all(v-show='show')
  .mdl-spinner.mdl-spinner--single-color.mdl-js-spinner.is-active(v-if="type == 'spinner'")
  .mdl-progress.mdl-js-progress.mdl-progress__indeterminate(v-else)
</template>

<script>
export default{
	props: {
    show: Boolean,
    type: String
  }
}
</script>

<style>
.overlay-spinner{
  position: absolute;
  background: rgba(255, 255, 255, 0.94);
  width: 100%;
  height: 100%;
  z-index: 11;
  text-align: center;
}

.center-all{
display: flex;
justify-content: center;
align-items: center;
top: 0;
left: 0;
}
</style>
