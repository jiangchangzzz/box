<template>
  <div class="wrap">
  <div class="header">
    <img class="header_bg" src="https://qzonestyle.gtimg.cn/aoi/sola/20181219193449_ysUGkZcAgg.png"/>
    <div class="btn_wrap">
      <img v-on:click="playClick" class="btn_img" v-bind:src="!createAudioTypeInfo.length ? 'https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_dNr8rXzpv0.png' : !paused ? 'https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_ZAKXGjZ0VC.png' : 'https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_6ibDYgcgt3.png'"/>
      <img v-on:click="replayClick" class="btn_img" v-bind:src="!createAudioTypeInfo.length ? 'https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_i2PpSecveN.png' :'https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_TAFmYHN7Il.png'"/>
      <img v-on:click="saveClick" class="btn_img" v-bind:src="!createAudioTypeInfo.length ? 'https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_arwpgdB9YO.png' : 'https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_Ed7F17m8AO.png'"/>
    </div>
    <div class="track_btn_wrap" v-if="trackBtnShow">
        <img v-on:click="playSingleClick" class="btn_track_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_yGAVy8XmSW.png"/>
        <img v-on:click="copyClick" class="btn_track_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_KGx97ozZJ3.png"/>
        <img v-on:click="deleteClick" class="btn_track_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_7cqKDpBxI8.png"/>
    </div>
    <div class="track_btn_wrap" style="background-color:#A36BFF" v-if="!createAudioTypeInfo.length">
        <span style="color:#ffffff;font-size:12px;width:80px;text-align:center;">
          <span style="display:block;height:20px;">bpm 40</span>
          <span>44拍</span>
        </span>
        <img v-on:click="deleteClick" class="btn_track_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_0ETDel7MpZ.png"/>
    </div>
  </div>
  <div class="create_wrap">
    <div class="name_list">
      <div v-on:click="topClick" class="name_arrow arrow_top">
        <img src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_IACrAsyOHG.png" class="arrow_icon"/>
      </div>
      <div v-bind:style="{transform: 'translateY('+top+'rpx)'}">
        <div v-for="item in createAudioTypeInfo" :key="item.id"  class="name_item" v-on:click="trackClick(item.id)">
          <img class="track_icon" :src="item.icon">
          <div class="track_name" v-bind:class="[curTrack==item.id?'track_name--cur':'']">{{item.name}}</div>
        </div>
        <navigator class="btn_add" open-type="redirect" url="/pages/sound/main">
          <img class="btn_add_img" src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_qSLIQzuRnt.png"/>
        </navigator>
      </div>

      <div v-on:click="bottomClick" class="name_arrow arrow_bottom">
        <img src="https://qzonestyle.gtimg.cn/aoi/sola/20181215175806_IACrAsyOHG.png" class="arrow_icon arrow_icon_down"/>
      </div>
    </div>
    <div class="track_wrap">
      <div class="track_bg">
        <div class="track_top_line">
          <div v-for="(item, index) in bg" :key="index" class="track_bg_dot_item"></div>
        </div>
        <div class="track_bg_line_wrap">
          <div v-for="(item, index) in bg" :key="index" class="track_bg_item"></div>
        </div>
      </div>
      <div class="track_ul">
      <ul id="example-1"  v-bind:style="{transform: 'translateY('+top+'rpx)'}" >
      <div v-for="item in createAudioTypeInfo" :key="item.id"  v-bind:style="{transform: 'translateX(-'+translateX+'rpx)'}" class="track_li" >
        <div v-if="createAudioTrackInfo[item.id]" class="track_item_wrap">
        <div
          v-for="(subItem, i) in createAudioTrackInfo[item.id].list"
          :key="i"
          class="track_item"
          v-bind:class="[curTrack==item.id && (curTrackIndex == i || curTrackIndex == 10000)?'track_item--cur':'']"
          v-bind:style="{ width: subItem.time * 240 + 'rpx',transform: 'translateX('+subItem.start * 240+'rpx)' }"
          out-of-bounds="false"
          direction="horizontal"
          v-on:click="trackClick(item.id, i)"
          v-on:touchstart="touchstart($event,item.id, i)"
          v-on:touchmove="touchmove($event,item.id, i)"
          v-on:touchend="touchend($event,item.id, i)"
          @change="trackPosChange($event, item.id, i)"
        >
        <span style="font-size:12px;color:#ffffff;margin-left:10px;line-height:80rpx">{{item.time}}s</span>
        </div>
        </div>
      </div>
      </ul>
      </div>
    </div>

  </div>
  <Pop v-bind:hidden="popHidden" @confirm="handleConfirm" @cancel="handleCancel"/>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store.js';
import audioConfig from './audioConfig.js';
import Pop from '../../components/Pop';
import { shareIndex } from '../../utils/index.js';
import styles from '../../data/styles.js';

export default {
  components: {
    Pop
  },
  data () {
    return {
      bg:new Array(16),
      x: 0,
      track_base: 120, // 1s=120px
      animationData: {},
      ani: false,
      curTrack: "",
      curTrackIndex: 10000,
      trackCount: 0,
      pauseCount: 0,
      paused: true,
      trackBtnShow: false,
      translateX:0,
      endCount: 0,
      popHidden: true,
      aniTimer: 0,
      top: 0, //上下滚动
      // createAudioTrackInfo: {},
      // createAudioTypeInfo: []
    }
  },
  computed: {
    createAudioTypeInfo(){
      const defaultIcon = '/static/style/bug.png';
      let res = [];
      globalStore.state.createAudioTypeInfo.forEach(info => {
        let item = Object.assign({}, info);
        const styleInfo = styles.find(style => style.id === item.style);
        item.icon = styleInfo ? styleInfo.icon : defaultIcon;
        res.push(item);
      });
      return res;
    },
    createAudioTrackInfo(){
      return JSON.parse(JSON.stringify(globalStore.state.createAudioTrackInfo));
    },
    audios(){
      return globalStore.state.audios;
    }
  },
  created: function(){
    console.log("created.....")
    this.createAudio();

  },
  beforeUpdate(){
    console.log("beforeupdate:",globalStore.state.createAudioTrackInfo)
  },
  updated: function(){
    console.log("update....")
    this.createAudio();
  },
  methods: {
    playClick: function(){
      if(this.paused){
        this.playAudio();
        this.paused = false;
        this.ani = true;
      } else {
        this.pauseAudio();
        this.paused = true;
        this.ani = false;
      }
    },
    replayClick: function(){

      this.aniTimer && clearTimeout(typeof this.aniTimer === "object" ? this.aniTimer._id : this.aniTimer);
      this.paused = true;
      this.translateX = 0;

      let tracks = globalStore.state.createAudioTrackInfo;
      let self = this;
      for(var key in tracks){

        tracks[key].list.forEach((item, index) => {
          this.audios[key + "_" + index].stop();
        });
      }
    },
    saveClick: function(){
      this.popHidden = false;
    },
    playSingleClick: function(){
      let self = this;
      this.audios[this.curTrack+ "_0"].onPause(function(){
        self.paused = true;
      });
      if(this.paused){
        this.audios[this.curTrack+ "_0"].play();
        this.paused = false;
      } else {
        this.audios[this.curTrack+ "_0"].pause();
        this.paused = true;
      }

    },
    playAudio(){
      let tracks = globalStore.state.createAudioTrackInfo;
      let self = this;
      for(var key in tracks){

        tracks[key].list.forEach((item, index) => {
          let k = key;
          let i = index;
          setTimeout(function() {
            self.audios[k + "_" + i].src = item.src;
            self.audios[k + "_" + i].play();
          },item.start * 1e3);
        });
      }
      this.animation();
      // 加个最大时长保护
      this.aniMaxTimer = setTimeout(() => {
        this.paused = true;
        this.translateX = 0;
      }, 8000);
    },
    animation(){
      let self = this;
      this.aniTimer && clearTimeout(this.aniTimer);
      setTimeout(() => {

        if(!self.paused){
          self.translateX+= 24;
          self.animation();
        } else {
          this.aniMaxTimer && clearTimeout(this.aniMaxTimer);
        }
      }, 100);
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
      // console.log("create audio....")
      let tracks = globalStore.state.createAudioTrackInfo;
      if(!Object.keys(tracks).length){
        return;
      }
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
      console.log("create audio:", item)
      const innerAudioContext = wx.createInnerAudioContext()

      innerAudioContext.onPlay(function(){
        //console.log("play start....")
      });
      innerAudioContext.onPause(function(){
        self.pauseCount++;
        // console.log("pause end.....")
        // console.log("pausecount :", self.pauseCount)
        // console.log("trackc:", self.trackCount)

        if(self.pauseCount === self.trackCount){
          self.paused = true;
          self.ani = false;
          self.pauseCount = 0;
          return;
        }

      });
      function end(){
        self.endCount++;
        // console.log("pause end.....")
        // console.log("pausecount :", self.endCount)
        // console.log("trackc:", self.trackCount)

        if(self.endCount === self.trackCount){
          // console.log("ended.....")
          // console.log(self.aniTimer)
          self.paused = true;
          self.translateX = 0;
          self.ani = false;
          self.pauseCount = 0;
          self.aniTimer && clearTimeout(typeof this.aniTimer === "object" ? this.aniTimer._id : this.aniTimer);
          self.endCount = 0;

          return;
        }

      }
      innerAudioContext.onEnded(end);
      innerAudioContext.onError(end);

      this.trackCount++;
      //this.audios[key+ "_" + index] = innerAudioContext;
      globalStore.commit("addAudios",{
        id: key+ "_" + index,
        newAudio: innerAudioContext
      });

      innerAudioContext.src = item.src;
    },
    trackClick: function(id, index){
      this.curTrack = id;
      this.trackBtnShow = true;
      if(typeof index !== "undefined"){
        this.curTrackIndex = index;
      } else {
        // 点击整个条，index填个默认值10000
        this.curTrackIndex = 10000;
      }
    },
    copyClick: function(){
      let newAudio = Object.assign({},audioConfig[this.curTrack]);
      let audioList = globalStore.state.createAudioTrackInfo[this.curTrack].list;

      newAudio.start = audioList.length * newAudio.time;
      globalStore.commit("addCreateAudioTrack", {id: this.curTrack, newAudio: newAudio });
      //globalStore.dispatch("addCreateAudioTrack", {id: this.curTrack, newAudio: newAudio });
    },
    deleteClick: function(){

      let trackInfo = Object.assign({}, globalStore.state.createAudioTrackInfo);
      let trackType = globalStore.state.createAudioTypeInfo;
      let index = 0;
      trackType.forEach((item, idx) => {
        if(item.id === this.curTrack){
          index = idx;
        }
      })
      console.log("trackInfo :", trackInfo)
      if(this.curTrackIndex === 10000){
        this.trackCount = this.trackCount - trackInfo[this.curTrack].list.length;
        globalStore.commit("deleteCreateAudioType", {index});
        delete trackInfo[this.curTrack];
        globalStore.commit("deleteCreateAudioTrack", { trackInfo });
      } else {
        this.trackCount = this.trackCount - 1;
        trackInfo[this.curTrack].list.splice(this.curTrackIndex,1);
        globalStore.commit("deleteCreateAudioTrack", { trackInfo });
      }

      this.curTrack = "";
    },
    touchstart:function(e, id, index){
      this.touchStartX = e.clientX;
      this.touchx = 0;
      console.log("touchstart e:",e)
    },
    touchmove:function(e, id, index){
      console.log("touchmove: ",e)
      let delta = e.clientX - this.touchStartX;

      let trackInfo = Object.assign({}, globalStore.state.createAudioTrackInfo);
      let audio = trackInfo[id].list[index];

      let newAudio = Object.assign({},audio);
      newAudio.start = Math.max(newAudio.start + ((delta - this.touchx) / 120 * 2) / 2, 0);

      console.log("pos start:",newAudio.start);
      console.log("touchx:", this.touchx)
      this.touchx = delta;

      //this.x = e.x;
      globalStore.commit("updateCreateAudioTrack",{
        index,
        id,
        newAudio
      })

    },
    touchend:function(e,id, index){
      if(!this.touchx){
        return;
      }
      this.posChange(id, index);
    },
    posChange: function(id, index){

        let trackInfo = Object.assign({}, globalStore.state.createAudioTrackInfo);
      let audio = trackInfo[id].list[index];

      let newAudio = Object.assign({},audio);
      //newAudio.start = Math.max(newAudio.start + Math.round(this.touchx / 120 * 2) / 2, 0);
      newAudio.start = Math.round(newAudio.start * 2) / 2;
      console.log("pos start:",newAudio.start);
      console.log("touchx:", this.touchx)
      this.touchx = 0;

      //this.x = e.x;
      globalStore.commit("updateCreateAudioTrack",{
        index,
        id,
        newAudio
      })


    },
    trackPosChange: function(e, id, index){
      // this.posTimer && clearTimeout(this.posTimer);
      // console.log("e.x:", e.x)
      // this.posTimer = setTimeout(() => {
      //   let trackInfo = Object.assign({}, globalStore.state.createAudioTrackInfo);
      //   let audio = trackInfo[id].list[index];

      //   let newAudio = Object.assign({},audio);
      //   newAudio.start = Math.round(e.x / 120 * 2) / 2;
      //   console.log("pos start:",newAudio.start);
      //   //this.x = e.x;
      //   globalStore.commit("updateCreateAudioTrack",{
      //     index,
      //     id,
      //     newAudio
      //   })

      // },20)
      this.touchx = e.x;

    },
    topClick: function(){
      if(this.top<=-globalStore.state.createAudioTypeInfo.length*135){
        return;
      }
      this.top -= 135;
    },
    bottomClick: function(){
      if(this.top >= 0){
        return;
      }
      this.top += 135;
    },
    handleConfirm(){
      this.popHidden = true;
      wx.navigateTo({
        url: '/pages/work/main'
      });
    },
    handleCancel(){
      this.popHidden = true;
    }
  },

  onShareAppMessage: function(res) {
    return shareIndex();
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
  overflow: hidden;
}
.name_item{
  width: 83px;
  height: 135rpx;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #BFBFBF;
  flex-direction: column;
}
.track_wrap{
  overflow: scroll;
  background-color:#E5DEFF;
  position: relative;
  flex: 1;
}
.track_ul{
  margin-top: 20px;
  width: 1200px;
  overflow: hidden;
}
.track_li{
  width: 1200px;
  height: 135rpx;
  border-bottom: 1px solid #BFBFBF;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.track_item{
  background-color: #A36BFF;
  height: 40px;
  border-radius: 20px;
  top: 12px;
  position: absolute;
}
.track_item--cur{
  background-color: #FF4646;
}
.header{
  position: absolute;
  top:0;
  left:0;
  right:0;
  height: 160px;
  background-color: #1D1246;
  text-align: center;
}
.name_arrow{
  width: 83px;
  height:20px;
  background-color: #372773;
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 40px;

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
  border-radius: 100px 0px 0px 100px;
  width: 126px;
  position: absolute;
  display: flex;
  align-items: center;
  right:0;
  height:40px;
  line-height: 40px;
  bottom: 16px;
}
.track_icon{
  width: 48px;
  height: 48px;
}
.track_name{
  width: 46px;
  height: 18px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: -9px;
  font-size: 12px;
  color: black;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}
.track_name--cur{
  background-color:#FF4646;
  color: #ffffff;
}
.track_bg{
  position: absolute;
  top:0;
  bottom: 0;
  left:0;
  right:0;
  width: 1200px;
  background-color:#E5DEFF;
  overflow: hidden;
}
.track_bg_line_wrap{
  height:100%;
}
.track_bg_item{
  width:60px;
  float: left;
  opacity: .5;
  height:100%;
  box-sizing: border-box;
  border-right:1px dotted #513CA0;
}
.arrow_icon{
  width: 17px;
  height: 8px;
}
.arrow_icon_down{
  transform: rotate(180deg)
}
.header_bg{
  width: 91px;
  height:100px;
}
.track_item_wrap{
  display:flex;
  flex-direction: row;
}
</style>
