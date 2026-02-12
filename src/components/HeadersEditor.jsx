import React from 'react'
import CustomButton from './CustomButton'
import CustomInputs from './CustomInputs'


const HeadersEditor = ({headers, setHeaders}) => {
  const addHeader = () => {
    setHeaders([...headers, {key: '', value: ''}]);
  }

  const updateHeader = (index, field, value) => {
    const updated = [...headers];
    updated[index][field] = value;
    setHeaders(updated);
  }

  const removeHeader = (index) => {
      setHeaders(headers.filter((_, i) => i!== index));
  }
  return (
    <div>
      <div>
        <h3>
          Request Headers 
        </h3>

        <CustomButton 
         type='button'
         className=''
         onClick={addHeader}
        > + Add Header</CustomButton>
      </div>

    {/* Empty state */}
    {headers.length === 0 && (
      <p className='text-sm text-grey-500'>No headers added</p>
    )}

    {/* header list */}
    {headers.map((headers, index) => (
        <div 
         key={index}
         className=''
        >

          <CustomInputs
            placeholder='Header Key'
            value={headers.key}
            onChange={ (e) => updateHeader(index, "key", e.target.value)}
            className='col-span-2'
          />

          <CustomInputs  
            placeholder='Header Value'
            value={headers.value}
            onChange={(e) => updateHeader(index, "value", e.target.value)}
            className='col-span-2'
          />

          <CustomButton  
          type='button'
          className=''
          onClick={() => removeHeader(index)}
          >
            X
          </CustomButton>


        </div>
    ))}
    </div>
  )
}

export default HeadersEditor