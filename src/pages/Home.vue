<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search" @click="$router.push('/search')">
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
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="50"
          >
            <hm-post v-for="post in postList" :key="post.id" :post="post"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import HmPost from '../components/hm-post'
export default {
  // 如果需要指定某个组件被缓存，给该组件指定name属性
  name: 'home',
  data () {
    return {
      // 默认激活的tab栏
      // 不管登没登录，都默认显示头条的数据
      active: localStorage.getItem('token') ? 1 : 0,
      // 用于存放所有的tab分类
      tabList: [],
      // 每页显示的条数
      pageIndex: 1,
      pageSize: 5,
      // List的加载状态
      loading: false,
      // 是否在下拉刷新的状态
      refreshing: false,
      finished: false,
      postList: []
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
      // 首页获取数据，优先从缓存中进行获取，如果缓存中没有，我们就发送ajax请求，进行获取
      const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
      if (activeTabs) {
        this.tabList = activeTabs
      } else {
        const res = await this.$axios.get('/category')
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          // 当把一个数组赋值给tabList,data中所有拥有的数据都会被劫持
          this.tabList = data
        }
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
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 把获取到的data中的数据添加到tabList中。
        // 只要添加debugger，就会自动打断点  eslint不允许使用debugger
        // debugger
        // 把获取到的data数据拼接到postList中
        this.postList = [...this.postList, ...data]

        // 需要把loading状态改成false，才能触发下一次的加载
        this.loading = false
        // 把下拉刷新的状态关闭
        this.refreshing = false
        // 判断是否还有更多的数据
        // 如果本次请求获取到的数据小于每页的条数，说明该分类没有更多文章。
        if (data.length < this.pageSize) {
          // 没有更多数据啦
          this.finished = true
        }
        console.log(this.postList)
      }
    },
    onLoad () {
      setTimeout(() => {
        console.log('需要加载更多数据了')
        // 让当前tab下的当前页+1
        // 重新发送请求，加载更多的数据
        // 如果当前tab下的finished为true，就不去触发load事件
        this.pageIndex++
        this.getPostList()
      }, 1000)
    },
    onRefresh () {
      // 下拉刷新
      // 当切换tab栏的时候，我们把所有的数据都重置成状态
      this.pageIndex = 0
      this.postList = []
      this.finished = false
      this.loading = true
      this.onLoad()
    }
  },
  watch: {
    active (value) {
      // 当切换tab栏的时候，我们把所有的数据都重置成状态
      this.pageIndex = 0
      this.postList = []
      this.finished = false
      this.loading = true
      this.onLoad()
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
