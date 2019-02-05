import map from "lodash/map";
import * as React from "react";
import { DatePicker, Form, Input, TimePicker, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import 'antd/lib/input/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/select/style/index.css';


const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField = (Component:any) => ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  type,
  ...props
}:any) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }:any) =>
    form.setFieldValue(field.name, value);
  const onChange = (value:any) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  const ismandatory = props.ismandatory && props.ismandatory;
  return (
      <FormItem
        // hasFeedback={
        //   (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        // }
        // help={submittedError || touchedError ? hasError : false}
        // validateStatus={submittedError || touchedError ? "error" : "success"}
      >
       <div className="Field">
        <label className={ismandatory ?"Field__mandatoryLabel":"Field__label"} htmlFor={field.name}>
                {label}
        </label>
        <Component
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
        >
          {selectOptions &&
            map((selectOptions:any, name:any) => <Option key={name}>{name}</Option>)}
        </Component>
        </div>
      </FormItem>
  );
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntTextArea = CreateAntField(TextArea);