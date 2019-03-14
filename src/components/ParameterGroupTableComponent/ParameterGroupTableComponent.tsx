import * as React from "react";
import ReactTable from "react-table";
import {
    headerConfig,
    dummyParameterData
} from "./parameterHeaderConfig";
import ParameterForm from "../ParameterForm/ParameterForm";
import EE from "../../EventEmitter";
import { Modal, Icon } from "antd";
import "antd/lib/modal/style/index.css";
import { axiosBaseLineManagement } from "../../config/axiosConfig";
export const subGroupIdParameterDataMap= new Map<string,[]>();
export const groupIdParmetersMap= new Map<string,[]>();
export const parametersModificationsMap = new Map<string,[]>();

let state:any=null;
let setState:Function=null;
let currentSubGroupId:string=null;
let currentGroupId:string=null;
let parentName:string = null;

const onEditParameterForm = function(values:any){
    console.log(values);
    let data  = state.tableData.filter((parameter:any)=>parameter.parameterBaseLineId !== values.parameterBaseLineId);

    let tableData:any = [values,...data];
    setState({
      ...state,
      tableData,
      isParameterFormVisible:false
    });
    if(currentSubGroupId) {
      subGroupIdParameterDataMap.set(currentSubGroupId,tableData);
    }else if(currentGroupId){
      groupIdParmetersMap.set(currentGroupId,tableData);
    }

   parametersModificationsMap.set(values.parameterBaseLineId,values);
}

const onCancelEdit = function(){
  
}


const ParameterGroupTableComponent = ({ parent , subGroupId, groupId , tableData , nodeTypeId}:any): JSX.Element => {
  const [parameterTableState, setParameterTableState] = React.useState({
                                                              isParameterDataLoading: false,
                                                              tableData:subGroupId?subGroupIdParameterDataMap.get(subGroupId):(groupId?groupIdParmetersMap.get(groupId):[]),
                                                              isParameterFormVisible:false,
                                                              parametersToBeUpdated:{}
                                                            });
  state = parameterTableState;
  setState = setParameterTableState;
  currentSubGroupId = subGroupId;
  currentGroupId = groupId;
  parentName = parent;
  
  const getEditRow = ()=>{
    return (
      {
      Header: "Remove/Edit",
      minWidth: 100,
      className: "cell",
      headerClassName: "header",
      Cell: (row: any) => {

        return (
          <div className="TableRowButtons">
            <Icon type="delete" />
            <Icon  onClick={(e:any)=>{
              console.log(row.original);
                setParameterTableState({
                ...parameterTableState,
                parametersToBeUpdated:{...row.original},
                isParameterFormVisible:true
            })}} type="edit" />
          </div>
        );
      }
    }
    );
  }

  const getParameterData = ()=>{
    if(groupId && tableData){
      if(!groupIdParmetersMap.has(groupId)){
        setParameterTableState({
          ...parameterTableState,
            isParameterDataLoading: false,
            tableData
          });
        groupIdParmetersMap.set(groupId,tableData);
      }
    }else if(subGroupId){
      if(!subGroupIdParameterDataMap.has(subGroupId)){
        console.log("inside getParameterData");
     
        setParameterTableState({
          ...parameterTableState,
        isParameterDataLoading: true,
        });
        
        (async()=>{
          const response = await axiosBaseLineManagement.get(`/api/base-config-manager/v1/baseconfig/getParameterDetails/${nodeTypeId}/${subGroupId}`);
          console.log(response);
          let tableData = response.data;

          setParameterTableState({
            ...parameterTableState,
          isParameterDataLoading: false,
          tableData
          });
        })();
        // if (subGroupId === "1") {
        //     setTimeout(() => {
        //         setParameterTableState({
        //           ...parameterTableState,
        //         isParameterDataLoading: false,
        //         tableData: dummyParameterData
        //         });
        //         subGroupIdParameterDataMap.set(subGroupId,dummyParameterData);
        //     }, 1000);
        //     } else if (subGroupId === "2") {
        //         setTimeout(() => {
        //             setParameterTableState({
        //                 ...parameterTableState,
        //                 isParameterDataLoading: false,
        //                 tableData: dummyParameterData
        //         });
        //         subGroupIdParameterDataMap.set(subGroupId,dummyParameterData);
        //         }, 1000);
        //     }
         }
      }
    }

   let parameterForm = <ParameterForm  
                            initialValues = {parameterTableState.parametersToBeUpdated} 
                            onSubmit={onEditParameterForm} 
                            onCancel={onCancelEdit}/>
   let parameterModal =  <Modal
                            title="Edit Parameter"
                            width='25rem'
                            centered
                            footer={null}
                            visible={parameterTableState.isParameterFormVisible}
                            onCancel={() => {
                              setState({ ...parameterTableState, isParameterFormVisible: false });
                            }}>
                            <div style={{ position: "relative" }}>
                              { parameterForm}
                            </div>
                          </Modal>

    let parametersTable =  <ReactTable
                            className="ParameterTable"
                            style={{ paddingLeft: "4rem" }}
                            columns={[getEditRow(),...headerConfig.headerConfig]}
                            data={parameterTableState.tableData}
                            onFetchData = {getParameterData}
                            loading={parameterTableState.isParameterDataLoading}
                            defaultPageSize={10}
                            onPageSizeChange={() => {}}
                            onPageChange={() => {}}
                            // SubComponent={}
                            />

    React.useEffect(() => {
        
      EE.emit("onParameterTableExpansion",parentName);
    },[])

     
     return   ( <div className="ParameterGroupTableComponent">
                            {(parameterTableState.isParameterFormVisible?parameterModal:null)}{parametersTable};
                </div>)
};


export default ParameterGroupTableComponent;