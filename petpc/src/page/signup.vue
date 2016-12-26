

<template>

<div class="p-logup">
    <form class="form-horizontal" role="form">
        <div class="form-group">
            <div class="col-sm-12">
                <input type="text" v-model="username" class="form-control" id="username" placeholder="昵称">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <input type="email" v-model="email" class="form-control" id="inputEmail" placeholder="邮箱">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <input type="password" v-model="password" class="form-control" id="inputPassword3" placeholder="密码">
            </div>
        </div>


        <button type="button" @click ="submit" class="btn btn-primary  btn-default btn-block">注册</button>
        <router-link to="/signin"   class="link">有账号，去登录</router-link>
        <div class="alert-warning " :class = "{'z-none':this.tips ==''?true:false}" role="alert">{{tips}}</div>
    </form>
</div>


</template>



<script>
require('../css/logup');

 export default {
    data:function () {
      return {
          username:'',
          password:'',
          email:'',
      }
    },
     computed:{
         tips:function () {
             let t ="";
             let vm = this;
             switch (this.$store.getters.singUpStatus){
                 case 200 :t = "注册成功";
                     vm.$store.dispatch('setSignStatus',true)
                 setTimeout(function () {
                    location.href = "/"
                 },1000);break;
                 case 301 :t = "换个用户名吧，这个已经存在了";break;
                 case 302 :t = "邮件已经被人用了~";break;
             }
             return t;

         }
     },
     methods:{
         submit:function () {
             const vm = this;
             if(this.username==''){
                this.tips = "要输入正确昵称哦";
                 return false
             }
             if(this.email==''){
                 this.tips = "要输入正确邮箱哦";
                 return false
             }
             if(this.password==''){
                 this.tips = "弄啥呢，密码都不写";
                 return false
             }
             this.tips ="";
             this.$store.dispatch('signup',{
                 username:vm.username ,
                 email:vm.email,
                 password:vm.password
             });

         }
     }
 }

 </script>