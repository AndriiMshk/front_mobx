import {makeAutoObservable} from 'mobx'
import {todoListsApi} from "../api/api";
import app from "./app";


class Tasks {
  tasks = {}

  constructor() {
    makeAutoObservable(this)
  }

  setTasks(todolistId, tasks) {
    this.tasks = {...this.tasks, [todolistId]: tasks}
  }

  getTasks(todolistId) {
    todoListsApi.getTasks(todolistId)
      .then((res) => {
        this.setTasks(todolistId, res.data.items)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  addTask(todoListId, title) {
    app.setIsLoading(true)
    todoListsApi.postTask(todoListId, {title})
      .then((res) => {
        this.setTasks(todoListId, [...this.tasks[todoListId], res.data.data.item])
      })
      .catch((err) => {
        console.log(err.message)
      })
      .finally(() => {
        app.setIsLoading(false)
      })
  }

  removeTask(todolistId, taskId) {
    app.setIsLoading(true)
    todoListsApi.deleteTask(todolistId, taskId)
      .then(() => {
        this.setTasks(todolistId, this.tasks[todolistId].filter(el => el.id !== taskId))
      })
      .catch((err) => {
        console.log(err.message)
      })
      .finally(() => {
        app.setIsLoading(false)
      })
  }

  updateTask(todolistId, taskId, payload) {
    app.setIsLoading(true)
    todoListsApi.updateTask(todolistId, taskId, payload)
      .then(() => {
        this.setTasks(todolistId, this.tasks[todolistId].map(el => el.id === taskId ? {...el, ...payload} : el))
      })
      .catch((err) => {
        console.log(err.message)
      })
      .finally(() => {
        app.setIsLoading(false)
      })
  }

  get taskCountGetter() {
    return Object.entries(this.tasks).map(el => ({id: el[0], amount: el[1].length}))
  }

}

export default new Tasks()