<template>
    <div>
        <div class="ContactList-header">
            <div class="ContactList-header-search">
                <input type="text" placeholder="请输入好友名称">
                <i></i>
            </div>
            
        </div>
        <div class="ContactList-list">
            <div class="ContactList-list-item" v-for="(item,index) in contactlist" :key="index">
                <img src="../../assets/img/niu.png" alt="">
                <p>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            contactlist:[
                {
                    url:"",
                    name:"阿彪"
                },
                 {
                    url:"",
                    name:"李琰表"
                },
                 {
                    url:"",
                    name:"张三"
                },
                  {
                    url:"",
                    name:"阿彪"
                },
                 {
                    url:"",
                    name:"李琰表"
                },
                 {
                    url:"",
                    name:"张三"
                },
                  {
                    url:"",
                    name:"阿彪"
                },
                 {
                    url:"",
                    name:"李琰表"
                },
                 {
                    url:"",
                    name:"张三"
                },
            ]
                
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.ContactList{
    width: 100%;
    &-header{
        background: #fff;
        position: fixed;
        top: 0px;
        width: 100%;
        &-search{
            margin: 20px ;
            .f-f-1;
			.f-d-f;
			height:30px;
			border:1px solid #e5e5e5;
			border-radius: 30px;
			background-color: #fff;
			.f-d-f;
			.f-jc-sb;
			.f-ai-c;
			padding: 0 10px;
			i {
				background-image: url("../../assets/img/icon_search.png");
				width: 26px;
				height: 26px;
				background-size: 100% 100%;
			}
			input {
				font-size: 12px;
                color: #333;
                
			}
        }
    }

    &-list{
       margin-top: 60px;
       width: 100%;
       &-item{
           .f-d-f;
           .f-fd-r;
           .f-ai-c;
            border-bottom: 1px solid #ededed;
            padding: 12px 20px;
            img{
                border-radius: 50%;
                height: 35px;
                width: 35px;
            }
            p{
                font-size: 14px;
                margin-left: 10px;
            }
       }
    }
}

</style>
