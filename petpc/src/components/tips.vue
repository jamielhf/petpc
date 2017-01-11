<template>
   <div class="g-tips" :class="{'show':show}">
      {{tips}}
   </div>
</template>

<script>
require('../css/tips.scss');
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
