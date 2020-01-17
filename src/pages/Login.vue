<template>
  <div class="login">
    <div class="close"  @click="$router.go(-1)">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input  placeholder="请输入用户名" v-model="username" :rules="/^1\d{4,10}$/" err-msg="用户名错误"></hm-input>
    </div>
    <div class="password">
      <hm-input type="password" v-model="password" placeholder="请输入用户密码" :rules="/^\d{3,12}$/" err-msg="密码格式错误"></hm-input>
    </div>
    <div class="login-btn">
      <hm-button @click="login">登录</hm-button>
    </div>

    <div class="go-register">
      没有账号？立即<router-link to="/register">注册</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    // console.log(this.$route)
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async login () {
      if (!this.username || !this.password) return

      // 发送ajax请求
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      if (res.data.statusCode === 401) {
        // alert('用户名或者密码错误')
        this.$toast.fail('用户名或者密码错误')
      } else {
        // alert('登录成功')
        // 保存token以及用户的id
        console.log(res)
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user.id)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 20px;
  .close {
    i {
      font-size: 27px;
    }
  }
  .logo {
    text-align: center;
    i {
      font-size: 126px;
      color: #d81e06;
    }
  }
  .login-btn {
    margin-top: 30px;
  }

  .go-register {
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin-top: 10px;
  }
}
</style>
