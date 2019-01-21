import * as React from "react";
import * as ReactDOM from "react-dom";
// import { polyfill } from 'es6-promise'; 
// import assign  from 'es6-object-assign';
import "react-table/react-table.css";
import 'react-dates/lib/css/_datepicker.css';
import 'typeface-roboto';
import "./styles/main.scss";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";

// polyfill();
// assign.polyfill();
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
