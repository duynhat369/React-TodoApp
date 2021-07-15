import React, { useEffect, useState } from "react";
import "./App.scss";
import Todo from "./features/Todo";
import Loading from "./components/Loading"

function App() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const loadingTimeout = setTimeout(() => {
            setLoading(false)
        }, 5000)

        return () => clearTimeout(loadingTimeout)
    }, [])

    return (
        <React.Fragment>
            {loading &&
                <Loading loading={loading} />
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
