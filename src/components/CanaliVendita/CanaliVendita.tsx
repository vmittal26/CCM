import * as React from "react";
import ReactTable from "react-table";
import ITableState from "../../model/ITableState";

import axios from "../../config/axiosKTMConfig";
import getTableData from "../../Utils/getTableData";

export default function CanaliVendita() {
  const [tableState, setTableState] = React.useState<ITableState>({
    data: [],
    pages: null,
    loading: true
  });

  const baseURL = `canvaliVendita/v1/list`;

  const fetchData = (state: any, instance: any) => {
    // getTableData(state, baseURL, setTableState,null, axios);
  };

  return (
    <div>
      <ReactTable
        columns={[
          {
            Header: "Canali Vendita",
            accessor: "canaleVendita"
          },
          {
            Header: "Descrizione",
            accessor: "descrizione",
            Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="true">Can Drink</option>
                      <option value="false">Can't Drink</option>
                    </select>
          }
        ]}
        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        data={tableState.data}
        pages={tableState.pages} // Display the total number of pages
        loading={tableState.loading} // Display the loading overlay when we need it
        onFetchData={fetchData} // Request new data when things change
        filterable
        defaultPageSize={10}
        className="-striped -highlight"
        showPaginationTop
        showPaginationBottom={false}
      />
      <br />
    </div>
  );
}
