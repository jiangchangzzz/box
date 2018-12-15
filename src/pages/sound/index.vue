<template>
  <div class="container">
    <nav class="nav">
      <div :class="['nav-item', {active: soundType === 0}]" @click="changeSoundType(0)">预设声音</div>
      <div :class="['nav-item', {active: soundType === 1}]" @click="changeSoundType(1)">我的声音</div>
    </nav>
    <div class="list"> 
      <SoundList :sounds="currentSounds"/>
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
}
</style>


