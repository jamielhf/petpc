<template>

<div class="p-user-article">
    <div class="m-main-content">
        <div class="m-content">
            <div class="content-top">
                <ul class="top-left clearfix">

                    <li @click="changeNav(key)" v-for = "(value,key) in navData"  :class="{'z-active':key==nav}">{{value}}</li>

                </ul>

            </div>
            <com-content  :article = articleData></com-content>
        </div>
    </div>

</div>


</template>

<style rel="stylesheet/scss" lang="scss">
    .p-user-article{
        .m-content {
            width: 100%;
            float: none;
        }
        .m-main-content{
            margin-top: 20px;
            width: 800px;
            padding: 0 ;
        }
    }
</style>

<script>
import content from '../components/content.vue';

 export default {
    data:function () {
      return {
          nav:0,
          articleData:[],
          all:[],   //全部
          pass:[],   //审核已通过
          reviewed:[], //审核中
          noPass:[],  //未通过
          navData:['全部','审核已通过','审核中','未通过'],

      }
    },

     methods:{
         changeNav:function (t) {
                this.nav = t;

             switch (this.nav){
                 case 0:this.articleData = this.all; break;
                 case 1:this.articleData = this.pass;break;
                 case 2:this.articleData = this.reviewed;break;
                 case 3:this.articleData = this.noPass;break;
                 default :this.articleData = this.all;
             }
         },
         getData(){

             this.all =  this.$store.getters.getArticleList?this.$store.getters.getArticleList:[];
             this.articleData  = this.all;

             let k;

             for(let v = 0;v<this.$store.getters.getArticleList.length;v++){
                 let s = this.$store.getters.getArticleList[v].status;
                 if(s==0){
                     this.reviewed.push(this.$store.getters.getArticleList[v])
                 }else if(s==1){
                     this.pass.push(this.$store.getters.getArticleList[v])
                 }else if(s==2){
                     this.noPass.push(this.$store.getters.getArticleList[v])
                 }

             }
         }
     },
     created:function () {
         let vm =this;
         let id = this.$store.getters.getUid;
           if(id){
               this.$store.dispatch('getArticle',{uid:id,type:'my'}).then(function () {
                   vm.getData()
               })
           }


     },
     components:{
         comContent:content,
     }
 }

 </script>