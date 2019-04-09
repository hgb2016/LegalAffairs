<template>
	<div class="error-remind">
		<p>{{errorRemind}}</p>
	</div>
</template>
<script>
export default {
  props: {
    errorRemind: {
      type: String
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/flex.less";
.error-remind {
  position: fixed;
  top: 0;
  left: 0;
	right: 0;
	bottom:0;
  .f-d-f;
	.f-ai-c;
	.f-jc-c;
  z-index: 9999;
  p {
    color: #fff;
    font-size: 14px;
		padding: 8px 20px;
		background-color: rgba(0, 0, 0, 0.67);
		text-align: center;
		border-radius: 4px;
  }
}
</style>
