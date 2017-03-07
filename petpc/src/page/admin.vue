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
                navData:['审核中','审核已通过','未通过'],

            }
        },

        methods:{
            changeNav:function (t) {
                let vm =this;
                vm.nav = t;
                switch (t){
                    case 0:t = 'reviewed';break;
                    case 1:t = 'pass';break;
                    case 2:t = 'noPass';break;
                   default:t = 'reviewed';break;
                }
                this.$store.dispatch('getArticle',{uid:0,type:t}).then(function () {
                    vm.articleData = vm.$store.getters.getArticleList?vm.$store.getters.getArticleList:[];
                })

            },
            getData(){


            }
        },
        created:function () {
            let vm =this;
            this.$store.dispatch('getArticle',{uid:0,type:'reviewed'}).then(function () {
                vm.articleData = vm.$store.getters.getArticleList?vm.$store.getters.getArticleList:[];
                console.log(vm.articleData)
            })

        },
        components:{
            comContent:content,
        }
    }

</script>