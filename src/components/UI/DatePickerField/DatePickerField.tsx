import { DatePicker } from "antd";
import * as React from "react";

export default function DatePickerField({ caption }: any) {
  const dateFormat = "DD/MM/YYYY";
  return (
    <div className="Field">
      <label className="Field__label" htmlFor=""> {caption} </label>
      <DatePicker format={dateFormat}  />
    </div>
  );
}
