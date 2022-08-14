<template>
  <div>
    <Header ></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {
   Header,Footer
  },
  mounted(){
    //派发action
    //App的这个生命周期钩子只工作一次 所以这个只派发一次
    //不会造成一直发送网络请求的情况
     this.$store.dispatch('category')
  }
}
</script>

<style>

</style>
