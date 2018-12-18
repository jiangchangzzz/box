<template>
  <div class="container">
    <WorkList v-if="works.length" :works="works"/>
    <p class="list-none" v-else>还没有创建作品，<a class="list-none-link" href="/pages/create/main">开始创作</a>吧~</p>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store.js';
import WorkList from '../../components/WorkList';
import { shareIndex, shareWork } from '../../utils/index.js';

export default {
  components: {
    WorkList
  },
  data: function(){
    return {
      works: []
    }
  },
  computed: {
    works(){
      return globalStore.state.works;
    }
  },
  mounted(){
    const pages = getCurrentPages();
    const query = pages[pages.length - 1].options;
    if(query.work){
      let work = null;
      try{
        work = JSON.parse(decodeURIComponent(query.work));
      } catch(error){
        wx.showToast({
          title: '加载作品有误，直接创建你的作品吧~',
          icon: 'none'
        });
        this.works = globalStore.state.works;
      }
      this.works = [work];
    } else {
      this.works = globalStore.state.works;
    }
  },
  onShareAppMessage: function(res) {
    if(res.from === 'menu'){
      return shareIndex();
    } else if(res.from === 'button'){
      const index = parseInt(res.target.id, 10);
      const work = this.works[index];
      return shareWork(work);
    }
  }
}
</script>

<style scoped>
.container{
  box-sizing: border-box;
  min-height: 100vh;
  padding: 120rpx 56rpx 32rpx;
  background-color: #513CA0;
}

.list-none{
  font-size: 32rpx;
  color: #fff;
  text-align: center;
}

.list-none-link{
  display: inline-block;
  text-decoration: underline;
}
</style>


