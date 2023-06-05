import React from "react";
import "./Loading.scss";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className={"loading"}>
      <CircularProgress
        sx={{
          color: "#4b1e3f",
        }}
      />
    </div>
  );
};

export default Loading;
