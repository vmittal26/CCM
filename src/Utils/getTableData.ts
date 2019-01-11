import  ITableState  from '../model/ITableState';
export default async (
  url: String,
  filters: Array<{}>,
  setTableState: Function,
  axios: any
): Promise<void> => {
  try {
    var response = await axios.post(
      url,
      filters
    );
    console.log(response);

    const { records , totalPages } = response.data.pageDTO;

    const { visibleHeaders } = response.data;

    setTableState((prevState: ITableState) => ({
      ...prevState,
      columnHeaders:visibleHeaders,
      data: records,
      pages: totalPages,
      loading: false
    }));
   
  } catch (err) {
    console.log("Error: ", err.message);
  }
};
