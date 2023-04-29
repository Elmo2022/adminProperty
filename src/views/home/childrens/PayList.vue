<template>
  <el-button type="success" text @click="dialogVisible = true"
    >点击生成缴费二维码</el-button
  >
 
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
     <qrcode-vue :value="qrCode123" size:300  ></qrcode-vue>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
 
<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import QrcodeVue from 'qrcode.vue'
 
const dialogVisible = ref(false)
const qrCode123 = ref("我是二维码信息")
 
const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>