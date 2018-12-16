<template>
  <ul class="list">
    <li class="list-item" v-for="(work, index) in works" :key="index">
      <div class="item-left">
        <img class="item-icon" :src="icons[index % icons.length]">
        <div class="item-text">
          <p class="item-text-name">{{work.name}}</p>
          <p class="item-text-desc">{{work.desc || work.name}}</p>
        </div>
      </div>
      <div class="item-right">
        <div class="right-block" @click="handlePlay(index)">
          <img class="item-img" :src="playImg" v-show="index!==playIndex">
          <img class="item-img" :src="pauseImg" v-show="index===playIndex">
        </div>
        <div class="right-block">
          <button class="share-btn" open-type="share">
            <img class="item-img" :src="shareImg"/>
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import globalStore from '../stores/global-store.js';
import playImg from '../../static/4.png';
import pauseImg from '../../static/2.png';
import shareImg from '../../static/9.png';
import icons from '../data/icons.js';
import TrackPlayer from '../utils/TrackPlayer.js';

export default {
  props: {
    works: Array
  },
  data: function(){
    return {
      playIndex: -1,
      _audioContext: null,
      playImg: playImg,
      pauseImg: pauseImg,
      shareImg: shareImg,
      icons: icons.reverse()
    }
  },
  mounted(){
    this.trackPlayer = new TrackPlayer();
    this.trackPlayer.onEnded(() => {
      this.playIndex = -1;
    });
  },
  methods: {
    handlePlay(index){
      if(index === this.playIndex){
        this.playIndex = -1;
        this.trackPlayer.stopAudio();
      } else {
        this.playIndex = index;

        this.trackPlayer.stopAudio();
        this.trackPlayer.playAudio(this.works[index].createAudioTrackInfo);
      }
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

.right-share{
  display: flex;
  align-items: center;
}

.share-btn{
  width: 48rpx;
  height: 48rpx;
  padding: 0;
  display: flex;
  align-content: center;
  background-color: transparent;
}
</style>

