import { FC } from "react";
import { MuiChipsInput } from "mui-chips-input";
import ErrorMessage from "../../atoms/errorMessage/ErrorMessage";

interface ICustomChipsInput {
  onChange: () => void;
  value: string[];
  placeholder?: string;
  message: string;
}

const CustomChipsInput: FC<ICustomChipsInput> = ({
  value,
  onChange,
  placeholder,
  message
}) => {
  return (
    <>
      <MuiChipsInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        sx={{ width: "100%" }}
      />

      <ErrorMessage message={message} />
    </>
  );
};

export default CustomChipsInput;
