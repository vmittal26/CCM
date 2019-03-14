import * as React from 'react';
import ReactTable from 'react-table';
import{sementTableHeaderConfig ,segmentTableDummyDataSDP, segmentTableDummyDataOCC} from "./segmentBaseLineConfig";
import { Icon, Tooltip, Modal } from 'antd';
import BaseComponent from '../BaseComponent/BaseComponent';
import "antd/lib/modal/style/index.css";
import TransferComponent from '../TransferComponent/TransferComponent';
import CommonBaseLineGroupChildGroupComponent from '../CommonBaseLineGroupChildGroupComponent/CommonBaseLineGroupChildGroupComponent';


class SegmentBaseLineContainer extends BaseComponent{

  private state:any;
  private setState:Function;

  private selectedNodeTypeId:string;

  constructor(){
    super();
  }

  public onNodeTypeSelection = (nodeTypeId:string, nodeType:string)=>{
      console.log(nodeTypeId,nodeType);
      this.selectedNodeTypeId = nodeTypeId;

      this.setState({
        ...this.state,
        loading:true,
        tableData:[]
      });
      if(nodeType==="SDP"){
          setTimeout(() => {
            this.setState({
              ...this.state,
              loading:false,
              tableData:segmentTableDummyDataSDP
            });
          }, 1000);
      }else if(nodeType==="OCC"){
        setTimeout(() => {
          this.setState({
            ...this.state,
            loading:false,
            tableData:segmentTableDummyDataOCC
          });
        }, 1000);
      }else{
        setTimeout(() => {
          this.setState({
            ...this.state,
            loading:false,
            tableData:[]
          });
        }, 1000);
      }

    
  }
  private getViewEditNodeListButton = ()=>{
    return (
      {
      Header: "Node List",
      minWidth: 100,
      className: "cell",
      headerClassName: "header",
      Cell: (row: any) => {
        return (
          <button
            className="btn btn-primary btn-sm"
            onClick={(e:any)=>{console.log(row); this.setState({...this.state,isNodeListTransferVisible:true})}}
          >Node List</button>
        );
      }
    }
    );
  }
  public segmentBaseLineComponent =(props:any):JSX.Element=>{

    const[state,setState] = React.useState({
      loading:true,
      tableData:[],
      isNodeListTransferVisible:false
    });

    this.state = state;
    this.setState = setState;

    let nodeListTransferModal =  <Modal
                                    title="Update Node List"
                                    centered
                                    footer={null}
                                    visible={state.isNodeListTransferVisible}
                                    onCancel={() => {
                                      setState({ ...state, isNodeListTransferVisible: false });
                                    }}>
                                      {<TransferComponent/>}
  </Modal>

   let table = (  <ReactTable
                      columns={[...sementTableHeaderConfig.headerConfig,this.getViewEditNodeListButton()]}
                      showPagination={true}
                      loading={state.loading}
                      freezeWhenExpanded
                      showPaginationTop={true}
                      showPaginationBottom={false}
                      filterable
                      defaultPageSize={5}
                      onPageSizeChange={()=>{}}
                      onPageChange={()=>{}}
                      previousText={<Icon style={{fontSize:"1rem"}} type="fast-backward" />}
                      nextText={<Icon style={{fontSize:"1rem"}} type="fast-forward" />}
                      SubComponent={(row)=>{console.log(row);return <CommonBaseLineGroupChildGroupComponent segmentId = {row.original.segmentId} nodeTypeId={this.selectedNodeTypeId} />}}
                      // onFetchData={this.fetchData}
                      data={state.tableData}
                      />);

           
    React.useEffect(()=>{

      this.EE.on("onNodeTypeSelection", this.onNodeTypeSelection)
      return()=>{
        this.EE.removeListener("onNodeTypeSelection", this.onNodeTypeSelection);
      }
    },[])     
    return (
      <div className="SegmentBaseLine">
        {(state.isNodeListTransferVisible?nodeListTransferModal:null)}{table}
      </div>
    )
  }

  public getComponent(): React.FunctionComponent {
    return this.segmentBaseLineComponent;
  }
}

export const segmentBaseLineContainer = new SegmentBaseLineContainer();

export default segmentBaseLineContainer.getComponent ();