import * as React from "react";
import * as ReactDOM from "react-dom";
import "react-table/react-table.css";
import "./styles/main.scss";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";

const Hello = () => <h1>Hello React TypeScript</h1>;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
