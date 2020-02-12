<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="back">
        <i class="iconfont iconjiantou"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="请输入搜索关键字" v-model="keyword">
      </div>
      <div class="right" @click="search">搜索</div>
    </div>

    <div class="post-list" v-if="postList.length > 0">
      <hm-post v-for="item in postList" :key="item.id" :post="item"></hm-post>
    </div>
    <div class="content" v-else>
      <h3>历史记录</h3>
      <ul>
        <li v-for="item in history" :key="item" @click="hotSearch(item)">{{item}}</li>
      </ul>

      <h3>热门搜索</h3>
      <ul>
        <li v-for="item in hotKeys" :key="item" @click="hotSearch(item)">{{item}}</li>
      </ul>
    </div>
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
      keyword: '',
      // 用于存放搜索结果
      postList: [],
      // 热门关键词
      hotKeys: ['说好不哭', '王祖贤', '性感', '关晓彤'],
      // 存储搜索过的历史记录，应该从localStorage中获取
      history: JSON.parse(localStorage.getItem('history')) || []
    }
  },
  methods: {
    async search () {
      console.log(this.keyword)
      const res = await this.$axios.get(`/post_search`, {
        params: {
          keyword: this.keyword
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data

        // 在搜索成功的时候，把关键字存储到history数组中
        // 先把老的关键给删除掉
        this.history = this.history.filter(item => item !== this.keyword)
        this.history.unshift(this.keyword)
        // 把history存储到localStorage中
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    },
    hotSearch (item) {
      // console.log(item)
      // 修改关键字，进行搜索
      this.keyword = item
      this.search()
    },
    back () {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    }
  },
  watch: {
    keyword (value) {
      if (value === '') {
        this.postList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  .header {
    display: flex;
    border-bottom: 1px solid #ccc;
    height: 50px;
    line-height: 50px;
    .left,
    .right {
      width: 50px;
      text-align: center;
    }
    .center {
      flex:1;
      height: 34px;
      margin-top: 7px;
      border: 1px solid #ccc;
      border-radius: 17px;
      display: flex;
      padding-right: 20px;
      .iconfont {
        width: 40px;
        line-height: 34px;
        text-align: center;
      }
      input {
        flex: 1;
        font-size: 12px;
        background-color: #f7f7f7;
      }
    }
  }
  .content {
    padding: 20px;
    h3 {
      font-size: 18px;
      font-weight: 700;
    }
    li {
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
