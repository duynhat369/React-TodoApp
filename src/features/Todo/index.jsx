import React, { useEffect, useState } from 'react';
import todoApi from '../../api/todoApi';
import TodoCounter from './components/TodoCounter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import "./styles.scss";

Todo.propTypes = {};

function Todo(props) {
    const [todos, setTodos] = useState([])
    const [inputUpdate, setInputUpdate] = useState('')

    //toggle class updating
    const todoNode = document.querySelector(".todo-app")

    //fetch api by axios
    useEffect(() => {
        //this side effect is executed once after rendering
        const fetchTodos = async () => {
            const todoData = await todoApi.getAll()
            setTodos(todoData)
        }

        fetchTodos()
    }, [])

    //post input form value (form add)
    const handleFormSubmit = async (formValues) => {
        await todoApi.add(formValues)
        const todoData = await todoApi.getAll()
        setTodos(todoData)
    }

    //patch input form value (form update)
    const handleFormUpdateSubmit = async (newFormValues) => {
        todoNode.classList.toggle("updating")

        // await todoApi.add(newFormValues)
        // const todoData = await todoApi.getAll()
        // setTodos(todoData)
    }

    //Edit item todo
    const handleEditClick = (todo) => {
        todoNode.classList.toggle("updating")
        // const newValue = todo.title
        setInputUpdate(todo.title)
    }

    //patch item todo
    const handleUpdateStatus = async (todo) => {
        //toggle state
        todo.status = todo.status === "done" ? "new" : "done"

        await todoApi.update(todo)
        const todoData = await todoApi.getAll()
        setTodos(todoData)
    }

    //delete todo form value
    const handleDeleteClick = async (todo) => {
        await todoApi.remove(todo.id)
        const todoData = await todoApi.getAll()
        setTodos(todoData)
    }

    //rendering
    return (
        <div className="todo-app">
            <div className="todo-heading">
                <h2 className="todo-heading__title">Plans for today</h2>
                <span className="todo-heading__counter">
                    <TodoCounter todosLength={todos.length} />
                </span>
            </div>
            <TodoForm
                inputUpdate={inputUpdate}
                onSubmit={handleFormSubmit}
                onUpdateSubmit={handleFormUpdateSubmit}
            />
            <TodoList
                todos={todos}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                onUpdateStatus={handleUpdateStatus}
            />
        </div>
    );
}

export default Todo;