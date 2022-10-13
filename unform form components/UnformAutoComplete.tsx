import { Autocomplete} from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useState } from 'react';
import { PatrimonyState } from '../../models/patrimony/Patrimony';
import { UnformTextField } from './UnformTextField';


type UnformProps = {
 name: string;
 options: string[];
 getOptionLabel: (option: string) => string;
 label: string;
}

export const UnformAutoComplete: React.FC<UnformProps> = ({ name, options, getOptionLabel,label }) => { 
const { fieldName, registerField, defaultValue} = useField(name);
const [selectedOption, setSelectedOption] = useState(defaultValue || "");
 useEffect(() => {
   registerField({
     name: fieldName,
     getValue: () => selectedOption,
     setValue: (_, newValue) => setSelectedOption(PatrimonyState[newValue]),
     clearValue: () => setSelectedOption(""),
   });
 }, [fieldName, registerField, selectedOption]);

 return (
   <Autocomplete
   fullWidth
   options={options}
   onChange={(_,newValue) => {setSelectedOption(newValue)}}
   getOptionLabel={getOptionLabel}
   isOptionEqualToValue={(option, value) => option === value || option === ""}
   value={selectedOption}
    renderInput={(params) => (
       <UnformTextField
        name={name}
         {...params}
          label={label}
          variant="outlined"
       />
     )}
   />
 );
}
