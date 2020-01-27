import React from "react"
import "../styles/pagination.css"

const Pagination = ({handleNextPage, handlePrevPage, btnPrevState, btnNextState, currentPage}) => (
    <div className="pagination">
        <button onClick={handlePrevPage} disabled={btnPrevState === null ? true : false} className="btn">&lt; Previous Page</button>
        {currentPage}
        <button onClick={handleNextPage} disabled={btnNextState === null ? true : false} className="btn">Next Page ></button>
    </div>
)

export default Pagination;