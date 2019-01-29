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
import deviceCheckConfig from "../../config/deviceCheckConfig";
import BaseComponent from "../BaseComponent/BaseComponent";

class GestioneKO extends BaseComponent {
  private baseURL = `gestioneko/v1/list`;
  private isMobileView: any = deviceCheckConfig();

  private initialTableState: ITableState = {
    data: [],
    columnHeaders: [],
    pages: null,
    loading: true
  };

  constructor() {
    super();
  }

  public gestioneKOTableComponent = (props: any): JSX.Element => {
    const [tableState, setTableState] = React.useState<ITableState>(
      this.initialTableState
    );
    const [isBrowserButtonClicked, setBrowerBackButtonClicked] = React.useState(
      false
    );

    const fetchData = (state: any, instance: any) => {
      setTableState({
        ...tableState,
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
        this.initialTableState = tableData;
        setTableState(tableData);
      });
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
        />
      </div>
    );
  };

  public getComponent(): React.FunctionComponent {
    return this.gestioneKOTableComponent;
  }
}

const gestioneKO = new GestioneKO();

export default gestioneKO.getComponent();
