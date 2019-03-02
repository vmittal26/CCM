export default interface INodeDetail{
    nodeDetailName: string,
    nodeIp: string,
    nodeTypeId:string
    nodeDetailUserName: string,
    nodePassword: string,
    nodeSegment?:[]
}