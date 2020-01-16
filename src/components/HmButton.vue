<template>
  <div class="hm-button" @click="handleClick"><slot></slot></div>
</template>

<script>
export default {
  methods: {
    handleClick (e) {
      // console.log('213123123')
      this.$emit('click', e)
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
