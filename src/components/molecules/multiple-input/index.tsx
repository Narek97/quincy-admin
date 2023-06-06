import { FC } from "react";
import { MuiChipsInput } from "mui-chips-input";

interface ICustomChipsInput {
  onChange: () => void;
  value: string[];
  placeholder?: string;
}

const CustomChipsInput: FC<ICustomChipsInput> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <MuiChipsInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={{ width: "100%" }}
    />
  );
};

export default CustomChipsInput;
