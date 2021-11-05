import { TextField } from '@mui/material'
import React from 'react'

type InputProps = {
  label: string
  type: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Input = ({ label, type, name, value, onChange }: InputProps) => {
  return (
    <>
      <div className="form-group">
        <TextField
          id={label}
          label={label}
          variant="standard"
          fullWidth
          margin="normal"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          data-testid={`${label}-input`}
        />
      </div>
    </>
  )
}

export default React.memo(Input)
