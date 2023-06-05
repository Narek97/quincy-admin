import { useState } from "react";
import Box from "@mui/material/Box";
import TabPanel from "../../components/molecules/tabPanel";
import { couponsTabViewMap, couponsTabs } from "./constants";
import TabStrip from "../../components/organisms/TabStrip";
import CouponsView from "../../components/coupons/view";

export default function Coupons() {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabStrip tabs={couponsTabs} value={value} onChange={handleChange} />
      {couponsTabs.map((tab, ind) => (
        <TabPanel key={ind} value={value} index={ind}>
          <CouponsView view={couponsTabViewMap[tab]}/>
        </TabPanel>
      ))}
    </Box>
  );
}
