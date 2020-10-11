import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';

const App = () => {
    const [todos, setTodos] = useState([])
    const [values, setValues] = useState([])
    const [type, setType] = useState('NEW')
    const [selectedTodo, setSelectedTodo] = useState({})
    
    const getTodos = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos/`)
        if(response) {
            setTodos(response.data)
        }
    }
    
    const getTodo = (id) => {
        axios.get(`${process.env.REACT_APP_API_URL}/todo/${id}`)
        .then((response) => {
            setType('UPDATE')
            setSelectedTodo(response.data)
        })
    }

    const handleSubmit = (e) => {
        axios.post(`${process.env.REACT_APP_API_URL}/todo/`, values)
        .then(() => getTodos())
        e.preventDefault();
    }
    
    const handleUpdate = (payload, e) => {
        axios.put(`${process.env.REACT_APP_API_URL}/todo/${payload.id}`, payload)
        .then(() => getTodos())
        e.preventDefault()
    }
    
    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/todo/${id}`)
        .then(() => getTodos())
    }
    
    useEffect(() => {
        getTodos()
    }, [])

    return(
        <div className="container">
            <h1>Todo</h1>
            {type === 'UPDATE' && (
                <button className="new-button" onClick={() => {setType('NEW')}}>New</button>
            )}
            <TodoForm 
                onSubmit={type === 'UPDATE' ? handleUpdate : handleSubmit}
                values={values}
                setValues={setValues}
                type={type}
                initialValues={selectedTodo}
            />
            <div className="todos">
                <TodoList>
                    {todos.map((todo) => <TodoItem key={todo.id} todo={todo} onChange={handleUpdate} onDelete={handleDelete} onUpdate={getTodo} />)}
                </TodoList>
            </div>
        </div>
    )
}

export default App
