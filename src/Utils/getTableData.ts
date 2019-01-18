import  ITableState  from '../model/ITableState';
import IFilter from '../model/IFilter';
export default async (
  state:any,
  baseURL:String,
  setTableState: Function,
  headerConfigMap:Map<string,any>,
  axios: any
): Promise<void> => {

  const filtersFromTable: Array<IFilter> = state.filtered;
    
  const filters = filtersFromTable.filter((filter:IFilter)=> filter.type && filter.type!=="CLEAR");

  const pageParamsString: string = `?pageNumber=${state.page}&&pageSize=${
    state.pageSize
  }`;
  const getFilteredDataURL: string = `${baseURL}/filter${pageParamsString}`;

  setTableState((prevState: ITableState) => ({
    ...prevState,
    loading: true
  }));
  try {
    var response = await axios.post(
      getFilteredDataURL,
      filters
    );
    console.log(response);
    const { records , totalPages } = response.data.pageDTO;
    const { headerMap:headerObject } = response.data;


    const transformHeaderObject =()=>{
       return Object.keys(headerObject).map((e:string)=>{
              return {
                        
                        Header: headerObject[e]["columnCaption"],
                        accessor:headerObject[e]["accessor"],
                        headerClassName:"header",
                        className: "cell",
                        minWidth:200,
                         ...headerConfigMap.get(e)
              }
       });
    }
    
    setTableState((prevState: ITableState) => ({
      ...prevState,
      columnHeaders:transformHeaderObject(),
      data: records,
      pages: totalPages,
      loading: false
    }));
   
  } catch (err) {
    console.log("Error: ", err.message);
  }
};
