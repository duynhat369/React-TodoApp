import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import "./App.scss";
import Todo from "./features/Todo";

function App() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [])
    return (
        <React.Fragment>
            {loading &&
                <div className="preloader">
                    <PulseLoader
                        color={'coral'}
                        loading={loading}
                        size={20}
                    />
                </div>
            }
            {!loading &&
                <div className="app">
                    <Todo />
                </div>
            }
        </React.Fragment>
    );
}

export default App;
