

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
        <div class="alert-warning " :class = "{'z-none':this.tips2 ==''?true:false}" role="alert">{{tips2}}</div>
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
          tips2:''
      }
    },
     created:function () {
         const vm = this;
         this.$store.dispatch('checkedLogin').then(function () {
             if(vm.$store.getters.isLogin){
                 vm.$router.push('/index');
             }
         })
     },
     computed:{
         tips:function () {
             let t ="";
             let vm = this;
             console.log(123);
             switch (this.$store.getters.signStatus){
                 case 200 :t = "注册成功";

                 setTimeout(function () {
                     vm.$router.push('/');
                 },500);break;
                 case 301 :t = "换个用户名吧，这个已经存在了";break;
                 case 302 :t = "邮件已经被人用了~";break;
                 default:t = "";
             }
             return t;

         }
     },
     methods:{
         submit:function () {
             const vm = this;
             const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
             if(vm.username==''){
                 vm.tips2 = "要输入正确昵称哦";
                 return false
             }
            if(!reg.test(vm.email)){
                vm.tips2 = "要输入正确邮箱哦";
                 return false

             }

             if(vm.password==''){
                 vm.tips2 = "弄啥呢，密码都不写";
                 return false
             }
             vm.tips2 ="";
             vm.$store.dispatch('signup',{
                 username:vm.username ,
                 email:vm.email,
                 password:vm.password
             });

         }
     }
 }

 </script>