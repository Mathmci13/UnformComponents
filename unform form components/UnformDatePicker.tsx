import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";
import { useField } from "@unform/core"
import { useEffect, useState } from "react"


type UnformProps = {
  name: string;
}

export const UnformDatePicker: React.FC<UnformProps> = ({ name}) => {
  const {fieldName, registerField, defaultValue} = useField(name);
  const [value, setValue] = useState(defaultValue || new Date());
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [fieldName, registerField, value]);

  return (
  <DatePicker
  inputFormat='dd/MM/yyyy'
  value={value}
  onChange={(date: Date | null) => setValue(date)}
  renderInput={params => <TextField {...params}
  />}
  />);
}

