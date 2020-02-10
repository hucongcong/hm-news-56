<template>
  <div class="my-favorite">
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
  </div>
</template>

<script>
import HmPost from '../components/hm-post'
export default {
  components: {
    HmPost
  },
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
        data.forEach(item => {
          // 对于我的收藏这个页面的数据中，没有comment_length属性，但是有comments属性。
          item.comment_length = item.comments.length
        })
        this.list = data
      }
      // console.log(this.list)
    }
  }
}
</script>
