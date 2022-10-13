// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { IPatrimonyLocation } from 'src/shared/models/patrimony/Location'
import { PatrimonyLocationService } from 'src/services/api/patrimony/location/PatrimonyLocationService'
import { useField } from '@unform/core'
import { UnformTextField } from 'src/shared/forms/unform'

export const ComboboxLocation: React.FC = ({ ...rest }) => {
  // ** States
  const { fieldName, registerField } = useField('idLocation')

  const [open, setOpen] = useState<boolean>(false)
  const [options, setOptions] = useState<IPatrimonyLocation[]>([])
  const [selectedId, setSelectedId] = useState<number | undefined>()

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
    })
  }, [fieldName, registerField, selectedId])

  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    const fetchData = async () => {
      const locations = await PatrimonyLocationService.getAll()

      if(locations instanceof Error){
        return console.error(locations)
      }

      if (active) {
        setOptions(locations.data)
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
      getOptionLabel={option => option.description}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => (
        <UnformTextField
          name='idLocation'
          {...params}
          label='Localização'
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
