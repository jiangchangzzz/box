<template>
  <div class="container">
    <nav class="nav">
      <div :class="['nav-item', {active: soundType === 0}]" @click="changeSoundType(0)">预设声音</div>
      <div :class="['nav-item', {active: soundType === 1}]" @click="changeSoundType(1)">我的声音</div>
    </nav>
    <ul class="list">
      <li class="list-item" v-for="(sound, index) in currentSounds" :key="index">
        <div class="item-left">
          <img class="item-icon" :src="sound.icon"/>
          <div class="item-text">
            <p class="item-text-name">{{sound.name}}</p>
            <p class="item-text-desc">{{sound.desc}}</p>
          </div>
        </div>
        <div class="item-right">
          <div class="item-listen"></div>
          <div class="item-listen"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store.js';

export default {
  data: function(){
    return {
      soundType: 0
    }
  },
  computed: {
    currentSounds(){
      return globalStore.state.sounds.filter(sound => sound.type === this.soundType);
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
  background-color: #000;
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
  background-color: #979797;
  border-radius: 100rpx 0 0 100rpx;
}

.nav-item:first-child{
  border-radius: 100rpx 0 0 100rpx;
}

.nav-item:last-child{
  border-radius: 0 100rpx 100rpx 0;
}

.nav-item.active{
  background-color: #D8D8D8;
}

.list{
  margin-top: 56rpx;
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


