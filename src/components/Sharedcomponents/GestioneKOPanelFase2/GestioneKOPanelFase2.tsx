import * as React from "react";
import { Row, Col } from "antd";
import { Field } from "formik";
import {
  AntDatePicker,
  AntInput,
  AntSelect,
  AntTextArea
} from "../../../Utils/AntDesignFieldCreator";
import { dateFormat } from "../../../Utils/DateFormat";

export default function GestioneKOPanelFase2() {
  const errorClassName = "text-left text-danger text-uppercase";
  return (
    <div className="GestioneKOPanelFase2">
      <Row gutter={14} className="DetailPagePanel">
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            component={AntSelect}
            name="tipoAnomalia"
            label="Tipo Anomalia"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            component={AntSelect}
            name="classeLavorazione"
            label="Classe Lavorazione"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            component={AntSelect}
            name="statoLavorazione"
            label="Stato Lavorazione"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Data Apertura"
            component={AntDatePicker}
            name="dataAperturaSegnalazione"
            format={dateFormat}
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Data Chiusura"
            component={AntDatePicker}
            name="dataChiusuraSegnalazione"
            format={dateFormat}
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Data Lavorazione"
            component={AntDatePicker}
            name="dataLavorazione"
            format={dateFormat}
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Data Fine Sospensione"
            component={AntDatePicker}
            name="dataFineSospensione"
            format={dateFormat}
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Utente Ultima Modifica"
            component={AntInput}
            name="utenteUltimaModifica"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Gruppo"
            component={AntInput}
            name="gruppoUltimaModifica"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Data Mail OLO Donating"
            component={AntDatePicker}
            name="dataInvioMailOloDonatng"
            format={dateFormat}
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Data Risposta Mail OLO Donating"
            component={AntDatePicker}
            name="dataRispostaMailOLODonating"
            format={dateFormat}
          />
        </Col>
        <Col xl={8} lg={12} md={12} sm={16} xs={24}>
          <Field
            label="Note Olo DOnating"
            component={AntTextArea}
            type="text"
            name="noteOloDonating"
          />
        </Col>
        <Col xl={8} lg={12} md={12} sm={16} xs={24}>
          <Field label="Note" component={AntTextArea} name="note" type="text" />
        </Col>
      </Row>
    </div>
  );
}
