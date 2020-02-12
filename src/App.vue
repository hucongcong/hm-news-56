<template>
  <div id="app">
    <!-- 路由出口 -->
    <!--
      匹配到的组件被keep-alive包裹了，所以，这个组件就不会销毁，，会被缓存
      include用于指定 需要被缓存的组件的名字
      exclude用于指定 不需要被缓存的组件的名字
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
