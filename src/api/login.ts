import { request } from "@/utils/service"

interface ILoginData {
  mobile: string
  password: string
  tmlType: number
}

/** 登录并返回 Token */
export function login(data: ILoginData) {
  return request({
    url: "/api/user/login",
    method: "post",
    data
  })
}
/** 获取用户详情 */
export function getUserInfo(userId: string) {
  return request({
    url: `/api/user/${userId}`,
    method: "get"
  })
}
