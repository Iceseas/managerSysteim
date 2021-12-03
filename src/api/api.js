import { post } from './http'
export const UserApi = {
    login: params => post('ManagerCount/api/checkLogin', params), //登录接口
    checkdiscount: params => post('ManagerCount/api/checkDiscount', params), //检查用户名
    register: params => post('ManagerCount/api/regManagerUser', params), //注册接口
    logOut: params => post('ManagerCount/api/logOut', params), //登出接口
}

export const managerApi = {
    addUser: params => post('ManagerCount/api/addNewUser', params), //添加用户接口
    updateUserData: params => post('ManagerCount/api/userDataUpdate', params), //修改用户信息
    // 删除
    delData: params => post('ManagerCount/api/DeleteUserData', params), //删除接口
    getUserData: params => post('ManagerCount/api/getUserData', params), //查询单个数据接口
    getList: params => post('ManagerCount/api/getUserList', params), //用户列表查询接口
}

export const userPowerApi = {
    showData: params => post('userPower/api/userMenuPowerShow', params), //查询用户的菜单权限配置情况
    saveData: params => post('userPower/api/userMenuPowerControl', params), //保存用户的菜单配置
    addData: params => post('userPower/api/userBaseMenuPowerAdd', params) // 注册时增加基本菜单配置
}

export const questionApi = {
    // 添加
    addDecideData: params => post('addQuestion/api/addDecideData', params), //添加判断题接口
    addSingleData: params => post('addQuestion/api/addSingleData', params), //添加单选题接口
    addVacancyData: params => post('addQuestion/api/addVacancyData', params), //添加填空题接口
    addSubjectiveData: params => post('addQuestion/api/addSubjectiveData', params), //添加主观题接口
    // 获取
    getDecideList: params => post('getQuestion/api/getDecideList', params), //用户列表查询接口
    getSingleList: params => post('getQuestion/api/getSingleList', params), //用户列表查询接口
    getVacancyList: params => post('getQuestion/api/getVacancyList', params), //用户列表查询接口
    getSubjectiveList: params => post('getQuestion/api/getSubjectiveList', params), //用户列表查询接口
    // 删除
    delData: params => post('deleteQuestion/api/DeleteQuestionData', params), //删除接口
    // 修改
    updateDecideList: params => post('updateQuestion/api/decideUpdate', params), //用户列表查询接口
    updateSingleList: params => post('updateQuestion/api/singleUpdate', params), //用户列表查询接口
    updateVacancyList: params => post('updateQuestion/api/vacancyUpdate', params), //用户列表查询接口
    updateSubjectiveList: params => post('updateQuestion/api/subjectiveUpdate', params), //用户列表查询接口
    // 查询
    getDecideData: params => post('getQuestion/api/getDecideData', params), //查询单个数据接口
    getSingleData: params => post('getQuestion/api/getSingleData', params), //查询单个数据接口
    getVacancyData: params => post('getQuestion/api/getVacancyData', params), //查询单个数据接口
    getSubjectiveData: params => post('getQuestion/api/getSubjectiveData', params), //查询单个数据接口
}