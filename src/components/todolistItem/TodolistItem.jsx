import {observer} from 'mobx-react-lite'
import {useEffect, useState} from "react";
import store from "../../store/store";
import {TasksItem} from "../tasksItem/TasksItem";
import style from './todolistItem.module.scss'


export const TodolistItem = observer(({id, title}) => {

    const {todolist, tasks, app} = store

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [hasFetchedTasks, setHasFetchedTasks] = useState(false);

    useEffect(() => {
      if (!tasks.tasks[id] && !hasFetchedTasks) {
        tasks.getTasks(id);
        setHasFetchedTasks(true);
      }
    }, [id, tasks, hasFetchedTasks]);

    const renderTitle = () => {

      const handleTitleChange = () => {
        if (!newTitle || newTitle.length > 15) {
          setEditMode(false)
          setNewTitle(title)
          return
        }
        if (title !== newTitle) {
          todolist.updateTodoList(id, newTitle)
        }
        setEditMode(false)
      }

      if (editMode) {
        return (
          <input
            value={newTitle}
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
        <div className={style.taskList}>
          {tasks.tasks[id].map(({id: taskId, title, status}) =>
            <TasksItem
              key={taskId}
              taskId={taskId}
              todolistId={id}
              title={title}
              status={status}
            />)}
        </div>
      )
    }

    const renderNewTaskPanel = () => {
      return (
        <div className={style.addPanel}>
          <div className={style.input}>
            <div className={style.label}>new task</div>
            <input
              type="text"
              value={newTaskTitle}
              onChange={e => {
                setNewTaskTitle(e.target.value)
              }}/>
          </div>
          <button onClick={() => {
            tasks.addTask(id, newTaskTitle)
            setNewTaskTitle('')
          }}>add
          </button>
        </div>
      )
    }

    const handleRemove = () => {
      todolist.removeTodolist(id)
    }

    if (app.isLoading || !tasks.tasks[id]) return <div>Loading...</div>

    return (
      <div className={style.main}>
        <div className={style.title}>
          {renderTitle()}
          <button onClick={handleRemove}>X</button>
        </div>
        {renderNewTaskPanel()}
        {renderTasks()}
        <div className={style.taskAmount}>
          <p>Tasks amount: </p>
          <p>{tasks.taskCountGetter.find(el => el.id === id).amount}</p>
        </div>
      </div>
    )
  }
)

