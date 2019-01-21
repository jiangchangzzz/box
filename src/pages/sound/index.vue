<template>
  <div class="container">
    <nav class="nav">
      <div :class="['nav-item', {active: soundType === 0}]" @click="changeSoundType(0)">预设声音</div>
      <div :class="['nav-item', {active: soundType === 1}]" @click="changeSoundType(1)">我的声音</div>
    </nav>
    <nav class="nav" v-if="soundType===0">
      <div 
        :class="['nav-item', 'nav-item_style', {active: soundStyle === style.id}]" 
        v-for="style in styles" :key="style.id" 
        @click="changeSoundStyle(style.id)">{{style.name}}
      </div>
    </nav>
    <div class="list"> 
      <button class="list-upload" v-if="soundType===1" @click="handleUpload">上传我的声音</button>
      <SoundList v-if="currentSounds.length" :data="currentSounds" :icon="currentIcon"/>
      <p class="list-none" v-else>当前没有更多声音哦，开始上传吧~</p>
    </div>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store.js';
import SoundList from '../../components/SoundList';
import { shareIndex } from '../../utils/index.js';
import styles from '../../data/styles.js';

export default {
  components: {
    SoundList
  },
  data: function(){
    return {
      styles: styles,
      soundType: 0,
      soundStyle: 1
    }
  },
  computed: {
    currentSounds(){
      return Object.values(globalStore.state.sounds).filter(sound => (
        sound.type === this.soundType && sound.style === this.soundStyle));
    },
    currentIcon(){
      const defaultIcon = '/static/style/bug.png';
      const styleInfo = this.styles.find(style => style.id === this.soundStyle);
      return styleInfo ? styleInfo.icon : defaultIcon;
    }
  },
  methods: {
    changeSoundType(type){
      this.soundType = type;
    },
    changeSoundStyle(style){
      this.soundStyle = style;
    },
    handleUpload(){
      wx.showToast({
        title: '上传功能开发中~',
        icon: 'loading'
      })
    }
  },
  onShareAppMessage: function(res) {
    return shareIndex();
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
  margin-bottom: 28rpx;
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
}

.nav-item:first-child{
  padding-left: 10rpx;
  border-radius: 100rpx 0 0 100rpx;
}

.nav-item:last-child{
  padding-right: 10rpx;
  border-radius: 0 100rpx 100rpx 0;
}

.nav-item.active{
  color: #fff;
  background-color: #FF4646;
}

.nav-item_style{
  width: 100rpx;
  font-size: 28rpx;
}

.list{
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


