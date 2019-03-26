<template>
  <div class="add-day">
		<div class="add-day-input">
			<input type="text"  placeholder="请输入客户名称">
		</div>	
		<div class="add-day-twoTime">
			<div class="during">
				<div class="during-start">
					<span>开始</span>
					<p>22：23</p>
					<span>2019年03月23(周六)</span>
				</div>
				<div class="during-hour">
					<hr>
					<span>100小时</span>
					<hr>
				</div>
				<div class="during-end">
					<span>开始</span>
					<p>22：23</p>
					<span>2019年03月23(周六)</span>
				</div>
			</div>
		</div>
		<div class="add-day-list">
			
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.add-day{
	.f-d-f;
	.f-fd-c;
	&-input {
		width:100%;
		.f-d-f;
		height:80px;
		input {
			.f-f-1;
			text-align: center;
			font-size:14px;
			color:#333;
			background: #efeff4;
		}
	}
	&-twoTime {
		padding: 0 10px;
		width:100%;
		.during {
			box-shadow: 3px 3px 3px #f3f3f3, 3px -3px 3px #f3f3f3,
				-3px 3px 3px #f3f3f3, -3px -3px 3px #f3f3f3;
				margin-top:10px;
				padding: 14px 0;
				.f-d-f;
				.f-jc-sb;
				&-start,
				&-end {
					.f-d-f;
					.f-fd-c;
					.f-ai-c;
					.f-jc-c;
					span {
						color:#999;
						font-size:12px;
					}
					p {
						color:#333;
						font-size:12px;
						margin:4px 0;
					}
				}
				&-hour {
					.f-d-f;
					.f-ai-c;
					.f-jc-c;
					hr {
						width:10px;
					}
					span {
						height:20px;
						padding:0 8px;
						line-height: 20px;
						text-align: center;
						font-size:12px;
						color:#333;
						border:1px solid #e5e5e5;
						border-radius: 10px;
					}
				}
		}
	}
}
</style>
