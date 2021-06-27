import PropTypes from 'prop-types';
import React, { useState } from 'react';
import "./styles.scss";

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {
    const { onSubmit } = props
    const [input, setInput] = useState('')

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleFormSubmit = (e) => {
        if (!onSubmit) return

        //prevent loading browser
        e.preventDefault()

        const formValues = {
            //id: Math.floor(Math.random() * 10000),
            title: input,
            status: "new",
        }

        //validate input form value
        if (!formValues.title || /^\s*$/.test(formValues.title)) {
            return
        }

        //reset input form value
        setInput("")
        // console.log(formValues)
        onSubmit(formValues)
    }

    return (
        <React.Fragment>
            {/* {counts} */}

            {/* form add */}
            <form className="todo-form-add" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="todo-input"
                    className="todo-input"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Add a new plan to list"
                />
                <button className="todo-button"> ADD </button>
            </form>

            {/* form update */}
            <form className="todo-form-update">
                <input
                    type="text"
                    name="todo-input"
                    className="todo-input"
                //value=""
                //onChange=""
                />
                <button className="todo-button"> UPDATE </button>
            </form>
        </React.Fragment>
    );
}

export default TodoForm;