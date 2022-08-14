<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorlist" :key="floor.id" :list="floor"/>
    <Brand/>
    
  </div>

</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
  name:'',
   components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
},
   mounted(){
    //派发getFloorList给store
     this.$store.dispatch("getFloorList");
     this.$API.reqUSER() 
     //有一个父子组件通信知识点：
     //在标签名后边加动态绑定 ： 比如 :list="floor"
     //前面是名字，后边是传的值
     //最后需要接收以下 传给谁谁接收
   },
  computed:{
    ...mapState({floorlist: (state) => state.home.floorlist})
   }
}
</script>

<style>

</style>