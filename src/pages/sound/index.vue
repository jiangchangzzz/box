<template>
  <div class="container">
    <nav class="nav">
      <div :class="['nav-item', {active: soundType === 0}]" @click="changeSoundType(0)">预设音效</div>
      <div :class="['nav-item', {active: soundType === 1}]" @click="changeSoundType(1)">我的音效</div>
    </nav>
    <div class="list"> 
      <SoundList v-if="currentSounds.length" :data="currentSounds"/>
      <p class="list-none" v-else>当前没有更多音效，请到<a class="list-none-link" href="/pages/work/main">我的作品</a>上传~</p>
    </div>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store.js';
import SoundList from '../../components/SoundList';

export default {
  components: {
    SoundList
  },
  data: function(){
    return {
      soundType: 0
    }
  },
  computed: {
    currentSounds(){
      return Object.values(globalStore.state.sounds).filter(sound => sound.type === this.soundType);
    },
  },
  methods: {
    changeSoundType(type){
      this.soundType = type;
    }
  }
}
</script>

<style scoped>
.container{
  min-height: 100vh;
  background-color: #513CA0;
}

.nav{
  display: flex;
  justify-content: center;
}

.nav-item{
  width: 240rpx;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
  color: #513CA0;
  background-color: #fff;
  border-radius: 100rpx 0 0 100rpx;
}

.nav-item:first-child{
  border-radius: 100rpx 0 0 100rpx;
}

.nav-item:last-child{
  border-radius: 0 100rpx 100rpx 0;
}

.nav-item.active{
  color: #fff;
  background-color: #FF4646;
}

.list{
  margin-top: 56rpx;
}

.list-none{
  text-align: center;
  font-size: 32rpx;
  color: #fff;
}

.list-none-link{
  display: inline;
  text-decoration: underline;
}
</style>


