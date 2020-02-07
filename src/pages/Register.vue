<template>
  <div class="register">
    <div class="close" @click="$router.go(-1)">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input placeholder="用户名/手机号码" v-model="form.username" :rules="rules.username.rules" :err-msg=
      "rules.username.errMsg"></hm-input>
    </div>
    <div class="nickname">
      <hm-input placeholder="昵称" v-model="form.nickname" :rules="/^[\u4e00-\u9fa5]{3,8}$/" err-msg=
      "昵称只能是3-8位的中文哟"></hm-input>
    </div>
    <div class="password">
      <hm-input type="password" v-model="form.password" placeholder="请输入用户密码" :rules="/^\d{3,12}$/" err-msg="密码格式错误"></hm-input>
    </div>

    <div class="register-btn">
      <van-button type="danger" size="large" round @click="register">注册</van-button>
    </div>

    <div class="go-register">
      已有账号？立即<router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        nickname: ''
      },
      // 校验的规则
      rules: {
        username: {
          rules: /^1\d{4,10}$/,
          errMsg: '用户名格式错误'
        }
      }
    }
  },
  methods: {
    async register () {
      // 表单的校验

      const res = await this.$axios.post('/register', this.form)
      if (res.data.statusCode === 400) {
        this.$toast.fail('用户名已经存在')
      } else {
        this.$toast.success('注册功能')
        // 如果使用path跳转，只能通过query
        // 如果使用name跳转， 可以通过params或者query传参
        this.$router.push({
          name: 'login',
          params: {
            username: this.form.username,
            password: this.form.password
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// scoped: 作用域， 注意：style一旦加了scoped属性，样式只会影响到当前组件
// scoped原理：
// 1. 给当前组件的所有的选择器 加上一个属性选择  div[data-v-1f24bdc7]  p[]
// 2. 给当前组件中模板中的所有的元素添加一个属性 data-v-1f24bdc7
.register {
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
  .register-btn {
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
