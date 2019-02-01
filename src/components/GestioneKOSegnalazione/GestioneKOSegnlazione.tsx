import * as React from "react";
import ITableState from "../../model/ITableState";
import axios from "../../config/axiosKTMConfig";
import getTableData from "../../Utils/getTableData";
import ReactTable, { Filter, SortingRule } from "react-table";
import filterAndHeaderConfigMap from "./FilterAndHeaderConfigMap";
import {
  onToggleSelectAllCheckBox,
  deselectAllCheckbox
} from "../../Utils/TableRowSelectionsUtil";
import Spinner from "../UI/Spinner/Spinner";
import highlightRowOnChangeCheckbox from "../../Utils/highlightRowOnChangeCheckbox";
import deviceCheckConfig from "../../config/deviceCheckConfig";


class GestioneKOSegnlazione extends React.Component<any,ITableState> {
  private baseURL = `gestioneko/v1/list`;
  private isMobileView: any = deviceCheckConfig();
  


  constructor(props:any) {
    super(props);
    this.state={
      data: [],
      columnHeaders: [],
      pages: null,
      loading: true
    }
  }

  shouldComponentUpdate(){
    console.log(this.state);
    return true;
  }
 

  
  fetchData = (state: any, instance: any) => {
    console.log("in fetch Data")
    this.setState({
      ...this.state,
      loading: true
    });
    deselectAllCheckbox();
    getTableData(
      state,
      this.baseURL,
      filterAndHeaderConfigMap,
      axios,
      this.isMobileView
    ).then((tableData: ITableState) => {
      this.setState({...tableData,loading:false});
    });
  };
  onChangeHandler = (event: any) => {
    onToggleSelectAllCheckBox(event.target.checked);
  };

  onChangeRowCheckBox = (event: any) => {
    let checkbox = event.target;
    highlightRowOnChangeCheckbox(checkbox);
  };

   rowHandler = (state: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      if (!this.isMobileView) {
        return {
          onDoubleClick: (e: any) => {
            console.log(rowInfo.original);
            this.props.history.push("/detailPageFase2", {
              data: rowInfo.original
            });
          }
        };
      } else {
        return {
          onClick: (e: any) => {
            console.log(rowInfo.original);
            this.props.history.push("/detailPageFase2", {
              data: rowInfo.original
            });
          }
        };
      }
    } else {
      return {};
    }
  };
  checkboxHeader = {
    Header: "SELECT ALL",
    minWidth: 100,
    className: "cell",
    headerClassName: "header",
    Cell: (row: any) => {
      return (
        <input
          className="checkbox"
          type="checkbox"
          onChange={this.onChangeRowCheckBox}
        />
      );
    },
    Filter: ({ filter, onChange }: any) => (
      <input
        id="#selectAll"
        className="checkbox"
        role="selectAll"
        type="checkbox"
        onChange={this.onChangeHandler}
      />
    )
  };


  render(){
      
      return (
      <div>
        {this.state.loading ? <Spinner /> : null}
        <ReactTable
          columns={ this.isMobileView ? [...this.state.columnHeaders] : [this.checkboxHeader, ...this.state.columnHeaders] }
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={this.state.data}
          pages={this.state.pages} // Display the total number of pages
          loading={this.state.loading} // Display the loading overlay when we need it
          onFetchData={this.fetchData} // Request new data when things change
          filterable
          defaultPageSize={10}
          className="-striped -highlight ReactKTMTable"
          showPaginationTop
          showPaginationBottom={false}
          getTrProps={this.rowHandler}
          // onPageChange={(page:number)=>{console.log(page)}}
          // onPageSizeChange={(newPageSize: number, newPage: number)=>{console.log(newPageSize,newPage)}}
          // onFilteredChange={(newFiltering: Filter[], column: any, value: any)=>{console.log(newFiltering,column,value)}}
          // onSortedChange={(newSorted: SortingRule[], column: any, additive: boolean)=>{console.log(newSorted,column,additive)}}
        />
      </div>
    );
  }
}



export default GestioneKOSegnlazione;
