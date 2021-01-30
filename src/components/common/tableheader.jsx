import { makeStyles, TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  clickable: {
    cursor: "pointer",
  },
});

const Thead = ({ columns, onSort, sortColumn }) => {
  const classes = useStyles();
  const raiseSort = (path) => {
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else sortColumn.path = path;
    onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {columns.map((column) => (
          <TableCell
            className={classes.clickable}
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
            scope="col"
          >
            <strong>{column.label}</strong> {renderSortIcon(column)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default Thead;
