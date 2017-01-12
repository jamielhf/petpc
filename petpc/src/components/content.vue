<template>

        <div class="m-content-box">
            <ul>

                <li v-for = "(v,k) in article"  class="clearfix m-list">

                    <div class="list-row">
                        <a href="#">{{v.title}}</a>
                        <time>{{v.time}}</time>
                    </div>
                    <div class="list-row h100">

                            <img v-for = "(v1,k1) in v.imgArr" :class="{'z-none':k1>2}" class="list-img" :src="v1.sPhoto">


                            <div class="c-row">
                                <div class="list-icon" title="收藏">
                                    <div class="glyphicon glyphicon-heart"></div>
                                    <div class="p1">{{v.star}}</div>

                                </div>
                                <div class="list-icon" title="评论">
                                    <div class="glyphicon glyphicon-comment"></div>
                                    <div class="p1">{{v.comments.length}}</div>
                                </div>
                            </div>
                            <div class="c-row">
                                <div class="list-right">
                                    <span v-for = "item in v.tag">{{item}}</span>
                                    <img :src=v.uHead>
                                </div>
                            </div>


                    </div>

                </li>
            </ul>
        </div>

</template>

<script>


    require('../css/content-list.scss');

    export default{
        data(){
            return{

            }
        },
        props:{
            article: {
                type: Array,
                required: true
            },
        },
        updated:function () {
            console.log(this.article[0].imgArr)
        },
        computed:{
            aList(){

            }
        }

    }
</script>
