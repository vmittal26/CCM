import * as React from "react";
import ITableState from "../../model/ITableState";
import axios from "../../config/axiosKTMConfig";
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
  private isMobileView: boolean = deviceCheckConfig() ? true : false;
  private page: number = 0;
  private defaultPageSize: number = 10;
  private pages: number = 0;
  private pageSize: number = 20;
  private sorted: [] = [];
  private filters: Array<Filter> = [];
  private data: [] = [];
  private loading: boolean = true;
  private history: any;
  private setTableState: Function;
  private showPaginationBottom: boolean = false;
  private isTableLoadedFirstTime: boolean = false;
  private checkboxHeader = {
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
  private columnHeaders: Array<any> = this.isMobileView
    ? []
    : [this.checkboxHeader];

  private previousTableState: ITableState = {
    data: this.data,
    columnHeaders: this.columnHeaders,
    pages: this.pages,
    page: this.page,
    pageSize: this.pageSize,
    sorted: this.sorted,
    filters: this.filters,
    loading: this.loading
  };
  constructor() {
    super();
    console.log("GestioneKOSospesi constructor called");
    deviceCheckConfig() ? (this.isMobileView = true) : (this.isMobileView = false);
  }
  public onModeChange = (checked: boolean) => {
    this.requestTableData(
      this.previousTableState.pageSize,
      this.previousTableState.page,
      this.previousTableState.sorted,
      this.previousTableState.filters,
      this.baseURL,
      filterAndHeaderConfigMap,
      axios,
      !this.previousTableState.isMobileView
    );
  };
  private onChangeHandler = (event: any) => {
    onToggleSelectAllCheckBox(event.target.checked);
  };

  private onChangeRowCheckBox = (event: any) => {
    let checkbox = event.target;
    highlightRowOnChangeCheckbox(checkbox);
  };

  private onPageChange = (page: number) => {
    this.requestTableData(
      this.previousTableState.pageSize,
      page,
      this.previousTableState.sorted,
      this.previousTableState.filters,
      this.baseURL,
      filterAndHeaderConfigMap,
      axios,
      this.previousTableState.isMobileView
    );
  };

  private onPageSizeChange = (newPageSize: number, newPage: number) => {
    this.requestTableData(
      newPageSize,
      newPage,
      this.previousTableState.sorted,
      this.previousTableState.filters,
      this.baseURL,
      filterAndHeaderConfigMap,
      axios,
      this.previousTableState.isMobileView
    );
  };

  private requestTableData(
    pageSize: number,
    page: number,
    sorted: any,
    filters: Array<Filter>,
    baseURL: String,
    headerConfigMap: Map<string, any>,
    axios: any,
    isMobileView: boolean
  ) {
    this.previousTableState.loading = true;
    this.setTableState({ ...this.previousTableState, loading: !this.loading });
    deselectAllCheckbox();
    getDataForTable(
      pageSize,
      page,
      sorted,
      filters,
      baseURL,
      headerConfigMap,
      axios,
      isMobileView
    ).then((tableData: ITableState) => {
      let newTableState = {
        ...this.previousTableState,
        ...tableData,
        columnHeaders: isMobileView ? tableData.columnHeaders : [this.checkboxHeader, ...tableData.columnHeaders], isMobileView: isMobileView
      };
      this.setPreviousTableState(newTableState);
      this.setTableState(newTableState);
      this.isTableLoadedFirstTime ? this.isTableLoadedFirstTime : (this.isTableLoadedFirstTime = true);
    });
  }

  private onFilterChange=(newFiltering: Filter[], column: any, value: any)=> {
    this.requestTableData(
      this.previousTableState.pageSize,
      this.previousTableState.page,
      this.previousTableState.sorted,
      newFiltering,
      this.baseURL,
      filterAndHeaderConfigMap,
      axios,
      this.previousTableState.isMobileView
    );
  }

  private onSortingChange(
    newSorted: SortingRule[],
    column: any,
    additive: boolean
  ) {
    this.setLoading(true);
  }
  private rowHandler = (state: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      if (!this.previousTableState.isMobileView) {
        return {
          onDoubleClick: (e: any) => {
            console.log(rowInfo.original);
            this.history.push("/detailPageFase2", {
              data: rowInfo.original
            });
          }
        };
      } else {
        return {
          onClick: (e: any) => {
            console.log(rowInfo.original);
            this.history.push("/detailPageFase2", {
              data: rowInfo.original
            });
          }
        };
      }
    } else {
      return {};
    }
  };

  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  public setPreviousTableState = (tableState: ITableState) => {
    this.previousTableState = tableState;
  };

  public gestioneKOTableComponent = (props: any): JSX.Element => {
    const [tableState, setTableState] = React.useState<ITableState>(
      this.previousTableState
    );
    this.setTableState = setTableState;

    this.history = props.history;

    React.useEffect(() => {
      console.log("adding switch mode listener");
      this.EE.on("switchMode", this.onModeChange);

      let isTableToReload =
        props.history.location.state &&
        props.history.location.state.isTableToReload;

      if (isTableToReload || !this.isTableLoadedFirstTime) {
        deselectAllCheckbox();
        this.previousTableState.loading = true;
        this.setTableState({
          ...this.previousTableState,
          loading: !this.loading
        });
        this.requestTableData(
          this.previousTableState.pageSize,
          this.previousTableState.page,
          this.previousTableState.sorted,
          this.previousTableState.filters,
          this.baseURL,
          filterAndHeaderConfigMap,
          axios,
          this.previousTableState.isMobileView
        );
      }
      return () => {
        console.log("removing switchMode Listener on unmount");
        this.EE.removeListener("switchMode", this.onModeChange);
      };
    }, []);

    return (
      <div>
        {this.previousTableState.loading ? <Spinner /> : null}
        <ReactTable
          columns={this.previousTableState.columnHeaders}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={this.previousTableState.data}
          pages={this.previousTableState.pages} // Display the total number of pages
          page={this.previousTableState.page}
          pageSize={this.previousTableState.pageSize}
          loading={this.previousTableState.loading} // Display the loading overlay when we need it
          // onFetchData={fetchData} // Request new data when things change
          filterable
          defaultPageSize={this.defaultPageSize}
          className="-striped -highlight ReactKTMTable"
          showPaginationTop
          showPaginationBottom={this.showPaginationBottom}
          getTrProps={this.rowHandler}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onFilteredChange={this.onFilterChange}
          onSortedChange={this.onSortingChange}
        />
      </div>
    );
  };

  public getComponent(): React.FunctionComponent {
    return this.gestioneKOTableComponent;
  }
}

export const gestioneKO = new GestioneKOSospesi();

export default gestioneKO.getComponent();
