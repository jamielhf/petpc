

<template>

<div class="p-index">
    <com-nav ></com-nav>
    <div class="m-content">
        <div class="content-top">
            <ul class="top-left clearfix">
                <li>最新</li>
                <li>最多收藏</li>
                <li>完成领养</li>
                <li>未被领养</li>
            </ul>

        </div>
        <com-content :article = article></com-content>
    </div>

</div>


</template>



<script>
require('../css/index');
require('../css/comm');
import nav from '../components/nav.vue';
import content from '../components/content.vue';

 export default {
    data:function () {
      return {
          article:[]
      }
    },
     computed:{

     },
     components:{
         comNav:nav,
         comContent:content,
     }
 }

 </script>