export default interface INodeDetail{
    nodeType:string,
    nodeDetailsId:string,
    nodeDetailName: string,
    nodeIp: string,
    nodeTypeId:string
    nodeDetailUserName: string,
    nodePassword: string,
    nodeSegment?:[]
}