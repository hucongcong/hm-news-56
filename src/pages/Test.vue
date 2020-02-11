<template>
  <div class="test">
    我是一个测试的组件 ---- {{comment.content}}
    <hr>
    <demo2 v-if="comment.parent" :comment="comment.parent"></demo2>
  </div>
</template>

<script>
import Demo2 from './Demo2'
export default {
  components: {
    Demo2
  },
  data  () {
    return {
      comment: {
        id: 1,
        content: '你今天吃啥了呀',
        parent: {
          id: 2,
          content: '刚刚吃完饭',
          parent: {
            id: 3,
            content: '不聊了，我要吃饭去',
            parent: {
              id: 4,
              content: '哈哈哈，今天天气真好啊'
            }
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
