<template>
  <div id="app">
    <!-- 路由出口 -->
    <!--
      匹配到的组件被keep-alive包裹了，所以，这个组件就不会销毁，，会被缓存
      include用于指定 需要被缓存的组件的名字
      exclude用于指定 不需要被缓存的组件的名字

      // 只有当是从详情页跳回到首页的时候，需要缓存
      post-detail ====> home  需要缓存
      其他路由    =====>  home  不需要缓存

      如果需要动态控制keep-alive，需要配合vuex处理
      https://segmentfault.com/a/1190000020217946?utm_source=tag-newest
    -->
    <keep-alive include="home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss">
</style>
