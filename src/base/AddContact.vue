<template>
<div class="add-contact" @click.self="$emit('SaveAdd')">
	<div class="add-contact-info">
		<div class="nav">
			<span></span>
			<p>添加联系人</p>
			<span @click="saveAdd">保存</span>
		</div>
		<div class="list">
			<div>
				<span>姓名</span>
				<input type="text" placeholder="请输入姓名">
			</div>
			<div>
				<span>职务</span>
				<input type="text" placeholder="请输入职务">
			</div>
			<div>
				<span>电话</span>
				<input type="text" placeholder="请输入电话">
			</div>
			<div>
				<span>邮箱</span>
				<input type="text" placeholder="请输入邮箱">
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	methods:{
		saveAdd () {
			this.$emit('SaveAdd')
		}
	}
}
</script>

<style lang="less" scoped>
@import '../assets/css/flex.less';
.add-contact {
	position: fixed;
  top: 0;
  left: 0;
	right: 0;
	bottom:0;
  .f-d-f;
	.f-ai-c;
	.f-jc-c;
	z-index: 1111;
	background-color: rgba(0, 0, 0, 0.2);
	&-info{
		background-color: #fff;
		border-radius: 5px;
		width:88%;
		.f-d-f;
		.f-fd-c;
		.nav {
			width:100%;
			height:40px;
			padding:0 20px;
			.f-d-f;
			.f-jc-sb;
			.f-ai-c;
			p {
				color:#333;
				
			}
			span {
				color:rgb(29, 29, 250);
				font-size:14px;
			}
		}
		.list {
			.f-d-f;
			.f-fd-c;
			div {
				height:50px;
				width:100%;
				.f-d-f;
				.f-jc-sb;
				.f-ai-c;
				padding:0 0px 0 8px;
				border-bottom:1px solid #e5e5e5;
				padding:0 20px;
				span {
					color:#666;
				}
				input {
					text-align: right;
					font-size:14px;
					color:#333;
				}
			}
		}
	}
}
</style>
