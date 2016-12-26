

<template>

<div class="p-index">
    <com-nav :isLogin = isLogin></com-nav>
    <com-content></com-content>
</div>


</template>



<script>
require('../css/index');
import nav from '../components/nav.vue';
import content from '../components/content.vue';

 export default {
    data:function () {
      return {}
    },
     computed:{

     },
     components:{
         comNav:nav,
         comContent:content,
     }
 }

 </script>