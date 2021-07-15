import React from 'react';
import PropTypes from 'prop-types';
import PulseLoader from "react-spinners/PulseLoader";

Loading.propTypes = {
    loading: PropTypes.bool,
};
Loading.defaultProps = {
    loading: false,
}
function Loading(props) {
    const { loading } = props
    return (
        <div className="preloader">
            <PulseLoader
                color={'#ff7f51'}
                loading={loading}
                size={20}
            />
        </div>
    );
}

export default Loading;