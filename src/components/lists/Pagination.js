import React from 'react';
import './Pagination.css';

const Pagination = (props) => {
    const {page, buttonClick} = props;


    return(
        <div className = "Pagination">
            <button className = "Pagination-button" onClick= {() => buttonClick('prev')} disabled = {page< 1}>
                Prev
            </button>
            {props.page + 1}
            <button className = "Pagination-button" onClick = {() => buttonClick('next')}>
                Next
            </button>
        </div>
    )
} 

export default Pagination;