import React from "react";
import PropTypes from "prop-types";

TodoCounter.propTypes = {
    todos: PropTypes.array
};

TodoCounter.defaultProps = {
    todos: []
};

function TodoCounter(props) {
    const { todos } = props;
    return <React.Fragment>{todos.length}</React.Fragment>;
}

export default TodoCounter;
