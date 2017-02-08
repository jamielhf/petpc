<template>
    <div class="loading-bar opacity-fade-transition " :class = "{'z-none':!isLoading}">
        <div class="m-progress"></div>
    </div>
</template>
<style  rel="stylesheet/scss" lang="scss">
    @import "../css/base/min";

    .loading-bar {
        position: fixed;
        z-index: 6;
        left: 0;
        top: 0;
        right: 0;
        height: .2em;
    }
    .opacity-fade-transition {
        -webkit-transition: opacity .3s;
        transition: opacity .3s;
    }

    .loading-bar .m-progress {
        position: absolute;
        height: 100%;
        -webkit-animation: loading 1.5s linear infinite;
        animation: loading 1.5s linear infinite;
        background-color: $color;
    }
    @keyframes loading {
        0%{left:0;right:100%}
        50%{left:0;right:0}
        100%{left:100%;right:0}
    }

    @-webkit-keyframes loading {
        0%{left:0;right:100%}
        50%{left:0;right:0}
        100%{left:100%;right:0}
    }
</style>
<script>

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
