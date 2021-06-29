import React from 'react';
import PropTypes from 'prop-types';

TodoCounter.propTypes = {
    todosLength: PropTypes.number,
};

TodoCounter.defaultProps = {
    todosLength: 0,
}

function TodoCounter(props) {
    const { todosLength } = props
    return (
        <React.Fragment>
            {todosLength}
        </React.Fragment>
    );
}

export default TodoCounter;