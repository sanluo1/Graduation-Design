//配置路由的文件
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store'
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import MyOrder from '@/pages/Center/MyOrder'
import Group from '@/pages/Center/Group'
import shopCart from '@/store/shopCart';
//给push做一个备份 replace也做一个备份
let orginPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;

//重新二次加工了push方法 使多次点击搜索按钮不会报错
//做了一个构造函数 里边传了三个参数
//第一个参数是：告诉原来的push方法 你往哪里跳转(传递哪些参数)
//第二个参数是：成功的回调
//第三个参数是：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    orginPush.call(this, location, resolve, reject)
  } else {
    orginPush.call(this, location, () => {}, () => {});
  };
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    orginReplace.call(this, location, resolve, reject)
  } else {
    orginReplace.call(this, location, () => { }, () => { });
  }
}


//配置路由
let router = new VueRouter({
  //mode: 'history',
  routes: [
    {
      path: "/center",
      component: Center,
      meta: { show: true },
      //二级路由
      children: [
        {
          //这个我试过了
          //  不能加/
          //  加/就直接回home了
          path: "myorder",
          component: MyOrder
        },
        {
          path: "group",
          component: Group
        },
        //子组件重定向
        //你一打开center路由就定向到我的订单这
        {
          path: '/center',
          redirect: '/center/myorder',
        }
      ]
    },


    {
      path: "/paysuccess",
      component: PaySuccess,
      meta: { show: true },
      //路由独享守卫 【吃独食的】
      beforeEnter: (to, from, next) => {
        if (from.path == "/pay") {
          next();
        } else {
          next('false')
        }
      }
    },
    {
      path: "/pay",
      component: Pay,
      meta: { show: true },
      //路由独享守卫 【吃独食的】
      beforeEnter: (to, from, next) => {
        if (from.path == "/trade") {
          next();
        } else {
          next('false')
        }
      }
    },
    {
      path: "/trade",
      component: Trade,
      meta: { show: true },
      //路由独享守卫 【吃独食的】
      beforeEnter: (to, from, next) => {
        if (from.path == "/shopcart") {
          next();
        } else {
          next('false')
        }
      }
    },
    {
      path: "/shopcart",
      component: ShopCart,
      meta: { show: true }
    },
    {
      path: "/addcartsuccess",
      component: AddCartSuccess,
      name: 'addcartsuccess',
      meta: { show: true },
    },
    {
      path: "/detail/:goodid",
      component: Detail,
      meta: { show: true }
    },
    {
      path: "/home",
      component: Home,
      meta: { show: true }
    },
    {
      path: "/login",
      component: Login,
      meta: { show: false }
    },
    {
      path: "/register",
      component: Register,
      meta: { show: false }
    },
    {
      path: "/search/:keyword?",
      component: Search,
      meta: { show: true },
      name: "search",
      //路由组件可以传递props吗
      //布尔值写法
      props: true
    },
    //路由重定向 即你一打开就是这个路由组件
    //你打开这个网站 直接定向到这个路由
    {
      path: "*",
      redirect: "/home"
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    //返回的这个y代表始终滚动条在顶部
    //滚动行为
    //还有一个x
    return { y: 0 }
  },



})

//全局守卫(前置守卫) 看大门的保安 在路由跳转前能做的事
router.beforeEach(async (to, from, next) => {
  //to:可以获取到你要跳转到哪个路由的信息
  //from:可以获取到你从哪个路由来的信息
  //next:放行函数  next()放行，没限制了 next（path）放行到指定路由
  //next();
  //获取到token
  let token = store.state.user.token
  //已经有token数据了 用户已经登录了

  //有用户信息了
  let name = store.state.user.name
  if (token) {
    //如果你登录了还想跳转到登录页 不放行 还跳转到home 
    if (to.path == '/login') {
      next('home')
    } else {
      //假如你登录了但不是去的登录也而是其他的
      ////有用户信息了 放行 哪都能去
      if (name) {
        next();
      } else {
        try {
          //没有用户信息 派发action 让仓库存储用户信息在跳转
        await  store.dispatch('getUserInfoListOBJ',);
          next();
        } catch (error) {
          //token登录是会过期的
          //清除登录
          await store.dispatch('getLoginOut')
          next("/login")
        }
      }
    }
  } else {
    //未登录
    //未登录的不能去支付相关
    //未登录的你要去登录页面
    //未登录的不是去这些路由，放行比如home search

    //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
    let toPath = to.path;
    if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
      next('/login?redirect=' + toPath);
    } else {
      next();
    }
  }

});

export default router;