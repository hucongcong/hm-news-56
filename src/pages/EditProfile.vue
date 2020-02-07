<template>
  <div class="edit-profile">
    <hm-header>编辑资料</hm-header>

    <div class="box">
      <div class="avatar">
        <img :src="avatar" alt="">
        <!--
          after-read 代表文件上传后的回调函数，通过这个函数可以获取到文件
          注意：uploader组件不会自动帮我们上传图片，需要自己手动上传，但是这个组件会把你选择的那个文件告诉你。
        -->
        <van-uploader :after-read="afterRead"/>
      </div>

      <hm-nav name="昵称" :desc="profile.nickname" @click="showNickname"></hm-nav>
      <hm-nav name="密码" desc="******" @click="showPassword"></hm-nav>
      <hm-nav name="性别" :desc="profile.gender === 1 ? '男':'女'" @click="showGender"></hm-nav>
    </div>

    <!--
      提供一个用户修改昵称的对话框
      v-model会绑定一个布尔值，用于控制dialog的显示或者隐藏
      confirm: 点击确定按钮的时候会触发的事件
    -->
    <van-dialog v-model="isShowNickname" title="修改昵称" show-cancel-button @confirm="editNickname">
      <van-field placeholder="请输入用户名" v-model="nickname" />
    </van-dialog>

    <!-- 修改密码的对话框 -->
    <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="editPassword">
      <van-field placeholder="请输入用户密码" v-model="password"/>
    </van-dialog>

    <!-- 修改用户性别 -->
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="editGender">
      <!-- name代表单选框选中的值 -->
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <!-- 准备一个遮罩层 -->
    <div class="mask" v-show="isShowMask">
      <!-- 该组件专门用于写一些demo测试 -->
      <vueCropper
        ref="cropper"
        :img="option.img"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber">
      </vueCropper>
      <van-button type="primary" @click="crop">确定裁剪图片</van-button>
      <van-button type="danger" @click="isShowMask = false">取消</van-button>
    </div>
  </div>
</template>

<script>
import img from '../assets/avatar.jpg'
import { VueCropper } from 'vue-cropper'
export default {
  data () {
    return {
      profile: {},
      loading: false,
      // 控制是否显示昵称的对话框
      isShowNickname: false,
      // 昵称
      nickname: '',
      // 控制是否显示密码
      isShowPassword: false,
      password: '',
      // 控制是否显示性别
      isShowGender: false,
      gender: 0,
      // 是否限制遮罩层
      isShowMask: false,
      option: {
        img: '', // 这个img应该要是上传的那张图片，只不过现在我写死了
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      }
    }
  },
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
  created () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      // 如果需要权限校验的接口（用户登录），需要发送请求的时候增加一个请求头，，，Authorization: token
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user/${userId}`)
      this.profile = res.data.data
      this.loading = true
      console.log(this.profile)
    },
    // 用于修改个人信息
    // data是需要修改的数据
    async editProfile (data) {
      const id = localStorage.getItem('user_id')
      const res = await this.$axios.post(`/user_update/${id}`, data)
      // 修改昵称成功了
      if (res.data.statusCode === 200) {
        // 需要重新渲染页面
        // 给一个提示消息
        this.$toast.success(res.data.message)
        this.getProfile()
      }
    },
    // 用于显示昵称
    showNickname () {
      this.isShowNickname = true
      // 把原先的nickname赋值给nickname
      this.nickname = this.profile.nickname
    },
    // 修改昵称
    editNickname () {
      this.editProfile({ nickname: this.nickname })
    },
    showPassword () {
      this.isShowPassword = true
      this.password = this.profile.password
    },
    // 用于修改密码
    editPassword () {
      this.editProfile({ password: this.password })
    },
    showGender () {
      this.isShowGender = true
      this.gender = this.profile.gender
    },
    editGender () {
      this.editProfile({ gender: this.gender })
    },
    async afterRead (file) {
      console.log('文件上传了', file)
      // 显示图片裁剪div
      this.isShowMask = true
      // 设置需要裁剪的图片为上传的这个图片
      this.option.img = file.content
      // formData
      // 创建formData对象，用于上传文件
      // const fd = new FormData()
      // // 参数1：name属性，后端用于获取文件，有接口决定
      // // 参数2： 需要上传的文件
      // fd.append('file', file.file)

      // const res = await this.$axios.post('/upload', fd, {
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // })
      // // 文件上传只负责上传文件，文件上传成功后，我们需要获取到上传成功后的图片地址，发送请求，需求头像
      // // if ()
      // // console.log(res)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   // console.log(data.url)
      //   // 发送请求，修改头像
      //   this.editProfile({ head_img: data.url })
      // }
    },
    // 图片裁剪方法
    crop () {
      this.$refs.cropper.getCropData(async imgData => {
        // 把裁剪后的图片的转成file文件，才能上传到服务器
        const file = this.convertBase64UrlToBlob(imgData)
        const fd = new FormData()
        // 参数1：name属性，后端用于获取文件，有接口决定
        // 参数2： 需要上传的文件
        fd.append('file', file)

        const res = await this.$axios.post('/upload', fd, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        // 文件上传只负责上传文件，文件上传成功后，我们需要获取到上传成功后的图片地址，发送请求，需求头像
        // if ()
        // console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
        // console.log(data.url)
        // 发送请求，修改头像
          this.editProfile({ head_img: data.url })
        }
        // 需要把遮罩层给隐藏掉
        this.isShowMask = false
      })
    },
    // 可以把图片的base64编码转成一个file文件
    convertBase64UrlToBlob (urlData) {
      let bytes = window.atob(urlData.split(',')[1])// 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 0 20px;
  .avatar {
    padding: 30px 0;
    position: relative;
    img {
      width: 70px;
      height: 70px;
      margin: 0 auto;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
}
.van-dialog {
  padding: 10px;
  .van-field {
    margin-top: 10px;
    border: 1px solid #ccc;
  }
}

// 样式：需要指定父盒子的高度，因为这个插件基于父盒子高度的100%
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  .van-button {
    position: fixed;
    top: 0;
  }
  .van-button:first-child {
    left: 0px;
  }
  .van-button:last-child {
    right: 0px;
  }
}

</style>
