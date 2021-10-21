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
        <label data-testid="label" htmlFor={label} className="form-label">
          {label}
        </label>
        <input
          id={label}
          className="form-control"
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
