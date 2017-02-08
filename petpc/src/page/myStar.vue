<template>
    <div class="m-star">
       <com-content :article = starData></com-content>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
    @import "../css/base/min";
    .m-star{
        position: relative;
        width: 800px;
        padding: 0 20px 30px 20px;
        margin: 20px auto;
        box-sizing: border-box;
        background-color: #fff;

    }
</style>
<script>
 import content from '../components/content.vue'
    export default{
        data(){
            return{
                starData:[]
            }
        },
        created:function () {
            let vm =this;
            let id = this.$store.getters.getUid;
            if(id){
                this.$store.dispatch('getArticle',{uid:id,star:true}).then(function () {
                        vm.starData = vm.$store.getters.getArticleList;
                })
            }


        },
        components:{
            comContent:content
        }

    }
</script>
