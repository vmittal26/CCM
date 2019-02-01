import { Filter } from 'react-table';
export default interface ITableState{
    data:[],
    columnHeaders?:Array<{}>,
    pages?:number,
    page?:number,
    pageSize?:number,
    sorted?:any,
    filters?:Array<Filter>,
    loading:boolean,
    isSelectAll?:boolean,
    isMobileView?:boolean
}