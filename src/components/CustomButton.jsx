import React from 'react'

const CustomButton = ({
  children,
  disabled = false,
  className = '',
  type='button',
  onClick,
  ...props
}) => {
  return (
    <button
    type={type}
    disabled={disabled}
    onClick={onClick}
   className={`
        w-full rounded px-3 py-2
        bg-black text-white
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    {...props}
    >{children}</button>
  )
}

export default CustomButton