import * as React from "react";
import * as moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DateFilterComponent(props: any) {
  const [state, setState] = React.useState({
    focusedInput: null,
    startDate: null,
    endDate: null
  });
  const[year,setYear] = React.useState(moment().year());
  
  const renderYearMonth=({ month, onMonthSelect, onYearSelect }:any) =>
  <div className="d-flex justify-content-center align-items-center ml-4 mr-4">
  <div style={{marginLeft:"15px",marginTop:"-6px"}}> 
    <select style={{fontSize:"0.9rem",marginRight:"2px"}}value={month.month()} onChange={(e) => onMonthSelect(month, e.target.value)} >
        {moment.months().map((label:any, value:any) => (
          <option key = {value}value={value}>{label}</option>
        ))}
      </select>
    <span style={{verticalAlign:"middle"}}>{year}</span>
      <button  className="btn" onClick={() => {setYear(year+1); onYearSelect(month, year+1)}
        }>
          <FontAwesomeIcon
            style={{marginLeft:"-0.5rem",fontSize: "0.8rem", color:"red" }}
            icon="plus"
          />
        </button>
        <button  className="btn" onClick={() => {setYear(year-1);onYearSelect(month, year-1)}}>
          <FontAwesomeIcon
            style={{marginLeft:"-0.5rem",fontSize: "0.8rem", color:"red" }}
            icon="minus"
          />
        </button></div>
   
  </div>
  const onDatesChange = ({ startDate, endDate }: any) => {
    setState({ ...state, startDate, endDate });
    console.log(startDate, endDate);

    if (startDate && endDate){
      props.onChange({
        startDate: moment(startDate).format("DD/MM/YYYY"),
        endDate: moment(endDate).format("DD/MM/YYYY")
      })}else if(!startDate && !endDate){
        props.onChange({
          
        })
      }
  };

  const onFocusChange = (focusedInput: any) => {
    setState({ ...state, startDate, focusedInput });
  };

  const { focusedInput, startDate, endDate } = state;
  return (
    <div className="DateFilterComponent">
      <DateRangePicker
        startDatePlaceholderText={"Start Date"}
        endDatePlaceholderText={"End Date"}
        onDatesChange={onDatesChange}
        onFocusChange={onFocusChange}
        focusedInput={focusedInput}
        startDate={startDate}
        showClearDates={true}
        endDate={endDate}
        readOnly={true}
        isOutsideRange={() => false}
        startDateId="datepicker_start_home"
        endDateId="datepicker_end_home"
        displayFormat={"DD/MM/YY"}
        renderMonthElement={renderYearMonth}
        keepOpenOnDateSelect={false}
      />
      {/* <button  className="btn" onClick={() => setState({...state, startDate:null, endDate:null })}>
          <FontAwesomeIcon
            style={{marginLeft:"-0.5rem",fontSize: "1.5rem", color:"red" }}
            icon="times"
          />
        </button> */}
    </div>
  );
}

export default DateFilterComponent;
