<template>
  <div class="hm-comment">
    <div class="title">
      <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="">
      <div class="info">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | time('YYYY-MM-DD HH:mm:ss')}}</div>
      </div>
      <div class="reply" @click="reply(comment.id)">回复</div>
    </div>
    <!-- 渲染楼层数据 ,如果评论有parent，我们就渲染楼层数据-->
    <!-- 评论组件给楼层组件注册了reply事件 -->
    <hm-floor :index="index" v-if="comment.parent" :comment="comment.parent" @reply="reply"></hm-floor>

    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import HmFloor from './hm-floor'
// 需要在hm-commemnt评论组件中确定一个数字，这个数字是该评论总共有多少个楼层
export default {
  data () {
    return {
      index: this.getCommentLength(0, this.comment)
    }
  },
  methods: {
    // 这个方法用于计算comment数据中parent的层级
    getCommentLength (num, comment) {
      // 如果传递进来的commnet有parent数据
      if (comment.parent) {
        return this.getCommentLength(num + 1, comment.parent)
      } else {
        return num
      }
    },
    reply (id) {
      console.log('我需要回复评论了', id)
      // 子传父，触发了一个自定义的事件 reply
      this.$emit('reply', id)
    }
  },
  components: {
    HmFloor
  },
  props: {
    comment: Object
  }
}
</script>

<style lang="scss" scoped>
.hm-comment {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    display: flex;
    margin-bottom: 10px;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
    .info {
      flex: 1;
      padding-left: 10px;
      .name {
        font-size: 14px;
      }
      .time {
        color: #888;
      }
    }
  }
  .content {
    font-size: 14px;
    padding: 10px 0;
  }
}
</style>
