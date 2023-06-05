import React from "react";
import TableCell from "@mui/material/TableCell";
import { getWebsiteName } from "../../utils/getWebsiteName";
import { WebHistoryTableType } from "../../ts/types";

const WebHistoryRows = ({ tableRow }: { tableRow: WebHistoryTableType }) => {
  return (
    <>
      <TableCell component="th" scope="row" padding="none">
        {tableRow.firstName}
      </TableCell>
      <TableCell align="right">{tableRow.lastName}</TableCell>
      <TableCell align="right">
        <img width={40} height={40} src={tableRow.favicon} alt={"favicon"} />
      </TableCell>
      <TableCell align="right">
        <a href={tableRow.url} target={"_blank"} rel="noreferrer">
          {getWebsiteName(tableRow.url)}
        </a>
      </TableCell>
      <TableCell align="right">{tableRow.createdAt}</TableCell>
    </>
  );
};

export default WebHistoryRows;
