import * as React from "react";
import ReactTable from "react-table";
import { Icon } from "antd";
import {headerConfig, dummyParameterData , dummySubGroupData1 ,dummySubGroupData2,dummyGroupData} from "./commonBaseLineConfig";
import BaseComponent from "../BaseComponent/BaseComponent";
import SubGroupTableComponent from "../SubGroupTableComponent/SubGroupTableComponent";

const parameterTable = (
  <ReactTable
   className="ParameterTable"
    style={{paddingLeft:"1rem"}}
    columns={headerConfig.headerConfig}
    loading={false}
    showPagination={false}
    defaultPageSize={10}
    onPageSizeChange={() => {}}
    onPageChange={() => {}}
    data={dummyParameterData}
  />
);



class CommonBaseLineConfigurationContainer extends BaseComponent{

  constructor(){
    super();
  }

  public commonBaseLineComponent = (props:any):JSX.Element=>{

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
          data={dummyGroupData}
          showPagination={true}
          loading={false}
          showPaginationTop={true}
          showPaginationBottom={false}
          freezeWhenExpanded={true}
          filterable
          defaultPageSize={10}
          previousText={<Icon style={{fontSize:"1rem"}} type="fast-backward" />}
          nextText={<Icon style={{fontSize:"1rem"}} type="fast-forward" />}
          onPageSizeChange={() => {}}
          onPageChange={() => {}}
          SubComponent={(row)=>{console.log(row);return <SubGroupTableComponent groupId={row.original.groupId}/>}}
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


