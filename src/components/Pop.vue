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
        name: '',
        desc: ''
      }
    }
  },
  methods: {
    handleConfirm(){
      this.$emit('confirm');
    },
    handleCancel(){
      this.$emit('cancel');
    }
  }
}
</script>

<style scoped>
.container{
  
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




