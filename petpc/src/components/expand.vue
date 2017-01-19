<template>
    <div class="g-expand">
        <ul>
            <li  v-for = "value in img"><img :src="value.photo"></li>
        </ul>

    </div>
</template>

<script>
require('../css/expand');
    export default{
        data(){
            return{
                
            }
        },
        props:{
            img:{
                type:Array,
                require:true,
            }
        }

    }
</script>
