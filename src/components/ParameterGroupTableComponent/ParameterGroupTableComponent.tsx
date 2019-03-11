import * as React from "react";
import ReactTable from "react-table";
import {
    headerConfig,
    dummyParameterData
} from "./parameterHeaderConfig";
import ParameterForm from "../ParameterForm/ParameterForm";
import { Modal, Icon } from "antd";
import "antd/lib/modal/style/index.css";
const subGroupIdParameterDataMap= new Map<string,[]>();

let state:any=null;
let setState:Function=null;

const onEditParameterForm = function(values:any){
    console.log(values);
    let data  = state.parameterGroupData.filter((parameter:any)=>parameter.parmeterBaseLineId !== values.parmeterBaseLineId);
    setState({
      ...state,
      parameterGroupData:[values,...data],
      isParameterFormVisible:false
    });
}

const onCancelEdit = function(){
  
}




const ParameterGroupTableComponent = ({subGroupId}:any): JSX.Element => {
  const [subParameterTableState, setParameterTableState] = React.useState({
    isParameterDataLoading: !subGroupIdParameterDataMap.has(subGroupId),
    parameterGroupData:subGroupIdParameterDataMap.get(subGroupId),
    isParameterFormVisible:false,
    parametersToBeUpdated:{}
    
  });
  state = subParameterTableState;
  setState = setParameterTableState;

  const getEditRow = ()=>{
    return (
      {
      Header: "Add/Edit",
      minWidth: 100,
      className: "cell",
      headerClassName: "header",
      Cell: (row: any) => {

        return (
          <div className="TableRowButtons">
            <Icon  onClick={(e:any)=>{
              console.log(row.original);
                setParameterTableState({
                ...subParameterTableState,
                parametersToBeUpdated:{...row.original},
                isParameterFormVisible:true
            })}} type="edit" />
            <Icon  onClick={(e:any)=>{
                setParameterTableState({
                ...subParameterTableState,
                parametersToBeUpdated:{},
                isParameterFormVisible:true
            })}} type="plus" />
          </div>
        );
      }
    }
    );
  }

  const getParameterData = ()=>{
    if(!subGroupIdParameterDataMap.has(subGroupId)){
        console.log("inside getParameterData")
     
        if (subGroupId === "1") {
            setTimeout(() => {
                setParameterTableState({
                  ...subParameterTableState,
                isParameterDataLoading: false,
                parameterGroupData: dummyParameterData
                });
                subGroupIdParameterDataMap.set(subGroupId,dummyParameterData);
            }, 1000);
            } else if (subGroupId === "2") {
                setTimeout(() => {
                    setParameterTableState({
                        ...subParameterTableState,
                        isParameterDataLoading: false,
                        parameterGroupData: dummyParameterData
                });
                subGroupIdParameterDataMap.set(subGroupId,dummyParameterData);
                }, 1000);
            }
    }
  }
   let parameterForm = <ParameterForm  
                            initialValues = {subParameterTableState.parametersToBeUpdated} 
                            onSubmit={onEditParameterForm} 
                            onCancel={onCancelEdit}/>
   let parameterModal =  <Modal
                            title="Add/Edit Parameter"
                            width='25rem'
                            centered
                            footer={null}
                            visible={subParameterTableState.isParameterFormVisible}
                            onCancel={() => {
                              setState({ ...subParameterTableState, isParameterFormVisible: false });
                            }}>
                            <div style={{ position: "relative" }}>
                              { parameterForm}
                            </div>
                          </Modal>

    let parametersTable =  <ReactTable
                            className="ParameterTable"
                            style={{ paddingLeft: "4rem" }}
                            columns={[getEditRow(),...headerConfig.headerConfig]}
                            data={subParameterTableState.parameterGroupData}
                            onFetchData = {getParameterData}
                            loading={subParameterTableState.isParameterDataLoading}
                            defaultPageSize={10}
                            onPageSizeChange={() => {}}
                            onPageChange={() => {}}
                            // SubComponent={}
                            />
     return   ( <div className="ParameterGroupTableComponent">
                            {(subParameterTableState.isParameterFormVisible?parameterModal:null)}{parametersTable};
                </div>)
};


export default ParameterGroupTableComponent;