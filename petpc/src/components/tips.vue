<template>
   <div class="g-tips" :class="{'show':show}">
      {{tips}}
   </div>
</template>

<style  rel="stylesheet/scss" lang="scss">
    @import "../css/base/min";

    .g-tips{
        position: absolute;
        top:85px;
        z-index: 5;
        right: 0;
        color: $color;
        background-color: #fff;
        border-radius: 2px;
        border:1px solid $color;
        text-align: center;
        opacity: 0;
        transition: all 0.5s;
        width: 0;
        height: 30px;
        line-height: 30px;
        word-break: keep-all;
        &.show{
            opacity: 1;
            width: 200px;
        }
    }

</style>
<script>

    export default{
        data(){
            return{
                show:false
            }
        },
        computed:{
            tips:function () {
                let vm = this;
                this.show = this.$store.getters.tips?true:false;
                if(vm.show){
                    setTimeout(function () {
                        vm.show = false;
                        vm.$store.commit('SET_TIPS','');
                        return
                    },1200)
                }
                return this.$store.getters.tips;
            }
        }

    }
</script>
