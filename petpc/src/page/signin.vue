

<template>

    <div class="p-logup">
        <form class="form-horizontal" role="form">

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


            <button type="button" @click ="submit" class="btn btn-primary  btn-default btn-block">登录</button>
            <router-link to="/signup"  class="link">去注册</router-link>

            <div class="alert-warning " :class = "{'z-none':this.tips ==''?true:false}" role="alert">{{tips}}</div>
        </form>
    </div>


</template>



<script>
    require('../css/logup');



 export default {
    data:function () {
      return {
          password:'',
          email:''
      }
    },
     computed:{
         tips:function () {
             let t ="";
             let vm = this;
             switch (this.$store.getters.singInStatus){
                 case 200 :t = "登录成功";
                     vm.$store.dispatch('setSignStatus',true);
                      setTimeout(function () {
                          vm.$router.push('/');
                     },500);break;
                 case 301 :t = "邮箱或密码错误";break;
             }
             return t;

         }
     },
     methods:{
         submit:function () {
             const vm = this;
             if(this.email==''){
                 this.tips = "要输入正确邮箱哦";
                 return false
             }
             if(this.password==''){
                 this.tips = "弄啥呢，密码都不写";
                 return false
             }
             this.tips ="";
             this.$store.dispatch('signin',{
                 username:vm.username ,
                 email:vm.email
             });

         }
     }
 }

 </script>