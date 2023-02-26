import {observer} from 'mobx-react-lite'
import {toJS} from 'mobx'
import {useEffect, useState} from "react";
import store from "../store/store";
import {useNavigate} from "react-router-dom";

export const Todolist = observer(() => {

    const navigate = useNavigate()
    const {todolist, app} = store

    const [newTodolist, setNewTodolist] = useState('')

    useEffect(() => {
        if (!app.isLogin) {
            navigate('/login')
        }
    }, [app.isLogin])

    useEffect(() => {
        todolist.getTodolists()
    }, [])

    if (app.isLoading) return <div>Loading</div>

    return (
        <div>
            <input type="text" value={newTodolist} onChange={e => {
                setNewTodolist(e.target.value)
            }}/>
            <button onClick={() => {
                todolist.addTodolist(newTodolist)
                setNewTodolist('')
            }}>add
            </button>
            <div>-------</div>
            {todolist.todolists.map(({id, title}) => (
                <div key={id}>
                    <p>{title}</p>
                    <button
                    onClick={() => {
                        todolist.removeTodolist(id)
                    }}
                    >X</button>
                </div>
            ))}
            <div>-------</div>
            <div>{todolist.taskCountGetter}</div>
        </div>
    );
})

