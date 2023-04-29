<template>
  <div>
    <el-table :data="tableData.listdata.slice((currentp-1)*pageSize4,currentp*pageSize4)" style="width: 100%">
      <el-table-column prop="id" label="编号"  />
      <el-table-column prop="title" label="楼盘名称"  />
      <el-table-column prop="type" label="房源类型" />
      <el-table-column prop="num" label="门牌号" />
      <el-table-column prop="hometype" label="房源户型" />
      <el-table-column prop="name" label="户主" />
      <el-table-column>
          <template #header>
              <el-input v-model="search" size="small" placeholder="请输入查询内容" @blur="searchLink"/>
          </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:currentPage="currentp"
      v-model:page-size="pageSize4"
 
        :current-page="currentp"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.listdata.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>

import { ref,onMounted,reactive} from 'vue'
import link from "../../../api/Link.js"
import apiUrl from "../../../api/url.js"

let search=ref("")
const currentp = ref(1)

const pageSize4 = ref(15)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
  pageSize4.value=val
}
const handleCurrentChange = (val) => {
 currentp.value=val
}

let tableData=reactive({
    listdata:[]
})

let searchLink=()=>{
     link(apiUrl.userlist,"get",{},{name:search.value}).then((ok)=>{
        console.log(ok)
        tableData.listdata=ok.data
    })
}

onMounted(()=>{
    link(apiUrl.userlist).then((ok)=>{
        console.log(ok)
        tableData.listdata=ok.data
    })
})


</script>


<style>
</style>