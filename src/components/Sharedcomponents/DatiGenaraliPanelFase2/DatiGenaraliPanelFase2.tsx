import {Col, Row, Input, Select} from "antd";
import * as React from "react";
import {FastField} from "formik";
import {AntInput, AntDatePicker, AntSelect, AntTextArea} from "../../../Utils/AntDesignFieldCreator";
import {dateFormat} from "../../../Utils/DateFormat";

export default function DatiGeneraliPanelFase2() {

    return (
        <div className="DetailPagePanelContainer">
            <Row gutter={16} className="DetailPagePanel">
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Tipo Ordine"
                        component={AntInput}
                        name="tipiOrdine.descrizione"
                        type="text"
                        />
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Link Account"
                        component={AntInput}
                        name="linkAccount"
                        type="text"/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Codice Pratica"
                        component={AntInput}
                        name="codicePratica"
                        type="text"/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Codice Richiesta SPP"
                        component={AntInput}
                        name="codiceRichiestaSpp"
                        type="text"/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Tipo Cliente"
                        component={AntInput}
                        name="tipoCliente"
                        type="text"/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Codice Migrazione 1"
                        component={AntInput}
                        name="codiceMigrazione1"
                        type="text"/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Codice Migrazione 2"
                        component={AntInput}
                        name="codiceMigrazione2"
                        type="text"/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Codice sessione"
                        component={AntInput}
                        name="codiceSessione"
                        type="text"/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Codice Olo Donating"
                        component={AntInput}
                        name="codiceOloDonating"
                        type="text"/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Canale Di Vendita"
                        component={AntInput}
                        name="canaleVendita"
                        type="text"/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField
                        label="Data Invio Richiesta"
                        component={AntDatePicker}
                        name="dataInvioRichiesta"
                        format={dateFormat}/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField label="DRO" component={AntDatePicker} name="droTi" format={dateFormat}/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField component={AntSelect} name="classeServizio" label="Classe Servizio"/>
                </Col>
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <FastField label="Id Dealer" component={AntInput} name="idDealer" type="text"/>
                </Col>
                <Col xl={8} lg={12} md={12} sm={16} xs={24}>
                    <FastField
                        label="Numerazione"
                        component={AntTextArea}
                        name="numerazioniPortate"
                        ismandatory="true"
                        type="text"/>
                </Col>
            </Row>
        </div>
    );
}
