import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { FC, useEffect, useState } from "react";
import { useGetList } from "../../../hooks/useCoupons";

interface ICustomSelectAsync {
  label: string;
  title: string;
  value: string;
  nameKey: string;
  onChangeCB: (value: string) => void;
}

const CustomSelectAsync: FC<ICustomSelectAsync> = ({
  label,
  title,
  value,
  onChangeCB,
  nameKey,
}) => {
//   const [innerValue, setInnerValue] = useState();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const loading = open && options.length === 0;

  const { data } = useGetList({
    title,
    enabled: loading,
    open,
  });

  useEffect(() => {
    if (!loading) {
      return;
    }

    data?.[nameKey] && setOptions(data[nameKey]);
  }, [loading, data, nameKey]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (_: any, value: any) => {
    onChangeCB(value);
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      value={value}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            placeholder={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        );
      }}
    />
  );
};

export default CustomSelectAsync;
