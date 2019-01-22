import * as React from "react";
import * as moment from "moment";
import DateFilterComponent from "../UI/DateFilterComponent/DateFilterComponent";

export default function GestioneKOSospesi() {
  console.log(moment().format("d/mm/YYYY"));
  return (
    <div>
      <h1>GestioneKOSospesi</h1>
      <DateFilterComponent/>
      <input type="checkbox" name=""/>
    </div>
  );
}
