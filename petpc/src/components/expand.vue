<template>
    <div class="g-expand" >

        <ul>
            <li  v-for = "(value ,key) in img" :class ="{'z-active':key==selNum}" ><img :src="value.photo"></li>
        </ul>
            <div  @click="prev" class="glyphicon glyphicon-chevron-left"></div>
            <div  @click="next" class="glyphicon glyphicon-chevron-right"></div>
            <div  @click="close" class="glyphicon  glyphicon-remove"></div>
    </div>
</template>
<style  rel="stylesheet/scss" lang="scss">
    @import "../css/base/min";

    .g-expand{
        transition: all .5s;
        -webkit-transition: all .5s;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.68);
        z-index: -1;
        left:0;
        top:0;
        opacity: 0;
        &.z-active{
            opacity: 1;
            z-index: 105;
        }
        ul{
            position: relative;
            width: 100%;
            left: 50%;
            margin-left: -50%;
            height:100%;

            li{
                height:100%;
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                opacity: 0;
                z-index: 0;

                &.z-active{
                    opacity: 1;
                    z-index: 3;
                }
            }
            img{
                position: relative;
                top:50%;
                display: block;
                margin: 0 auto ;
                width: 40%;
                height: auto;
                transition: all .3s;
                -webkit-transition: all .3s;
                transform:translate(0,-50%);
                -webkit-transform:translate(0,-50%);
            }
        }
        .glyphicon{
            position: absolute;
            width: 100px;
            height: 100px;
            display: block;
            cursor: pointer;
            color: $color;
            font-size: 30px;
            z-index: 106;
        }
        .glyphicon-remove{
            right: 10%;
            top:10%;
        }
        .glyphicon-chevron-left{
            left: 10%;
            top:50%;
        }
        .glyphicon-chevron-right{
            right: 10%;
            top:50%;
        }
    }

    </style>
<script>

    export default{
        props:{

            img:{
                type:Array,
                require:true,
            },
            selNum:{
                type:Number,
                require:true,
            }

        },
        data(){
            return{

            }
        },

        updated(){

//            let iDom =  document.querySelector('li.z-active img');
//
//            let h = iDom.offsetHeight;
//            let w =  iDom.offsetWidth;
//            console.log(w,h)
//            iDom.style.marginTop = '-'+h/2+'px';
        },

        computed:{


        },

        methods:{
            close(){
                this.$emit('changeShow');
            },
            prev(){
                this.$emit('prev');
            },
            next(){
                this.$emit('next');
            }
        }

    }
</script>
