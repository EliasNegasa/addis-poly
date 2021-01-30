import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { StyledPage } from "./../styled-components/styledTable";
import { TablePagination } from "@material-ui/core";

const Pagination = ({ itemCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <>
      <ul className="pagination-ul">
        {pages.map((page) => (
          <StyledPage
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </StyledPage>
        ))}
      </ul>
    </>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
