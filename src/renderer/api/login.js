import request from '../utils/request'

//登陆接口
export function Login(username, password) {
    return request({
        url: '/getToken',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

//获取用户信息接口
export function getUserInfo(token, username) {
    return request({
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        url: '/getUserInfo',
        method: 'post',
        data: {
            token
        }
    })
}

//用户注册接口
export function loginUser(username, password, name) {
    return request({
        url: '/loginUser',
        method: 'post',
        data: {
            name,
            username,
            password
        }
    })
}
