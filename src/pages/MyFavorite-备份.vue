<template>
  <div class="my-favorite">
    <hm-header>我的收藏</hm-header>
    <div class="item" v-for="item in list" :key="item.id">
      <div class="info">
        <div class="title txt-cut">{{item.title}}</div>
        <div class="bottom">
          <span>{{item.user.nickname}}</span>
          <span>{{item.comments.length}}跟帖</span>
        </div>
      </div>
      <img :src="item.cover[0].url" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用于存放我的收藏数据
      list: []
    }
  },
  created () {
    // 获取我的收藏数据
    this.getFavoriteList()
  },
  methods: {
    async getFavoriteList () {
      const res = await this.$axios.get('/user_star')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
      console.log(this.list)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
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
  img {
    width: 120px;
    height: 75px;
    // object-fit:样式 可以保证图片在定死宽高的情况下不失真
    // object-fit: cover contain
    // background-size
    object-fit: cover;
  }
}
</style>
