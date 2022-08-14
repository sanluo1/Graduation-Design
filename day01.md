  1  Footer组件的显示与隐藏
（v-show||v-if）
Footer组件在首页 搜索组件显示 
          在登录 注册是隐藏的
 那么就是怎么实现呢
   路由元信息的使用
     meta
  2  路由传参
  路由的跳转有哪些
  1 声明式导航  router-link的方法实现跳转 实际上跟a标签一样 只不过这个是单文件应用 不打开新的页面
  2 编程式导航  用组件实例的$router的push|replace方法实现跳转(可以写一些业务)
  路由传参怎么写
  1 params 属于路径的一部分，需要注意的是：在配置路由的时候，他需要占位
  2 query  不属于路径的一部分，类似于ajax的queryString  /home?k=v&&kv= 不需要占位


