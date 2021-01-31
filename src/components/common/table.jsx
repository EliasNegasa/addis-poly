import React from "react";
import TBody from "./tableBody";
import THead from "./tableHeader";
import { Table } from "@material-ui/core";

const TableBox = ({ columns, sortColumn, data, onSort }) => {
  return (
    <>
      <br />
      <Table size="md" stickyHeader aria-label="sticky table">
        <THead columns={columns} onSort={onSort} sortColumn={sortColumn} />

        <TBody data={data} columns={columns} />
      </Table>
    </>
  );
};

export default TableBox;
