<template>
  <div class="demo">
    <!-- 递归渲染demo2组件 -->
    <demo2 v-if="comment.parent" :comment="comment.parent"></demo2>
    <hr>
    <div>我是一个demo组件，用于演示递归组件 ---- {{comment.content}}</div>
  </div>
</template>

<script>
export default {
  name: 'demo2',
  props: {
    comment: Object
  }
}
</script>

<style>

</style>
