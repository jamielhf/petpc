

<template>

<div class="p-logup">
    <form class="form-horizontal" role="form">
        <div class="form-group">
            <div class="col-sm-12">
                <input type="text" class="form-control" id="username" placeholder="账号">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <input type="email" class="form-control" id="inputEmail" placeholder="邮箱">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <input type="password" class="form-control" id="inputPassword3" placeholder="密码">
            </div>
        </div>


        <button type="submit" class="btn btn-primary  btn-default btn-block">注册</button>
    </form>
</div>


</template>



<script>
require('../css/logup');


 export default {
    data:function () {
      return {}
    }
 }

 </script>