<template>
    <div class="m-header" >
       <div class="content">
           <router-link to="/">logo</router-link>
           <div class="info" v-show = isLogin>

               <router-link to="/write"><span class="glyphicon glyphicon-plus"></span></router-link>
               <a><span class="glyphicon glyphicon-search"></span></a>
               <a><span class="glyphicon glyphicon-bell"></span></a>
               <a class="img-box" @click = "detail">
                   <img :src=file>
               </a>
               <ul class="list-group"  v-show=isShow>
                   <li class="list-group-item" @click = "detail"><router-link to="/user/setting">我的主页</router-link></li>
                   <li class="list-group-item" @click = "detail">我的收藏</li>
                   <li class="list-group-item" @click = "detail"><router-link to="/user/article">我的文章</router-link></li>
                   <li  class="list-group-item" @click="signout">登出</li>
               </ul>
           </div>


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
          },
          signout:function () {
              this.isShow = !this.isShow;
                this.$store.dispatch('signout');
          },

        },
        props:{
            isLogin:{
                type:Boolean
            }
        },
        computed:{
            a:function () {
                return this.isLogin
            },
            file:function () {
                console.log(this.$store.getters.getInfo.head)
                if(this.$store.getters.getInfo.head){
                    return this.$store.getters.getInfo.head
                }else{
                    return 'https://shq-pic.b0.upaiyun.com/Attachment/face/010/82/07/06_avatar.jpg'
                }

            }
        }

    }
</script>
