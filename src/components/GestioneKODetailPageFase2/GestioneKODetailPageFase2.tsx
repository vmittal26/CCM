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
    
    console.log(moment(detailPageData.dataInvioRichiesta));

    this.initialValues = 
                          detailPageData ? {
                           ...detailPageData,
                           dataLavorazione: detailPageData.dataLavorazione ?moment(detailPageData.dataLavorazione,dateFormat):moment(),
                           dataFineSospensione:detailPageData.dataFineSospensione?moment(detailPageData.dataFineSospensione,dateFormat):moment(),
                           dataInvioRichiesta:detailPageData.dataInvioRichiesta?moment(detailPageData.dataInvioRichiesta,dateFormat):moment(),
                           dataChiusuraSegnalazione:detailPageData.dataChiusuraSegnalazione?moment(detailPageData.dataChiusuraSegnalazione,dateFormat):moment(),
                           dataAperturaSegnalazione:detailPageData.dataAperturaSegnalazione?moment(detailPageData.dataAperturaSegnalazione,dateFormat):moment()
                         }:{}



    return (
      <Formik
        initialValues={this.initialValues}
        render={
          props => (
          <Form >
            <button type="submit" className="btn btn-primary ml-0">SALVA</button>
              <Collapsible trigger="Dati Generali" open>
                  <DatiGeneraliPanelFase2 />
               </Collapsible>
               <Collapsible trigger="Gestione KO" open={false} onOpening={this.onToggleGestioneKO} > 
                  <GestioneKOPanelFase2 /> 
              </Collapsible>
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
