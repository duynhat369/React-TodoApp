import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './styles.scss';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object
};

function TodoForm({ initialValues, onSubmit }) {
    const [values, setValues] = useState(initialValues || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const isEdit = Boolean(initialValues?.id);

    // support re-initialization
    useEffect(() => {
        setValues(initialValues || {});
    }, [initialValues]);

    const handleInputChange = (e) => {
        const newTitle = e.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            title: newTitle
        }));
    };

    //handle submit form add todo
    const handleFormSubmit = async (e) => {
        if (!onSubmit) return;

        //prevent loading browser
        e.preventDefault();

        //validate input form value
        if (!values.title || /^\s*$/.test(values.title)) {
            setError('Please enter what to do first.');
            return;
        }

        try {
            setError('');
            setLoading(true);

            await onSubmit(values);
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <React.Fragment>
            <form
                className="todo-form"
                onSubmit={handleFormSubmit}
                autoComplete="off"
            >
                <input
                    type="text"
                    name="todo-input"
                    className="todo-input"
                    placeholder="What would you like to do next?"
                    value={values?.title || ''}
                    onChange={handleInputChange}
                    disabled={loading}
                />

                <button className="todo-button" disabled={loading}>
                    {isEdit ? 'Update' : 'Add'}
                </button>
            </form>

            {error && <p style={{ color: 'maroon' }}>{error}</p>}
        </React.Fragment>
    );
}

export default TodoForm;
