<template>
  <div class="login">
    <div class="close">
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
  </div>
</template>
<script>
import HmButton from '../components/hm-button'
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    HmButton
  },
  methods: {
    async login () {
      if (!this.username || !this.password) return

      // 发送ajax请求
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      if (res.data.statusCode === 401) {
        // alert('用户名或者密码错误')
        this.$toast.fail('用户名或者密码错误')
      } else {
        // alert('登录成功')
        this.$toast.success('登录成功')
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
}

.input_box {
  padding-bottom: 15px;
  position: relative;
  .hm-input {
    width: 100%;
    height: 38px;
    background-color: transparent;
    border-bottom: 1px solid #666;
    font-size: 18px;

    &.error {
      border-color: red;
    }
    &.success {
      border-color: green;
    }
  }
  .tips {
    color: red;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
