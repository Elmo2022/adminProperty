<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    :collapse="!$store.state.HomeModule.navBool"
    @open="handleOpen"
    @close="handleClose"
    router
  >
  
  <template v-for="v in router.options.routes[1].children" :key="v.path">

<!-- 带下拉的导航 -->
<el-sub-menu :index="v.path" v-if="v.children">
<template #title>
  <el-icon><component :is="v.meta.icon"></component></el-icon>
  <span>{{v.meta.title}}</span>
</template>
<el-menu-item-group v-for="val in v.children" :key="val.path">
  <el-menu-item :index="val.path">{{val.meta.title}}</el-menu-item>

</el-menu-item-group>
</el-sub-menu>

<!-- 不带下拉的导航 -->
<el-menu-item  :index="v.path" v-else>
<el-icon><component :is="v.meta.icon"></component></el-icon>
<span>{{v.meta.title}}</span>
</el-menu-item>

</template>



  </el-menu>
</template>

<script setup>
import {useStore} from "vuex"
import {onMounted} from "vue"
import {useRouter} from "vue-router"
import {ref} from "vue"
import {
  Document,Menu as IconMenu,Location,Setting,
    TrendCharts,List,Grid,
} from '@element-plus/icons-vue'
let icon=ref("TrendCharts")
let store = useStore();
console.log(1111)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
let router=useRouter()

onMounted(()=>{
    console.log("获取路由规则",router.options.routes[1].children)
})


</script>

<style>
</style>