<template>
    <div class="m-header" >
       <div class="content">
           <router-link to="/">logo</router-link>
           <div class="info" v-show = isLogin>

               <router-link to="/write"><span class="glyphicon glyphicon-plus"></span></router-link>
               <a><span class="glyphicon glyphicon-search"></span></a>
               <a><span class="glyphicon glyphicon-bell"></span></a>
               <router-link v-if="isAdmin" to="/admin"><span class="glyphicon glyphicon glyphicon-cog"></span></router-link>




               <a class="img-box" >
                   <img @click = "detail" ref = 'showImg' :src=file>
               </a>
               <ul class="list-group"  v-if=isShow>
                   <li class="list-group-item" @click = "detail"><router-link to="/user/setting">我的主页</router-link></li>
                   <li class="list-group-item" @click = "detail"><router-link to="/user/star">我的收藏</router-link></li>
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
<style  rel="stylesheet/scss" lang="scss">
    @import "../css/base/min";
    .m-header{
        position: relative;
        height: 80px;
        background-color: #fff;
        border-bottom:1px solid #eee;
        .content{
            width: 1000px;
            height: 80px;
            margin:0 auto;
        }
        .info{
            position: relative;
            height: 80px;
            line-height: 80px;
            float: right;
            a{
                display: inline-block;
                margin: 0 10px;
                cursor:pointer;
                span{
                    color: #999;
                }
                span:hover{
                    color: $color;
                }
            }
            .img-box{
                display: inline-block;
                width: 40px;
                height: 40px;
            }
            img{
                width: 40px;
                height: 40px;
                border-radius: 100%;
            }
            p{
                position: relative;
                float: right;
                right: 0;
                a{
                    color: $color;
                }
            }
        }
        .list-group{
            position: absolute;
            z-index: 4;
            right: 0px;
            top:80px;
            width: 120px;
            transition: opacity .5s;
            li{
                color: #999;
                cursor: pointer;
                padding: 0 25px;
                height: 45px;
                line-height: 45px;
                box-sizing: border-box;
                &:hover{
                    transition: all .5s;
                    background-color: #f9f9f9;
                    a{
                        color: $color
                    }
                }
                a{
                    text-decoration: none;
                    width: 100%;
                    height: 100%;
                    color: #999;
                    margin: 0;
                    padding: 0;
                }
            }
        }
        .glyphicon-plus{
            top: -2px;
        }
        .glyphicon-search{
            top: -1px;
        }
    }
</style>
<script>

    export default{
        data(){
            return{
                isShow:false
            }
        },
        mounted(){
            let vm = this;

            document.addEventListener('click',function(e){
                if(e.target!=vm.$refs.showImg){
                    vm.isShow = false
                }
            })
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
            isAdmin:function(){
               let info = this.$store.getters.getInfo;
                console.log(info)
                if(info.type=='user'){
                    return false
                }else if(info.type=='admin'){
                    return true
                }
            },
            file:function () {

                if(this.$store.getters.getInfo.head){
                    return this.$store.getters.getInfo.head
                }else{
                    return 'https://shq-pic.b0.upaiyun.com/Attachment/face/010/82/07/06_avatar.jpg'
                }

            }
        }

    }
</script>
