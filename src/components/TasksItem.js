import {observer} from 'mobx-react-lite'
import {useEffect, useState} from "react";
import store from "../store/store";

export const TasksItem = observer(({id, title}) => {

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


    return (
      <div>
        <input type="checkbox"/>
        {renderTitle()}
        <button
          onClick={() => {
            console.log('remove')
            // tasks.removeTodolist(id)
          }}
        >X
        </button>
      </div>
    )
  }
)

