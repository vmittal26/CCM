import * as React from "react";
import ITableState from "../../model/ITableState";
import axios from "../../config/axiosKTMConfig";
import getTableData from "../../Utils/getTableData";
import ReactTable from "react-table";
import filterAndHeaderConfigMap from "./FilterAndHeaderConfigMap";
import {
  onToggleSelectAllCheckBox,
  deselectAllCheckbox
} from "../../Utils/TableRowSelectionsUtil";
import Spinner from "../UI/Spinner/Spinner";
import highlightRowOnChangeCheckbox from "../../Utils/highlightRowOnChangeCheckbox";

export default function GestioneKO() {
  const [tableState, setTableState] = React.useState<ITableState>({
    data: [],
    columnHeaders: [],
    pages: null,
    loading: true,
  });
  const baseURL = `gestioneko/v1/list`;

  const fetchData = (state: any, instance: any) => {
    deselectAllCheckbox();
    getTableData(
      state,
      baseURL,
      setTableState,
      filterAndHeaderConfigMap,
      axios
    );
  };
  const onChangeHandler = (event: any) => {
    onToggleSelectAllCheckBox(event.target.checked);
  };

  const onChangeRowCheckBox= (event:any)=>{
    let checkbox= event.target;
    highlightRowOnChangeCheckbox(checkbox);
  }

  const checkboxHeader = {
    Header: "SELECT ALL",
    minWidth: 100,
    className: "cell",
    headerClassName: "header",
    Cell: (row: any) => {
      return (
        <input
          className="checkbox"
          type="checkbox"
          onChange={onChangeRowCheckBox}
        />
      );
    },
    Filter: ({ filter, onChange }: any) => (
      <input
        id="#selectAll"
        className="checkbox"
        role="selectAll"
        type="checkbox"
        onChange={onChangeHandler}
      />
    )
  };

  return (
    <div>
      {tableState.loading ? <Spinner /> : null}
      <ReactTable
        columns={[checkboxHeader, ...tableState.columnHeaders]}
        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        data={tableState.data}
        pages={tableState.pages} // Display the total number of pages
        loading={tableState.loading} // Display the loading overlay when we need it
        onFetchData={fetchData} // Request new data when things change
        filterable
        defaultPageSize={10}
        className="-striped -highlight ReactKTMTable"
        showPaginationTop
        showPaginationBottom={false}
      />
    </div>
  );
}
