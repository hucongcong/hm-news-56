<template>
  <div class="test">
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
    <img :src="src" alt="">
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import img from '../assets/avatar.jpg'
export default {
  components: {
    // 局部注册图片裁剪插件
    VueCropper
  },
  data () {
    return {
      src: '',
      option: {
        img: img, // 必填，img用于提供裁剪的那张图片
        // canScale: true, // 图片是否允许滚轮缩放,注意：在移动端不支持，，移动端没有滚轮事件
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      }
    }
  },
  methods: {
    crop () {
      // vue中ref与 $refs的使用
      // console.log('我要裁剪图片了')
      console.log(this.$refs.cropper)
      // 获取裁剪的图片内容
      this.$refs.cropper.getCropData(data => {
        // data就是我们裁剪出来的图片
        console.log(data)
        this.src = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 样式：需要指定父盒子的高度，因为这个插件基于父盒子高度的100%
.test {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
}
.van-button {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
