import * as React from "react";
import { DatePicker, Form, Input, TimePicker, Select, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
//import 'antd/lib/style/index.css';
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
  const onInputChange = ({ target: { value } }:any) => form.setFieldValue(field.name, value);
  const onChange = (value:any) => { form.setFieldValue(field.name, value); props.onChange(value,form)} ;
  const onBlur = () => form.setFieldTouched(field.name, true);
  const ismandatory = props.ismandatory && props.ismandatory;
  // console.log(selectOptions);
  return (
      <FormItem
        // hasFeedback={
        //   (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        // }
        // help={submittedError || touchedError ? hasError : false}
        // validateStatus={submittedError || touchedError ? "error" : "success"}
      >
       <div className="form-group">
        <Col xl={12} lg={12} md={6} sm={8} xs={12}>
        <label className={ismandatory?"mandatory-label":""} htmlFor={field.name}> {label} </label>
        </Col>
        <Col xl={12} lg={12} md={6} sm={8} xs={12}>
        <Component
          {...field}
          {...props}
          type={type}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
        >
          {selectOptions && selectOptions.map((selectOption:any)=><Option key={!selectOption.id ? selectOption.description :selectOption.id}>{selectOption.description}</Option>)}
        </Component>
        </Col>
        </div>
      </FormItem>
  );
};

export const AntSelectInline = CreateAntField(Select);
export const AntDatePickerInline = CreateAntField(DatePicker);
export const AntInputInline = CreateAntField(Input);
export const AntTimePickerInline = CreateAntField(TimePicker);
export const AntTextAreaInline = CreateAntField(TextArea);