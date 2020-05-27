import request from '../utils/request'

export function delFiles(username) {
    return request({
        url: '/delFiles',
        method: 'post',
        data: {
            username
        }
    })
}

export function fileInformation(username) {
    return request({
        url: '/fileInformation',
        method: 'post',
        data: {
            username
        }
    })
}