import request from '../utils/request'

export function checkPwd(username, password) {
    return request({
        url: '/checkPwd',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function updatePwd(username, password) {
    return request({
        url: '/updatePwd',
        method: 'post',
        data: {
            username,
            password
        }
    })
}
