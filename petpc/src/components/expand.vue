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

<script>
require('../css/expand');
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
        mounted(){
             
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
