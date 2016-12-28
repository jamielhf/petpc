<template>
    <div class="m-header">
       <div class="content">
            <a>logo</a>
           <div class="info" v-show = isLogin>

               <a><span class="glyphicon glyphicon-plus"></span></a>
               <a><span class="glyphicon glyphicon-search"></span></a>
               <a><span class="glyphicon glyphicon-bell"></span></a>
               <a class="img-box" @click = "detail">
                   <img src="https://shq-pic.b0.upaiyun.com/Attachment/face/010/82/07/06_avatar.jpg">
               </a>
           </div>

           <ul class="list-group"  >
               <li class="list-group-item">我的主页</li>
               <li class="list-group-item">我的收藏</li>
               <li class="list-group-item">我的文章</li>
           </ul>
           <div class="info" v-show = !isLogin>

               <a><span class="glyphicon glyphicon-search"></span></a>
               <p>
                   <router-link to="/signup">注册</router-link>·
                   <router-link to="/signin">登录</router-link>
               </p>

           </div>
       </div>
    </div>
</template>

<script>
require('../css/header.scss');
    export default{
        data(){
            return{
                isShow:false
            }
        },
        methods:{
          detail:function () {
              this.isShow = !this.isShow;
          }
        },
        props:{
            isLogin:{
                type:Boolean
            }
        },
        computed:{
            a:function () {
                return this.isLogin
            }
        }

    }
</script>
