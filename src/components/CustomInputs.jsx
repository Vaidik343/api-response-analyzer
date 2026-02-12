import React from 'react'

const CustomInputs = ({
    placeholder = "",
    value,
    onChange,
    className = '',
    type = 'text',
    ...props
}) => {
  return (
    
   <input 
   type={type}
     placeholder={placeholder}
     value={value}
     onChange={onChange}
    className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${className}`}
    {...props}
   
   />

  )
}

export default CustomInputs