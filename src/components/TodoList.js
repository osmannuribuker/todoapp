import React from 'react'

import './styles/TodoList.css'

const TodoList= ({children}) => {
    return(
        <ul className='list'>
            {children}
        </ul>
    )
}

export default TodoList