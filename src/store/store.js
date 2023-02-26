import {makeAutoObservable} from 'mobx'
import counter from "./counter";
import todolist from "./todolist";
import app from "./app";

class Store {
    count = counter
    todolist = todolist
    app = app

    constructor() {
        makeAutoObservable(this)
    }
}

export default new Store()