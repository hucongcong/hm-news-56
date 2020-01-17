<template>
  <div class="edit-profile">
    <hm-header>编辑资料</hm-header>

    <div class="box">
      <div class="avatar">
        <img :src="avatar" alt="">
      </div>

      <hm-nav name="昵称" :desc="profile.nickname"></hm-nav>
      <hm-nav name="密码" desc="******" ></hm-nav>
      <hm-nav name="性别" :desc="profile.gender === 1 ? '男':'女'"></hm-nav>
    </div>
  </div>
</template>

<script>
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
    this.profile = res.data.data
    this.loading = true
    console.log(this.profile)
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 0 20px;
  .avatar {
    padding: 30px 0;
    img {
      width: 70px;
      height: 70px;
      margin: 0 auto;
      border-radius: 50%;
    }
  }
}

</style>
