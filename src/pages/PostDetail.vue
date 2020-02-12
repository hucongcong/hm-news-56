<template>
  <div class="post-detail">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou2" @click="$router.back()"></i>
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div class="btn-followed" v-if="post.has_follow" @click="unfollow">已关注</div>
        <div class="btn-follow" v-else @click="follow">关注</div>
      </div>
    </div>

    <!-- 渲染新闻的内容 -->
    <div class="main">
      <div class="post-title">{{post.title}}</div>
      <div class="post-info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.create_date | time}}</span>
      </div>
      <!-- 新闻内容 -->
      <!--
        如果type为2，说明是视频，就不是直接把内容显示在这，需要使用video标签把视屏渲染出来
        因为加载的是别人的视频、图片有可能会遇到防盗链。
        防盗链的方式： 1. 加水印  2. 后台配置防盗链
        https://qsh5.cn/595.html
      -->
      <div class="video" v-if="post.type === 2">
        <video :src="post.content" controls></video>
      </div>
      <div class="content" v-else v-html="post.content"></div>
    </div>

    <!-- 点赞和分享 -->
    <div class="btns">
      <!-- 根据用户是否点赞来判断是否有like的类名 -->
      <div class="good" @click="like" :class="{like: post.has_like}">
        <i class="iconfont icondianzan"></i>
        <span>{{post.like_length}}</span>
      </div>
      <div class="share">
        <i class="iconfont iconweixin"></i>
        <span>微信</span>
      </div>
    </div>

    <!-- 评论区域 -->
    <div class="post-commnet">
      <div class="title">精彩跟帖</div>
      <!-- 评论组件 -->
      <!-- 把需要渲染的评论的数据传递给评论组件 -->
      <hm-comment
        v-for="item in commentList"
        :key="item.id"
        :comment="item"
        @reply="reply"
      ></hm-comment>
    </div>
    <!-- 底部区域 -->
    <div class="footer">
      <div class="comment-input" v-show="!isFocus">
        <input type="text" placeholder="写跟帖" @focus="handleFoucs">
        <div class="icon-comment">
          <i class="iconfont iconpinglun-"></i>
          <span class="num">{{post.comment_length}}</span>
        </div>
        <i class="iconfont iconshoucang" @click="star" :class="{star: post.has_star}"></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
      <!-- 文本域 -->
      <div class="comment-textarea" v-show="isFocus">
        <textarea ref="textarea" rows="3" placeholder="回复" @blur="handleBlur" v-model="content"></textarea>
        <div class="send" @click="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import HmComment from '../components/hm-comment'
export default {
  components: {
    HmComment
  },
  data () {
    return {
      // 文章的详细信息
      post: {
        user: {}
      },
      // 控制显示文本框还是文本域
      isFocus: false,
      // 评论列表
      commentList: [],
      parentId: '',
      content: ''
    }
  },
  created () {
    // 获取文章详情
    this.getPostDetail()
    // 获取评论列表
    this.getCommentList()
  },
  methods: {
    // 获取新闻详情
    async getPostDetail () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    // 获取评论列表
    async getCommentList () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
      }
      console.log(this.commentList)
    },
    async follow () {
      // id：需要关注的文章的作者的id
      const id = this.post.user.id
      const res = await this.$axios.get(`/user_follows/${id}`)
      console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        // 关注成功了
        this.$toast.success('关注成功')
        // 需要修改按钮的状态
        this.post.has_follow = true
      }
    },
    async unfollow () {
      const id = this.post.user.id
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        // 关注成功了
        this.$toast.success('取消关注')
        // 需要修改按钮的状态
        this.post.has_follow = false
      }
    },
    async like () {
      // id: 点赞的文章的id
      const id = this.post.id
      const res = await this.$axios.get(`/post_like/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getPostDetail()
        this.$toast.success(message)
      }
    },
    async handleFoucs () {
      console.log('获得了焦点')
      // 把isFocus改成true
      this.isFocus = true
      // 希望textarea自动获得焦点  获取到textarea，调用focus方法即可
      // console.log(this.$refs)
      // DOM异步更新的问题
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    handleBlur () {
      // 如果textarea中有内容，不应该隐藏文本域
      if (this.content) {
        return
      }
      this.isFocus = false
    },
    async star () {
      console.log('收藏文章')
      const id = this.post.id
      const res = await this.$axios.get(`/post_star/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async reply (id) {
      console.log('接收到了子组件的事件', id)
      // 记录了我需要回复的评论的id
      this.parentId = id
      // 显示文本域
      this.isFocus = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async send () {
      // console.log('哈哈哈')
      // 发送ajax请求，添加评论
      const id = this.post.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.content,
        parent_id: this.parentId
      })
      console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('评论发布成功')
        this.getCommentList()
        this.isFocus = false
        this.content = ''
        this.parentId = ''
      }
    }
  },
  watch: {
    $route () {
      // 监听路由的变化，如果地址改变了，重新获取数据
      this.getPostDetail()
      this.getCommentList()
    }
  }
}
</script>

<style lang="scss" scoped>
.post-detail {
  padding-bottom: 100px;
  .header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    .left {
      display: flex;
      .iconnew {
        font-size: 50px;
      }
    }
    .right {
      .btn-followed {
        border: 1px solid #ccc;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        border-radius: 15px;
      }
      .btn-follow {
        border: 1px solid red;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        border-radius: 15px;
        background-color: red;
        color: #fff;
      }
    }
  }
  .main {
    padding: 10px;
    .post-title {
      font-size: 18px;
      font-weight: 700;
    }
    .post-info {
      color: #888;
      padding: 10px 0;
      span:first-child {
        margin-right: 10px;
      }
    }
    video {
      width: 100%;
    }
  }
  .btns {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    border-bottom: 3px solid #ddd;
    .good,
    .share {
      border: 1px solid #ccc;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      border-radius: 15px;
      font-size: 12px;

      .iconfont {
        margin-right: 5px;
        font-size: 14px;
      }
      .iconweixin {
        color: rgb(1, 200, 1)
      }
    }
    .like {
      color: red;
      border-color: red;
    }
  }
  .post-commnet {
    .title {
      font-size: 18px;
      text-align: center;
      padding: 10px 0;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    background-color: #fff;
    .comment-input {
      display: flex;
      justify-content: space-around;
      align-items: center;
      input {
        width: 180px;
        height: 30px;
        background-color: #ddd;
        border-radius: 15px;
        padding-left: 20px;
      }
      .iconfont {
        font-size: 24px;
      }
      .star {
        color: red;
      }
      .icon-comment {
        position: relative;
        .num {
          position: absolute;
          background-color: red;
          height: 20px;
          line-height: 20px;
          color: #fff;
          padding: 0 10px;
          border-radius: 10px;
          right: -20px;
          top: -4px;
        }
      }
    }
    .comment-textarea {
      display: flex;
      width: 100%;
      padding: 0 20px;
      justify-content: space-between;
      align-items: flex-end;
      textarea {
        background-color: #ddd;
        width: 240px;
        height: 70px;
        border-radius: 10px;
        padding: 10px;
      }
      .send {
        width: 60px;
        height: 26px;
        line-height: 26px;
        background-color: red;
        color: #fff;
        text-align: center;
        border-radius: 13px;
      }
    }
  }
}
</style>
