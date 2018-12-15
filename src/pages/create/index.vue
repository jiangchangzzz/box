<template>
  <div>
  <button v-on:click="btnClick">btn2</button>
  <button v-on:click="copyClick">复制</button>
  <button v-on:click="addClick">添加</button>
  <div class="create_wrap">
    <div class="name_list">
      <div v-for="item in createAudioTypeInfo" :key="item.id"  class="name_item" v-on:click="trackClick(item.id)">{{item.name}}</div>
    </div>
    <div class="track_wrap">
      <ul id="example-1" class="track_ul">
      <movable-area v-for="item in createAudioTrackInfo" :key="item.id" class="track_li" v-on:click="trackClick(item.id)">
        <movable-view
          v-for="(subItem, i) in item.list"
          :key="i"
          class="track_item"
          v-bind:style="{ width: subItem.time * 60 + 'px', marginLeft: subItem.start * 60 + 'px' }"
          x="0"
          direction="horizontal"
        >
        </movable-view>
      </movable-area>

      </ul>
    </div>

  </div>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store.js';
import audioConfig from './audioConfig.js';
let audios = {};
let audioArr = [];
let curTrack = "";
export default {
  data () {
    return {
      x: 0,
      track_base: 60, // 1s=60px
      //createAudioTrackInfo: {},
      // createAudioTypeInfo: []
    }
  },
  computed: {
    createAudioTypeInfo(){
      return globalStore.state.createAudioTypeInfo;
    },
    createAudioTrackInfo(){
      console.log("trackinfo : ",globalStore.state.createAudioTrackInfo)
      return globalStore.state.createAudioTrackInfo;
    }
  },
  created: function(){
    let self = this;

    audioArr.forEach((item, index) => {
      self.createAudio(item);
    });
  },

  methods: {
    btnClick: function(){
      let audio = audios[audioArr[0]];
      if(audio.paused){
        for(var key in audios){
          audios[key].play();
        }
      } else {
        for(var key in audios){
          audios[key].paused();
        }
      }
      // audios.play();

    },
    createAudio: function(src){
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = src;
      innerAudioContext.onPlay(function(){
        console.log("play start....")
      });
      // audios = innerAudioContext;
      audios[src] = innerAudioContext;
    },
    addClick: function(){
      // let createAudioTypeInfo = globalStore.state.createAudioTypeInfo;
      // createAudioTypeInfo.push(audioConfig["1102845"]);
      globalStore.commit("addCreateAudioType", {newAudio: audioConfig["1102845"]});
    },
    trackClick: function(id){
      curTrack = id;
      console.log(id)
    },
    copyClick: function(){
      // let newAudio = Object.assign({},audioConfig[curTrack]);
      let newAudio = audioConfig[curTrack];
      let audioList = globalStore.state.createAudioTrackInfo[curTrack].list;
      console.log(this.$store)
      newAudio.start = audioList.length * newAudio.time;
      globalStore.dispatch("onaddCreateAudioTrack", {id: curTrack, newAudio: newAudio });
    }
  }
};
</script>
<style scoped>
.create_wrap{
  display: flex;
  flex-direction: row;
}
.name_list{
  width: 83px;
  background-color: black;
}
.name_item{
  width: 83px;
  height: 69px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.track_wrap{
  overflow: scroll;
}
.track_ul{width: 960px;}
.track_li{
  width: 960px;
  height: 68px;
  border-bottom: 1px solid #BFBFBF;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.track_item{
  background-color: #FFBCBC;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  top: 12px;
}
</style>
