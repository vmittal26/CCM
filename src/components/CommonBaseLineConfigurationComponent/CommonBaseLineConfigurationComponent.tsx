import * as React from "react";
import ReactTable from "react-table";
import { Icon } from "antd";
import {headerConfig, dummyParameterData , dummySubGroupData ,dummyGroupData} from "./commonBaseLineConfig";
import BaseComponent from "../BaseComponent/BaseComponent";

const parameterTable = (
  <ReactTable
   className="ParameterTable"
    style={{paddingLeft:"1rem"}}
    columns={headerConfig.headerConfig}
    loading={false}
    defaultPageSize={3}
    onPageSizeChange={() => {}}
    onPageChange={() => {}}
    data={dummyParameterData}
  />
);
const subgroupTable = (
  <ReactTable
    className="SubgroupTable"
    style={{paddingLeft:"1rem"}}
    columns={[
      {
        Header: "Subgroup Name",
        accessor: "subGroupName",
        headerClassName: "parentTableHeader",
        className: "cell-left",
        minWidth: 50
      }
    ]}
    data={dummySubGroupData}
    loading={false}
    defaultPageSize={3}
    onPageSizeChange={() => {}}
    onPageChange={() => {}}
    SubComponent={() => parameterTable}
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
          filterable
          defaultPageSize={10}
          previousText={<Icon style={{fontSize:"1rem"}} type="fast-backward" />}
          nextText={<Icon style={{fontSize:"1rem"}} type="fast-forward" />}
          onPageSizeChange={() => {}}
          onPageChange={() => {}}
          SubComponent={() => subgroupTable}
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


