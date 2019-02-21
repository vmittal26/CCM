import * as React from "react";
import * as moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import DateFilterComponent from "../UI/DateFilterComponent/DateFilterComponent";
import IHeaderConfig from "../../model/IHeaderConfig";

export default ():IHeaderConfig=>{
  return {
    minWidth: 240,
    headerClassName: "header",
    Filter: (element: any) => {
      let { filter, onChange } = element;
      filter ? (filter.type = "DATE_RANGE") : filter;
      filter =filter && Object.keys(filter.value).length === 0 ? (filter.type = "CLEAR") : filter;
      return (
        <DateFilterComponent {...element}/>
      );
    }
  };
}
