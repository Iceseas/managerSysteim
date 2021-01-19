import axios from 'axios'
// import QS from 'qs'


// let isFormData = false
// let isDownLoad = false

/**
 * 设置ip环境
 * 可以切换不同的请求ip
 */

axios.defaults.baseURL = 'http://localhost:3000/'

/**
 * 设置axios请求超时 10s
 */

axios.defaults.timeout = 5000

/**
 * 设置post默认的请求头
 */

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

function initParams(params) {
    if (params) {
        if (Object.keys(params).length > 0) {
            Object.keys(params).forEach(keyName => {
                if (params[keyName] && params[keyName] != '' && typeof params[keyName] == 'string') {
                    params[keyName] = params[keyName].replace(new RegExp('\'', 'g'), '\\\\\'')
                }
            })
        }
        return params
    } else {
        return {}
    }
}

/**
 * 设置请求拦截器
 */
axios.interceptors.request.use(
    config => {
        // 为请求对象，添加token验证的authorization字段
        // config.headers = {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //     // 'authorization': '获取token的方法'
        // }
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    });

/**
 * 设置响应拦截器
 */
axios.interceptors.response.use(
    response => {
        // 根据服务器返回的状态码进行判断吹离
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    }, error => {
        // 错误码
        if (error.response.code || error.response.msg) {
            switch (error.response.code) {
                // 401：未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登陆页操作
                case 401:
                    // 处理重定向到登录页的操作,必要时删除token
                    console.error('未登录,请登录')
                    break
                    // 403 token过期
                    // 登录过期对用户进行提示
                    // 清除本地token和清空vuex中token对象
                    // 跳转登录页面
                case 403:
                    // 处理重定向到登录页的操作,必要时删除token
                    console.error('登录过期,请重新登录')
                    break
                    // 404页面不存在或请求不存在
                case 404:
                    console.error('请求不存在')
                    break
                    // 其他错误  直接显示其他错误
                default:
                    console.error('error.data.message')
            }
            return Promise.reject('error.response.msg:', error.response.msg)
        }
        return Promise.reject(error.response);
    });

function initFormRequest() {
    // isFormData = true
    // isDownLoad = false
}

function initDownLoad() {
    // isFormData = false
    // isDownLoad = true
}


/**
 * get方法 对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err);
            })
    })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, (params))
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function formData(url, params) {
    initFormRequest()
    let formData = new FormData()
    params = initParams(params)
    for (let key in params) {
        formData.append(key, params[key])
    }
    return new Promise((resolve, reject) => {
        axios.post(url, formData).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function downLoad(url, params) {
    initDownLoad()
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: initParams(params)
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}