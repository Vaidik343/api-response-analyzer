import React, { useState } from 'react'
import CustomInputs from './../components/CustomInputs';
import CustomButton from './../components/CustomButton';
import HeadersEditor from '../components/HeadersEditor';
import QueryParamsEditor from './QueryParamsEditor';

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const RequestForm = ({onAnalyze, loading = false}) => {
    const [url, setUrl] = useState('')
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState([]);
     const [body, setBody] = useState("");
     const [queryParams, setQueryParams] = useState([]);


  const handleSubmit = (e) => {
  e.preventDefault();

  // Build query string
  const queryString = queryParams
    .filter(p => p.key.trim())
    .map(
      p =>
        `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`
    )
    .join("&");

  const finalUrl = queryString
    ? `${url}?${queryString}`
    : url;

  // Headers → object
  const headersObject = {};
  headers.forEach(({ key, value }) => {
    if (key.trim()) {
      headersObject[key.trim()] = value;
    }
  });

  onAnalyze({
    url: finalUrl,
    method,
    headers: headersObject,
    body: body || null,
    expectedResponseType: "json",
  });
}
  return (
    <form 
      onSubmit={handleSubmit}
      className='bg-white p-6 rounded-xl shadow space-y-6'
    >
        <h2 className='text-xl font-semibold'>API Request</h2>

        {/* url */}
        <div className='space-y-1'>
            <select
             value={method}
             onChange={(e) => setMethod(e.target.value)}
             className='w-full border rounded px-3 py-2'
            >
                {HTTP_METHODS.map((m)=> (
                     <option key={m} value={m}>
                        {m}
                     </option>
                ))}
            </select>
        </div>

        <div className='space-y-1'>
            <CustomInputs  
               type='url'
               placeholder='https://api.example.com'
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               required
            />
        </div>

        {/* header editor  */}
  <HeadersEditor headers={headers} setHeaders={setHeaders} />

        {/* request body */}
        {
            method !== 'GET' && (
                <div>
                    <label>Request Body(JSON / TEXT)</label>

                    <textarea  
                     value={body}
                     onChange={(e) => setBody(e.target.value)}
                     placeholder='{"key":"value"}'
                     className='w-full min-h-[120px] border rounded px-3 py-2 font-mono text-sm'
                    />
                </div>
            )
        }

        <QueryParamsEditor
  params={queryParams}
  setParams={setQueryParams}
/>


        {/* submit */}

        <CustomButton  type='submit' disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze API'}
        </CustomButton>
    </form>
    
  )
}

export default RequestForm