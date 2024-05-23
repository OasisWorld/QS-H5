import request from "../utils/request";

//获取广告信息
export const getBanner = () => {
    return request({
        method: 'GET',
        url:'/lobby/banner',
    })
};





