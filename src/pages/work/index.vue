<template>
  <div class="container">
    <WorkList :works="works" @share="handleShare"/>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store.js';
import WorkList from '../../components/WorkList';
import { shareWork } from '../../utils/index.js';

export default {
  components: {
    WorkList
  },
  data: function(){
    return {
      shareName: '神秘作品'
    }
  },
  computed: {
    works(){
      return globalStore.state.works;
    }
  },
  methods: {
    handleShare(name){
      this.shareName = name;
    }
  },
  onShareAppMessage: function(res) {
    return shareWork(this.shareName);
  }
}
</script>

<style scoped>
.container{
  height: 100vh;
  padding-top: 120rpx;
  padding-bottom: 56rpx;
  background-color: #513CA0;
}
</style>


