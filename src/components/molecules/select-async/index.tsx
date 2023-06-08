import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { FC, useEffect, useState } from "react";
import { useGetList } from "../../../hooks/useCoupons";
import ErrorMessage from "../../atoms/errorMessage/ErrorMessage";

interface ICustomSelectAsync {
  label: string;
  title: string;
  value: string;
  nameKey: string;
  message: string;
  onChangeCB: (value: string) => void;
}

const CustomSelectAsync: FC<ICustomSelectAsync> = ({
  label,
  title,
  value,
  onChangeCB,
  nameKey,
  message,
}) => {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
    } else {
      setLoading(open && options.length === 0);
      setTimeout(()=>{
        setLoading(false);
      }, 2000)
      
    }
  
  }, [open, options.length]);

  const handleChange = (_: any, value: any) => {
    onChangeCB(value);
  };

  return (
    <>
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

      <ErrorMessage message={message} />
    </>
  );
};

export default CustomSelectAsync;
