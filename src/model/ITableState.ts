export default interface ITableState{
    data:[],
    columnHeaders?:Array<{}>
    pages:number,
    loading:boolean,
    isSelectAll?:boolean
}