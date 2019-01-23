import * as React from 'react';
import { Input, Select, Row, Collapse, Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';


export default function DatiGenerali() {
  const Panel = Collapse.Panel; 
  return (
   <div className="DatiGenerali">
        
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Dati Generali" key="1" showArrow={true}>
          <Row gutter={16} className="DetailPagePanel"> 
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Tipo Ordine"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Link Account"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Codice Pratica"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Codice Richiesta SPP"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Tipo Cliente"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Codice Migrazione 1"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Codice Migrazione 2"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Codice sessione"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Codice Olo Donating"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Canale Di Vendita"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="Data Invio Richiesta"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}> <Input placeholder="DRO"></Input></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}><Select></Select></Col>
               <Col xl={4} lg={6} md={8} sm={8} xs={12}><Input placeholder="Id Dealer"></Input></Col>
               <Col xl={8} lg={6} md={8} sm={8} xs={24}><TextArea placeholder="Numerazioni"></TextArea></Col>
          </Row>
          </Panel>
        </Collapse>
       
   </div>
  )
}
