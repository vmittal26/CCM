import map from "lodash/map";
import * as React from "react";
import { DatePicker, Form, Input, TimePicker, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

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
  return (
      <FormItem
        // hasFeedback={
        //   (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        // }
        // help={submittedError || touchedError ? hasError : false}
        // validateStatus={submittedError || touchedError ? "error" : "success"}
      >
       <div className="Field">
        <label className="Field__label" htmlFor="tipoAnomalia">
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