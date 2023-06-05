import React, { FC } from "react";
import "./BenefitsTableRows.scss";
import TableCell from "@mui/material/TableCell";
import { BenefitResponseType } from "../../ts/types";
import BaseLoadingButton from "../atoms/buttons/BaseLoadingButton";
import BaseButton from "../atoms/buttons/BaseButton";
import { getWebsiteName } from "../../utils/getWebsiteName";

interface IBenefitsTableRows {
  tableRow: BenefitResponseType;
  onHandleEdit: (tableRow: BenefitResponseType) => void;
  onHandleDelete: (id: number | string) => void;
}

const BenefitsTableRows: FC<IBenefitsTableRows> = ({
  tableRow,
  onHandleEdit,
  onHandleDelete,
}) => {
  return (
    <>
      <TableCell component="th" scope="row" padding="none">
        <a href={tableRow.url} target={"_blank"} rel="noreferrer">
          {getWebsiteName(tableRow.url)}
        </a>
      </TableCell>
      <TableCell align="right">{tableRow.description}</TableCell>
      <TableCell align="right">
        <img
          width={40}
          height={"auto"}
          src={tableRow.attachment?.url}
          alt={"favicon"}
        />
      </TableCell>
      <TableCell align="right">
        <div className={"benefits-table-rows--actions"}>
          <BaseButton name={"Edit"} onClick={() => onHandleEdit(tableRow)} />

          <BaseLoadingButton
            name={"Delete"}
            onClick={() => onHandleDelete(tableRow.id)}
            color="error"
          />
        </div>
      </TableCell>
    </>
  );
};

export default BenefitsTableRows;
