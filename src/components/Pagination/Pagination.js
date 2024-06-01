import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handleClick(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = (
      <li key="ellipsis" className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    );

    const range = 2;
    let startPage = Math.max(1, currentPage - range);
    let endPage = Math.min(totalPages, currentPage + range);

    if (startPage > 2) {
      pageNumbers.push(
        <li
          key={1}
          className={`page-item ${currentPage === 1 ? "active" : ""}`}
          onClick={() => handleClick(1)}
        >
          <span className="page-link">1</span>
        </li>
      );
      if (startPage > 3) {
        pageNumbers.push(ellipsis);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
          onClick={() => handleClick(i)}
        >
          <span className="page-link">{i}</span>
        </li>
      );
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pageNumbers.push(ellipsis);
      }
      pageNumbers.push(
        <li
          key={totalPages}
          className={`page-item ${currentPage === totalPages ? "active" : ""}`}
          onClick={() => handleClick(totalPages)}
        >
          <span className="page-link">{totalPages}</span>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <span className="page-link" onClick={handlePrev}>
            Prev
          </span>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <span className="page-link" onClick={handleNext}>
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
