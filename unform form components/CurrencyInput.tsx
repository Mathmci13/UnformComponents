import * as React from 'react';
import NumberFormat, { InputAttributes } from 'react-number-format';
import { UnformTextField } from 'src/shared/forms/unform';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalSeparator=","
      thousandSeparator="."
      isNumericString
      prefix="R$"
    />
  );
});


export default function CurrencyInput(props: CustomProps) {
  return (
      <UnformTextField
        autoComplete='off'
        fullWidth
        label="Valor"
        InputProps={{
          inputComponent: NumberFormatCustom as any,
        }}
        variant="outlined"
        {...props}
      />
  );
}
