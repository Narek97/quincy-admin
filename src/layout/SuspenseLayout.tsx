import React from "react";
import "./layout.scss";
import Loading from "../components/atoms/loading/Loading";

const SuspenseLayout = () => {
  return (
    <div className={"suspense-fallback"}>
      <Loading />
    </div>
  );
};

export default SuspenseLayout;
