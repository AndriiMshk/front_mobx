import {makeAutoObservable} from 'mobx'
import {authApi} from "../api/api";

class App {
  error = ''
  isLogin = false
  isLoading = false
  isInitialized = false
  user = {}

  constructor() {
    makeAutoObservable(this)
  }

  setUser(user) {
    this.user = user
  }

  setError(error) {
    this.error = error
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading
  }

  setIsLogin(isLogin) {
    this.isLogin = isLogin
  }

  setIsInitialized(isInitialized) {
    this.isInitialized = isInitialized
  }

  get getIsLogin() {
    this.setIsInitialized(true)
    authApi.authMe()
      .then((res) => {
        this.setUser(res.data.data)
        this.setIsLogin(res.data.resultCode === 0)
      })
      .catch((err) => {
        this.setError(err.message)
      })
      .finally(() => {
        this.setIsInitialized(false)
      })
  }

  setLogOut() {
    this.setIsLoading(true)
    authApi.logout()
      .then((res) => {
        this.setUser({})
        this.setIsLogin(!res.data.resultCode === 0)
      })
      .catch((err) => {
        this.setError(err.message)
      })
      .finally(() => {
        this.setIsLoading(false)
      })
  }

  setLogIn(params) {
    this.setIsLoading(true)
    authApi.login(params)
      .then((res) => {
        this.setIsLogin(true)
      })
      .catch((err) => {
        this.setError(err.message)
      })
      .finally(() => {
        this.setIsLoading(false)
      })
  }
}

export default new App()