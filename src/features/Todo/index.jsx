import React, { useEffect } from 'react';
import todoApi from '../../api/todoApi';
import TodoCounter from './pages/TodoCounter';
import TodoFormAdd from './pages/TodoFormAdd';
import TodoFormUpdate from './pages/TodoFormUpdate';
import TodoList from './pages/TodoList';
import "./styles.scss"
Todo.propTypes = {

};

function Todo(props) {
  //fetch api by axios
  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await todoApi.getAll()
    }

    fetchTodos()
  }, [])

  return (
    <div className="todo-app">
      <h2 className="todo-title">Plans for today</h2>
      <TodoFormAdd />
      <TodoCounter />
      <TodoFormUpdate />
      <TodoList />
    </div>
  );
}

export default Todo;