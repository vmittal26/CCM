import * as React from "react";
import ITableState from "../../model/ITableState";
import axios from "../../config/axiosKTMConfig";
import ReactTable from "react-table";
import getTableData from "../../Utils/getTableData";
import headerConfig from "./HeaderConfig";
import Spinner from "../UI/Spinner/Spinner";
import IFilter from "../../model/IFilter";

export default function SegnalzioneEntita() {
  const [tableState, setTableState] = React.useState<ITableState>({
    data: [],
    columnHeaders: [],
    pages: null,
    loading: true
  });

  const baseURL = `segnalazione/v1/list`;
  
  const fetchData = (state: any, instance: any) => {
    getTableData(state, baseURL, setTableState, null,axios);
  };


  return (
    <div>
      {tableState.loading?<Spinner/>:null}
      <ReactTable
        columns={[
          {
            Header: "ID SEGNALAZIONE ENTITA",
            accessor: "idSegnalazioneEntita",
            minWidth: 200,
            className:'cell',
            headerClassName:"header"
          },
          {
            Header: "CODICE RICHIESTA SPP",
            accessor: "codiceRichiestaSpp",
            minWidth: 200,
            headerClassName:"header"
          },
          {
            Header: "DATA APERTURA SEGNALAZIONE",
            accessor: "dataAperturaSegnalazione",
            minWidth: 200,
            headerClassName:"header"
          },
          {
            Header: "DATA CHIUSURA SEGNALAZIONE",
            accessor: "dataChiusuraSegnalazione",
            headerClassName:"header",
            minWidth: 200
          },
          {
            Header: "ID SEGNALAZIONE",
            accessor: "idSegnalazione",
            minWidth: 150,
            headerClassName:"header"
          },
          {
            Header: "MOTIVAZIONE APERTURA OPI",
            accessor: "motivazioneAperturaOpi",
            minWidth: 200,
            headerClassName:"header"
          },
          {
            Header: "NUMSEGNALAZIONE",
            accessor: "numSegnalazione",
            className: "cell",
            minWidth: 150,
            headerClassName:"header"
          },
          {
            Header: "NUM SOLLECITI",
            accessor: "numSolleciti",
            className: "cell",
            minWidth: 100,
            headerClassName:"header"
          },
          {
            Header: "RISPOSTA TIM",
            accessor: "rispostaTim",
            minWidth: 200,
            headerClassName:"header"
          },
          {
            Header: "TIPO ENTITA",
            accessor: "tipiEntita.descrizione",
            minWidth: 200,
            headerClassName:"header"
          },
          {
            Header: "TIPO OPI",
            id:"tipoOpi",
            accessor: "tipiOpi",
            minWidth: 200,
            headerClassName:"header",
            Cell: ({ value }) => (value.descrizione),
            Filter: ({ filter, onChange }) => {

              filter? filter.type="EQUAL":filter;
              filter = filter && filter.value==='0'?filter.type="CLEAR":filter

              return (<select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter?filter.tipoOpi:"0"}
              >
                <option value="0"></option>
                <option value="1">Segnalazioni per KO ritenuti errati</option>
                <option value="2">Richiesta informazioni sul KO ricevuto</option>
                <option value="3">Certificazione Civico/Strada</option>
              </select>)
            }
          },
          {
            Header: "STATO TIM",
            accessor: "statoTim.descrizione",
            minWidth: 200,
            headerClassName:"header"
          }
        ]}
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
      <br />
    </div>
  );
}
