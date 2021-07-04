import PropTypes from 'prop-types';
import React, { useState } from 'react';
import "./styles.scss";

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
    valueUpdate: PropTypes.object.isRequired,
    onUpdateSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
    onUpdateSubmit: null,
}

function TodoForm(props) {
    const { onSubmit, valueUpdate, onUpdateSubmit } = props
    //initialValues Form Add
    const [input, setInput] = useState('')

    //initialValues Form Update
    const initialValueUpdate = valueUpdate
    const [inputUpdate, setInputUpdate] = useState(initialValueUpdate)
    console.log("inputUpdate: ", inputUpdate)
    console.log("valueUpdate: ", valueUpdate)

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleInputUpdateChange = (e) => {
        console.log("changing...")
        setInputUpdate({ ...valueUpdate, title: e.target.value })
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
            id: inputUpdate.id,
            title: inputUpdate.title,
            status: inputUpdate.status,
        }

        //validate input form value
        if (!newFormValues.title || /^\s*$/.test(newFormValues.title)) {
            return
        }

        setInputUpdate("")
        console.log("updated !!!")
        onUpdateSubmit(newFormValues)
    }

    return (
        <React.Fragment>
            {/* form add */}
            <form
                className="todo-form-add"
                onSubmit={handleFormSubmit}
            >
                <input
                    type="text"
                    name="todo-input"
                    className="todo-input"
                    placeholder="Add a new plan to list"

                    value={input}
                    onChange={handleInputChange}
                />
                <button className="todo-button"> ADD </button>
            </form>

            {/* form update */}
            <form
                className="todo-form-update"
                onSubmit={handleFormUpdateSubmit}
            >
                <input
                    type="text"
                    name="todo-input-update"
                    className="todo-input-update"
                    placeholder="New title for plan"

                    //Prop có giá trị
                    //Còn state thì rỗng
                    value={inputUpdate.title}
                    onChange={handleInputUpdateChange}
                />
                <button className="todo-button"> UPDATE </button>
            </form>
        </React.Fragment>
    );
}

export default TodoForm;