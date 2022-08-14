<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked">
          </li>
          <li class="cart-list-con2">
          
            <img :src="cart.imgUrl">
 
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
      
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="headler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @click="headler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="headler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCateByid(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllchecked" @change="updateAllChecked($event,cart)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="dateleCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） :</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    name: 'ShopCart',
    mounted(){
       this.$store.dispatch("getCartList"); 
    },
    computed:{
      ...mapGetters(['cartList']),
      //购物车数据
      //现在获取到了数据可以动态展示了
      cartInfoList(){
        return this.cartList.cartInfoList||[];
      },
      totalPrice(){
        let sum = 0;
        this.cartInfoList.forEach(item => {
           sum+=item.skuNum * item.skuPrice;
        });
        return sum;
      },
      isAllchecked(){
        //every 遍历元素
        return this.cartInfoList.every(item=>item.ischecked==1);
      }
    },
    methods:{
    async headler(type,disNum,cart){
      //点击加减都需要给服务器发请求存储起来
      //要不然刷新的话你点击的加减都无效的
      //现在给传了三个值
      //第一个type值为加减 add为加 minus为减 change为input改的值
      //第二个值为加减 1为正1 -1为负1 
      //第三个值为你点的哪个产品的值，cart是你遍历过的 里边有产品id
        switch(type){
          //这个是做了一个判断 switch语句逻辑是匹配 如果你点击的是add 则执行你写的这一段代码块
        case "add":
            disNum = 1; //点击add则执行
          break;  
          case "minus":  //点击minus减 则执行
          //做了一个判断 数量大于1则执行
            if(cart.skuNum>1){
              disNum = -1;
              //数量少于1则执行
            }else{
              disNum = 0;
            }
            //三元运算符 大于1 或者 -1 或者为 0
            disNum = cart.skuNum >1 ? -1:0;
            break;
            //用户输入的如果是非法的，比如汉字或者小数，还会恢复原样
            case "change":
              if(isNaN(disNum)||disNum<1){
                disNum = 0;
              } else{
                //这个是代表的如果输入的是小数，则向下取整
                disNum = parseInt(disNum) - cart.skuNum
              }
              break
        }
        try{
        //派发action 发网络请求 一刷新就可以看到最新的数据
         await this.$store.dispatch('getShopCart',{goodid:cart.skuId,skuNum:disNum});
         this.getDate();
        } catch(error){
          console.log('网络请求错误')
        }
     },
     async deleteCateByid(cart){
       let skuId = cart.skuId;
      try{
       await this.$store.dispatch('deleteCartById',cart.skuId)
      }catch(error){
        
      }
     },
   /* async changeChecked(cart, e) {
      //整理参数
      let params = {
        skuId: cart.skuId,
        isChecked: e.target.checked ? "1" : "0",
      };
      //发请求:修改商品的勾选的状态
      try {
        await this.$store.dispatch("changeChecked", params);

      } catch (error) {}
    },
    */
      dateleCart(){
        //派发action
        this.$store.dispatch("deleteCartList")
      },
      goTrade(){
        this.$router.push('/trade')
      }
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

  

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>