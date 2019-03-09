import * as React from "react";
import ReactTable from "react-table";
import headers from "./individualTableHeaderConfig";
import CommonBaseLineConfigurationComponent from "../CommonBaseLineConfigurationComponent/CommonBaseLineConfigurationComponent";
import { Icon } from "antd";

const checkboxHeader = {
  Header: "#",
  minWidth: 50,
  className: "cell",
  headerClassName: "header",
  Cell: (row: any) => {
    return (
      <input
        className="checkbox"
        type="checkbox"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          let checkbox = event.target;
          // highlightRowOnChangeCheckbox(checkbox);
          console.log(row);
          if (e.target.checked) {
          } else {
          }
        }}
      />
    );
  }
};
const dummyData = [
  {
    nodeDetailName: "Test1",
    parameterName: "test parameter",
    parameterValue: "test value"
  },
  {
    nodeDetailName: "Test2",
    parameterName: "test parameter2",
    parameterValue: "test value2"
  }
];

export default function IndividualTable(props: any) {
  return (
    <div className={props.className}>
      <ReactTable
        columns={[checkboxHeader, ...headers.headerConfig]}
        showPagination={true}
        loading={false}
        showPaginationTop={true}
        showPaginationBottom={false}
        filterable
        defaultPageSize={5}
        onPageSizeChange={() => {}}
        onPageChange={() => {}}
        previousText={<Icon style={{fontSize:"1rem"}} type="fast-backward" />}
        nextText={<Icon style={{fontSize:"1rem"}} type="fast-forward" />}
        // onFetchData={this.fetchData}
        data={dummyData}
      />
    </div>
  );
}
