import { TextField, TextFieldProps } from "@mui/material"
import { useField } from "@unform/core"
import { useEffect, useState } from "react"


type UnformProps = TextFieldProps & {
  name: string;
}

export const UnformTextField: React.FC<UnformProps> = ({ name, ...rest }) => {
  const {fieldName, registerField, defaultValue, error, clearError} = useField(name);
  const [value, setValue] = useState(defaultValue || "");
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
      clearValue: () => setValue(""),
    });
  }, [fieldName, registerField, value]);

  return (
  <TextField
  {...rest}
  error={!!error}
  helperText={error}
  defaultValue={defaultValue}
  value={value}
  onChange={e => setValue(e.target.value)}
  onSelect={() => error ? clearError() : undefined}
  />);
}