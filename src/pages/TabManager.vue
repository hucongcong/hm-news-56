<template>
  <div class="tab-manager">
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="title">点击删除以下频道</div>
      <div class="list">
        <div class="item" v-for="item in activeTabs" :key="item.id">{{item.name}}</div>
      </div>

      <div class="title">点击添加以下频道</div>
       <div class="list">
        <div class="item" v-for="item in deactiveTabs" :key="item.id">{{item.name}}</div>
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
    this.getTabList()
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeTabs = data
      }
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
