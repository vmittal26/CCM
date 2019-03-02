import INodeDetail from "./INodeDetail";

export default interface INodeTypeTableState{
    pages:number,
    page:number
    data:Array<INodeDetail>,
    loading:boolean
}