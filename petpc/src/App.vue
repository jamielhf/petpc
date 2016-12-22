<template>
  <div >
    <com-header></com-header>

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
  components:{
    comHeader:header
  }

}
</script>
