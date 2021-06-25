import React from 'react';
import PropTypes from 'prop-types';
import "./styles.scss"

TodoFormUpdate.propTypes = {

};

function TodoFormUpdate(props) {
  return (
    <React.Fragment>
      <form className="todo-form-update">
        <input
          type="text"
          name="todo-input-update"
          className="todo-input-update"
          value=""
          onChange=""
        />
        <button className="todo-button-update">UPDATE</button>
      </form>
    </React.Fragment>
  );
}

export default TodoFormUpdate;