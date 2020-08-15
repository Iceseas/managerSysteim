import {get, post, formData, baseURL } from './http'
export const UserApi = {
    login: params => post('ManagerCount/api/checkLogin', params), //登录接口
    logOut: params => post('ManagerCount/api/logOut', params), //登出接口
}

export const managerApi = {
    addUser: params => post('ManagerCount/api/addNewUser', params), //添加用户接口
    getList: params => post('ManagerCount/api/getUserList', params), //用户列表查询接口
}

export const questionApi = {
    addDecideData: params => post('addQuestion/api/addDecideData', params), //添加判断题接口
    addSingleData: params => post('addQuestion/api/addSingleData', params), //添加单选题接口
    addVacancyData: params => post('addQuestion/api/addVacancyData', params), //添加填空题接口
    getDecideList: params => post('getQuestion/api/getDecideList', params), //用户列表查询接口
    getSingleList: params => post('getQuestion/api/getSingleList', params), //用户列表查询接口
    getVacancyList: params => post('getQuestion/api/getVacancyList', params), //用户列表查询接口
}