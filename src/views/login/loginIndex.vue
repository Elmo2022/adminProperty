<template>
  <div class="login">
    <div class="login-con">
      <ul class="menu-tab">
        <li
          v-for="v in MenuData"
          :class="{ current: v.current }"
          :key="v.type"
          @click="clickMenu(v)"
        >
          {{ v.txt }}
        </li>
      </ul>
      <!-- 表单部分 -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input
            v-model="ruleForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            minlength="6"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item prop="passwords" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input
            v-model="ruleForm.passwords"
            minlength="6"
            maxlength="15"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="btnbool"
            type="primary"
            class="login-btn block"
            @click="submitForm(ruleFormRef)"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
// 创建创建复杂数据类型

import { reactive, ref,watch } from "vue";


import * as ck from "../../util/verfifcation.js";

import link from "../../api/Link.js";
import apiUrl from "../../api/url.js";

import useMd5 from "../../hook/index.js"

import { alertEmits, ElMessage } from 'element-plus'

import {useRouter} from "vue-router"
let router=useRouter()

const MenuData = reactive([
  { txt: "登录", current: true, type: "login" },
  { txt: "注册", current: false, type: "register" },
]);

let model = ref("login");

console.log("login里面的111")

let clickMenu = (item) => {
  MenuData.forEach((elemt) => {
    elemt.current = false;
  });

  item.current = true;

  // 修改保存点击的状态
  model.value = item.type;
};

// elementplus表单部分

const ruleFormRef = ref();

const checkUser = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("邮箱不能为空！！"));
  } else if (ck.CkEmail(value)) {
    return callback(new Error("邮箱格式不正确！！"));
  } else {
    callback();
  }
};

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else if (ck.CkPass(value)) {
    callback(new Error("密码格式有误必须在6至15位字母+数字！！"));
  } else {
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  // 因为登录的时候没有重复密码的校验  所以在登录的时候取消重复密码的校验
  if (model.value === "login") {
    callback();
  }

  if (value === "") {
    callback(new Error("重复密码不能为空！"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码必须相同！"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  username: "",
  password: "",
  passwords: "",
  pass: "",
  checkPass: "",
  age: "",
});
//判断按钮能不能点击
let btnbool=ref(true)
watch(ruleForm,(newval,oldval)=>{
  
  if(model.value==="login"){
    if(newval.username!=""&&newval.password!=""){
      btnbool.value=false
    }else{
        btnbool.value=true
    }

  }else{
     if(newval.username!=""&&newval.password!=""&&newval.passwords!=""){
      btnbool.value=false
    }else{
        btnbool.value=true
    }
  }

})

// 这里就是设置 以哪种方式触发表单验证 失去焦点验证
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  passwords: [{ validator: validatePass2, trigger: "blur" }],
  username: [{ validator: checkUser, trigger: "blur" }],
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (model.value === "login") {
        console.log("登录");
  //console.log(useMd5(ruleForm.password))
        link(apiUrl.register,"get",{},{name:ruleForm.username,pwd:ruleForm.password}).then((ok)=>{
       //,"get",{},{name:ruleForm.username,pwd:}
       console.log(ok)
          if(ok.data.length!=0){
            console.log("登录成功")
         console.log(ok)
            router.push("/echarts")
          }else{
            console.log("登录失败")
            alert("邮箱或密码错误！")
          }
        })

      } else {
        let data={
          name:ruleForm.username,
          pwd:useMd5(ruleForm.password).value
        }

        link(apiUrl.register,"POST",data).then((ok) => {
          console.log(ok);
          if(Object.keys(ok.data).length!==0){
             ElMessage('注册成功')

             model.value="login"


             MenuData.forEach(v=>{
               v.current=false
             })
             MenuData[0].current=true;
          }else{
             ElMessage.error('注册失败')
          }
        });
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
// elementplus表单部分
</script>

<style lang="scss">
.login {
  background-color: #000066;
  height: 100%;
}
html,
body,
#app {
  height: 100%;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(255, 255, 255, 0.5);
  }
}

.demo-ruleForm {
  width: 30%;
  margin: 50px auto;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 20px;
  }
}
</style>