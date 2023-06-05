import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";
import TollIcon from "@mui/icons-material/Toll";
import React from "react";

export const DRAWER_LIST: Array<{
  icon: React.ReactNode;
  name: string;
  url: string;
}> = [
  {
    icon: <PersonIcon />,
    name: "Users",
    url: "/users",
  },
  {
    icon: <PeopleIcon />,
    name: "Benefits",
    url: "/benefits",
  },
  {
    icon: <HistoryIcon />,
    name: "Web history",
    url: "/web-history",
  },
  {
    icon: <TollIcon />,
    name: "Coupons",
    url: "/coupons",
  },
];
