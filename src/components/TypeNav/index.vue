<template>
    <!-- 商品分类导航 -->
        <div class="type-nav">
           
            <div class="container" @mouseenter="entershow" @mouseleave="levelshow">
                <h2 class="all">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <transition name="sort">
                <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="gosearch">
                        <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
                            <h3>
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">
                                    {{c1.categoryName}}
                                    </a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                                                {{c2.categoryName}}
                                                </a>
                                        </dt>
                                        <dd v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <em>
                                                <a :data-categoryName="c3.categoryName" :data-category3Id ="c3.categoryId">
                                                    {{c3.categoryName}}
                                                    </a>
                                            </em>
                                       
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </transition>
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'TypeNav',
  data() {
    return {
        show:true
    }
  },
   mounted(){
    //生命周期钩子 是指组件挂载完毕以后干的事
    //做一个if判断
    //这个导航栏想让他在search路由下面隐藏
    if(this.$route.path!="/home"){
        this.show=false
    }
  },
  computed:{
    ...mapState({
        categoryList:(state)=>state.home.categoryList
        })
  },
  methods:{
    //这部分主要是性能优化
    //先获取点击的节点
    //获取了以后要区分你点击的是a标签还是别的标签
    //所以在a标签上写了data-categoryName和data-category1id
    //区分好了以后
    //路由要传参
    //先写一个if嵌套函数
    //如果是category1id  query传category1Id=category1id
    //如果是category2id  query传category2Id=category2id
    //如果是category3id  query传category3Id=category3id
    //最后整理参数
    //search路由的query参数等于let.query
    //最后写一个编程式路由跳转
    gosearch(event){
        //Element是获取你点击的标签属性
       let Element = event.target;
       let {categoryname ,category1id,category2id,category3id} = Element.dataset;
        if(categoryname){
              //整理参数
              let location = {name:"search"};
              let query = {categoryName:categoryname};
           if(category1id){
            query.category1Id=category1id
           }else if(category2id){
              query.category2Id=category2id
           }else{ 
                 query.category3Id=category3id
           };
              //分割线
              //合并参数 
              //听的有点懵 回头补看把
              //主要就是把参数都合并了 keyword参数和category参数都有了
              if(this.$route.params){
                location.params=this.$route.params
                location.query = query
                this.$router.push(location)
              }
        }
    },
    entershow(){
        this.show =true
    },
    levelshow(){
        if(this.$route.path!="/home"){
            this.show=false
        }
    }
  }
}
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;
                            
                            a {
                                color: black;
                            }
                            
                        }

                        .item-list {
                                height: 450px;
                            overflow: hidden;
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
                .item:hover{
                    background-color: skyblue;
                }
            }
              .sort-enter{
                height: 0px;
              }
                .sort-enter-to{
                    height: 461px;
                }
                   .sort-enter-active{
                     transition: all .5s liner ;
                   }
        }
    }
</style>