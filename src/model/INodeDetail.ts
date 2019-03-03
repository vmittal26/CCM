export default interface INodeDetail{
    nodeDetailsId:string,
    nodeDetailName: string,
    nodeIp: string,
    nodeTypeId:string
    nodeDetailUserName: string,
    nodePassword: string,
    nodeSegment?:[]
}