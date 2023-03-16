import {makeAutoObservable} from 'mobx'
import todolist from "./todolist";
import app from "./app";
import tasks from "./tasks";

class Store {
  todolist = todolist
  tasks = tasks
  app = app

  constructor() {
    makeAutoObservable(this)
  }
}

export default new Store()