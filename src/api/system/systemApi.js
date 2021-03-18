import { get } from '../http'

export const systemApi = {
    getMenu: params => get('systemMenu/api/systemMenuShow', params), //登录接口
}