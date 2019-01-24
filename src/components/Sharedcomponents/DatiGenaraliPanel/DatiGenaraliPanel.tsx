import { Col, Collapse, Row } from 'antd';
import * as React from 'react';
import SelectField from '../../UI/SelectField/SelectField';
import TextAreaField from '../../UI/TextAreaField/TextAreaField';
import TextInputField from '../../UI/TextInputField/TextInputField';


export default function DatiGenerali() {
  return (
   <div className="DatiGenerali">
      <Row gutter={16} className="DetailPagePanel"> 
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Tipo Ordine"} /></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Link Account"}/></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Codice Pratica"} /></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Codice Pratica"} /></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Tipo Cliente"} /></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Codice Migrazione 1"} /></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Codice Migrazione 2"} /></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Codice sessione"} /></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Codice Olo Donating"} /></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Canale Di Vendita"} /></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Data Invio Richiesta"}/></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"DRO"} /></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}> <SelectField caption = {"TipoOrdine"}/></Col>
            <Col xl={4} lg={6} md={8} sm={8} xs={12}><TextInputField caption ={"Id Dealer"}/></Col>
            <Col xl={8} lg={6} md={8} sm={8} xs={24}><TextAreaField caption ={"Numerazioni"} /></Col>
      </Row>
   </div>
  )
}
