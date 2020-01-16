<template>
  <div class="hm-button" @click="handleClick"><slot></slot></div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      // console.log('123')
      // 用户点击的时候，触发了组件自己的aa事件
      // console.log('123')
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-button {
  background-color: #c30;
  height: 48px;
  line-height: 48px;
  color: #fff;
  text-align: center;
  border-radius: 24px;
  font-size: 18px;
}
</style>
