import React, { useEffect, useState } from 'react';
import todoApi from '../../api/todoApi';
import TodoCounter from './components/TodoCounter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './styles.scss';

const DEFAULT_TODO = { title: '', status: 'new' };

function Todo(props) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(DEFAULT_TODO);

    //fetch api by axios
    useEffect(() => {
        //this side effect is executed once after rendering
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const todoData = await todoApi.getAll();
                setTodos(todoData);
            } catch (error) {
                console.error('Failed to fetch data.');
            }
        };
        fetchTodos();
        setLoading(false);
    }, []);

    //[post] input form value (form add)
    const handleFormSubmit = async (formValues) => {
        try {
            setLoading(true);
            const isEdit = Boolean(formValues?.id);

            if (isEdit) {
                await todoApi.update(formValues);
            } else {
                await todoApi.add({
                    ...formValues,
                    status: 'new'
                });
            }

            const todoData = await todoApi.getAll();
            setTodos(todoData);
            setSelectedTodo({ ...DEFAULT_TODO });
        } catch (error) {
            console.error('Failed to submit form', error);
        }

        setLoading(false);
    };

    //Edit item todo
    const handleEditClick = (todo) => {
        setSelectedTodo(todo);
    };

    //[patch] item todo
    const handleUpdateStatus = async (todo) => {
        try {
            setLoading(true);
            //toggle state
            todo.status = todo.status === 'done' ? 'new' : 'done';

            await todoApi.update(todo);
            const todoData = await todoApi.getAll();
            setTodos(todoData);
        } catch (error) {
            console.error('Failed to toggle state', error);
        }

        setLoading(false);
    };

    //[delete] todo form value
    const handleDeleteClick = async (todo) => {
        try {
            setLoading(true);
            if (window.confirm('Are you sure to remove todo?')) {
                await todoApi.remove(todo.id);
                const todoData = await todoApi.getAll();
                setTodos(todoData);
            }
        } catch (error) {
            console.error('Failed to delete todo', error);
        }

        setLoading(false);
    };

    //rendering
    return (
        <div className="todo-app">
            <div className="todo-heading">
                <h2 className="todo-heading__title">Plans for today</h2>
                <span className="todo-heading__counter"> <TodoCounter todos={todos} /> </span>
            </div>

            <TodoForm initialValues={selectedTodo} onSubmit={handleFormSubmit} />

            <TodoList
                todos={todos}
                loading={loading}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                onUpdateStatus={handleUpdateStatus}
            />
        </div>
    );
}

export default Todo;
