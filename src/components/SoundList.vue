<template>
  <ul class="list">
      <li class="list-item" v-for="(sound, index) in sounds" :key="sound.id">
        <div class="item-left">
          <img class="item-icon" :src="sound.icon"/>
          <div class="item-text">
            <p class="item-text-name">{{sound.name}}</p>
            <p class="item-text-desc">{{sound.desc || sound.name}}</p>
          </div>
        </div>
        <div class="item-right">
          <div class="right-block" @click="handlePlay(index)">
            <img class="item-img" src="/static/4.png" v-show="index!==playIndex"/>
            <img class="item-img" src="/static/2.png" v-show="index===playIndex"/>
          </div>
          <div class="right-block" @click="handleAdd(index)">
            <template v-if="!sound.isLock">
              <img class="item-img" src="/static/3.png" v-show="isAbledAdd[index]"/>
              <img class="item-img" src="/static/1.png" v-show="!isAbledAdd[index]"/>
            </template>
            <img class="item-img" src="/static/8.png" v-else/>
          </div>
        </div>
      </li>
    </ul>
</template>

<script>
import globalStore from '../stores/global-store.js';

export default {
  props: {
    data: Array
  },
  data: function(){
    return {
      playIndex: -1,
      _audioContext: null
    }
  },
  computed: {
    sounds(){
      let lock = this.data.filter(sound => sound.isLock);
      let notLock = this.data.filter(sound => !sound.isLock);
      return notLock.concat(lock);
    },
    audioContext(){
      if(!this._audioContext){
        this._audioContext = wx.createInnerAudioContext();
        this._audioContext.onEnded(() => {
          this.playIndex = -1
        });
      }
      return this._audioContext;
    },
    isAbledAdd(){
      const res = this.sounds.map(sound => {
        const info = globalStore.state.createAudioTypeInfo.find(info => info.id === sound.id);
        return !info;
      });
      return res;
    }
  },
  methods: {
    handlePlay(index){
      if(index === this.playIndex){
        this.playIndex = -1;
        this.audioContext.stop();
      } else {
        this.playIndex = index;
        const src = this.sounds[index].src;
        this.audioContext.src = src;
        this.audioContext.play();
      }
    },
    handleAdd(index){
      if(!this.isAbledAdd[index] || this.sounds[index].isLock){
        return;
      }

      globalStore.commit('addCreateAudioType', { 
        newAudio: this.sounds[index]
      });
      wx.redirectTo({
        url: '/pages/create/main'
      });
    }
  }
}
</script>


<style scoped>
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

.item-img{
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
}

.right-block{
  display: flex;
  align-items: center;
}

.right-block:last-child{
  margin-left: 32rpx;
}

</style>

