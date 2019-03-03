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

interface IDetailPageState{
  detailPageData:any,
  tipiClienteSelectOptions:IMasterData[],
  tipiOrdineSelectOptions:IMasterData[],
  classeSerivizioOptions:IMasterData[],
  isTipiClienteDropDownLoading:boolean,
  isClasseSerivizioLoading:boolean
}
class GestioneKODetailPageFase2 extends BaseComponent {

  private test:string="test";
  private setState:Function;
  private state:IDetailPageState;
  private setLoading:Function;
  private validationSchema=Yup.object().shape({
                                              tipoOrdine: Yup.string().required()
                                              })

  private detailPageDataOnLoad:any;
  private errors:Array<string>;
  private setShowModal:Function;
  private history:any;

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

  public onTipiOrdineChange = (value:any,form:any)=>{
    
    console.log(value);
    console.log(form);
    if(value==="3"){
      console.log("test1");
    }else{
      console.log("test2")
    }
    this.setState({
      ...this.state,
      isTipiClienteDropDownLoading:true
    })
    setTimeout(()=>{
      this.setState({
        ...this.state,
        isTipiClienteDropDownLoading:false,
        tipiClienteSelectOptions:getMasterDataFromMasterDataMap(MasterDataURLEnum.TipiClienteList)
      })
    },1000)
  }

  public onTipiClienteChange = (value:any,form:any)=>{
    console.log(value);
    this.setState({
      ...this.state,
      isClasseSerivizioLoading:true
    })
    form.setFieldValue('numerazioniPortate', 'test');
    setTimeout(()=>{
      this.setState({
        ...this.state,
        isClasseSerivizioLoading:false,
        classeSerivizioOptions:getMasterDataFromMasterDataMap(MasterDataURLEnum.ClasseServizioList)
      });
      console.log(this.state);
    },1000)
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
  
  public onSubmit =(values:any)=>{
    console.log(values);
    if(this.validate(values)){
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
        this.setLoading(true);
         try{
          const response=  await axios.post("/gestioneko/v1/updateKO", detailPageData);
          console.log(response);
          this.history.replace("/gestioneKOSospesi",{isTableToReload:true})
          notification.open({
            message: 'Notifica',
            description: 'I dati vengono salvati con successo',
            duration: 2.5,
          });
         }catch(error){
           console.log(error);
           notification.open({
            message: 'Notifica',
            description: 'I dati vengono salvati con successo',
            duration: 2.5
          })
         }
      })();
    }
  }

  //Arrow function points this to current context 
  public gestioneKODetailPageFase2=(componentProps: any):JSX.Element=> {
    let detailPageDataOnLoad = componentProps.history.location.state.data;

    const detailPageData={
      ...detailPageDataOnLoad,
      dataLavorazione: detailPageDataOnLoad.dataLavorazione ?moment(detailPageDataOnLoad.dataLavorazione,dateFormat):null,
      dataFineSospensione:detailPageDataOnLoad.dataFineSospensione?moment(detailPageDataOnLoad.dataFineSospensione,dateFormat):null,
      dataInvioRichiesta:detailPageDataOnLoad.dataInvioRichiesta?moment(detailPageDataOnLoad.dataInvioRichiesta,dateFormat):null,
      dataChiusuraSegnalazione:detailPageDataOnLoad.dataChiusuraSegnalazione?moment(detailPageDataOnLoad.dataChiusuraSegnalazione,dateFormat):null,
      dataAperturaSegnalazione:detailPageDataOnLoad.dataAperturaSegnalazione?moment(detailPageDataOnLoad.dataAperturaSegnalazione,dateFormat):null,
      dataRispostaMailOpDonating:detailPageDataOnLoad.dataRispostaMailOpDonating?moment(detailPageDataOnLoad.dataRispostaMailOpDonating,dateFormat):null,
      droTi:detailPageDataOnLoad.droTi?moment(detailPageDataOnLoad.droTi,dateFormat):null,
      dataInvioMailOloDonatng:detailPageDataOnLoad.dataInvioMailOloDonatng?moment(detailPageDataOnLoad.dataInvioMailOloDonatng,dateFormat):null,
    }


    const detailPageState:IDetailPageState={
      detailPageData,
      tipiClienteSelectOptions:[],
      tipiOrdineSelectOptions:getMasterDataFromMasterDataMap(MasterDataURLEnum.TipiOrdineList),
      classeSerivizioOptions:[],
      isTipiClienteDropDownLoading:false,
      isClasseSerivizioLoading:false
    }
   
    this.history = componentProps.history;
    const [state, setState] = React.useState<IDetailPageState>(detailPageState);
    const[showModal,setShowModal] = React.useState(false);
    const[loading,setLoading]= React.useState<boolean>(false);

    this.setShowModal = setShowModal;
    this.state = state;
    this.setState = setState;
    this.setLoading = setLoading;
   
    let form = (
    <Formik
    enableReinitialize
    initialValues={state.detailPageData}
    children={(
      <Form  className="DetailPagePanel">
        <div className="DetailPagePanel__ButtonSection"> 
          <button type="button" onClick={()=>componentProps.history.replace("/gestioneKOSospesi",{isTableToReload:false})} className="btn btn-primary">INDIETRO</button>
          <button type="submit" className="btn btn-primary">SALVA</button>
        </div>
        <div>
        <div className="DetailPagePanel__PanelSection">
           <Collapsible trigger="Dati Generali" open>
                <DatiGeneraliPanelFase2    
                    isTipiClienteDropDownLoading={state.isTipiClienteDropDownLoading}
                    tipoOrdineSelectOptions={state.tipiOrdineSelectOptions}
                    tipoClienteSelectOptions={state.tipiClienteSelectOptions}
                    classeSerivizioOptions={state.classeSerivizioOptions}
                    isClasseSerivizioLoading={state.isClasseSerivizioLoading}/>
            </Collapsible>
            <Collapsible trigger="Gestione KO" open={false} onOpening={this.onToggleGestioneKO} > 
                <GestioneKOPanelFase2 /> 
            </Collapsible>
        </div>
        </div>
       </Form >
      )}
    onSubmit={this.onSubmit}
   
    //  validationSchema={this.validationSchema}
  />);  

    React.useEffect(()=>{
        this.EE.on("onTipiOrdineChange",this.onTipiOrdineChange);
        this.EE.on("onTipiClienteChange",this.onTipiClienteChange);
        this.EE.emit("onNavigation",[{breadCrumbName:"House Keeping"},{breadCrumbName:"User Management"}]);
        return () => {
          console.log("removing onTipiOrdineChange Listener on unmount");
          this.EE.removeListener("onTipiOrdineChange", this.onTipiOrdineChange);
          console.log("removing onTipiClienteChange Listener on unmount");
          this.EE.removeListener("onTipiClienteChange", this.onTipiClienteChange);
        };
    }, []);
    
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
