import axios from "../../config/axiosKTMConfig";
import createSelectFilterComponent from "../../Utils/createSelectFilterComponent";
import createDateFilterComponent from "../../Utils/createDateFilterComponent";

var headerConfigMap = new Map();

(async()=>{
 let data = await createSelectFilterComponent("tipiOpiList/v1",axios,"tipoOpi");
 headerConfigMap.set("TIPO_OPI",data);
})();

(async()=>{
  let data = await createSelectFilterComponent("tipiOrdineList/v1",axios,"tipoOrdine");
  headerConfigMap.set("TIPO_ORDINE",data);
 })();


headerConfigMap.set("DATA_CHIUSURA_SEGNALAZIONE",createDateFilterComponent());
headerConfigMap.set("DATA_INVIO_MAIL",createDateFilterComponent());
headerConfigMap.set("DATA_INVIO_RICHIESTA",createDateFilterComponent());
export default headerConfigMap;
