import {makeAutoObservable} from 'mobx'

class Count {
    count = 0

    constructor() {
        makeAutoObservable(this)
    }

    add() {
        this.count = ++this.count
    }

    remove() {
        this.count = --this.count
    }

    reset() {
        this.count = 0
    }

}

export default new Count()