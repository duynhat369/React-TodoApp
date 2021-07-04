import classNames from 'classnames';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineRollback } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import "./styles.scss";
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todos: PropTypes.array,
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onUpdateStatus: PropTypes.func,
};

TodoList.defaultProps = {
    todos: [],
    onDeleteClick: null,
    onEditClick: null,
    onUpdateStatus: null,
}

function TodoList(props) {
    const { todos, onDeleteClick, onEditClick, onUpdateStatus } = props

    //delete one item todo
    const handleDeleteClick = (todo) => {
        onDeleteClick(todo)
    }

    //edit title item todo
    const handleEditClick = (todo) => {
        onEditClick(todo)
    }

    //mark completed item todo
    const handleUpdateStatus = (todo) => {
        onUpdateStatus(todo)
    }

    return (
        <div className="todo-list">
            <ul className="todo-list__items">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={classNames({
                            item: true,
                            done: todo.status === "done",
                        })}
                    >
                        <p className="content">
                            {todo.title}
                        </p>
                        <div className="icons">
                            <AiOutlineEdit className="icon" onClick={() => handleEditClick(todo)} />
                            <AiOutlineDelete className="icon" onClick={() => handleDeleteClick(todo)} />
                            <MdDone className="icon" onClick={() => handleUpdateStatus(todo)} />
                            <AiOutlineRollback className="icon" onClick={() => handleUpdateStatus(todo)} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;