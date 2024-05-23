import { defineStore } from 'pinia';
import { ref } from 'vue';

//用户模块 token
export const gameinfoStore = defineStore('gameinfo', () => {
        const gameinfo = ref(''); // 定义一个响应式数据，用于存储token
        const setgameinfo = (newgameinfo) => { // 定义一个函数，用于设置token的值
            gameinfo.value = newgameinfo;
        }
        const removegameinfo = () => {
            gameinfo.value = '';
        }

        //游戏列表
        const gamelist = ref(''); // 定义游戏列表
        const setgamelist = (newgamelist) => { 
            gamelist.value = newgamelist;
        }
        const removegamelist = () => {
            gamelist.value = '';
        }

        //开奖数据
        const period = ref('');
        const setperiod = (newperiod) => { 
            period.value = newperiod;
        }
        const removeperiod = () => {
            period.value = '';
        }

        //游戏数据








        return { gameinfo, setgameinfo, removegameinfo,gamelist,setgamelist,removegamelist,period,setperiod,removeperiod};
    },
    {
        persist: true // 持久化
    }
)