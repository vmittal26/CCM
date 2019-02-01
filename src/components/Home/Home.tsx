import * as React from "react";
import { Row, Col } from "antd";

export default()=>{4
    return (<Row className="TileContainer" type="flex" >
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Gestione KO</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Gestione KO Sospesi</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Segnalazioni Chiuse TIM</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Sospensioni Vodafone</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Sospensioni TIM</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Accodamenti</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Ricerca Rimodulazioni DAD</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Rimodulazioni DAD Vodafone</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Annullamenti</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Ricerca Annullamenti</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Ricerca Quarto Referente</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Ricerca Rimodulazioni DAC</span></Col>
      <Col xl={4} lg={6} md={8} sm={8} xs={12} className="TileContainer__item"><span>Rimodulazioni DAC Vodafone</span></Col>
    </Row>
    );
}
