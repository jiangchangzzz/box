<template>
  <div class="container" style="background-image: url(../../../static/index-bg.png)">
    <div class="header">
     <img class="header-img" src="../../../static/logo2.png"/> 
    </div>
    <div class="main">
      <ul class="main-list">
        <li class="list-item">
          <a href="/pages/create/main"><img class="button-img-main" src="../../../static/Group 3 Copy.png"/></a>
        </li>
        <li class="list-item">
          <a href="/pages/work/main"><img class="button-img-main" src="../../../static/Group 4 Copy.png"/></a>
        </li>
        <li class="list-item">
          <a href="/pages/sound/main"><img class="button-img-other" src="../../../static/Group 5 Copy.png"/></a>
        </li>
        <li class="list-item">
          <button class="list-button" open-type="share"><img class="button-img-other" src="../../../static/Group 6 Copy.png"/></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { shareIndex } from "../../utils/index";
import globalStore from '../../stores/global-store.js';
import works from '../../data/works.js';

export default {
  computed: {
    userInfo(){
      return globalStore.state.userInfo;
    }
  },
  mounted(){
    const pages = getCurrentPages();
    const query = pages[pages.length - 1].options;
    if(query.beatsmakerwork){
      let work = null;
      try{
        work = JSON.parse(decodeURIComponent(query.beatsmakerwork));
      } catch(error){
        wx.showToast({
          title: '加载作品有误，直接创建你的作品吧~',
          icon: 'none'
        });
      }

      globalStore.commit('updateCreateInfo', {
        createAudioTrackInfo: work.createAudioTrackInfo
      });  
      
      wx.redirectTo({
        url: '/pages/create/main'
      });
    }
    // const work = works[0];
    // globalStore.commit('updateCreateInfo', {
    //     createAudioTrackInfo: work.createAudioTrackInfo
    // });
  },
  onShareAppMessage: function(res) {
      return shareIndex();
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #513CA0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.header {
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header-img{
  width: 300rpx;
  height: 170rpx;
}

.header-avatar{
  width: 300rpx;
  height: 300rpx;
  margin-top: 20rpx;
}

.header-nickname{
  margin-top: 20rpx;
}

.main {
  box-sizing: border-box;
  padding: 40rpx 0;
}

.main-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-item{
  margin-bottom: 32rpx;
}

.list-item:last-child{
  margin-bottom: 0;
}

.list-button {
  width: 580rpx;
  height: 180rpx;
  padding: 0;
  background-color: transparent;
}

.list-button::after{
  border: none;
}

.button-img-main{
  width: 580rpx;
  height: 220rpx;
}

.button-img-other{
  width: 580rpx;
  height: 180rpx;
}

</style>

