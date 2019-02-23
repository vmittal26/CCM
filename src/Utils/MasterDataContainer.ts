import IMasterData from "../model/IMasterData";
import axios from "../config/axiosKTMConfig";
import MasterDataURLEnum from "../model/constants/MasterDataURLEnum";
import { AxiosResponse } from "axios";

class MasterDataContainer {
  private masterDataMap = new Map<String, AxiosResponse<IMasterData[]>>();

  private masterDataArray: Array<string> = Object.values(MasterDataURLEnum);

  constructor() {
    console.log("Getting MasterData...");
    this.getMasterData();
    console.log("Master Data is loaded");
    Object.keys(MasterDataURLEnum);
  }

  public *masterDataGenerator() {
    for (let i = 0; i < this.masterDataArray.length; i++) {
      yield axios.get(this.masterDataArray[i]);
    }
  }

  public async getMasterData() {
    let i = 0;
    for await (let x of this.masterDataGenerator()) {
      // console.log(x);
      this.masterDataMap.set(this.masterDataArray[i++], x);
    }
  }

  public getMasterDataFromMasterDataMap = (url: string): IMasterData[] => {
    // console.log("getting master data for url " + url);
    //console.log(this.masterDataMap);
    return this.masterDataMap.get(url).data;
  };
}
export const masterDataContainer = new MasterDataContainer();

export default masterDataContainer.getMasterDataFromMasterDataMap;
