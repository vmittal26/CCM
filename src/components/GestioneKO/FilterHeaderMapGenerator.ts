import axios from "../../config/axiosKTMConfig";
import createSelectFilterComponent from "../Filtergenerators/createSelectFilterComponent";
import createDateFilterComponent from "../Filtergenerators/createDateFilterComponent";
import MasterDataURLEnum from "../../model/constants/MasterDataURLEnum";


class FilterHeaderMapGenerator {
  private headerConfigMap = new Map<string, any>();

  constructor() {
    this.createHeaderMapConfig();
  }

  public createHeaderMapConfig() {
      this.headerConfigMap.set("TIPO_OPI", createSelectFilterComponent( MasterDataURLEnum.TipoOpiList, axios, "tipoOpi" ));
      this.headerConfigMap.set("TIPO_ORDINE", createSelectFilterComponent(MasterDataURLEnum.TipiOrdineList, axios, "tipoOrdine" ));
      this.headerConfigMap.set("DATA_CHIUSURA_SEGNALAZIONE", createDateFilterComponent());
      this.headerConfigMap.set("DATA_INVIO_MAIL", createDateFilterComponent());
      this.headerConfigMap.set( "DATA_INVIO_RICHIESTA", createDateFilterComponent() );
  }

  public getHeaderConfigMap() {
    return this.headerConfigMap;
  }
}

export default new FilterHeaderMapGenerator().getHeaderConfigMap;
