import {observer} from 'mobx-react-lite'
import {useState} from "react";
import store from "../store/store";

export const TasksItem = observer(({todolistId, taskId, title}) => {

    const {tasks} = store

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')


    const renderTitle = () => {

      const handleTitleChange = () => {
        // todolist.updateTodoList(id, newTitle)
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

    const handleRemoveTask = () => {
      tasks.removeTask(todolistId, taskId)
    }

    return (
      <div>
        <input type="checkbox"/>
        {renderTitle()}
        <button onClick={handleRemoveTask}>X</button>
      </div>
    )
  }
)

