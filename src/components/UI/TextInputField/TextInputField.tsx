import * as React from 'react';
import { Input } from 'antd';

export default function TextInputField({caption,placeholder}:any) {
  return (
    <div className="Field">
      <label className="Field__label" htmlFor="">{caption}</label>
      <Input placeholder={placeholder} onChange={()=>{}}/>
    </div>
  )
}
