<template>
  <div >
    <com-header :isLogin = isLogin></com-header>

      <router-view></router-view>
  </div>
</template>

<script>

  import header from './components/header.vue'

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
  components:{
    comHeader:header
  }

}
</script>
