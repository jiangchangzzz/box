<template>
  <ul class="list">
      <li class="list-item" v-for="(sound, index) in sounds" :key="sound.id">
        <div class="item-left">
          <img class="item-icon" :src="icons[index % icons.length]"/>
          <div class="item-text">
            <p class="item-text-name">{{sound.name}}</p>
            <p class="item-text-desc">{{sound.desc || sound.name}}</p>
          </div>
        </div>
        <div class="item-right">
          <div class="right-block" @click="handlePlay(index)">
            <img class="item-img" :src="playImg" v-show="index!==playIndex"/>
            <img class="item-img" :src="pauseImg" v-show="index===playIndex"/>
          </div>
          <div class="right-block" @click="handleAdd(index)">
            <template v-if="!sound.isLock">
              <img class="item-img" :src="addImg" v-show="isAbledAdd[index]"/>
              <img class="item-img" :src="minusImg" v-show="!isAbledAdd[index]"/>
            </template>
            <img class="item-img" :src="lockImg" v-else/>
          </div>
        </div>
      </li>
    </ul>
</template>

<script>
import globalStore from '../stores/global-store.js';
import playImg from '../../static/4.png';
import pauseImg from '../../static/2.png';
import addImg from '../../static/3.png';
import minusImg from '../../static/1.png';
import lockImg from '../../static/8.png';
import icons from '../data/icons.js';

export default {
  props: {
    data: Array
  },
  data: function(){
    return {
      playIndex: -1,
      _audioContext: null,
      playImg: playImg,
      pauseImg: pauseImg,
      addImg: addImg,
      minusImg: minusImg,
      lockImg: lockImg,
      icons: icons
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
      wx.navigateTo({
        url: '/pages/create/main'
      })
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

