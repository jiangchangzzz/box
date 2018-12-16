import Vue from 'vue';
import Vuex from 'vuex';
import audioConfig from '../pages/create/audioConfig';
import works from '../data/works';

Vue.use(Vuex);

const baseUrl = process.env.API_BASE_URL;

export default new Vuex.Store({
  state: {
    userInfo: null,
    createAudioTypeInfo: [], //音轨类型
    createAudioTrackInfo: {}, //音轨，二维数组
    sounds: audioConfig,
    works: works,
    audios: {}
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload.userInfo;
    },
    addCreateAudioType(state, payload) {
      //let typeInfo = state.createAudioTypeInfo.slice(0);
      //typeInfo.push(payload.newAudio);
      //state.createAudioTypeInfo = typeInfo;
      state.createAudioTypeInfo.push(payload.newAudio);
      state.createAudioTrackInfo = {...state.createAudioTrackInfo, [payload.newAudio.id]: {
        id: payload.newAudio.id,
        list: new Array(payload.newAudio)
      }};
      console.log("state: ",state.createAudioTypeInfo)
      // state.createAudioTrackInfo[payload.newAudio.id].push(payload.newAudio);
    },
    deleteCreateAudioType(state, payload){
      state.createAudioTypeInfo.splice(payload.index,1);
    },
    addCreateAudioTrack(state, payload){
      state.createAudioTrackInfo[payload.id].list.push(payload.newAudio);
    },
    updateCreateAudioTrack(state, payload){
      state.createAudioTrackInfo[payload.id].list.splice(payload.index,1,payload.newAudio)
    },
    deleteCreateAudioTrack(state, payload){
      state.createAudioTrackInfo = payload.trackInfo;
    },
    addAudios(state, payload){
      state.audios = {...state.audios, [payload.id]: payload.newAudio}
    },
    addWork(state, payload){
      state.works.push(payload.work);
    }
  },
  actions: {
    getUserInfo(context) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // wx.request({
          //   url: `${baseUrl}/login`,
          //   data: {
          //     code: res.code
          //   },
          //   success: res => {
          //     if(res.data.code === 0){
          //       console.log(res.data.data);
          //     } else {
          //       console.log(res.data);
          //     }
          //   }
          // });
        }
      });

      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                context.commit('setUserInfo', {userInfo: res.userInfo});

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                // if (this.userInfoReadyCallback) {
                //   this.userInfoReadyCallback(res)
                // }
              }
            })
          }
        }
      })
    },
    onaddCreateAudioTrack(context, payload){
      context.commit("addCreateAudioTrack", payload);
    }
  }
});
