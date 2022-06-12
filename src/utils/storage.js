//用于封装所有的localstorage操作
const TOKEN_KEY = 'geek-wuyuwei-token'

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)
export const hasToken = () => !!getToken()
