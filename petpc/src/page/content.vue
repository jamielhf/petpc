<template>
    <div>

     <com-expand  :class ="{'z-active':show}"  @prev = "prev" @next = "next" :selNum = 'selNum'  @changeShow="changeShow" :img="content.imgArr"></com-expand>

        <span @click="goBack" class="glyphicon glyphicon-remove g-content-remove"></span>
    <div class="g-content">

        <div class="c-type c-title">
           <h1>{{content.title}}</h1>
            <img :src="content.uHead">
           <div class="c-list">
               <p>作者:{{content.username}}</p>
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
                    <img @click="showExpand"  v-for = "(value,key) in content.imgArr"  :data = "key" :src="value.sPhoto">
                </div>
            </div>
            <div class="c-type last">
                <h3>宠物描述以及领养要求</h3>
            </div>
            <div class="c-art-content" v-html ="content.content"> </div>

        </div>


    </div>

        <comComment v-if="isAdmin" :comments = commentsData></comComment>
        <div v-if="!isAdmin"  class="c-btn-group">
            <a @click = 'changeStatus(1)' class="c-btn c-pass">通过</a>
            <a @click = 'changeStatus(2)'  class="c-btn c-nopass">不通过</a>
        </div>
    </div>
</template>

<style  rel="stylesheet/scss" lang="scss">

    @import "../css/base/min";
    .glyphicon-remove.g-content-remove{
        color: $color;
        font-size: 30px;
        position: absolute;
        top: 120px;
        left:50px;
        z-index: 10;
        cursor:pointer;
    }
    .c-btn-group{
            width:285px;
            margin:30px auto;
        .c-btn{
           width:100px;
            text-align: center;
              margin:0 20px;
            &.c-nopass{
                background-color: #666;
             }

        }
    }
    .g-content{
        position: relative;
        margin: 0 auto;
        width: 800px;
        color: #333;
        background-color: #fff;
        padding: 0 0 100px;
        box-sizing: border-box;
        .c-content{
            position:relative;
            box-sizing: border-box;
            padding: 20px 50px;
        }
        .c-art-content{
            padding: 10px;
            box-sizing: border-box;
        }
        .c-img-list{
            padding: 10px 0;
            img{
                cursor: pointer;
            }
        }
        .c-type{
            padding: 3px 0;
            box-sizing: border-box;
            position: relative;
            .c-p1{
                width: 50%;
                line-height: 1.8;
                float: left;
            }
            &.c-title{
                background-color: $color;
                height: 150px;
                padding: 50px 30px 0;

                box-sizing: border-box;
                color: #fff;
                img{
                    float: left;
                    cursor: pointer;
                    width: 45px;
                    height: 45px;
                    border-radius: 100%;
                    margin-left: 20px;
                }
                .c-list{
                    width: 80%;
                    float: left;
                    margin-left: 10px;
                }
                p,span,time{
                    color: #fff;
                    font-size: 14px;
                }
            }
        }

        h1{
            font-size: 24px;
            padding: 10px 0 10px 20px;
            text-align: left;
        }
        h3{
            font-size: 18px;
            padding: 20px 0;
            box-sizing: border-box;
            border-bottom:1px solid #e5e5e5;
        }
        p{
            font-size: 14px;
            color: #666;
        }
    }
</style>

<script>
import expand from '../components/expand.vue';
import comment from '../components/comment.vue';


    export default {
        data(){
            return{
                show:false,
                imgArr:{},
                selNum :0,
                userInfo:{}  //用户信息
            }
        },
        created(){
            let vm = this;

            this.$store.dispatch('getArticleContent',{id:this.$route.query.id})

        },
        components:{
           comExpand:expand,
           comComment:comment,
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            },
            changeShow(){
                this.show = !this.show
            },
            showExpand(e){
                this.selNum =  parseInt(e.target.getAttribute('data'));
                this.show = true
            },
            prev(){
                if(this.selNum>0){
                    this.selNum--;
                }
            },
            next(){
                if(this.selNum+1<this.content.imgArr.length){
                    this.selNum++;
                }
            },
            /*
            * 审核
            * */
            changeStatus(status){
                let vm = this;
                this.$store.dispatch('setArticleStatus',{
                    id:vm.$route.query.id,
                    status:status
                }).then(function(){
                    if(status==1){
                        vm.$store.commit('SET_TIPS','审核通过')
                    }else if(status==2){
                        vm.$store.commit('SET_TIPS','审核不通过')
                    }
                    setTimeout(function(){
                        vm.$router.push('/admin')
                    },1000)

                })
            },



        },
         computed: {
             content(){
                 let c = this.$store.getters.getArticleContent
                if(c._id){
                    c.cLength = c.comments.comments.length
                    return c
                }else{
                    return []
                }

             },
             isAdmin(){
                 let info = this.$store.getters.getInfo;

                 if(info.type=='user'){
                     return true
                 }else if(info.type=='admin'){
                     return false
                 }else{
                     return true
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
             },
             commentsData(){
                 if(this.$store.getters.getComments){
                     return this.$store.getters.getComments
                 }else{
                     return {}
                 }


             }

        },
        mounted() {

        }
    }

</script>

