<template>
  <div class="hm-comment">
    <div class="title">
      <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="">
      <div class="info">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">2小时前</div>
      </div>
      <div class="reply">回复</div>
    </div>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
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
