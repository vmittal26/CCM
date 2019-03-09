import * as React from "react";
import ReactTable from "react-table";
import parameterHeaderConfig from "./parameterHeaderConfig";
import { Icon } from "antd";
const dummyGroupData = [
    {
      groupName: "Group1"
    },
    { groupName: "Group2" }
  ];

const dummySubGroupData = [
    {
      subGroupName: "Sub Group1"
    },
    { subGroupName: "Sub Group2" }
  ];
const dummyParameterData = [
    {
        parameterName: "XXX",
        parameterValue:"200",
        parameterDescription:"This is XXX  Description"
    },
    {
        parameterName: "YYY",
        parameterValue:"100",
        parameterDescription:"This is YYY  Description"
    },
    {
        parameterName: "ZZZ",
        parameterValue:"150",
        parameterDescription:"This is ZZZ  Description"
    },
    {
        parameterName: "PQR",
        parameterValue:"200",
        parameterDescription:"This is PQR  Description"
    },
  ];
const parameterTable = (
  <ReactTable
   className="ParameterTable"
    style={{paddingLeft:"1rem"}}
    columns={parameterHeaderConfig.headerConfig}
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

export default function CommonBaseLineConfigurationComponent(props: any) {
  return (
    <div className={props.className}>
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
        defaultPageSize={5}
        previousText={<Icon style={{fontSize:"1rem"}} type="fast-backward" />}
        nextText={<Icon style={{fontSize:"1rem"}} type="fast-forward" />}
        onPageSizeChange={() => {}}
        onPageChange={() => {}}
        SubComponent={() => subgroupTable}
      />
    </div>
  );
}
