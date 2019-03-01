import { INodeType } from './INodeType';
export default interface INodeTypeTableState{
    pages:number,
    page:number
    data:Array<INodeType>,
    loading:boolean
}