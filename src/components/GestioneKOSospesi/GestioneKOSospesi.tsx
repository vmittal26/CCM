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
import BaseComponent from "../BaseComponent/BaseComponent";
import getDataForTable from "../../Utils/getDataForTable";

class GestioneKOSospesi extends BaseComponent {
  private baseURL = `gestioneko/v1/list`;
  private isMobileView: any = deviceCheckConfig();
  private page:number=1;
  private pages:number=0;
  private pageSize:number=10;
  private sorted:any;
  private filters:[]=[];
  private data:[]=[];
  private columnHeaders:[]=[];
  private loading:boolean=true;

  private previousTableState: ITableState = {
    data: this.data,
    columnHeaders: this.columnHeaders,
    pages: this.pages,
    page:this.page,
    pageSize:this.pageSize,
    sorted:this.sorted,
    filters:this.filters,
    loading: this.loading
  };

  constructor() {
    super();
    console.log("GestioneKOSospesi constructor called");
  }

  public setLoading(loading:boolean){
    this.loading=loading;
  }

  public setPreviousTableState(tableState:ITableState){
     this.previousTableState= tableState;
  }
  public gestioneKOTableComponent = (props: any): JSX.Element => {
    const [tableState, setTableState] = React.useState<ITableState>(
      this.previousTableState
    );
    const fetchData = (state:any, instance: any) => {
      console.log(instance);
      if(this.loading){
          console.log("in fetch Data")
          setTableState({
              ...tableState,
              loading: true
          });
          deselectAllCheckbox();
          getDataForTable(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered,
            this.baseURL,
            filterAndHeaderConfigMap,
            axios,
            this.isMobileView).then((tableData: ITableState) => {
                                  this.setPreviousTableState(tableData);
                                  this.loading=false;
                                  setTableState({
                                    ...tableData,
                                    loading:false}
                                  );
        });
    }
    };
    const onChangeHandler = (event: any) => {
      onToggleSelectAllCheckBox(event.target.checked);
    };

    const onChangeRowCheckBox = (event: any) => {
      let checkbox = event.target;
      highlightRowOnChangeCheckbox(checkbox);
    };

    const rowHandler = (state: any, rowInfo: any) => {
      if (rowInfo && rowInfo.row) {
        if (!this.isMobileView) {
          return {
            onDoubleClick: (e: any) => {
              console.log(rowInfo.original);
              props.history.push("/detailPageFase2", {
                data: rowInfo.original
              });
            }
          };
        } else {
          return {
            onClick: (e: any) => {
              console.log(rowInfo.original);
              props.history.push("/detailPageFase2", {
                data: rowInfo.original
              });
            }
          };
        }
      } else {
        return {};
      }
    };
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
          columns={ this.isMobileView ? [...tableState.columnHeaders] : [checkboxHeader, ...tableState.columnHeaders] }
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
          getTrProps={rowHandler}
          onPageChange={()=>{this.setLoading(true)}}
          onPageSizeChange={(newPageSize: number, newPage: number)=>{this.setLoading(true)}}
          onFilteredChange={(newFiltering: Filter[], column: any, value: any)=>{this.setLoading(true)}}
          onSortedChange={(newSorted: SortingRule[], column: any, additive: boolean)=>{this.setLoading(true)}}
        />
      </div>
    );
  };

  public getComponent(): React.FunctionComponent {
    return this.gestioneKOTableComponent;
  }
}

const gestioneKO = new GestioneKOSospesi();

export default gestioneKO.getComponent();
