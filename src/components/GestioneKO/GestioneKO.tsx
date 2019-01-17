import * as React from 'react'
import ITableState from '../../model/ITableState';
import axios from "../../config/axiosKTMConfig"
import IFilter from '../../model/IFilter';
import getTableData from '../../Utils/getTableData';
import Spinner from '../UI/Spinner/Spinner';
import ReactTable from 'react-table';
import filterAndHeaderConfigMap from './FilterAndHeaderConfigMap';

export default function GestioneKO() {
  const [tableState, setTableState] = React.useState<ITableState>({
    data: [],
    columnHeaders: [],
    pages: null,
    loading: true
  });
  const baseURL = `gestioneko/v1/list`;

  const fetchData = (state: any, instance: any) => {
    getTableData(state, baseURL, setTableState,filterAndHeaderConfigMap, axios);
  };

  return (
    <div>
        {tableState.loading?<Spinner/>:null}
        <ReactTable
        columns ={tableState.columnHeaders}
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
        ></ReactTable>
    </div>
  )
}
