

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

<style  rel="stylesheet/scss" lang="scss">
    @import "../css/base/min";
    @import "../css/comm";

    .p-index{
        position: relative;
        width: 1000px;
        margin: 0 auto;
    }

</style>

<script>

import nav from '../components/nav.vue';
import content from '../components/content.vue';

 export default {
    data:function () {
      return {
          article:[]
      }
    },
     created:function () {
         let vm =this;
         let id = this.$store.getters.getUid;
         if(id){
             this.$store.dispatch('getArticle',{uid:id,type:'all'}).then(function () {
                 vm.article = vm.$store.getters.getArticleList;
             })
         }
     },

     components:{
         comNav:nav,
         comContent:content,
     }
 }

 </script>