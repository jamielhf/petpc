<template>
  <div @click = "hidden">
   <comLoading></comLoading>
   <comTips></comTips>
    <com-header :isLogin = isLogin></com-header>

      <router-view></router-view>

  </div>
</template>

<script>

  import header from './components/header.vue'
  import loading from './components/loading.vue'
  import tips from './components/tips.vue'

  require('./css/style.scss');
export default {
  name: 'app',
  data () {
    return {

    }
  },
  created:function () {
    this.$store.dispatch('checkedLogin')
  },
  computed:{
    isLogin:function () {

      return this.$store.state.login.loginStatus;
    }
  },
  methods:{
    hidden(){

    }
  },
  components:{
    comHeader:header,
    comTips:tips,
    comLoading:loading
  }

}
</script>
