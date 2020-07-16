import axios from 'axios'
import { Loading, Message } from 'element-ui'

const loading = {
    loadingInstance: null, // Loading 实例
    // 打开加载
    open: function () {
        // 创建实例,而且会打开加载 窗口
        console.log(this.loadingInstance, 'loadingInstance')
        if(this.loadingInstance === null) {
            // 如果实例 为空，则创建
            console.log('创建加载实例。。。')
            this.loadingInstance = Loading.service({
                target: '.main',
                text: '拼命加载中...',
                background: 'rgba(0, 0, 0, 0.5)'
             })
        }
       
    },
    // 关闭加载
    close: function () {
        // 不为空时, 则关闭加载窗口
        if(this.loadingInstance !== null) {
            this.loadingInstance.close()
        }
        this.loadingInstance = null
        
    }
}

const request = axios.create({
    //请求超时5000毫秒
    baseURL: 'http://139.224.119.178:3000',
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
    loading.open()
    // 请求拦截
    return config
}, error => {
    // 出现异常
    loading.close()
    return Promise.reject(error);
})
// 响应拦截器
request.interceptors.response.use(response =>{
    loading.close()
    // response.data
    return response
}, error => {
    loading.close()
    return Promise.reject(error);
})

export default request