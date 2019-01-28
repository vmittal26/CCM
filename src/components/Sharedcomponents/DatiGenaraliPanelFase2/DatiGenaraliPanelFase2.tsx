import { Col, Row, Input, Select } from "antd";
import * as React from "react";
import { Field } from "formik";
import {
  AntInput,
  AntDatePicker,
  AntSelect,
  AntTextArea
} from "../../../Utils/AntDesignFieldCreator";
import { dateFormat } from "../../../Utils/DateFormat";
import * as moment from "moment";

export default function DatiGeneraliPanelFase2() {
  const errorClassName = "text-left text-danger text-uppercase";

  return (
    <div className="DatiGeneraliPanelFase2">
      <Row gutter={16} className="DetailPagePanel">
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Tipo Ordine"
            component={AntInput}
            name="tipoOrdine"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Link Account"
            component={AntInput}
            name="linkAccount"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Codice Pratica"
            component={AntInput}
            name="codicePratica"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Codice Richiesta SPP"
            component={AntInput}
            name="codiceRichiestaSpp"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Tipo Cliente"
            component={AntInput}
            name="tipoCliente"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Codice Migrazione 1"
            component={AntInput}
            name="codiceMigrazione1"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Codice Migrazione 2"
            component={AntInput}
            name="codiceMigrazione2"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Codice sessione"
            component={AntInput}
            name="codiceSessione"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Codice Olo Donating"
            component={AntInput}
            name="codiceOloDonating"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Canale Di Vendita"
            component={AntInput}
            name="canaleDiVendita"
            type="text"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Data Invio Richiesta"
            component={AntDatePicker}
            name="dataInvioRichiesta"
            format={dateFormat}
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="DRO"
            component={AntDatePicker}
            name="dro"
            format={dateFormat}
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            component={AntSelect}
            name="classeServizio"
            label="Classe Servizio"
          />
        </Col>
        <Col xl={4} lg={6} md={6} sm={8} xs={12}>
          <Field
            label="Id Dealer"
            component={AntInput}
            name="idDealer"
            type="text"
          />
        </Col>
        <Col xl={8} lg={12} md={12} sm={16} xs={24}>
          <Field
            label="Numerazione"
            component={AntTextArea}
            name="numerazioniPortate"
            type="text"
          />
        </Col>
      </Row>
    </div>
  );
}
