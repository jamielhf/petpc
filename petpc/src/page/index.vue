

<template>

<div class="p-index clearfix">
    <com-nav ></com-nav>
    <div class="m-content">
        <div class="content-top">
            <ul class="top-left clearfix">
                <li @click = "sort('all')">最新</li>
                <li @click = "sort('star')">最多收藏</li>
                <li @click = "sort('comments')">最多评论</li>
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

         this.$store.dispatch('checkedLogin',function (res) {
             if(res.status){
                 let id = vm.$store.getters.getUid;
                 vm.$store.dispatch('getArticle',{uid:id,type:'all'}).then(function () {
                     vm.article = vm.$store.getters.getArticleList;
                 })
             }else{
                 vm.$store.dispatch('getArticle',{uid:0,type:'all'}).then(function () {
                     vm.article = vm.$store.getters.getArticleList;
                 })
             }

         })



     },
     methods:{
        sort:function(type){
            let vm =this;
            this.$store.dispatch('getArticle',{uid:0,type:type}).then(function () {
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