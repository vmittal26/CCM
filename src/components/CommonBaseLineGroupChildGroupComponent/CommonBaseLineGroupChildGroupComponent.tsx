import * as React from 'react'
import BaseComponent from '../BaseComponent/BaseComponent';
import SubGroupTableComponent from '../SubGroupTableComponent/SubGroupTableComponent';
import ParameterGroupTableComponent from '../ParameterGroupTableComponent/ParameterGroupTableComponent';
import { axiosNodeManagement, axiosBaseLineManagement } from '../../config/axiosConfig';
import {
    dummyParameterData
} from "../ParameterGroupTableComponent/parameterHeaderConfig";
import {dummySubGroupData1} from "../SubGroupTableComponent/subGroupBaseLineConfig";

import Spinner from '../UI/Spinner/Spinner';
export const groupIdSubgroupMap= new Map<string,[]>();
export const groupIdParametersMap= new Map<string,[]>();



export default function CommonBaseLineGroupChildGroupComponent({segmentId , groupId, nodeTypeId}:any) {

  const [state , setState] = React.useState({
        isCheckChildGroupComponent:true,
        isSubGroupExists:false,
        subGroupData:[],
        parameterData:[]
  });

  React.useEffect(() => {
    (async()=>{ 
      let response= null;
      let isSubGroupExists = false;
      if(groupId){
         response = await axiosBaseLineManagement.get(`api/base-config-manager/v1/baseconfig/getSubGroupDetails/${groupId}`);
         console.log(response);
         isSubGroupExists= response.data.length>0;
         if(isSubGroupExists){
          setState({
              ...state,
              isCheckChildGroupComponent:false,
              isSubGroupExists,
              subGroupData:response.data
            });
        }else{
          if(!groupIdParametersMap.has(groupId)){
            try{
              response = await axiosBaseLineManagement.get(`api/base-config-manager/v1/baseconfig/getParameters/${nodeTypeId}/${groupId}`);
              let parameterData = response.data;
              setState({
                  ...state,
                  isCheckChildGroupComponent:false,
                  isSubGroupExists,
                  parameterData
                });
                groupIdParametersMap.set(groupId,parameterData);
            }catch{
              setState({
                ...state,
                isCheckChildGroupComponent:false,
                isSubGroupExists,
                parameterData:dummyParameterData
              });
              groupIdParametersMap.set(groupId,dummyParameterData);
            }
          }else{
            setState({
              ...state,
              isCheckChildGroupComponent:false,
              isSubGroupExists,
              parameterData:groupIdParametersMap.get(groupId)
            });
          }
        }
      }else if(segmentId){
         isSubGroupExists = true;
         if(isSubGroupExists){
          setState({
              ...state,
              isCheckChildGroupComponent:false,
              isSubGroupExists,
              subGroupData:dummySubGroupData1
            });
        //  response = await axiosBaseLineManagement.get(`api/base-config-manager/v1/baseconfig/getSubGroupDetails/${groupId}`);
      }
    }
    // let isSubGroupExists = false;
     
  })();
},[]);
  
  return (
     <div className="CommonBaseLineGroupChildGroupComponent">
        {state.isCheckChildGroupComponent?<Spinner/>:state.isSubGroupExists? <SubGroupTableComponent  parent={segmentId?"segmentBaseline":"commonBaseline"} nodeTypeId={nodeTypeId} subGroupData={state.subGroupData}/> : <ParameterGroupTableComponent parent={segmentId?"segmentBaseline":"commonBaseline"} nodeTypeId ={nodeTypeId} groupId={groupId} tableData={dummyParameterData}/>}
     </div>
  )
}
