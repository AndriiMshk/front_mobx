import {makeAutoObservable} from 'mobx'
import counter from "./counter";
import todolist from "./todolist";
import app from "./app";
import tasks from "./tasks";

class Store {
    count = counter
    todolist = todolist
    tasks = tasks
    app = app

    constructor() {
        makeAutoObservable(this)
    }
}

export default new Store()