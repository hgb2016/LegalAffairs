<template>
  <div class="export">
		<div class="export-day">
			<div class="export-day-nav">
				<span>选择导出那个时间段的日程</span>
			</div>
			<div class="export-day-time">
				<div class="items">
					<span>
						开始
					</span>
					<div>

					</div>
				</div>
				<p>至</p>
				<div class="items">
					<span>
						结束
					</span>
					<div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.export {
	padding:48px 10px;
	&-day {
		box-shadow: 5px 5px 5px #f3f3f3, 5px -5px 5px #f3f3f3,
				-5px 5px 5px #f3f3f3, -5px -5px 5px #f3f3f3;
				margin-top:10px;
				padding:20px 10px;
		&-nav {
			font-size:12px;
			color:#000;
		}
	}
}
</style>
