import classNames from 'classnames';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineRollback } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import "./styles.scss";
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todos: PropTypes.array,
};

TodoList.defaultProps = {
    todos: [],
}

function TodoList(props) {
    const { todos } = props

    return (
        <div className="todo-list">
            <ul className="todo-list__items">
                {todos.map((todo, index) => (
                    <li
                        key={todo.id}
                        className={classNames({
                            item: true,
                            done: todo.status === "done"
                        })}
                    >
                        <p className="content">
                            {todo.title}
                        </p>
                        <div className="icons">
                            <AiOutlineEdit className="icon" />
                            <AiOutlineDelete className="icon" />
                            <MdDone className="icon" />
                            <AiOutlineRollback className="icon" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;