import * as React from "react";
import ReactTable from "react-table";
import { Icon } from "antd";
import {headerConfig, dummyParameterData , dummySubGroupData1 ,dummySubGroupData2,dummyGroupData} from "./commonBaseLineConfig";
import BaseComponent from "../BaseComponent/BaseComponent";
import SubGroupTableComponent from "../SubGroupTableComponent/SubGroupTableComponent";
import { axiosBaseLineManagement } from "../../config/axiosConfig";
import CommonBaseLineGroupChildGroupComponent from "../CommonBaseLineGroupChildGroupComponent/CommonBaseLineGroupChildGroupComponent";

class CommonBaseLineConfigurationContainer extends BaseComponent{

  private state:any;
  private setState:Function;
  private selectedNodeTypeId:string;

  constructor(){
    super();
  }

  public onNodeTypeSelection = (nodeTypeId:string)=>{
      console.log(nodeTypeId);
      this.selectedNodeTypeId = nodeTypeId;
      (async()=>{
         const response = await axiosBaseLineManagement.get(`api/base-config-manager/v1/baseconfig/getGroupDetails/${nodeTypeId}`);

        this.setState({
          ...this.state,
          loading:false,
          tableData:response.data
        });

      })();
  }
  public commonBaseLineComponent = (props:any):JSX.Element=>{

    const[state,setState ] = React.useState({
      tableData:[],
      loading:true
    })

    this.state = state;
    this.setState = setState;

    React.useEffect(()=>{

      this.EE.on("onNodeTypeSelection", this.onNodeTypeSelection)
      return()=>{
        this.EE.removeListener("onNodeTypeSelection", this.onNodeTypeSelection);
      }
    },[])

    return (
      <div className="BaseLineManagement__CommonBaseLineConfiguration">
        <ReactTable
          columns={[
            {
              Header: "Group Name",
              accessor: "groupName",
              headerClassName: "parentTableHeader",
              className: "cell-left",
              minWidth: 50
            }
          ]}
          data={state.tableData}
          showPagination={true}
          loading={state.loading}
          showPaginationTop={true}
          showPaginationBottom={false}
          freezeWhenExpanded={true}
          filterable
          defaultPageSize={10}
          previousText={<Icon style={{fontSize:"1rem"}} type="fast-backward" />}
          nextText={<Icon style={{fontSize:"1rem"}} type="fast-forward" />}
          onPageSizeChange={() => {}}
          onPageChange={() => {}}
          SubComponent={(row)=>{console.log(row);return <CommonBaseLineGroupChildGroupComponent nodeTypeId={this.selectedNodeTypeId} groupId={row.original.groupId}/>}}
        />
      </div>
    );
  }

 
  public getComponent=():React.FunctionComponent=>{
    return this.commonBaseLineComponent
  }
}

export const commonBaseLineConfigurationContainer = new CommonBaseLineConfigurationContainer();

export default commonBaseLineConfigurationContainer.getComponent();


