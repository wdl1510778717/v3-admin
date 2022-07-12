/** 统一处理 Cookie */

import Keys from "@/constant/key"
import Cookies from "js-cookie"

export const getSidebarStatus = () => Cookies.get(Keys.sidebarStatus)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(Keys.sidebarStatus, sidebarStatus)

export const getToken = () => Cookies.get(Keys.token)
export const setToken = (token: string) => Cookies.set(Keys.token, token)
export const removeToken = () => Cookies.remove(Keys.token)

export const getUserId = () => Cookies.get(Keys.userId)
export const setUserId = (userId: string) => Cookies.set(Keys.userId, userId)
export const removeUserId = () => Cookies.remove(Keys.userId)

export const getActiveThemeName = () => Cookies.get(Keys.activeThemeName)
export const setActiveThemeName = (themeName: string) => {
  Cookies.set(Keys.activeThemeName, themeName)
}
