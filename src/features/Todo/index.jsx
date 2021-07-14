import React, { useEffect, useState } from 'react';
import todoApi from '../../api/todoApi';
import Pagination from './components/Pagination';
import TodoCounter from './components/TodoCounter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './styles.scss';

const DEFAULT_TODO = { title: '', status: 'new' };

function Todo(props) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(DEFAULT_TODO);
    const [pagination, setPagination] = useState({
        _limit: 6,
        _page: 1,
        _totalRows: 4,
    });
    const [filters, setFilters] = useState({
        _limit: 6,
        _page: 1,
    });

    //fetch api by axios
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data, pagination } = await todoApi.getAll(filters);
                setTodos(data)
                setPagination(pagination)
            } catch (error) {
                console.error('Failed to fetch todo list.');
            }
        })();
        setLoading(false);
    }, [filters]);

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

            const { data, pagination } = await todoApi.getAll(filters);
            setTodos(data)
            setFilters({
                ...filters,
                _page: Math.ceil(pagination._totalRows / pagination._limit),
            })
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
            const { data } = await todoApi.getAll(filters);
            setTodos(data)
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
                const { data, pagination } = await todoApi.getAll(filters);
                setTodos(data)
                setFilters({
                    ...filters,
                    _page: Math.ceil(pagination._totalRows / pagination._limit),
                })
            }
        } catch (error) {
            console.error('Failed to delete todo', error);
        }

        setLoading(false);
    };

    const handlePageChange = async (newPage) => {
        try {
            setFilters({
                ...filters,
                _page: newPage,
            })
        } catch (error) {
            console.error('Failed to change pagination', error);
        }
    }

    //rendering
    return (
        <div className="todo-app">
            <div className="todo-heading">
                <h2 className="todo-heading__title">Plans for today</h2>
                <span className="todo-heading__counter">
                    <TodoCounter todos={pagination._totalRows} />
                </span>
            </div>
            <TodoForm initialValues={selectedTodo} onSubmit={handleFormSubmit} />
            <TodoList
                todos={todos}
                loading={loading}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                onUpdateStatus={handleUpdateStatus}
            />
            <Pagination
                onPageChange={handlePageChange}
                pagination={pagination}
            />
        </div>
    );
}

export default Todo;
