

<template>

<div class="p-setting">
    <div class="m-list-box">

        <h3>用户信息</h3>

    </div>
    <div class="m-list-box">

        <span>头像</span>
        <span><img src="https://shq-pic.b0.upaiyun.com/Attachment/face/010/82/07/06_avatar.jpg"></span>
        <span class="u-p1">
            仅支持 jpg、png 格式大小 2M 以内图片。

        </span>
        <span class="u-btn">点击上传</span>
    </div>
    <div class="m-list-box">

        <span>昵称</span>
        <input value="123">
        <div class="u-edit">
            <span   @click="edit" v-show=!isEdit class="cancel">取消</span>
            <span  v-show=!isEdit class="glyphicon glyphicon-pencil"></span>
            <span  @click="edit" class="edit" v-show=isEdit>编辑</span>
        </div>

    </div>
</div>


</template>



<script>
require('../css/user');


 export default {
    data:function () {
      return {
          isEdit:false
      }
    },

     computed:{

     },
     components:{

     },
     methods: {
         edit:function(){
             this.isEdit = !this.isEdit
         }

     }
 }

 </script>