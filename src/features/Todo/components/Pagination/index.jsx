import PropTypes from 'prop-types';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./styles.scss";
Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
}

function Pagination(props) {
    const { pagination, onPageChange } = props;
    const { _limit, _page, _totalRows } = pagination;
    const totalPages = Math.ceil(_totalRows / _limit);

    const handlePageChange = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage)
        }
    }

    return (
        <div className="pagination">
            <div className="pagination__page-number">
                <span className="page-number number__start">01</span>
                <button
                    className="pagination-button__prev"
                    disabled={_page <= 1}
                    onClick={() => handlePageChange(_page - 1)}
                >
                    <FaChevronLeft />
                </button>
                <span className="page-number number__current">0{_page}</span>
                <button
                    className="pagination-button__next"
                    disabled={_page >= totalPages}
                    onClick={() => handlePageChange(_page + 1)}
                >
                    <FaChevronRight />
                </button>
                <span className="page-number number__end">0{totalPages}</span>
            </div>
        </div>
    );
}

export default Pagination;