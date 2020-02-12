<template>
  <div class="tab-manager">
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="title">点击删除以下频道（至少保留3个）</div>
      <div class="list">
        <div class="item" v-for="(item, index) in activeTabs" :key="item.id" @click="del(index)">{{item.name}}</div>
      </div>

      <div class="title">点击添加以下频道</div>
       <div class="list">
        <div class="item" v-for="(item, index) in deactiveTabs" :key="item.id" @click="add(index)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用于存放激活的栏目，默认情况下所有的栏目都是激活的
      activeTabs: [],
      // 用于存放未激活的栏目
      deactiveTabs: []
    }
  },
  created () {
    // 获取栏目的数据，获取到所有的栏目
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    const deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
    if (activeTabs && deactiveTabs) {
      // 如果缓存中有数据,就直接从缓存中获取
      this.activeTabs = activeTabs
      this.deactiveTabs = deactiveTabs
    } else {
      this.getTabList()
    }
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeTabs = data
      }
    },
    del (index) {
      if (this.activeTabs.length <= 3) {
        return
      }
      // console.log(index)
      // 1. 给deactiveTabs添加对应的那个数据
      this.deactiveTabs.push(this.activeTabs[index])
      // 2. 删除activeTabs中对应下标的那项数据
      this.activeTabs.splice(index, 1)
    },
    add (index) {
      this.activeTabs.push(this.deactiveTabs[index])
      this.deactiveTabs.splice(index, 1)
    }
  },
  // 监听activeTabs或者deactiveTabs的变化
  watch: {
    activeTabs () {
      // localStorage只能存储字符串类型
      localStorage.setItem('activeTabs', JSON.stringify(this.activeTabs))
      localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-manager {
  .content {
    padding: 10px;
  }
  .title {
    color: #888;
    padding: 10px 0;
  }
  .list {
    overflow: hidden;
    .item {
      float: left;
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #ccc;
      background-color: #ddd;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
}
</style>
