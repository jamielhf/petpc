

<template>

<div class="p-user-article">
    <div class="m-main-content">
        <div class="m-content">
            <div class="content-top">
                <ul class="top-left clearfix">

                    <li @click="changeNav(key)" v-for = "(value,key) in navData"  :class="{'z-active':key==nav}">{{value}}</li>

                </ul>

            </div>
            <com-content  :article = article></com-content>
        </div>
    </div>

</div>


</template>



<script>
    require('../css/user-article')

import content from '../components/content.vue';

 export default {
    data:function () {
      return {
          nav:0,
          navData:['全部','审核已通过','未通过']
      }
    },

     methods:{
         changeNav:function (t) {
                this.nav = t;
         }
     },
     created:function () {
         let id = this.$store.getters.getUid;
       if(id){
           this.$store.dispatch('getArticle',{id:id})
       }
     },
     watch:{
       uid: function () {
           this.$store.dispatch('getArticle',{id:this.uid})
       }
     },
     computed:{
        uid:function () {
                return this.$store.getters.getUid
        },
         article(){

             let a =  this.$store.getters.getArticleList?this.$store.getters.getArticleList:[];
             return a
         }
     },
     components:{
         comContent:content,
     }
 }

 </script>