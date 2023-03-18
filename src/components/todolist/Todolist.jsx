import {observer} from 'mobx-react-lite'
import {useEffect, useState} from "react";
import store from "../../store/store";
import {useNavigate} from "react-router-dom";
import {TodolistItem} from "../todolistItem/TodolistItem";
import {toJS} from 'mobx'
import style from './todolist.module.scss'


export const Todolist = observer(() => {

  const navigate = useNavigate()
  const {todolist, app} = store

  const [newTodolist, setNewTodolist] = useState('')
  const [hasFetchedTodolists, setHasFetchedTodolists] = useState(false);

  useEffect(() => {
    if (!app.isLogin) {
      navigate('/login')
    }
  }, [app.isLogin])

  useEffect(() => {
    if (!toJS(todolist.todolists).length && !hasFetchedTodolists) {
      todolist.getTodolists()
      setHasFetchedTodolists(true);
    }
  }, [hasFetchedTodolists]);

  if (app.isLoading) return <div>Loading...</div>

  const renderNewTodolistPanel = () => {
    return (
      <div className={style.addPanel}>
        <div>
          <div>new todolist</div>
          <input
            type="text"
            value={newTodolist}
            onChange={e => {
              setNewTodolist(e.target.value)
            }}/>
        </div>
        <button
          onClick={() => {
            todolist.addTodolist(newTodolist)
            setNewTodolist('')
          }}>
          add
        </button>
      </div>
    )
  }

  if (app.isLoading) return <div>Loading</div>

  return (
    <div className={style.main}>
      {renderNewTodolistPanel()}
      {todolist.todolists.map(({id, title}) =>
        <TodolistItem
          key={id}
          title={title}
          id={id}
        />)}
    </div>
  );
})

