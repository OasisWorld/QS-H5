import request from "../utils/request";
//用户登录
export const apilogin = (data) => {
    return request({
        method: 'POST',
        url:'/account/login',
        data,
        headers:{
            'content-type': 'application/json',
        }
    })
};
//账号注册
export const apireg = (data) => {
    return request({
        method: 'POST',
        url:'/account/reg',
        data,
        headers:{
            'content-type': 'application/json',
        }
    })
};

//获取用户金额
export const apibalance = () => {
    return request({
        method: 'GET',
        url:'/account/balance',
        headers:{
            'content-type': 'application/json',
        }
    })
};