import * as React from 'react'
import { Row, Col } from 'antd';
import SelectField from '../../UI/SelectField/SelectField';
import TextAreaField from '../../UI/TextAreaField/TextAreaField';
import DatePickerField from '../../UI/DatePickerField/DatePickerField';
import TextInputField from '../../UI/TextInputField/TextInputField';

export default function GestioneKOPanel() {
    return(
        <div className="GestioneKOPanel">
           <Row gutter={14} className="DetailPagePanel"> 
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <SelectField caption = {"Tipo Anomalia"}/></Col>
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <SelectField caption = {"Classe Lavorazione"}/></Col>
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <SelectField caption = {"Stato Lavorazione"}/></Col>
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <DatePickerField caption ={"Data Apertura"} /></Col>
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <DatePickerField caption ={"Data Chiusura"} /></Col>
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <DatePickerField caption ={"Data Lavorazione"} /></Col>
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <DatePickerField caption ={"Data Fine Sospensione"} /></Col>
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Utente Ultima Modifica"} /></Col>
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <TextInputField caption ={"Gruppo"} /></Col>
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <DatePickerField caption ={"Data Mail OLO Donating"} /></Col>
                 <Col xl={4} lg={6} md={8} sm={8} xs={12}> <DatePickerField caption ={"Data Risposta Mail OLO Donating"} /></Col>
                 <Col xl={8} lg={6} md={8} sm={8} xs={24}> <TextAreaField caption ={"Note Olo DOnating"} /></Col>
                 <Col xl={8} lg={6} md={8} sm={8} xs={24}> <TextAreaField caption ={"Note"} /></Col>
           </Row>
        </div>)
}
