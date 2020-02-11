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

    <!--
      vant-list
      在每一个van-tab中都要有一个List组件
      finished: 列表是否加载完成 应该加给每一个tab还是直接通用的finished
      loading: 列表的加载状态  直接给一个通用的loading即可。
      load事件： 用于加载更多的数据
    -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab v-for="item in tabList" :key="item.id" :title="item.name">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- 渲染文章的内容 -->
          <!-- 上拉加载更多 -->
          <van-list
            v-model="loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="50"
          >
            <hm-post v-for="post in item.postList" :key="post.id" :post="post"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import HmPost from '../components/hm-post'
export default {
  data () {
    return {
      // 默认激活的tab栏
      // 不管登没登录，都默认显示头条的数据
      active: localStorage.getItem('token') ? 1 : 0,
      // 用于存放所有的tab分类
      tabList: [],
      // 每页显示的条数
      pageSize: 5,
      // List的加载状态
      loading: false,
      // 是否在下拉刷新的状态
      refreshing: false
    }
  },
  async created () {
    // 获取所有的分类
    await this.getTabList()
    this.getPostList()
  },
  methods: {
    // 用于获取所有的tab分类
    // async函数返回的还是一个promise对象
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        data.forEach(item => {
          // 保证每一个tab有自己的文章列表
          item.postList = []
          // 每一个tab都有自己的pageIndex,记录了每一个tab加载到了第几页
          item.pageIndex = 1
          // 给每一个tab添加上finished属性
          item.finished = false
        })
        // 当把一个数组赋值给tabList,data中所有拥有的数据都会被劫持
        this.tabList = data
      }
    },
    // 获取当前分类下的文章
    async getPostList () {
      // 获取头条下所有的文章
      // 分类的id
      const id = this.tabList[this.active].id
      // 继续发送请求，获取文章的数据
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.tabList[this.active].pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 把获取到的data中的数据添加到tabList中。
        // 只要添加debugger，就会自动打断点  eslint不允许使用debugger
        // debugger
        // 把获取到的data数据拼接到postList中
        this.tabList[this.active].postList = [...this.tabList[this.active].postList, ...data]

        // 需要把loading状态改成false，才能触发下一次的加载
        this.loading = false
        setTimeout(() => {
          // 把下拉刷新的状态关闭
          this.refreshing = false
        }, 1000)
        // 判断是否还有更多的数据
        // 如果本次请求获取到的数据小于每页的条数，说明该分类没有更多文章。
        if (data.length < this.pageSize) {
          // 没有更多数据啦
          this.tabList[this.active].finished = true
        }
        console.log(this.tabList[this.active].postList)
      }
    },
    onLoad () {
      setTimeout(() => {
        console.log('需要加载更多数据了')
        // 让当前tab下的当前页+1
        // 重新发送请求，加载更多的数据
        // 如果当前tab下的finished为true，就不去触发load事件
        if (this.tabList[this.active].finished) {
          return
        }
        this.tabList[this.active].pageIndex++
        this.getPostList()
      }, 3000)
    },
    onRefresh () {
      console.log('下拉刷新了')
      // 重置所有的状态
      this.loading = true
      // 重新变成
      this.tabList[this.active].pageIndex = 1
      this.tabList[this.active].postList = []
      this.tabList[this.active].finished = false
      // 重新获取第一页的新闻信息
      this.getPostList()
    }
  },
  watch: {
    active (value) {
      // window.scrollTo(0, 0)
      // 把loading状态改成true
      this.loading = true
      // console.log('active发生了改变', value, this.active)
      // 当分类的发生了改变，需要重新发送ajax请求，获取文章的数据
      // 在切换分类的时候，先判断当前分类下是否有数据，如果有数据，不需要发请求获取了
      if (this.tabList[this.active].postList.length > 0) {
        return
      }
      this.getPostList()
    }
  },
  components: {
    HmPost
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
