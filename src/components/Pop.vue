<template>
 <modal title="创建作品" class="modal">
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
  data: function(){
    return {
      form: {
        name: '',
        desc: ''
      }
    }
  }
}
</script>

<style scoped>
.container{
  border-top: 1px solid #ccc;
}

.form-row{
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.form-label{

}

.form-input{
  
}
</style>




