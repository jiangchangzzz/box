<template>
  <ul class="list">
      <li class="list-item" v-for="(sound, index) in sounds" :key="index">
        <div class="item-left">
          <img class="item-icon" :src="sound.icon"/>
          <div class="item-text">
            <p class="item-text-name">{{sound.name}}</p>
            <p class="item-text-desc">{{sound.desc}}</p>
          </div>
        </div>
        <div class="item-right">
          <div class="item-listen" @click="handlePlay(index)">{{index===playIndex ? 1 : 0}}</div>
          <div class="item-listen" @click="handleAdd(index)">{{currentType.indexOf(sound.id)>= 0 ? '-' : '+'}}</div>
        </div>
      </li>
    </ul>
</template>

<script>
import globalStore from '../stores/global-store.js';

export default {
  props: {
    sounds: Array
  },
  data: function(){
    return {
      playIndex: -1,
      _audioContext: null
    }
  },
  computed: {
    audioContext(){
      if(!this._audioContext){
        this._audioContext = wx.createInnerAudioContext();
      }
      return this._audioContext;
    },
    currentType(){
      const currentType = globalStore.state.createAudioTypeInfo.map(info => info.id);
      return currentType;
    }
  },
  methods: {
    log(str){
      console.log(str);
    },
    handlePlay(index){
      if(index === this.playIndex){
        this.playIndex = -1;
        this.audioContext.pause();
      } else {
        this.playIndex = index;
        const src = this.sounds[index].src;
        this.audioContext.src = src;
        this.audioContext.startTime = 0;
        this.audioContext.play();
      }
    },
    handleAdd(index){
      globalStore.commit('addCreateAudioType', { 
        newAudio: this.sounds[index]
      });
      wx.navigateTo({
        url: '/pages/create/main'
      })
    }
  }
}
</script>


<style scoped>
.list{
  padding: 0 32rpx;
}

.list-item{
  margin-bottom: 32rpx;
  display: flex;
  justify-content: space-between;
}

.list-item:last-child{
  margin-bottom: 0;
}

.item-left{
  display: flex;
  flex-grow: 1;
}

.item-icon{
  width: 96rpx;
  height: 96rpx;
  border: 5rpx solid #fff;
  border-radius: 50%;
}

.item-text{
  margin-left: 16rpx; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
}

.item-text-name{
  max-width: 430rpx;
  margin-bottom: 5rpx;
  font-size: 32rpx;
  font-weight: bold;
}

.item-text-desc{
  max-width: 430rpx;
  margin-top: 5rpx;
  font-size: 24rpx;
}

.item-right{
  display: flex;
  align-items: center;
}

.item-listen{
  width: 48rpx;
  height: 48rpx;
  background-color: #979797;
  border-radius: 50%;
  margin-right: 32rpx;
}

.item-listen:last-child{
  margin-right: 0;
}
</style>

