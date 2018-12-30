import * as React from "react";
import "./styles/main.scss";
import Increment from "./components/Increment/Increment";
import Header from "./components/Header/Header";
import fontawesome from "./fontawesomeSVGConfig";

export default function App() {
  fontawesome();
  return (
    <div>
      <Header />
      <Increment />
    </div>
  );
}
