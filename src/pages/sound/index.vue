<template>
  <div class="container">
    <nav class="nav">
      <div :class="['nav-item', {active: soundType === 0}]" @click="changeSoundType(0)">预设声音</div>
      <div :class="['nav-item', {active: soundType === 1}]" @click="changeSoundType(1)">我的声音</div>
    </nav>
    <div class="list"> 
      <button class="list-upload" v-if="soundType===1" @click="handleUpload">上传我的声音</button>
      <SoundList v-if="currentSounds.length" :data="currentSounds"/>
      <p class="list-none" v-else>当前没有更多声音哦，开始上传吧~</p>
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
    },
    handleUpload(){
      wx.showToast({
        title: '上传功能开发中~',
        icon: 'loading'
      })
    }
  }
}
</script>

<style scoped>
.container{
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 56rpx;
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
  padding: 0 32rpx;
}

.list-upload{
  margin-bottom: 32rpx;
  font-size: 32rpx;
  color: #513CA0;
}

.list-none{
  text-align: center;
  font-size: 32rpx;
  color: #fff;
}

</style>


