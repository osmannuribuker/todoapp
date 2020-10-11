import React from 'react'

import './styles/TodoItem.css'

const TodoItem = ({id, todo, onChange, onDelete, onUpdate }) => {
    return(
        <li className='item'>
            <label htmlFor={todo.id}>
                <input id={todo.id} name={todo.id} type='checkbox' value={todo.id} checked={todo.completed} onChange={(e) => onChange({...todo, completed: e.target.checked}, e) }/>
                <span>{todo.title}</span>
                <div className="actions">
                    <button onClick={() => onUpdate(todo.id)}>Update</button>
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                </div>
            </label>
        </li>
    )
}

export default TodoItem