// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { IPatrimonyType } from 'src/shared/models/patrimony/Type'
import { PatrimonyTypeService } from 'src/services/api/patrimony/type/PatrimonyTypeService'
import { useField } from '@unform/core'
import { UnformTextField } from 'src/shared/forms/unform'

export const ComboboxPatrimonyType = ({...rest}) => {
  // ** States
  const {fieldName,registerField} = useField('idPatrimonyType')

  const [open, setOpen] = useState<boolean>(false)
  const [options, setOptions] = useState<IPatrimonyType[]>([])
  const [selectedId, setSelectedId] = useState<number | undefined >();

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
      clearValue: () => setSelectedId(undefined),
    });
  },[fieldName,registerField,selectedId]);

  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    const fetchData = async () => {
      const response = await PatrimonyTypeService.getAll()
      const patrimonyTypes = await response.data
      if (active) {
        setOptions(patrimonyTypes)
      }
    }
    fetchData()

    return () => {
      active = false
    }
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      {...rest}
      open={open}
      options={options}
      loading={loading}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={(_,newValue)=>{setSelectedId(newValue?.id)}}
      getOptionLabel={option => option.description}
      isOptionEqualToValue={(option, value) => option.id === value.id || option.description === ""}
      renderInput={params => (
        <UnformTextField
        name='idPatrimonyType'
          {...params}
          label='Tipo de Patrimônio'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  )
}

