import React, { useEffect, useRef } from 'react'

import './styles/TodoForm.css'

const TodoForm = ({onSubmit, values, setValues, type, initialValues}) => {
    const titleRef = useRef(null)
    const descRef = useRef(null)
    
    useEffect(() => {
        if(initialValues.title){
            titleRef.current.value=initialValues.title
            descRef.current.value=initialValues.description
        }
        if(type === 'NEW'){
            titleRef.current.value = null
            descRef.current.value = null
        }
    }, [initialValues, type])
    
    return(
    <form className='form' onSubmit={type === 'UPDATE' ? (e) => onSubmit({...initialValues,...values}, e) : onSubmit}>
        <label htmlFor="title">
            <span>Task</span>
            <input
                ref={titleRef}
                id="title"
                name="title"
                placeholder="Enter a new to do!"
                onChange={(event) => setValues({...values,title:event.target.value})}>
            </input>
        </label>
        <label htmlFor="description">
            <span>Description</span>
            <input
                ref={descRef}
                id="description"
                name="description"
                placeholder="Enter a description for to do"
                onChange={(event) => setValues({...values,description:event.target.value})}>
            </input>
        </label>
        { type === 'NEW' && (
            <button type="submit">Add To Do</button>
        )}
        { type === 'UPDATE' && (
            <button type="submit">Update To Do</button>
        )}
    </form>
    )
}

export default TodoForm