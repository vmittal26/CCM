import * as React from "react";
import axios from "../../config/axiosKTMConfig";
import createFilterComponent from "../../Utils/createFilterComponent";

var headerConfigMap = new Map();

(async()=>{
 let data = await createFilterComponent("tipiOpiList/v1",axios,"tipoOpi");
 headerConfigMap.set("TIPO_OPI",data);
})();

(async()=>{
  let data = await createFilterComponent("tipiOrdineList/v1",axios,"tipoOrdine");
  headerConfigMap.set("TIPO_ORDINE",data);
 })();

export default headerConfigMap;
