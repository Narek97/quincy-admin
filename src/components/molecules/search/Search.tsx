import React, { FC, useCallback } from "react";
import "./Search.scss";
import BaseInput from "../../atoms/inputs/BaseInput";
import SearchIcon from "@mui/icons-material/Search";
import { debounced400 } from "../../../utils/debounce";

interface IBaseSearch {
  onHandleSearch: (value: string) => void;
  variant?: "outlined" | "filled" | "standard";
}
const BaseSearch: FC<IBaseSearch> = ({
  onHandleSearch,
  variant = "outlined",
}) => {
  const onHandleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debounced400(() => onHandleSearch(event.target.value));
    },
    [onHandleSearch]
  );

  return (
    <div className={"base-search"}>
      <BaseInput
        placeholder={"Search ..."}
        onChange={onHandleChange}
        iconPosition={"end"}
        variant={variant}
        icon={<SearchIcon />}
      />
    </div>
  );
};

export default BaseSearch;
