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
