import {makeAutoObservable} from 'mobx'
import {todoListsApi} from "../api/api";
import app from "./app";


class Todolist {
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
        this.tasks = {...this.tasks, [todoListId]: [...this.tasks[todoListId], res.data.data.item]}
      })
      .catch((err) => {
        console.log(err.message)
      })
      .finally(() => {
        app.setIsLoading(false)
      })
  }

}

export default new Todolist()