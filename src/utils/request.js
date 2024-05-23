import { useUserStore } from '@/stores'
import axios from 'axios'
import router from '@/router'
import {showFailToast } from 'vant';

//const baseURL = `${window.location.origin}/api`
const baseURL = 'http://houtai.lankou.xyz/mobile/'

const instance = axios.create({
  baseURL,
  timeout: 20000
})


// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.userData) {
      config.headers.Authorizationid = userStore.userData.id
      config.headers.Authorization = userStore.userData.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 添加响应拦截器


instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if(error.response.status == 400){
      return Promise.reject(error.response.data);
    }else if(error.response.status == 403){
      router.push('/login');
      showFailToast("授权失败 请重新登录");      
      return Promise.reject(error.response.data);
    }else{
      return Promise.reject(error);
    } 
  }
);











export default instance
export { baseURL }

