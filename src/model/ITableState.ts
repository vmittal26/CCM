export default interface ITableState{
    data:[],
    columnHeaders?:Array<{}>,
    pages?:number,
    page?:number,
    pageSize?:number,
    sorted?:any,
    filters?:[],
    loading:boolean,
    isSelectAll?:boolean,
    isMobileView?:boolean
}