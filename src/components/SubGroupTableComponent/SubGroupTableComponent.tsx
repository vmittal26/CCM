import * as React from "react";
import BaseComponent from "../BaseComponent/BaseComponent";
import ReactTable from "react-table";
import {
  dummySubGroupData1,
  dummySubGroupData2
} from "./subGroupBaseLineConfig";
import ParameterGroupTableComponent from "../ParameterGroupTableComponent/ParameterGroupTableComponent";

const groupIdSubgroupMap= new Map<string,[]>();

const subGroupTable = ({groupId}:any): JSX.Element => {
  const [subGroupState, setSubGroupState] = React.useState({
    isSubGroupDataLoading: !groupIdSubgroupMap.has(groupId),
    subGroupData:groupIdSubgroupMap.get(groupId)
  });

  const getSubGroupData = ()=>{
    if(!groupIdSubgroupMap.has(groupId)){
        console.log("inside getSubGroupData")
     
        if (groupId === "1") {
            setTimeout(() => {
                setSubGroupState({
                isSubGroupDataLoading: false,
                subGroupData: dummySubGroupData1
                });
                groupIdSubgroupMap.set(groupId,dummySubGroupData1);
            }, 1000);
            } else if (groupId === "2") {
                setTimeout(() => {
                setSubGroupState({
                    isSubGroupDataLoading: false,
                    subGroupData: dummySubGroupData2
                });
                groupIdSubgroupMap.set(groupId,dummySubGroupData2);
                }, 1000);
            }
    }
  }


    let subGroupTable =  <ReactTable
                            className="SubgroupTable"
                            style={{ paddingLeft: "3rem" }}
                            columns={[
                                {
                                Header: "Subgroup Name",
                                accessor: "subGroupName",
                                headerClassName: "parentTableHeader",
                                className: "cell-left",
                                minWidth: 50
                                }
                            ]}
                            data={subGroupState.subGroupData}
                            onFetchData = {getSubGroupData}
                            loading={subGroupState.isSubGroupDataLoading}
                            defaultPageSize={10}
                            onPageSizeChange={() => {}}
                            onPageChange={() => {}}
                            SubComponent={(row)=>{console.log(row);return <ParameterGroupTableComponent subGroupId={row.original.subGroupId}/>}}
                            />
  return  subGroupTable;
};


export default React.memo(subGroupTable);