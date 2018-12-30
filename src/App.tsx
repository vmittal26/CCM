import * as React from "react";
import "./styles/main.scss";
import Increment from "./components/Increment/Increment";
import Header from "./components/Header/Header";

export default function App() {

  return (
    <div>
        <Header/>
        <Increment/>
    </div>
  )
}
