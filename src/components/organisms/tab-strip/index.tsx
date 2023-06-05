import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { FC } from "react";

interface ITabStrip {
  tabs: string[];
  value: number;
  onChange: (_: React.SyntheticEvent, newValue: number) => void;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TabStrip: FC<ITabStrip> = ({ tabs, value, onChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={onChange}
        aria-label="basic tabs example"
      >
        {tabs.map((tab, index)=> (
            <Tab key={index} label={`${tab}`} {...a11yProps(value)} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabStrip;
