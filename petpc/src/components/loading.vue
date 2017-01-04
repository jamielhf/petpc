<template>
    <div class="loading-bar opacity-fade-transition " :class = "{'z-none':!isLoading}">
        <div class="m-progress"></div>
    </div>
</template>

<script>
require('../css/loading.scss');
    export default{
        data(){
            return{

            }
        },
        computed:{
            isLoading(){
                return this.$store.getters.isLoading
            }
        }

    }
</script>
