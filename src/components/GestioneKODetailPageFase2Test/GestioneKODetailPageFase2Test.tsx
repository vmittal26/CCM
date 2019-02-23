import * as React from "react";
import * as ReactDOM from "react-dom";
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
import { notification, Modal } from "antd";
import getMasterDataFromMasterDataMap from "../../Utils/MasterDataContainer";
import MasterDataURLEnum from "../../model/constants/MasterDataURLEnum";
import 'antd/lib/notification/style/index.css';
import 'antd/lib/modal/style/index.css';
import IMasterData from "../../model/IMasterData";
import DetailPageContext from "./DetailPageContext/DetailPageContext";

interface IDetailPageState{
  detailPageData:any,
  tipiClienteSelectOptions:IMasterData[],
  tipiOrdineSelectOptions:IMasterData[],
  classeServizioOptions:IMasterData[]
}
class GestioneKODetailPageFase2 extends BaseComponent {

  private test:string="test";
  

  private validationSchema=Yup.object().shape({
                                              tipoOrdine: Yup.string().required()
                                              })

  private initialValues:any;
  private errors:Array<string>;
  private setShowModal:Function;

  constructor() {
    super();
    console.log("GestioneKODetailPageFase2 constructor");
  }

  private onToggleGestioneKO=()=>{
      console.log(this.test);
      
  }
  private setErrors(errors:Array<string>){
    this.errors = errors;
  }
  
  public onTipiClientChange=()=>{
    console.log("on tipiClienteChange");
  }
  
  private validate=(values:any):boolean=>{ 
    let errors:any = [];
    if (!values.numerazioniPortate ||(values.numerazioniPortate && values.numerazioniPortate.trim()===""))  {
      errors.push('Please Enter Numerazione');
    }
    if (!values.note ||(values.note && values.note.trim()===""))  {
      errors.push('Please Enter Note');
    }
    console.log(errors);
    this.setErrors(errors);
    this.setShowModal(this.errors.length>0);
    return !(this.errors.length>0);
  }

  //Arrow function points this to current context 
  public gestioneKODetailPageFase2=(componentProps: any):JSX.Element=> {

    console.log(componentProps.history.location.state.data);

    const detailPageState:IDetailPageState={
      detailPageData:componentProps.history.location.state.data,
      tipiClienteSelectOptions:[],
      tipiOrdineSelectOptions:getMasterDataFromMasterDataMap(MasterDataURLEnum.TipiOrdineList),
      classeServizioOptions:[]
    }
    const [state, setState] = React.useState<IDetailPageState>(detailPageState);

    const[showModal,setShowModal] = React.useState(false);
    this.setShowModal = setShowModal;

    const[loading,setLoading]= React.useState<boolean>(false);

    const onTipiClienteChange = (value:any)=>{
      // this.onTipiClientChange();
      // setTipoClienteSelectOptions([]);
      console.log(value);
      if(value==="3"){
        console.log("test1");
      }else{
        console.log("test2")
      }
      setState({
        ...state,
        tipiClienteSelectOptions:getMasterDataFromMasterDataMap(MasterDataURLEnum.TipiClienteList)
      })
    }

    React.useEffect(()=>{
      this.EE.on("onTipiClienteChange",onTipiClienteChange);
    return () => {
      console.log("removing onTipiClienteChange Listener on unmount");
      this.EE.removeListener("onTipiClienteChange", onTipiClienteChange);
    };
  }, []);

    this.initialValues = 
              state.detailPageData ? {
                ...state.detailPageData,
                dataLavorazione: state.detailPageData.dataLavorazione ?moment(state.detailPageData.dataLavorazione,dateFormat):null,
                dataFineSospensione:state.detailPageData.dataFineSospensione?moment(state.detailPageData.dataFineSospensione,dateFormat):null,
                dataInvioRichiesta:state.detailPageData.dataInvioRichiesta?moment(state.detailPageData.dataInvioRichiesta,dateFormat):null,
                dataChiusuraSegnalazione:state.detailPageData.dataChiusuraSegnalazione?moment(state.detailPageData.dataChiusuraSegnalazione,dateFormat):null,
                dataAperturaSegnalazione:state.detailPageData.dataAperturaSegnalazione?moment(state.detailPageData.dataAperturaSegnalazione,dateFormat):null,
                dataRispostaMailOpDonating:state.detailPageData.dataRispostaMailOpDonating?moment(state.detailPageData.dataRispostaMailOpDonating,dateFormat):null,
                droTi:state.detailPageData.droTi?moment(state.detailPageData.droTi,dateFormat):null,
                dataInvioMailOloDonatng:state.detailPageData.dataInvioMailOloDonatng?moment(state.detailPageData.dataInvioMailOloDonatng,dateFormat):null,
              }:{}

   let form =(

    <form>


      
    </form>
   );

    return (
      <>
      {loading?<><Backdrop show iswhite/><Spinner/></>:null}
      {form}
      <Modal title="Errors" 
             destroyOnClose 
             centered visible={showModal} 
             onOk={()=>setShowModal(false)} 
             onCancel={()=>setShowModal(false)}>
         {this.errors && this.errors.map((error:string)=><p className={"text-danger"}key ={error}>{error}</p>)}
        </Modal>
      </>
    )
  }

  public getComponent():React.FunctionComponent{
    return this.gestioneKODetailPageFase2;
  }
  
}

const gestioneKODetailPageFase2 = new GestioneKODetailPageFase2();

export default gestioneKODetailPageFase2.getComponent();
