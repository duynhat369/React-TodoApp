import classNames from "classnames";
import React from "react";
import {
    AiOutlineDelete,
    AiOutlineEdit,
    AiOutlineRollback
} from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.scss";
import PropTypes from "prop-types";

TodoList.propTypes = {
    todos: PropTypes.array,
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onUpdateStatus: PropTypes.func
};

function TodoList({
    todos = [],
    onDeleteClick = null,
    onEditClick = null,
    onUpdateStatus = null
}) {
    return (
        <div className="todo-list">
            <ul className="todo-list__items">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={classNames({
                            item: true,
                            done: todo.status === "done"
                        })}
                    >
                        <p className="content">{todo.title}</p>
                        <div className="icons">
                            <AiOutlineEdit
                                className="icon"
                                onClick={() => onEditClick(todo)}
                            />
                            <AiOutlineDelete
                                className="icon"
                                onClick={() => onDeleteClick(todo)}
                            />
                            <MdDone className="icon" onClick={() => onUpdateStatus(todo)} />
                            <AiOutlineRollback
                                className="icon"
                                onClick={() => onUpdateStatus(todo)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
