import {observer} from 'mobx-react-lite'
import {useEffect, useState} from "react";
import store from "../store/store";
import {TasksItem} from "./TasksItem";

export const TodolistItem = observer(({id, title}) => {

    const {todolist, tasks, app} = store

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newTaskTitle, setNewTaskTitle] = useState('')

    useEffect(() => {
      tasks.getTasks(id)
    }, [])

    const renderTitle = () => {

      const handleTitleChange = () => {
        todolist.updateTodoList(id, newTitle)
        setEditMode(false)
      }

      if (editMode) {
        return (
          <input
            type="text"
            autoFocus
            onChange={e => {
              setNewTitle(e.target.value)
            }}
            onBlur={handleTitleChange}
          />
        )
      }
      return (
        <span
          onDoubleClick={() => {
            setEditMode(true)
          }}>
          {title}
        </span>
      )
    }

    const renderTasks = () => {
      if (!tasks.tasks[id]) {
        return (
          <div>Empty</div>
        )
      }
      return (
        tasks.tasks[id].map(({id, title}) => <TasksItem key={id} id={id} title={title}/>))
    }

    const renderNewTaskPanel = () => {
      return (
        <>
          <input
            type="text"
            value={newTaskTitle}
            onChange={e => {
              setNewTaskTitle(e.target.value)
            }}/>
          <button onClick={() => {
            tasks.addTask(id, newTaskTitle)
            setNewTaskTitle('')
          }}>add
          </button>
        </>
      )
    }

    if (app.isLoading || !tasks.tasks[id]) return <div>Loading...</div>

    return (
      <div>
        <div>
          {renderTitle()}
          <button
            onClick={() => {
              todolist.removeTodolist(id)
            }}
          >X
          </button>
        </div>
        =====
        {renderNewTaskPanel()}
        =====
        {renderTasks()}
      </div>
    )
  }
)

