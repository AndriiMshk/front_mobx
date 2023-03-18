import {observer} from 'mobx-react-lite'
import {useState} from "react";
import store from "../store/store";


export const TasksItem = observer(({todolistId, taskId, title, status}) => {

    const {tasks} = store

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const renderTitle = () => {

      const handleTitleChange = () => {
        tasks.updateTask(todolistId, taskId, {title: newTitle, status})
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

    const handleChangeCheckbox = (e) => {
      const status = e.target.checked ? 1 : 0
      tasks.updateTask(todolistId, taskId, {status, title})
    }

    const handleRemoveTask = () => {
      tasks.removeTask(todolistId, taskId)
    }

    return (
      <div>
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

