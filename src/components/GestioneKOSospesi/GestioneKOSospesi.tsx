import { Col, Collapse, Input, Row, Select } from "antd";
import * as moment from "moment";
import * as React from "react";
import DatiGenaraliPanel from "../Sharedcomponents/DatiGenaraliPanel/DatiGenaraliPanel";
import GestioneKOPanel from "../Sharedcomponents/GestioneKOPanel/GestioneKOPanel";
import Collapsible from "react-collapsible";
export default function GestioneKOSospesi() {
  console.log(moment().format("d/mm/YYYY"));

  const Panel = Collapse.Panel;
  const provinceData = ["Zhejiang", "Jiangsu"];
  return (
    <>
      <Collapsible trigger="Dati Generali" open>
        <DatiGenaraliPanel />
      </Collapsible>
      <Collapsible trigger="Gestione KO" open = {false} onOpen ={()=>console.log("toggle")}>
        <GestioneKOPanel />
      </Collapsible>
    </>
  );
}
