<template>
  <div class="wrap">
  <div class="header">
    <div class="btn_wrap">
      <img v-on:click="playClick" class="btn_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_6ibDYgcgt3.png"/>
      <img v-on:click="playClick" class="btn_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_TAFmYHN7Il.png"/>
      <img v-on:click="playClick" class="btn_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_Ed7F17m8AO.png"/>
    </div>
    <div class="track_btn_wrap" v-if="trackBtnShow">
        <img v-on:click="playSingleClick" class="btn_track_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_yGAVy8XmSW.png"/>
        <img v-on:click="copyClick" class="btn_track_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_KGx97ozZJ3.png"/>
        <img v-on:click="playClick" class="btn_track_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_7cqKDpBxI8.png"/>
    </div>
  </div>
  <div class="create_wrap">
    <div class="name_list">
      <button v-on:click="topClick" class="name_arrow arrow_top"></button>
      <div v-for="item in createAudioTypeInfo" :key="item.id"  class="name_item" v-on:click="trackClick(item.id)">{{item.name}}</div>
      <a class="btn_add" href="/pages/sound/main">
          <img class="btn_add_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_uOEEsNwokK.png"/>
      </a>
      <button v-on:click="bottomClick" class="name_arrow arrow_bottom">

      </button>
    </div>
    <div class="track_wrap">
      <div class="track_top_line"></div>
      <ul id="example-1" class="track_ul">
      <movable-area v-for="item in createAudioTrackInfo" :key="item.id" v-bind:class="[ani ? 'bounce-enter-active' : '', 'track_li']" v-on:click="trackClick(item.id)" >
        <movable-view
          v-for="(subItem, i) in item.list"
          :key="i"
          class="track_item"
          v-bind:class="[curTrack==item.id?'track_item--cur':'']"
          v-bind:style="{ width: subItem.time * 120 + 'px', marginLeft: subItem.start * 120 + 'px' }"
          x="0"
          direction="horizontal"
          @change="trackPosChange($event, item.id, i)"
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
let paused = true;
let trackCount = 0;
let pauseCount = 0;
export default {
  data () {
    return {
      x: 0,
      track_base: 120, // 1s=60px
      animationData: {},
      ani: false,
      curTrack: "",
      trackBtnShow: false,
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
    },
    audios(){
      return globalStore.state.audios;
    }
  },
  created: function(){
    console.log("created.....")
    this.createAudio();
  },
  updated: function(){
    console.log("update....")
    this.createAudio();
  },

  methods: {
    playClick: function(){
      console.log("paused :", paused)
      console.log("ani before:", this.ani)
      if(paused){
        this.playAudio();
        paused = false;
        this.ani = true;
        console.log("ani:", this.ani)
      } else {
        this.pauseAudio();
        paused = true;
        this.ani = false;
      }
    },
    playSingleClick: function(){
      if(paused){
        this.audios[curTrack+ "_0"].play();
        paused = false;
        //this.ani = true;
        console.log("ani:", this.ani)
      } else {
        this.audios[curTrack+ "_0"].pause();
        paused = true;
        //this.ani = false;
      }

    },
    playAudio(){
      let tracks = globalStore.state.createAudioTrackInfo;
      let self = this;
      for(var key in tracks){

        tracks[key].list.forEach((item, index) => {
          if(item.start){
            setTimeout(() => {
              this.audios[key + "_" + index].play();
            },item.start * 1e3);
          } else {
            this.audios[key + "_" + index].play();
          }
        });
      }
    },
    pauseAudio(){
      let tracks = globalStore.state.createAudioTrackInfo;
      let self = this;
      for(var key in tracks){

        tracks[key].list.forEach((item, index) => {
          this.audios[key + "_" + index].pause();
        });
      }
    },
    createAudio(){
      let self = this;
      console.log("create audio....")
      let tracks = globalStore.state.createAudioTrackInfo;
      for(var key in tracks){
        let trackList = tracks[key].list;
        trackList.forEach((item, index) => {
          if(!this.audios[key + "_" + index]){
            self.createAudioItem(key, index, item);
          }
        });
      }
    },
    createAudioItem: function(key, index, item){
      let self = this;
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = item.src;
      innerAudioContext.onPlay(function(){
        console.log("play start....")
      });
      innerAudioContext.onPause(function(){
        pauseCount++;
        console.log("pause end.....")
        console.log("pausecount :", pauseCount)
        console.log("trackc:", trackCount)

        if(pauseCount === trackCount){
          console.log("paused..........")
          paused = true;
          self.ani = false;
          console.log("this ani:", this.ani)
          pauseCount = 0;
          return;
        }

      });
      trackCount++;
      //this.audios[key+ "_" + index] = innerAudioContext;
      globalStore.commit("addAudios",{
        id: key+ "_" + index,
        newAudio: innerAudioContext
      });
    },
    addClick: function(){
      // let createAudioTypeInfo = globalStore.state.createAudioTypeInfo;
      // createAudioTypeInfo.push(audioConfig["1102845"]);
      if(trackCount){
        globalStore.commit("addCreateAudioType", {newAudio: audioConfig["1102844"]});
      } else {
        globalStore.commit("addCreateAudioType", {newAudio: audioConfig["1102845"]});
      }

    },
    trackClick: function(id){
      curTrack = id;
      this.curTrack = id;
      this.trackBtnShow = true;
    },
    copyClick: function(){
      let newAudio = Object.assign({},audioConfig[curTrack]);
      let audioList = globalStore.state.createAudioTrackInfo[curTrack].list;

      newAudio.start = audioList.length * newAudio.time;
      globalStore.dispatch("onaddCreateAudioTrack", {id: curTrack, newAudio: newAudio });
    },
    trackPosChange: function(e, id, index){
      console.log("e: ",  id)
      let newAudio = Object.assign({},audioConfig[id]);
      // //let audioList = globalStore.state.createAudioTrackInfo[id].list;
      newAudio.start = e.x / 120;
      globalStore.commit("updateCreateAudioTrack",{
        index,
        id,
        newAudio
      })
    }
  }
};
</script>
<style scoped>
.wrap{
  height: 100vh;
}
.create_wrap{
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-top: 160px;
  box-sizing: border-box;
}
.name_list{
  width: 83px;
  background-color: #513CA0;
  padding: 20px 0;
}
.name_item{
  width: 83px;
  height: 68px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #BFBFBF;
}
.track_wrap{
  overflow: scroll;
  background-color:#E5DEFF;
}
.track_ul{
  width: 1200px;
  background-color:#E5DEFF;
}
.track_li{
  width: 1200px;
  height: 68px;
  border-bottom: 1px solid #BFBFBF;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.track_item{
  background-color: #A36BFF;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  top: 12px;
}
.track_item--cur{
  background-color: #FF4646;
}
.bounce-enter-active {
  animation: bounce-in 8s;
}
.bounce-leave-active {
  animation: bounce-in .1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-960px);
  }
}
.header{
  position: absolute;
  top:0;
  left:0;
  right:0;
  height: 160px;
  background-color: #383838;
}
.name_arrow{
  width: 83px;
  height:20px;
  background-color: #372773;
  position: absolute;
}
.arrow_top{

  top:160px;
}
.arrow_bottom{
  bottom:0;
}
.btn_add{
  width: 83px;
  height: 83px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.track_top_line{
  height: 20px;
  background-color: #513CA0;
}
.btn_add_img{
  width: 48px;
  height: 48px;
}
.btn_wrap{
  position: absolute;
  left:0;
  bottom: 16px;
}
.btn_img{
  width:40px;
  height:40px;
  margin-left: 16px;
}
.btn_track_img{
  width:24px;
  height:24px;
  margin-left:12px;
}
.track_btn_wrap{
  background-color: #FF4646;
  width: 126px;
  position: absolute;
  right:0;
  height:40px;
  bottom: 16px;
}
</style>
