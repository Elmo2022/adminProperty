import axios from "axios"

let axiosurl="http://localhost:8888"



// 创建axios实例
const service=axios.create({
  baseURL:axiosurl
})
// 请求拦截和响应拦截
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 在接受到响应的时候进行一些操作
    // 在请求结果返回的时候 先不显示错误的信息,先对响应的状态吗进行一些处理  给用户一个错误的提示信息
    return response;
  }, function (error) {
      console.log("error",error.response.status)
      switch (error.response.status) {
          case 404:
              alert("当前路径有误！！")
              break;
          case 500:
              alert("服务器连接失败请稍后再试！！")
              break;
      
          default:
              alert("未知错误！！！")
              break;
      }
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default service