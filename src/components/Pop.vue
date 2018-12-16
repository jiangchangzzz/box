<template>
 <modal title="创建作品" :hidden="hidden" class="modal" @confirm="handleConfirm" @cancel="handleCancel">
   <div class="container">
     <div class="form-row">
       <label class="form-label">作品名称</label>
       <input class="form-input" v-model="form.name"/>
     </div>
     <div class="form-row">
       <label class="form-label">作品描述</label>
       <input class="form-input" v-model="form.desc"/>
     </div>
   </div>
 </modal>
</template>

<script>
import globalStore from '../stores/global-store.js';

export default {
  props: {
    hidden: {
      type: Boolean,
      default: true
    }
  },
  data: function(){
    return {
      form: {
        name: '神秘作品',
        desc: '这是一个神秘作品'
      }
    }
  },
  methods: {
    handleConfirm(){
      if(!this.validate()){
        return;
      }

      globalStore.commit('addWork', {
        work: {
          name: this.form.name,
          desc: this.form.desc,
          createAudioTrackInfo: globalStore.state.createAudioTrackInfo
        }
      }); 
      this.$emit('confirm');
    },
    handleCancel(){
      this.$emit('cancel');
    },
    validate(){
      if(!this.form.name.trim().length){
        wx.showToast({
          title: '请填写作品名称',
          icon: 'none'
        });
        return false;
      }

      return true;
    }
  }
}
</script>

<style scoped>
.container{
  padding: 20rpx 0;
}

.form-row{
  height: 80rpx;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #ccc;
}

.form-label{
  margin-right: 40rpx;
  font-size: 32rpx;
  color: #000;
}

.form-input{
  font-size: 32rpx;
}
</style>




