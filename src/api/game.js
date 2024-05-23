import request from "../utils/request";
//获取游戏列表
export const apigamelist = () => {
    return request({
        method: 'GET',
        url:'/game/gameInfo',
        headers:{
            'content-type': 'application/json',
        }
    })
};
//获取单个游戏数据
export const apigameinfodata = (gameid) => {
    return request({
        method: 'GET',
        url:'/game/'+gameid+'/game',
        headers:{
            'content-type': 'application/json',
        }
    })
};

//获取开奖列表数据
export const apiprizeOpens = (roomCode,lotType,size) => {
    return request({
        method: 'GET',
        url:'/API/Web/2/Lot/'+roomCode+'/'+lotType+'/Opens?size='+size,
        headers:{
            'content-type': 'application/json',
        }
    })
};

//获取开奖数据
export const apiprizeOpen = (roomCode,lotType,period) => {
    return request({
        method: 'GET',
        url:'/API/Web/2/Lot/'+roomCode+'/'+lotType+'/Open?period='+period,
        headers:{
            'content-type': 'application/json',
        }
    })
};

//获取最后一期开奖结果
export const apiprizeLatest = (roomCode,lotType) => {
    return request({
        method: 'GET',
        url:'/API/Web/2/Lot/'+roomCode+'/'+lotType+'/Latest',
        headers:{
            'content-type': 'application/json',
        }
    })
};

//获取最后一期开奖结果
export const apiprizeNext = (roomCode,lotType) => {
    return request({
        method: 'GET',
        url:'/API/Web/2/Lot/'+roomCode+'/'+lotType+'/Next',
        headers:{
            'content-type': 'application/json',
        }
    })
};

//获取聊天数据
export const apichats = (lotType) => {
    return request({
        method: 'GET',
        url:'/bet/'+lotType+'/chats',
        headers:{
            'content-type': 'application/json',
        }
    })
};