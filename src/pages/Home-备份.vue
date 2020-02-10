<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/profile')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>

    <!-- tab栏
      v-model="active" 绑定一个值，用于指定当前激活的tab栏的下标
      sticky： 开启粘性布局  吸顶功能
      animated: 开启转场动画
      swipeable: 支持左右滑动
    -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab v-for="item in tabList" :key="item.id" :title="item.name">内容1</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 默认激活的tab栏
      // 不管登没登录，都默认显示头条的数据
      active: localStorage.getItem('token') ? 1 : 0,
      // 用于存放所有的tab分类
      tabList: []
    }
  },
  created () {
    // 获取所有的分类
    this.getTabList()
  },
  methods: {
    // 用于获取所有的tab分类
    async getTabList () {
      const res = await this.$axios.get('/category')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // console.log(this.tabList)
        // 额外的处理：给tabList中的每一个对象都添加一个属性， posts用于存放该分类下的文章
        this.tabList.forEach(item => {
          item.posts = []
        })
        // 获取分类成功，去获取分类下对应的文章
        // 获取某个分类下的文章
        this.getPostList(this.active)
      }
    },
    // 用于加载分类对应的文章
    async getPostList (index) {
      // id是分类的id
      // 发送请求，需要先获取到分类的id
      const id = this.tabList[index].id
      const res = await this.$axios.get('/post', {
        params: {
          category: id
        }
      })
      // 问题：我们应该把文章的数据给存储起来。
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .header {
    height: 50px;
    line-height: 50px;
    background-color: red;
    display: flex;
    text-align: center;
    color: #fff;
    .left,
    .right {
      width: 70px;
    }
    .search {
      flex: 1;
      height: 36px;
      line-height: 36px;
      background-color: rgba(255, 255, 255, .5);
      margin-top: 7px;
      border-radius: 18px;
      span {
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .iconnew {
      font-size: 50px;
    }
    .iconwode {
      font-size: 24px;
    }
  }
}
</style>
