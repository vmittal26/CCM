import * as React from "react";
import IElementConfig from "../model/IElementConfig";
import { Input, Select, DatePicker } from "antd";
import { Field } from "formik";
import TextArea from "antd/lib/input/TextArea";

export default function FieldGenerator(elementConfig: IElementConfig) {
  const fieldClass = "Field";
  const labelClass = "Field__label";
  const errorClassName = 'text-left text-danger text-uppercase';
  switch (elementConfig.type) {
    case FieldTypes.Text:
      return (
        <div className={fieldClass}>
          <label className={labelClass} htmlFor={elementConfig.id}>
            {elementConfig.caption}
          </label>
          <Field
            name="lastName"
            render={({ field, form: { touched, errors } }: any) => (
              <div>
                <Input {...field} id={elementConfig.id} placeholder={elementConfig.placeholder} />
                {touched[elementConfig.name] && errors[elementConfig.name] && 
                    ( <div className={errorClassName}>{errors[elementConfig.name]}</div> )}
              </div>
            )}
          />
        </div>
      );

      case FieldTypes.TextArea:
      return (
        <div className={fieldClass}>
          <label className={labelClass} htmlFor={elementConfig.id}>
            {elementConfig.caption}
          </label>
          <Field
            name="lastName"
            render={({ field, form: { touched, errors } }: any) => (
              <div>
                <TextArea {...field} id={elementConfig.id} placeholder={elementConfig.placeholder} />
                {touched[elementConfig.name] && errors[elementConfig.name] && 
                    ( <div className={errorClassName}>{errors[elementConfig.name]}</div> )}
              </div>
            )}
          />
        </div>
      );

      case FieldTypes.Select:
      return (
        <div className={fieldClass}>
          <label className={labelClass} htmlFor={elementConfig.id}>
            {elementConfig.caption}
          </label>
          <Field
            name="lastName"
            render={({ field, form: { touched, errors } }: any) => (
              <div>
                <Select {...field} id={elementConfig.id}> 
                        {elementConfig.selectProps.data.map(item => 
                                <Select.Option key={item.id}>{item.value}</Select.Option>)
                        }
                </Select>
                {touched[elementConfig.name] && errors[elementConfig.name] && 
                    ( <div className={errorClassName}>{errors[elementConfig.name]}</div> )}
              </div>
            )}
          />
        </div>
      );


      case FieldTypes.Date:
      return (
        <div className={fieldClass}>
          <label className={labelClass} htmlFor={elementConfig.id}>
            {elementConfig.caption}
          </label>
          <Field
            name="lastName"
            render={({ field, form: { touched, errors } }: any) => (
              <div>
                <DatePicker format={elementConfig.datePickerProps.format} {...field} id={elementConfig.id} placeholder={elementConfig.placeholder} />
                {touched[elementConfig.name] && errors[elementConfig.name] && 
                    ( <div className={errorClassName}>{errors[elementConfig.name]}</div> )}
              </div>
            )}
          />
        </div>
      );
  }
}
