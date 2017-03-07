<template>

        <div class="m-content-box">
            <ul>

                <li v-for = "(v,k) in article"  class="clearfix m-list">

                    <div class="list-row">
                        <router-link :to="{path:'/article/content',query:{id:v._id}}">{{v.title}} </router-link>
                        <time>{{v.time}}</time>
                    </div>
                    <div class="list-row h100">
                            <img  v-for = "(v1,k1) in v.imgArr" :class="{'z-none':k1>2}" class="list-img" :src="v1.sPhoto">

                            <div class="c-row">
                                <div class="list-icon" title="收藏" @click = "star(v._id,v.isStar)" :class = "{'z-active':v.isStar}">
                                    <div class="glyphicon glyphicon-heart"></div>
                                    <div class="p1">{{v.star}}</div>
                                </div>
                                <router-link :to="{path:'/article/content',query:{id:v._id}}" class="list-icon" title="评论">
                                    <div class="glyphicon glyphicon-comment"></div>
                                    <div class="p1">{{v.commentsNum}}</div>
                                </router-link>
                            </div>
                            <div class="c-row">
                                <div class="list-right">
                                    <span v-for = "item in v.tag">{{item}}</span>
                                    <img :src=v.uHead>
                                </div>
                            </div>


                    </div>

                </li>


                <li class="c-tips" v-if = "article.length==0">
                    <p>暂无文章</p>
                </li>
            </ul>
        </div>

</template>


<style  rel="stylesheet/scss" lang="scss">
    @import "../css/base/min";

    .m-content-box{
        a{
            text-decoration: none;
        }
        .c-tips{
            width: 100%;
            padding: 50px 0 20px;
            text-align: center;
            color:#999;
        }
        .m-list{
            position: relative;
            padding-top: 10px;
            border-bottom:1px dashed #e9e9e9;
        }
        .list-row{
            position: relative;
            width: 100%;
            font-size: 24px;
            line-height: 1.5;
            display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;      /* TWEENER - IE 10 */
            display: -webkit-flex;     /* NEW - Chrome */
            display: flex;
            &.h100{
                height: 102px;
            }
            a{
                -webkit-box-flex: 1 ;  /* OLD - iOS 6-, Safari 3.1-6 */
                -moz-box-flex: 1;    /* OLD - Firefox 19- */
                -webkit-flex: 1;   /* Chrome */
                -ms-flex: 1 ;      /* IE 10 */
                flex: 1;         /* NEW, Spec - Opera 12.1, Firefox 20+ */
                color: #333;
                text-decoration: none;
                transition: color .3s;
                &:hover{
                    color: $color;
                }

            }
            time{
                -webkit-box-flex: 1 ;  /* OLD - iOS 6-, Safari 3.1-6 */
                -moz-box-flex: 1;    /* OLD - Firefox 19- */
                -webkit-flex: 1;   /* Chrome */
                -ms-flex: 1 ;      /* IE 10 */
                flex: 1;         /* NEW, Spec - Opera 12.1, Firefox 20+ */
                text-align: right;
                padding-right: 10px;
                font-size: 14px;
                color: #999;
            }
            .list-icon{
                position: relative;
                right: 0;
                display: inline-block;
                cursor: pointer;
                border-radius: 1px;
                line-height: 1;
                border:1px solid #eee;
                padding:0 8px;
                box-sizing: border-box;
                .glyphicon{
                    margin:  0 2px;
                }

                div{
                    position: relative;
                    transition:color 0.3s;
                    top: -3px;
                    display: inline-block;
                    color: #ccc;
                    font-size: 12px;
                    opacity: 1;
                }
                .p1{
                    display: inline-block;
                }

                &:hover,&.z-active{
                    .glyphicon{

                        color: $color;
                    }
                    .p1{
                        color: $color;
                    }

                }

            }

        }
        .list-img{
            width: 82px;
            height: 82px;
            margin:10px 10px 10px 0;

        }

        .c-row{
            height: 41px;
            position: absolute;
            right: 0;
            top:5px;
            &:last-child{
                top:45px;
            }

        }
        .list-right{
            position: relative;
            span{
                cursor: pointer;
                font-size: 12px;
                color: #999;
                padding: 4px 8px;
                border-radius: 2px;
                margin: 0 5px;
                background-color:#f9f9f9;
                &:hover{
                    background-color: $color;
                    color: #fff;
                }
            }
            img{
                border-radius: 100%;
                cursor: pointer;
                width: 35px;
                height: 35px;
            }
        }
    }


</style>
<script>

    export default{
        data(){
            return{

            }
        },
        props:{
            article: {
                type: Array
            },
        },
        updated:function () {
            console.log(this.article)
//            console.log(this.article[0].imgArr)
        },
        computed:{
            uid(){
                return this.$store.getters.getUid;
            }
        },
        methods:{
            star(id,isStar){
                let vm = this;

                if(this.$store.getters.isLogin==true){
                        this.$store.dispatch('setArticleStar',{
                            uid:vm.uid,
                            aid :id,
                            star:!isStar
                        });

                    }else{
                        this.$router.push('signin')
                    }

            }
        }

    }
</script>
