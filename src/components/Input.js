import React from 'react'
import { Grid, TextField, Box } from '@material-ui/core'
import noop from 'utils/noop'

const Input = ({
  onChange,
  onBlur,
  icon,
  id,
  label,
  type,
  placeholder,
  autoFocus,
  inputRef,
  value
}) => {
  onChange = onChange || noop
  return (
    <>
      {icon && (
        <Grid item xs={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            fontSize="1.5rem"
            padding="1rem"
          >
            {icon}
          </Box>
        </Grid>
      )}
      <Grid item xs={10}>
        <TextField
          id={id}
          inputRef={inputRef}
          value={value}
          label={label}
          type={type}
          fullWidth={true}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value, event)}
          onBlur={onBlur}
          autoFocus={autoFocus}
        />
      </Grid>
    </>
  )
}

export default Input
