import { ReactNode } from "react";

export type ObjectKeysType = {
  [key: string]: any;
};

export type ActionType = {
  action: string;
};

export type RouteType = {
  path: string;
  element: ReactNode;
  elements?: Array<{ key: string; path: string; element: ReactNode }>;
};

export type LoginRequestType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  accessToken: string;
  badLoginAttempt: number;
  blocked: null;
  createdAt: string;
  dob: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  magnifyingGlassCount: number;
  phone: string;
  role: string;
  token: string;
  tokenExpiresOn: null | string;
  updatedAt: string;
  verified: boolean;
};

export type UserResponseType = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  magnifyingGlassCount: number;
};

export type BenefitRequestType = {
  id?: string | number;
  url: string;
  description: string;
  attachment: any;
};

export type BenefitResponseType = {
  id: string | number;
  url: string;
  description: string;
  attachment: null | {
    id: string | number;
    url: string;
  };
};

export interface WebHistoryResponseType {
  favicon: string;
  url: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

export interface WebHistoryTableType {
  favicon: string;
  url: string;
  createdAt: string;
  firstName: string;
  lastName: string;
}

export type OrderType = "asc" | "desc";

export type TableColumnType = {
  id: number | string;
  label: string | ReactNode;
  style?: any;
  renderFunction?: (data: any) => ReactNode;
  onClick?: () => void;
};
