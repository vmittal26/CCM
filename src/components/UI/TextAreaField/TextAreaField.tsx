import * as React from 'react'
import TextArea from 'antd/lib/input/TextArea';

export default function TextAreaField({caption,placeholder}:any) {
    return (
        <div className="Field">
          <label className="Field__label" htmlFor="">{caption}</label>
          <TextArea placeholder={placeholder} onChange={()=>{}}/>
        </div>
      )
}
