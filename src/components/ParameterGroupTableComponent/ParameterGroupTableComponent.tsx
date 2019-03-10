import * as React from "react";
import ReactTable from "react-table";
import {
    headerConfig,
    dummyParameterData
} from "./parameterHeaderConfig";

const subGroupIdParameterDataMap= new Map<string,[]>();

const ParameterGroupTableComponent = ({subGroupId}:any): JSX.Element => {
  const [subParameterTableState, setParameterTableState] = React.useState({
    isParameterDataLoading: !subGroupIdParameterDataMap.has(subGroupId),
    parameterGroupData:subGroupIdParameterDataMap.get(subGroupId)
  });

  const getParameterData = ()=>{
    if(!subGroupIdParameterDataMap.has(subGroupId)){
        console.log("inside getParameterData")
     
        if (subGroupId === "1") {
            setTimeout(() => {
                setParameterTableState({
                isParameterDataLoading: false,
                parameterGroupData: dummyParameterData
                });
                subGroupIdParameterDataMap.set(subGroupId,dummyParameterData);
            }, 1000);
            } else if (subGroupId === "2") {
                setTimeout(() => {
                    setParameterTableState({
                        isParameterDataLoading: false,
                        parameterGroupData: dummyParameterData
                });
                subGroupIdParameterDataMap.set(subGroupId,dummyParameterData);
                }, 1000);
            }
    }
  }


    let parametersTable =  <ReactTable
                            className="ParameterTable"
                            style={{ paddingLeft: "4rem" }}
                            columns={headerConfig.headerConfig}
                            data={subParameterTableState.parameterGroupData}
                            onFetchData = {getParameterData}
                            loading={subParameterTableState.isParameterDataLoading}
                            defaultPageSize={10}
                            onPageSizeChange={() => {}}
                            onPageChange={() => {}}
                            // SubComponent={}
                            />
  return  parametersTable;
};


export default ParameterGroupTableComponent;