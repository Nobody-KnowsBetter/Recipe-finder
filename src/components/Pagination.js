import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div style={{ textAlign: "center", margin: "1rem 0" }}>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      style={{ marginRight: 8 }}
    >Prev</button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      style={{ marginLeft: 8 }}
    >Next</button>
  </div>
);

export default Pagination;
