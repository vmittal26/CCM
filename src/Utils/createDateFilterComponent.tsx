import * as React from "react";
import * as moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import DateFilterComponent from "../components/UI/DateFilterComponent/DateFilterComponent";

export default function createDateFilterComponent() {
  return {
    minWidth: 230,
    headerClassName: "header",
    Cell: ({ value }: any) => (value ? value.descrizione : null),
    Filter: (element: any) => {
      let { filter, onChange } = element;
      console.log(filter);
      return (
        <DateFilterComponent {...element}/>
      );
    }
  };
}
