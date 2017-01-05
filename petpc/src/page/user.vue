

<template>

<div class="p-setting">
    <div class="m-list-box">

        <h3>用户信息</h3>

    </div>
    <div class="m-list-box">

        <span>头像</span>
        <span><img id="img" :src="file"></span>
        <span class="u-p1">
            仅支持 jpg、png 格式大小 2M 以内图片。
        </span>
        <span class="u-btn" @click="clickImg">点击上传</span>
        <input  type="file" id="file" @change = "upload" >
    </div>
    <div class="m-list-box ">

        <span>昵称</span>
        <input id="username" :value=username @focus = "focus(0,$event)" :class = "{color6:isEdit[0]}">
        <div class="u-edit">
                <span v-show = "isEdit[0]" @click="edit(0)"  class="cancel ">取消</span>
                <span v-show = "isEdit[0]" @click = "saveName(0)" >保存</span>
                <span v-show = "!isEdit[0]" @click="edit(0)" class="edit" >编辑</span>
        </div>

    </div>
    <!--<div class="m-list-box mt100">-->

        <!--<h3>账号关联</h3>-->

    <!--</div>-->
    <!--<div class="m-list-box">-->

        <!--<span>邮箱</span>-->
        <!--<input :value="info.email"  @focus = "focus(1)" :class = "{color6:isEdit[1]}">-->
        <!--<div class="u-edit">-->
            <!--<span v-show = "isEdit[1]" @click="edit(1)"  class="cancel ">取消</span>-->
            <!--<span v-show = "isEdit[1]" >保存</span>-->
            <!--<span v-show = "!isEdit[1]" @click="edit(1)" class="edit" >编辑</span>-->
        <!--</div>-->

    <!--</div>-->
    <div class="m-list-box mt100">

        <h3>修改密码</h3>

    </div>
    <div class="m-list-box">

        <span>旧密码</span>
        <input type="password" v-model="pwd" placeholder="输入当前密码">


    </div>
    <div class="m-list-box">

        <span>新密码</span>
        <input type="password" v-model = "npwd"  placeholder="设置6位或以上的密码">


    </div>
    <div class="m-list-box">

        <span>确认新密码</span>
        <input type="password" v-model = "npwd2"   placeholder="确认新密码">

    </div>
    <div class="m-list-box">
        <a class="btn btn-primary  btn-default btn-block" @click = "savePassword">保存修改</a>
        </div>
</div>


</template>



<script>
require('../css/user');


 export default {
    data:function () {
      return {
          isEdit:{
              0:false,
//              1:false,
          },
//          file:'https://shq-pic.b0.upaiyun.com/Attachment/face/010/82/07/06_avatar.jpg',
          pwd:'',
          npwd:'',
          npwd2:'',
      }
    },

     computed:{
         username:function () {
            let a = this.$store.getters.getInfo.username;
            return a
         },
         file:function () {
             console.log(this.$store.getters.getInfo.head)
             if(this.$store.getters.getInfo.head){
                 return this.$store.getters.getInfo.head
             }else{
                 return 'https://shq-pic.b0.upaiyun.com/Attachment/face/010/82/07/06_avatar.jpg'
             }
         }
     },
     components:{

     },
     methods: {
         edit:function(num){
            this.isEdit[num] = !this.isEdit[num];


         },

         focus:function (num) {
             this.isEdit[num] = true;


         },
         upload:function (event) {
             let vm =this;
             let file = event.target.files[0];
             let data = new FormData();
             data.append("file",file);

             if(file){
                 var fr = new FileReader();
                 fr.onloadend = function(e) {
                    vm.file =  e.target.result;
                 };
                 fr.readAsDataURL(file);
             }

             this.$store.dispatch('setHead',data)

         },
         clickImg:function () {
            document.querySelector('#file').click();
         },
         saveName:function (num) {
                let username = document.querySelector('#username').value;
                if(username==this.username){
                    this.isEdit[num] = false;
                    return
                }
                 this.$store.dispatch('changeInfo',{username:username});
                 this.isEdit[num] = false;
         },
         savePassword:function () {
                let vm = this;
               if(this.npwd != this.npwd2){
                   this.$store.commit('SET_TIPS','新密码前后输入不一致');
                   return
               }
             this.$store.dispatch('changeInfo',{password:this.pwd,nPassword:this.npwd})
         }

     }
 }

 </script>