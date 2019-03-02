import INodeDetail from "./INodeDetail";

export default interface INodeDetailTableState{
    pages:number,
    page:number
    data:Array<INodeDetail>,
    loading:boolean
}