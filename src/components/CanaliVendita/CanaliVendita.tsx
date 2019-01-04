import * as React from "react";
import ReactTable from "react-table";
import { ICanaliVenditaTableState } from "../../model/ICanaliVenditaTableState";
import "react-table/react-table.css";
import axios from "axios";

export default function CanaliVendita() {
  const [tableState, setTableState] = React.useState<ICanaliVenditaTableState>({
    data: [],
    pages: null,
    loading: true
  });

  const baseURL = "http://localhost:8080/canvaliVendita/v1/canaliVendita";

  const fetchData = (state: any, instance: any) => {
    const getDataURL: string = `${baseURL}?pageNumber=${state.page}&&pageSize=${
      state.pageSize
    }`;

    setTableState((prevState: ICanaliVenditaTableState) => ({
      ...prevState,
      loading: true
    }));

    (async ():Promise<void>=>{
        try {
          var response = await axios.get(getDataURL);
          const { content, totalPages } = response.data;
          setTableState({
            data: content,
            pages: totalPages,
            loading: false
          });
        } catch (err) {
          console.log("Error: ", err.message);
        }
    })();

    // axios.get(getDataURL).then(response => {
    //   const { content, totalPages } = response.data;
    //   setTableState({
    //     data: content,
    //     pages: totalPages,
    //     loading: false
    //   });
    // });
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
            accessor: "descrizione"
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
      />
      <br />
    </div>
  );
}
