import request from "../utils/request";

//投注接口
export const apitouzhu = (data) => {
    return request({
        method: 'POST',
        url:'/bet/bet',
        data,
        headers:{
            'content-type': 'application/json',
        }
    })
};