import * as React from 'react'
import { Select } from 'antd';

export default function SelectField({caption}:any) {
    return (
        <div className="Field">
          <label className="Field__label" htmlFor="">{caption}</label>
          <Select onChange={()=>{}}/>
        </div>
      )
}
