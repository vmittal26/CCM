import * as React from "react";
import Collapsible from "react-collapsible";
import BaseComponent from "../BaseComponent/BaseComponent";
import DatiGeneraliPanelFase2 from "../Sharedcomponents/DatiGenaraliPanelFase2/DatiGenaraliPanelFase2";
import GestioneKOPanelFase2 from "../Sharedcomponents/GestioneKOPanelFase2/GestioneKOPanelFase2";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
import { dateFormat } from "../../Utils/DateFormat";
import axios from "../../config/axiosKTMConfig";
import Spinner from "../UI/Spinner/Spinner";
import Backdrop from "../UI/Backdrop/Backdrop";

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
  public gestioneKODetailPageFase2=(componentProps: any):JSX.Element=> {

    console.log(componentProps.history.location.state.data);

    const [detailPageData, setDetailPageData] = React.useState( componentProps.history.location.state.data);

    const[loading,setLoading]= React.useState<boolean>(false);

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

    let form = (
    <Formik
    initialValues={this.initialValues}
    children={(
      <Form  className="DetailPagePanel">
        <div className="DetailPagePanel__ButtonSection"> 
          <button type="button" onClick={()=>componentProps.history.goBack()} className="btn btn-primary">INDIETRO</button>
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
        </div>
        </div>
       </Form >
      )}
    onSubmit={(values,props)=>{
          console.log(values);
          let detailPageData:any = {
            ...values,
            dataLavorazione: values.dataLavorazione ?values.dataLavorazione.format(dateFormat):null,
            dataFineSospensione:values.dataFineSospensione?values.dataFineSospensione.format(dateFormat):null,
            dataInvioRichiesta:values.dataInvioRichiesta?values.dataInvioRichiesta.format(dateFormat):null,
            dataChiusuraSegnalazione:values.dataChiusuraSegnalazione?values.dataChiusuraSegnalazione.format(dateFormat):null,
            dataAperturaSegnalazione:values.dataAperturaSegnalazione?values.dataAperturaSegnalazione.format(dateFormat):null,
            dataRispostaMailOpDonating:values.dataRispostaMailOpDonating?values.dataRispostaMailOpDonating.format(dateFormat):null,
            droTi:values.droTi?values.droTi.format(dateFormat):null,
            dataInvioMailOloDonatng:values.dataInvioMailOloDonatng?values.dataInvioMailOloDonatng.format(dateFormat):null,
          }

          console.log(detailPageData);

          (async()=>{
            setLoading(true);
              const response=  await axios.post("/gestioneko/v1/updateKO", detailPageData);
              console.log(response);
              componentProps.history.replace("/gestioneKO")
          })();
          
        
    }}
    validate={(values)=>{ 
      let errors:any = {};
      if (values.tipiOrdine && values.tipiOrdine.descrizione && values.tipiOrdine.descrizione.trim()==="")  {
        errors.tipiOrdine.descrizione = 'Required';
      } 
      console.log(errors);
      return errors;
    }}
    //  validationSchema={this.validationSchema}
  />);

    return (
      <>
      {loading?<><Backdrop show iswhite/><Spinner/></>:null}
      {form}
      </>
    )
  }

  public getComponent():React.FunctionComponent{
    return this.gestioneKODetailPageFase2;
  }
  
}

const gestioneKODetailPageFase2 = new GestioneKODetailPageFase2();

export default gestioneKODetailPageFase2.getComponent();
