<template>
  <!-- 渲染文章数据了 -->
  <div class="hm-post" @click="$router.push(`/post-detail/${post.id}`)">
    <!-- 视频类的结构 如果type为2，就是视频类的新闻， 如果type是1，就是图片类型的新闻 -->
    <div class="video-post" v-if="post.type === 2">
      <div class="title txt-cut">{{post.title}}</div>
      <div class="video">
        <!-- 显示的还是封面，但是点击的时候，才会跳转视频的详情 -->
        <img :src="post.cover[0].url" alt="">
        <!-- 播放按钮 -->
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="bottom">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <!-- 单张图片的结构 -->
    <div class="single-img-post" v-else-if="post.cover.length < 3">
      <div class="info">
        <div class="title txt-cut">{{post.title}}</div>
        <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
      <img :src="post.cover[0].url" alt="">
    </div>
    <!-- 多张图片的结构 -->
    <div class="multiple-img-post" v-else>
      <div class="title txt-cut">{{post.title}}</div>
      <div class="imgs">
        <img v-for="item in post.cover" :key="item.id" :src="item.url" alt="">
      </div>
      <div class="bottom">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="scss" scoped>
.hm-post {
  .title {
    font-size: 14px;
  }
  .bottom {
    color: #888;
    span:first-child {
      margin-right: 10px;
    }
  }
}
.single-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    flex: 1;
    display: flex;
    height: 75px;
    // 修改flex主轴的方向
    flex-direction: column;
    justify-content: space-between;
  }
  img {
    width: 120px;
    height: 75px;
    // object-fit:样式 可以保证图片在定死宽高的情况下不失真
    // object-fit: cover contain
    // background-size
    object-fit: cover;
  }
}
.multiple-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .imgs {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    img {
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
}
.video-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .video {
    position: relative;
    margin: 10px 0;
    img {
      width: 100%;
    }
    .iconshipin {
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, .5);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      color: #fff;
      font-size: 30px;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
