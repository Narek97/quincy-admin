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

export interface IDashbordField {
  field: string;
  headerName: string;
  flex?: number;
  sortable?: boolean;
}

export interface IFormField {
  name: string,
  placeholder: string,
  input: string,
  required: boolean,
  multiChoice: boolean,
  async?: boolean,
}


export interface IView {
  title: string,
  name: string,
  fields: {
    dashboard: IDashbordField[],
    form: IFormField[],
  }
}


export interface ICouponsListResponse {
  count: number;

}


export interface IBrand {
  id: string;
  createdAt: string;
  creatorId: string;
  host: string;
  logo: any;
  name: string;
  targetUrl: string;
  targetUrls: string[];
  updatedAt: string;
}
export interface IBrandsListResponse {
  count: number;
  brands: IBrand[];
}


export interface IBrandCreate {
  name: string,
  targetUrl: string,
  triggerUrls: string[] | [],
  deleteAttachment: false,
  logo: null | File
}



