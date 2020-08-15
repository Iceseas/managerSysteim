import {get, post, formData, baseURL } from './http'
export const UserApi = {
    login: params => post('ManagerCount/api/checkLogin', params), //登录接口
    logOut: params => post('ManagerCount/api/logOut', params), //登出接口
}

export const managerApi = {
    addUser: params => post('ManagerCount/api/addNewUser', params), //添加用户接口
    getList: params => post('ManagerCount/api/getUserList', params), //用户列表查询接口
}