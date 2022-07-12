import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { getToken, removeToken, setToken, getUserId, setUserId, removeUserId } from "@/utils/cookies"
import router, { resetRouter } from "@/router"
import { login, getUserInfo } from "@/api/login"
import { RouteRecordRaw } from "vue-router"

interface IUserState {
  token: string
  roles: string[]
  userId: string
  permissionArr: string[]
}

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => {
    return {
      token: getToken() || "",
      roles: [],
      userId: getUserId() || "",
      permissionArr: []
    }
  },
  actions: {
    /** 设置角色数组 */
    setRoles(roles: string[]) {
      this.roles = roles
    },
    /** 登录 */
    login(userInfo: { username: string; password: string }) {
      return new Promise((resolve, reject) => {
        login({
          mobile: userInfo.username.trim(),
          password: userInfo.password,
          tmlType: 1
        })
          .then((res: any) => {
            setToken(res.data.token)
            setUserId(res.data.userId)
            this.token = res.data.token
            this.userId = res.data.userId
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /** 获取用户详情 */
    getInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo(this.userId)
          .then((res: any) => {
            // this.roles = res.data.user.roles
            res.data.authzPermissionTOList.forEach((e: any) => {
              e.authzPermissionTOList.forEach((e2: any) => {
                e2.authzPermissionTOList.forEach((e3: any) => {
                  if (e3.isSelected == 1) {
                    // permissionArr.push(e.id)
                    this.permissionArr.push(e2.id + "")
                    this.permissionArr.push(e3.id + "")
                  }
                })
              })
            })
            this.roles = [...new Set(this.permissionArr)]
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /** 切换角色 */
    async changeRoles(role: string) {
      console.log(role)
      // const token = this.token
      // this.token = token
      // setToken(token)
      // await this.getInfo()
      // const permissionStore = usePermissionStore()
      // permissionStore.setRoutes(this.roles)
      // resetRouter()
      // permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      //   router.addRoute(item)
      // })
    },
    /** 登出 */
    logout() {
      removeToken()
      removeUserId()
      this.token = ""
      this.roles = []
      this.userId = ""
      resetRouter()
    },
    /** 重置 Token */
    resetToken() {
      removeToken()
      removeUserId()
      this.token = ""
      this.roles = []
      this.userId = ""
    }
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
