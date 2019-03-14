import * as React from "react";
import ReactTable from "react-table";
import {
  dummySubGroupData1,
  dummySubGroupData2
} from "./subGroupBaseLineConfig";
import ParameterGroupTableComponent from "../ParameterGroupTableComponent/ParameterGroupTableComponent";
import "./SubGroupTableComponent.css";

export const groupIdSubgroupMap= new Map<string,[]>();

const getAddParameterCell = ()=>{
  return (
    {
    Header: "Add Parameter",
    minWidth: 100,
    className: "cell-left",
    headerClassName: "subGroupTableHeader",
    Cell: (row: any) => {

      return (
        <button disabled className="btn btn-primary btn-sm">Add Parameter</button>
      );
    }
  }
  );
}
const subGroupTable = ({parent , subGroupData , nodeTypeId}:any): JSX.Element => {
 
 let subGroupTable =  <ReactTable
                            className="SubgroupTable"
                            style={{ paddingLeft: "3rem" }}
                            columns={[
                                {
                                Header: "Subgroup Name",
                                accessor: "subGroupName",
                                headerClassName:"subGroupTableHeader",
                                className: "cell-left",
                                minWidth: 40
                                },
                                getAddParameterCell()
                            ]}
                            data={subGroupData}
                            freezeWhenExpanded
                            // onFetchData = {getSubGroupData}
                            loading={subGroupData?false:true}
                            defaultPageSize={10}
                            onPageSizeChange={() => {}}
                            onPageChange={() => {}}
                            SubComponent={(row)=>{return <ParameterGroupTableComponent parent={parent} nodeTypeId={nodeTypeId} subGroupId={row.original.subGroupId}/>}}
                            />
  return  subGroupTable;
};


export default React.memo(subGroupTable);