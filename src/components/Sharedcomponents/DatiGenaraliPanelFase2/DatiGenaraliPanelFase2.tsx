import {Col, Row} from "antd";
import * as React from "react";
import {FastField,Field} from "formik";
import {AntInput, AntDatePicker, AntSelect, AntTextArea} from "../../../Utils/AntDesignFieldCreator";
import {dateFormat} from "../../../Utils/DateFormat";
import 'antd/lib/grid/style/index.css';
import eventEmitter from "../../../EventEmitter";
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

interface IProps{
    onFieldChange:Function
}
export default function DatiGeneraliPanelFase2(props:any) {

    return (
        <div className="DetailPagePanelContainer">
            <Row gutter={16} className="DetailPagePanel">
                <Col xl={4} lg={6} md={6} sm={8} xs={12}>
                    <Field
                        label="Tipo Ordine"
                        component={AntSelect}
                        name="tipoOrdine"
                        selectOptions={props.tipoOrdineSelectOptions}
                        onChange={(value:any,form:any)=>eventEmitter.emit("onTipiOrdineChange",value,form)}
                        // type="text"
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
                    <Field
                        label="Tipo Cliente"
                        component={AntSelect}
                        name="tipoCliente"
                        selectOptions={props.tipoClienteSelectOptions}
                        loading={props.isTipiClienteDropDownLoading}
                        onChange={(value:any,form:any)=>eventEmitter.emit("onTipiClienteChange",value,form)}
                        />
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
                    <Field 
                        component={AntSelect} 
                        name="classeServizio" 
                        label="Classe Servizio"
                        loading={props.isClasseSerivizioLoading} 
                        selectOptions={props.classeSerivizioOptions}/>
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
