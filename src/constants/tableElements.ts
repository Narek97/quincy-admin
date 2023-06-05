import {
  IBenefitHeadCell,
  IUserHeadCell,
  IWebHistoryHeadCell,
} from "../ts/interface";

export const userHeadCells: IUserHeadCell[] = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "role",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "magnifyingGlassCount",
    numeric: true,
    disablePadding: false,
    label: "Magnifying Glass count",
  },
];

export const benefitsHeadCells: IBenefitHeadCell[] = [
  {
    id: "url",
    numeric: false,
    disablePadding: true,
    label: "Url",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "attachment",
    numeric: true,
    disablePadding: false,
    label: "Website icon",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

export const webHistoryHeadCells: IWebHistoryHeadCell[] = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "favicon",
    numeric: true,
    disablePadding: false,
    label: "Website icon",
  },
  {
    id: "url",
    numeric: true,
    disablePadding: false,
    label: "Url",
  },
  {
    id: "createdAt",
    numeric: true,
    disablePadding: false,
    label: "Created At",
  },
];
