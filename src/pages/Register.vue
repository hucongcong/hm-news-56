<template>
  <div>注册</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
// scoped: 作用域， 注意：style一旦加了scoped属性，样式只会影响到当前组件
// scoped原理：
// 1. 给当前组件的所有的选择器 加上一个属性选择  div[data-v-1f24bdc7]  p[]
// 2. 给当前组件中模板中的所有的元素添加一个属性 data-v-1f24bdc7
div {
  background-color: red;
}
</style>
