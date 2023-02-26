import {makeAutoObservable} from 'mobx'
import {todoListsApi} from "../api/api";
import app from "./app";


class Todolist {
    todolists = []

    constructor() {
        makeAutoObservable(this)
    }

    setTodolists(todolists) {
        this.todolists = todolists
    }

    getTodolists() {
        todoListsApi.getTodolists()
            .then((res) => {
                this.setTodolists(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    removeTodolist(id) {
        app.setIsLoading(true)
        todoListsApi.deleteTodoList(id)
            .then((res) => {
                this.setTodolists(this.todolists.filter(el => el.id !== id))
            })
            .catch((err) => {
                console.log(err.message)
            })
            .finally(() => {
                app.setIsLoading(false)
            })
    }

    addTodolist(title) {
        app.setIsLoading(true)
        todoListsApi.postTodoList({title})
            .then((res) => {
                this.todolists.unshift(res.data.data.item)
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