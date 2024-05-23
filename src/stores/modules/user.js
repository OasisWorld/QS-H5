import { defineStore } from 'pinia';
import { ref } from 'vue';

//用户模块 token
export const useUserStore = defineStore('user', () => {
    const userData = ref(''); // 定义一个响应式数据，用于存储token
    const setuserData = (newuserData) => { // 定义一个函数，用于设置token的值
        userData.value = newuserData;
    }
    const removeuserData = () => {
        userData.value = '';
    }







    return { userData, setuserData, removeuserData};
    },
    {
        persist: true // 持久化
    }
)