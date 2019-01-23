import * as React from "react";
import * as moment from "moment";
import {
  DatePicker,
  Button,
  Row,
  Col,
  Radio,
  Dropdown,
  Menu,
  Select,
  Collapse
} from "antd";
import { Input } from "antd";
import DateFilterComponent from "../UI/DateFilterComponent/DateFilterComponent";
import RadioGroup from "antd/lib/radio/group";
import DatiGenerali from "../DatiGenarali/DatiGenerali";

export default function GestioneKOSospesi() {
  console.log(moment().format("d/mm/YYYY"));

  const Panel = Collapse.Panel; 
  const provinceData = ["Zhejiang", "Jiangsu"];
  return (
    <>
      <h4 className="text-center">GestioneKOSospesi</h4>
      <Collapse defaultActiveKey={['1']}>
    <Panel header="This is panel header 1" key="1" showArrow={false} disabled>
        <Row gutter={16}>
        <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder={"Input 0"} onChange={()=>{}}/> </Col>
        <Col xl={4} lg={6} md={8} sm={8} xs={12}> 
          <Select defaultValue={provinceData[0]} style={{ width: 120 }} > 
            {provinceData.map(province => <Select.Option key={province}>{province}
            </Select.Option>)} 
          </Select>
        </Col>
          <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder={"Input 1"} onChange={()=>{}}/></Col>
          <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder={"Input 2"} onChange={()=>{}}/></Col>
          <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder={"Input 3"} onChange={()=>{}}/></Col>
          <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder={"Input 4"} onChange={()=>{}}/></Col>
          <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder={"Input 5"} onChange={()=>{}}/></Col>
          <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder={"Input 6"} onChange={()=>{}}/></Col>
          <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder={"Input 7"} onChange={()=>{}}/></Col>
        </Row>
      </Panel>
      <DatiGenerali />
    <Panel header="This is panel header 3" key="3">
    </Panel>
  </Collapse>,
    </>
  );
}
