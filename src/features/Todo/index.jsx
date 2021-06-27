import React, { useEffect, useState } from 'react';
import todoApi from '../../api/todoApi';
import TodoCounter from './components/TodoCounter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import "./styles.scss";

Todo.propTypes = {};

function Todo(props) {
    const [todos, setTodos] = useState([])

    //fetch api by axios
    useEffect(() => {
        //this side effect is executed once after rendering
        const fetchTodos = async () => {
            const todoData = await todoApi.getAll()

            setTodos(todoData)
        }

        fetchTodos()
    }, [])

    //post input form value to api
    const handleFormSubmit = (formValues) => {

        const postTodos = async () => {
            await todoApi.add(formValues)
            const todoData = await todoApi.getAll()

            setTodos(todoData)
        }

        postTodos()
    }

    //rendering
    return (
        <div className="todo-app">
            <div className="todo-heading">
                <h2 className="todo-heading__title">Plans for today</h2>
                <span className="todo-heading__counter">
                    <TodoCounter />
                </span>
            </div>
            <TodoForm onSubmit={handleFormSubmit} />
            <TodoList todos={todos} />
        </div>
    );
}

export default Todo;