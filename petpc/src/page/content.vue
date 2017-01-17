<template>
    <div class="g-content">

        <div class="c-type">
           <h1>{{content.title}}</h1>
        </div>
        <div class="c-type">
            <h3>宠物信息</h3>
        </div>
        <div class="c-type">
            <p>地区：{{address}}</p>
        </div>
        <div class="c-type">
            <p>种类：{{pet.type}}</p>
          </div>
        <div class="c-type">
            <p>性别：{{pet.sex}}</p>

        </div>
        <div class="c-type">
            <p>年龄：{{pet.age}}</p>

        </div>
        <div class="c-type">
            <p>来源：{{pet.from}}</p>

        </div>

        <div class="c-type ">
            <p>绝育：{{pet.sterilization}}</p>

        </div>
        <div class="c-type">
            <p>免疫：{{pet.immune}}</p>

        </div>
        <div class="c-type">
            <p>体内驱虫：{{pet.insect}}</p>

        </div>
        <div class="c-type">
            <p>宠物图片：</p>
            <div class="c-img-list">

            </div>
        </div>
        <div class="c-type last">
            <h3>宠物描述以及领养要求</h3>
        </div>
            <div class="c-art-content">
                {{content.content}}
            </div>


    </div>

</template>



<script>

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

        methods: {


        },
         computed: {
             content(){
                if(this.$store.getters.getArticleContent.length>0){

                    return this.$store.getters.getArticleContent[0]
                }else{
                    return []
                }

             },
             pet(){
                 if(this.$store.getters.getArticleContent.length>0){
                     return this.content.pet[0]

                 }else{
                     return []
                 }
             },
             address(){
                 if(this.$store.getters.getArticleContent.length>0){
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

