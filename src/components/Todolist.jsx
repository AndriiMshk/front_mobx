import {observer} from 'mobx-react-lite'
import {useEffect, useState} from "react";
import store from "../store/store";
import {useNavigate} from "react-router-dom";
import {TodolistItem} from "./TodolistItem";
import {toJS} from 'mobx'


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
      <>
        <input
          type="text"
          value={newTodolist}
          onChange={e => {
            setNewTodolist(e.target.value)
          }}/>
        <button
          onClick={() => {
            todolist.addTodolist(newTodolist)
            setNewTodolist('')
          }}>
          add
        </button>
      </>
    )
  }

  if (app.isLoading) return <div>Loading</div>

  return (
    <div>
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

