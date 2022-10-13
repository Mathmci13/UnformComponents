import { Switch, SwitchProps } from "@mui/material"
import { useField } from "@unform/core"
import { useEffect, useState } from "react"


type UnformProps = SwitchProps & {
  name: string;
}

export const UnformSwitch: React.FC<UnformProps> = ({ name, ...rest }) => {
  const {fieldName, registerField, defaultValue} = useField(name);
  const [value, setValue] = useState(defaultValue || false);
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [fieldName, registerField, value]);

  return (
  <Switch
    {...rest}
    defaultValue={defaultValue}
    checked={value} 
    onChange={e => setValue(e.target.checked)}
  />);
}
