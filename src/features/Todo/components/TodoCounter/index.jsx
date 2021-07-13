import React from "react";
import PropTypes from "prop-types";

TodoCounter.propTypes = {
    todos: PropTypes.number
};

TodoCounter.defaultProps = {
    todos: 0,
};

function TodoCounter(props) {
    const { todos } = props;
    return <React.Fragment>0{todos}</React.Fragment>;
}

export default TodoCounter;
