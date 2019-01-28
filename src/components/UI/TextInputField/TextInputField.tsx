import * as React from 'react';
import { Input } from 'antd';

export default function TextInputField({field,caption,placeholder,id,...rest}:any) {
  return (
    <div className="Field">
      <label className="Field__label" htmlFor={id}>{caption}</label>
      <Input {...field} id={id} placeholder={placeholder} />
    </div>
  ) 
}
