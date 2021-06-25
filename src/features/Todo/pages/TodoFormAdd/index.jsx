import React from 'react';
import PropTypes from 'prop-types';
import "./styles.scss"

TodoFormAdd.propTypes = {

};

function TodoFormAdd(props) {
  return (
    <React.Fragment>
      {/* {counts} */}
      <form className="todo-form">
        <input
          type="text"
          name="todo-input"
          className="todo-input"
          value=""
          onChange=""
          placeholder="Add a new plan to list"
        />
        <button
          className="todo-button"
        >
          ADD
        </button>
      </form>
    </React.Fragment>
  );
}

export default TodoFormAdd;