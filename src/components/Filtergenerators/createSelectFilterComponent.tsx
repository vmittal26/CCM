import IMasterData from "../../model/IMasterData";
import * as React from "react";

export default async (url:string, axios:any, id:string) => {
    var response = await axios.get(url);
    console.log(response);
    let masterDataList: Array<IMasterData> = response.data;
    return {
      id: id,
      minWidth: 200,
      headerClassName: "header",
      Cell: ({ value }: any) => (value ? value.descrizione : null),
      Filter: (element: any) => {
        let { filter, onChange } = element;
        filter ? (filter.type = "EQUAL") : filter;
        filter =filter && filter.value === "0" ? (filter.type = "CLEAR") : filter;
        // console.log(filter);
        let optionList = masterDataList ? masterDataList.map((element: IMasterData) => 
                              <option key={element.id} value={element.id}>{element.descrizione}</option>):null;
  
  
        return (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ?filter.value : "0"}
          >
            <option value="0" />
            {optionList}
          </select>
        );
      }
    };
  }