<template>
  <div class="container">
    <div class="header">
      <h1 class="header-title">这里是标题</h1>
      <!-- <template v-if="userInfo">
        <img class="header-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        <p class="header-nickname">{{userInfo.nickName}}</p>
      </template> -->
      
    </div>
    <div class="main">
      <ul class="main-list">
        <li>
          <a class="main-button" href="/pages/create/main">开始创作</a>
        </li>
        <li>
          <a class="main-button" href="/pages/work/main">我的作品</a>
        </li>
        <li>
          <a class="main-button" href="/pages/sound/main">解锁更多音效</a>
        </li>
        <li>
          <button class="main-button" open-type="share">召唤好友加入</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { shareIndex } from "../../utils/index";
import globalStore from '../../stores/global-store.js';

export default {
  computed: {
    userInfo(){
      return globalStore.state.userInfo;
    }
  },
  onShareAppMessage: function(res) {
      return shareIndex();
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #000;
}

.header {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20%;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
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
  height: 80%;
  padding: 80rpx 0;
}

.main-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.main-button {
  width: 560rpx;
  height: 160rpx;
  line-height: 160rpx;
  text-align: center;
  background-color: #fff;
  border-radius: 40rpx;
  font-size: 36rpx;
  font-weight: bold;
}
</style>

