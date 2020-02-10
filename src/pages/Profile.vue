<template>
  <div class="profile">
    <div class="user-info" @click="$router.push('/edit-profile')">
      <div class="avatar">
        <!-- 如果有头像，就显示头像，如果没有头像，显示默认头像 -->
        <!-- <img v-if="profile.head_img" :src="$axios.defaults.baseURL + profile.head_img" alt=""> -->
        <img v-show="loading" :src="avatar" alt="">
      </div>
      <div class="info">
        <p>
          <i v-if="profile.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{profile.nickname}}</span>
        </p>
        <p>{{profile.create_date | time}}</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <hm-nav name="我的关注" desc="关注的用户" @click="$router.push('/follow')"></hm-nav>
      <hm-nav name="我的跟帖" desc="跟帖/回复" @click="$router.push('/my-comments')"></hm-nav>
      <hm-nav name="我的收藏" desc="文章/视频" @click="$router.push('my-favorite')"></hm-nav>
      <hm-nav name="设置" @click="$router.push('/edit-profile')"></hm-nav>
      <hm-nav name="退出登录" @click="logout"></hm-nav>
    </div>
  </div>
</template>

<script>
// 导入一张图片 react
import img from '../assets/avatar.jpg'
export default {
  computed: {
    avatar () {
      if (this.profile.head_img) {
        // 如果有头像，拼接上基准路径
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        // 如果没有头像，显示默认头像
        return img
      }
    }
  },
  data () {
    return {
      profile: {},
      loading: false
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    // 如果需要权限校验的接口（用户登录），需要发送请求的时候增加一个请求头，，，Authorization: token
    const userId = localStorage.getItem('user_id')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    console.log(res)
    this.profile = res.data.data
    this.loading = true
    console.log(this.profile)
  },
  methods: {
    async logout () {
      // aysnc与await await只会等成功的结果，如果promise失败了，会抛出异常
      // try .. catch
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗?'
        })

        // 点击确定
        // 删除token
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')

        // 跳转到登录页面
        this.$router.push('/login')
        // 给一个提示消息
        this.$toast.success('退出成功')
      } catch {
        // console.log('点击了取消')
        this.$toast('操作取消')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  .user-info {
    padding: 20px;
    display: flex;
    border-bottom: 5px solid #ccc;
    .avatar {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .icon {
      width: 30px;
      i {
        line-height: 70px;
      }
    }
    .info {
      flex: 1;
      margin-left: 10px;
      p:first-child {
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        color: #000;
      }

      p:last-child {
        font-size: 14px;
        color: #999;
      }
      .iconxingbienan {
        color: rgb(171, 213, 242);
      }
      .iconxingbienv {
        color: pink;
      }
    }
  }
  .list {
    padding: 0 20px;
  }
}
</style>
