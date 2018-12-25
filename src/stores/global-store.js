import Vue from 'vue';
import Vuex from 'vuex';
import audioConfig from '../pages/create/audioConfig';
import works from '../data/works';
import { handleError } from '../utils/index';

Vue.use(Vuex);

const baseUrl = process.env.API_BASE_URL;

export default new Vuex.Store({
  state: {
    openid: '',
    userInfo: null,
    createAudioTypeInfo: [], //音轨类型
    createAudioTrackInfo: {}, //音轨，二维数组
    sounds: audioConfig,
    works: works,
    audios: {}
  },
  mutations: {
    updateOpenid(state, payload){
      state.openid = payload.openid;
    },
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
    },
    updateCreateInfo(state, payload){
      const track = payload.createAudioTrackInfo;
      let res = [];
      Object.keys(track).forEach(key => {
        const item = track[key];
        if(item.list.length){
          res.push(item.list[0]);
        }
      });
      state.createAudioTypeInfo = res;
      state.createAudioTrackInfo = payload.createAudioTrackInfo;
    }
  },
  actions: {
    // 获取用户openid和用户信息
    getUserInfo(context) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: `${baseUrl}/login`,
            data: {
              code: res.code
            },
            success: res => {
              const body = res.data;
              if(body.code === 0){
                console.log(body.openid);
                context.commit('updateOpenid', {
                  openid: body.data.openid
                });
              } else {
                handleError(body.message);
              }
            },
            fail: res => {
              handleError();
            }
          });
        },
        fail: res => {
          handleError();
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
