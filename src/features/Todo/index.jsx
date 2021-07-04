import React, { useEffect, useState } from 'react';
import todoApi from '../../api/todoApi';
import TodoCounter from './components/TodoCounter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import "./styles.scss";

Todo.propTypes = {};

function Todo(props) {
    const [todos, setTodos] = useState([])
    const [valueUpdate, setValueUpdate] = useState({})

    //toggle class updating
    const todoNode = document.querySelector(".todo-app")

    //fetch api by axios
    useEffect(() => {
        //this side effect is executed once after rendering
        const fetchTodos = async () => {
            try {
                const todoData = await todoApi.getAll()
                setTodos(todoData)

            } catch (error) {
                console.error("Failed to fetch data.")
            }
        }
        fetchTodos()
    }, [])

    //post input form value (form add)
    const handleFormSubmit = async (formValues) => {
        try {
            await todoApi.add(formValues)
            const todoData = await todoApi.getAll()
            setTodos(todoData)
        } catch (error) {
            console.error("Failed to submit form")
        }
    }

    //patch input form value (form update)
    const handleFormUpdateSubmit = async (newFormValues) => {
        try {
            todoNode.classList.toggle("updating")

            await todoApi.update(newFormValues)
            const todoData = await todoApi.getAll()
            setTodos(todoData)
        } catch (error) {
            console.error("Failed to update form")
        }

    }

    //Edit item todo
    const handleEditClick = (todo) => {
        try {
            todoNode.classList.toggle("updating")

            // const newValue = todo.title
            //const newTodo = { ...todo }
            console.log("todo: ", todo)
            setValueUpdate(todo)
        } catch (error) {
            console.error("Failed to edit value")
        }
    }

    //patch item todo
    const handleUpdateStatus = async (todo) => {
        try {
            //toggle state
            todo.status = todo.status === "done" ? "new" : "done"

            await todoApi.update(todo)
            const todoData = await todoApi.getAll()
            setTodos(todoData)
        } catch (error) {
            console.error("Failed to toggle state")
        }

    }

    //delete todo form value
    const handleDeleteClick = async (todo) => {
        try {
            await todoApi.remove(todo.id)
            const todoData = await todoApi.getAll()
            setTodos(todoData)
        } catch (error) {
            console.error("Failed to delete todo")
        }
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
                valueUpdate={valueUpdate}
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