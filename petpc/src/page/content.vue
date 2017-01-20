<template>
    <div >
        <com-expand :img="content.imgArr"></com-expand>
    <span @click="goBack" class="glyphicon glyphicon-remove g-content-remove"></span>
    <div class="g-content">

        <div class="c-type c-title">
           <h1>{{content.title}}</h1>
            <img :src="content.uHead">
           <div class="c-list">
               <p>作者:12313</p>
           </div>
            <div class="c-list">
                <time>{{content.time}}</time>
                <span>阅读 {{content.read}}</span>
                <span>评论 {{content.cLength}} </span>
                <span>收藏  {{content.star}} </span>
            </div>
        </div>
        <div class="c-content">
            <div class="c-type ">
                <h3>宠物信息</h3>
            </div>
            <div class="c-type clearfix">
                <p class="c-p1">是否被领养：{{content.isDone?'是':'否'}}</p>
                <p class="c-p1">地区：{{address}}</p>
                <p class="c-p1">种类：{{pet.type}}</p>
                <p class="c-p1">性别：{{pet.sex}}</p>
                <p class="c-p1">年龄：{{pet.age}}</p>
                <p class="c-p1">来源：{{pet.from}}</p>
                <p class="c-p1">绝育：{{pet.sterilization}}</p>
                <p class="c-p1">免疫：{{pet.immune}}</p>
                <p class="c-p1">体内驱虫：{{pet.insect}}</p>
            </div>

            <div class="c-type">
                <p>宠物图片：</p>
                <div class="c-img-list">
                    <img v-for = "value in content.imgArr" :src="value.sPhoto">
                </div>
            </div>
            <div class="c-type last">
                <h3>宠物描述以及领养要求</h3>
            </div>
            <div class="c-art-content" v-html ="content.content">

            </div>

        </div>


    </div>
    </div>

</template>



<script>
import expand from '../components/expand.vue';
require('../css/content');
    export default {
        data(){
            return{

            }
        },
        created(){
            let vm = this;

            this.$store.dispatch('getArticleContent',{id:this.$route.query.id})

        },
        components:{
           comExpand:expand
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            }

        },
         computed: {
             content(){
                 let c = this.$store.getters.getArticleContent
                if(c._id){
                    c.cLength = c.comments.length
                    return c
                }else{
                    return []
                }

             },
             pet(){
                 if(this.$store.getters.getArticleContent.pet){
                     return this.content.pet[0]

                 }else{
                     return []
                 }
             },
             address(){
                 if(this.$store.getters.getArticleContent.address){

                     return this.content.address.replace(/\|/g,' ');

                 }else{
                     return false
                 }
             }

        },
        mounted() {
        }
    }

</script>

