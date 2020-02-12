<template>
  <div class="wrapper">
    <hm-floor :index="index-1" v-if="comment.parent" :comment="comment.parent" @reply="reply"></hm-floor>
    <div class="hm-floor">
      <!-- 递归渲染hm-floor组件 -->
      <div class="title">
        <div class="name">{{index}} {{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | time('YYYY-MM-DD HH:mm:ss')}}</div>
        <div class="reply" @click="reply(comment.id)">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    // 评论组件传递进来的评论数据，楼层数据
    comment: Object,
    index: Number
  },
  methods: {
    reply (id) {
      console.log('恢复的id', id)
      // 触发组件本身的reply事件，把id传给父组件
      this.$emit('reply', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-floor {
  border: 1px solid #ccc;
  background-color: #eee;
  padding: 10px;
  .title {
    display: flex;
    align-items: flex-end;
    padding-bottom : 10px;
    .name {
      font-size: 14px;
    }
    .time {
      margin-left: 5px;
      flex: 1;
    }
  }
  .content {
    font-size: 14px;
  }
}
</style>
