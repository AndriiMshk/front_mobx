import {observer} from 'mobx-react-lite'
import {useState} from "react";
import store from "../../store/store";
import style from './taskItem.module.scss'


export const TasksItem = observer(({todolistId, taskId, title, status}) => {

    const {tasks} = store

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const renderTitle = () => {

      const handleTitleChange = () => {
        if (!newTitle.length || newTitle.length > 15) {
          setEditMode(false)
          setNewTitle(title)
          return
        }
        tasks.updateTask(todolistId, taskId, {title: newTitle, status})
        setEditMode(false)
      }

      if (editMode) {
        return (
          <input
            value={newTitle}
            className={style.title}
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
        <div
          className={style.title}
          onDoubleClick={() => {
            setEditMode(true)
          }}>
          {title}
        </div>
      )
    }

    const handleChangeCheckbox = (e) => {
      const status = e.target.checked ? 1 : 0
      tasks.updateTask(todolistId, taskId, {status, title})
    }

    const handleRemoveTask = () => {
      tasks.removeTask(todolistId, taskId)
    }

    return (
      <div className={style.main}>
        <input
          checked={status === 1}
          type="checkbox"
          onChange={handleChangeCheckbox}
        />
        {renderTitle()}
        <button onClick={handleRemoveTask}>X</button>
      </div>
    )
  }
)

