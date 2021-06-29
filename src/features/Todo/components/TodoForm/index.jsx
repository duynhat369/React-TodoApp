import PropTypes from 'prop-types';
import React, { useState } from 'react';
import "./styles.scss";

TodoForm.propTypes = {
    inputUpdate: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onUpdateSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
    onUpdateSubmit: null,
}
function TodoForm(props) {
    const { inputUpdate, onSubmit, onUpdateSubmit } = props

    const [input, setInput] = useState('')
    const [newInputUpdate, setNewInputUpdate] = useState("")

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleInputUpdateChange = (e) => {
        setNewInputUpdate(e.target.value)
    }

    //handle submit form add todo
    const handleFormSubmit = (e) => {
        if (!onSubmit) return

        //prevent loading browser
        e.preventDefault()

        const formValues = {
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

    //handle submit form update todo
    const handleFormUpdateSubmit = (e) => {
        if (!onSubmit) return

        //prevent loading browser
        e.preventDefault()

        const newFormValues = {
            title: inputUpdate,
        }
        console.log("inputUpdate after: ", inputUpdate)
        //validate input form value
        if (!newFormValues.title || /^\s*$/.test(newFormValues.title)) {
            return
        }
        console.log("title", newFormValues.title)

        onUpdateSubmit(newFormValues)
    }

    return (
        <React.Fragment>
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
            <form className="todo-form-update" onSubmit={handleFormUpdateSubmit}>
                <input
                    type="text"
                    name="todo-input-update"
                    className="todo-input-update"

                    // nếu value là prop thì không thể onChange, nếu là state thì không set value vào input
                    value={inputUpdate}
                    onChange={handleInputUpdateChange}
                />
                <button className="todo-button"> UPDATE </button>
            </form>
        </React.Fragment>
    );
}

export default TodoForm;