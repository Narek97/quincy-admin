import * as React from "react";
import {
  ActionType,
  BenefitResponseType,
  OrderType,
  UserResponseType,
  WebHistoryTableType,
} from "./types";

export interface IUserHeadCell {
  disablePadding: boolean;
  id: keyof UserResponseType;
  label: string;
  numeric: boolean;
}

interface BenefitKeyType extends BenefitResponseType, ActionType {}

export interface IBenefitHeadCell {
  disablePadding: boolean;
  id: keyof BenefitKeyType;
  label: string;
  numeric: boolean;
}

export interface IWebHistoryHeadCell {
  disablePadding: boolean;
  id: keyof WebHistoryTableType;
  label: string;
  numeric: boolean;
}

export interface IEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof UserResponseType | BenefitResponseType | WebHistoryTableType
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: OrderType;
  orderBy: string;
  rowCount: number;
  headCells: IUserHeadCell[] | IBenefitHeadCell[] | IWebHistoryHeadCell[];
  options?: {
    isShowCheckbox: boolean;
  };
}
