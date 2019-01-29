import  ITableState  from '../model/ITableState';
import IFilter from '../model/IFilter';
import deviceCheckConfig from '../config/deviceCheckConfig';
export default async (
  state:any,
  baseURL:String,
  headerConfigMap:Map<string,any>,
  axios: any,
  isMobileView:boolean
): Promise<ITableState> => {

  const filtersFromTable: Array<IFilter> = state.filtered;

  const sorted = state.sorted;

  console.log(sorted);
    
  const filters = filtersFromTable ? filtersFromTable.filter((filter:IFilter)=> filter.type && filter.type!=="CLEAR"|| !filter.type):[];

  const pageParamsString: string = `?pageNumber=${state.page}&&pageSize=${state.pageSize}`;
  const getFilteredDataURL: string = `${baseURL}/filter${pageParamsString}`;

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
    return {
      columnHeaders:!isMobileView?transformHeaderObject():[{
                                                            Header:headerObject["CODICE_RICHIESTA_SPP"]["columnCaption"],
                                                            accessor:headerObject["CODICE_RICHIESTA_SPP"]["accessor"],
                                                            headerClassName:"header",
                                                            className: "cell",
                                                            minWidth:200,
                                                            
                                                         },{
                                                          Header:headerObject["LINK_ACCOUNT"]["columnCaption"],
                                                          accessor:headerObject["LINK_ACCOUNT"]["accessor"],
                                                          headerClassName:"header",
                                                          className: "cell",
                                                          minWidth:200
                                                         }],
      data: records,
      pages: totalPages,
      loading: false
    }
  } catch (err) {
    console.log("Error: ", err.message);
  }
};
