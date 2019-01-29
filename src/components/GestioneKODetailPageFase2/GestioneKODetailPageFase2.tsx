import * as React from "react";
import Collapsible from "react-collapsible";
import BaseComponent from "../BaseComponent/BaseComponent";
import DatiGeneraliPanelFase2 from "../Sharedcomponents/DatiGenaraliPanelFase2/DatiGenaraliPanelFase2";
import GestioneKOPanelFase2 from "../Sharedcomponents/GestioneKOPanelFase2/GestioneKOPanelFase2";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
import { dateFormat } from "../../Utils/DateFormat";

class GestioneKODetailPageFase2 extends BaseComponent {

  private test:string="test";

  private validationSchema=Yup.object().shape({
                                              tipoOrdine: Yup.string().required()
                                              })

  private initialValues:any;                                  

  constructor() {
    super();
    console.log("GestioneKODetailPageFase2 constructor");
  }

  private onToggleGestioneKO=()=>{
      console.log(this.test);
      
  }

  //Arrow function points this to current context 
  public gestioneKODetailPageFase2=(props: any):JSX.Element=> {

    console.log(props.history.location.state.data);

    const [detailPageData, setDetailPageData] = React.useState( props.history.location.state.data);

    this.initialValues = 
              detailPageData ? {
                ...detailPageData,
                dataLavorazione: detailPageData.dataLavorazione ?moment(detailPageData.dataLavorazione,dateFormat):null,
                dataFineSospensione:detailPageData.dataFineSospensione?moment(detailPageData.dataFineSospensione,dateFormat):null,
                dataInvioRichiesta:detailPageData.dataInvioRichiesta?moment(detailPageData.dataInvioRichiesta,dateFormat):null,
                dataChiusuraSegnalazione:detailPageData.dataChiusuraSegnalazione?moment(detailPageData.dataChiusuraSegnalazione,dateFormat):null,
                dataAperturaSegnalazione:detailPageData.dataAperturaSegnalazione?moment(detailPageData.dataAperturaSegnalazione,dateFormat):null,
                dataRispostaMailOpDonating:detailPageData.dataRispostaMailOpDonating?moment(detailPageData.dataRispostaMailOpDonating,dateFormat):null,
                droTi:detailPageData.droTi?moment(detailPageData.droTi,dateFormat):null,
                dataInvioMailOloDonatng:detailPageData.dataInvioMailOloDonatng?moment(detailPageData.dataInvioMailOloDonatng,dateFormat):null,
              }:{}



    return (
      <Formik
        initialValues={this.initialValues}
        render={
          props => (
          <Form className="DetailPagePanel">
            <div className="DetailPagePanel__ButtonSection"> 
              <button className="btn btn-primary">INDIETRO</button>
              <button type="submit" className="btn btn-primary">SALVA</button>
            </div>
            <div>
            <div className="DetailPagePanel__PanelSection">
              <Collapsible trigger="Dati Generali" open>
                    <DatiGeneraliPanelFase2 />
                </Collapsible>
                <Collapsible trigger="Gestione KO" open={false} onOpening={this.onToggleGestioneKO} > 
                    <GestioneKOPanelFase2 /> 
                </Collapsible>
                <Collapsible trigger="Gestione KO" open={false} onOpening={this.onToggleGestioneKO} > 
                    <GestioneKOPanelFase2 /> 
                </Collapsible>
                <Collapsible trigger="Gestione KO" open={false} onOpening={this.onToggleGestioneKO} > 
                    <GestioneKOPanelFase2 /> 
                </Collapsible>
                <Collapsible trigger="Gestione KO" open={false} onOpening={this.onToggleGestioneKO} > 
                    <GestioneKOPanelFase2 /> 
                </Collapsible>
                
            </div>
            </div>
           </Form>
          )}
        onSubmit={(values) => console.log(values)}
        validationSchema={this.validationSchema}
      />
    );
  }

  public getComponent():React.FunctionComponent{
    return this.gestioneKODetailPageFase2;
  }
  
}

const gestioneKODetailPageFase2 = new GestioneKODetailPageFase2();

export default gestioneKODetailPageFase2.getComponent();
