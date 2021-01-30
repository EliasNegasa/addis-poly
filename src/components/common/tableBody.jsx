import React, { Component } from "react";
import _ from "lodash";
import { StyledBadge } from "../styled-components/container";
import { formatDate } from "../../utils/formatDate";
import { Checkbox, TableBody, TableCell, TableRow } from "@material-ui/core";

class TBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    const cellData = _.get(item, column.path);
    if (cellData === true) return <StyledBadge approved>Active</StyledBadge>;
    else if (cellData === false)
      return <StyledBadge inactive>InActive</StyledBadge>;
    else if (typeof cellData === "string" && cellData.includes(".000Z"))
      return formatDate(cellData);
    return cellData;
  };

  render() {
    const { data, columns } = this.props;
    return (
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={item.id + (column.path || column.key)}>
                {this.renderCell(item, column)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

export default TBody;

{
  /* <tbody>
{data.map((item) => (
  <StyledTr key={item.id}>
    {columns.map((column) => (
      <StyledTd key={item.id + (column.path || column.key)}>
        {this.renderCell(item, column)}
      </StyledTd>
    ))}
  </StyledTr>
))}
</tbody> */
}
