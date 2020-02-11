<template>
  <div class="demo">
    <div>我是一个demo组件，用于演示递归组件</div>
    <hr>
    <!-- demo上不能无限渲染下去，一定要有一个v-if="false" -->
    <demo :index="index - 1" v-if="index > 0"></demo>
  </div>
</template>

<script>
// 递归组件：顾名思义，在组件中能够渲染组件自己本身。
// 1. 必须给组件提供一个name属性
// 2. 在当前组件中，可以通过name属性来渲染当前组件自己本身。
// 3. 递归组件一定要有渲染的条件 例如使用一个最终会得到 false 的 v-if

// 需求：demo组件渲染5次
export default {
  name: 'demo',
  props: {
    index: Number
  }
}
</script>

<style>

</style>
