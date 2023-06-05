import React from "react";
import TableCell from "@mui/material/TableCell";
import { UserResponseType } from "../../ts/types";

const UsersTableRows = ({ tableRow }: { tableRow: UserResponseType }) => {
  return (
    <>
      <TableCell component="th" scope="row" padding="none">
        {tableRow.firstName}
      </TableCell>
      <TableCell align="right">{tableRow.lastName}</TableCell>
      <TableCell align="right">{tableRow.email}</TableCell>
      <TableCell align="right">{tableRow.role}</TableCell>
      <TableCell align="right">{tableRow.magnifyingGlassCount}</TableCell>
    </>
  );
};

export default UsersTableRows;
