import * as React from 'react';
import { Select, Modal, notification } from 'antd';
import ReactTable from 'react-table';
import columns from "./nodeDetailsHeaderConfig";
const  Option = Select.Option;
import 'antd/lib/input/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/select/style/index.css';
import AddNodeDetail from '../AddNodeDetail/AddNodeDetail';
import Backdrop from '../UI/Backdrop/Backdrop';
import CoverSpinner from '../UI/CoverSpinner/CoverSpinner';
import BaseComponent from '../BaseComponent/BaseComponent';
import Spinner from '../UI/Spinner/Spinner';

class NodeDetailContainer extends BaseComponent{
    private addNodeDetail: JSX.Element;
    private setState: Function;
    private state: any;

    private nodeTypeColumnHeaders:Array<{}>=
        [
            {
              Header: "Node Name",
              accessor: "nodeDetailName"
            },
            {
              Header: "Node IP",
              id: "nodeIp"
            },
            {
              Header: "Username",
              accessor: "userName"
            },
            {
              Header: "Segment",
              accessor: "segment"
            },
            {
              Header: "Node Type",
              accessor: "nodeType"
            }
          ]
      

    private checkboxHeader = {
        Header: "#",
        minWidth: 50,
        className: "cell",
        headerClassName: "header",
        Cell: (row: any) => {
          return (
            <input
              className="checkbox"
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  
                if(e.target.checked){
                  this.state.checkboxArray.push(row.nodeId);
                  this.setState({
                    ...this.state,
                    isDeleteButtonEnabled: this.state.checkboxArray.length===1
                  });
                }else{
                  var index =  this.state.checkboxArray.indexOf(row.nodeId);
                  index > -1 ? this.state.checkboxArray.splice(index, 1):this.state.checkboxArray
                  this.setState({
                    ...this.state,
                    isDeleteButtonEnabled: this.state.checkboxArray.length===1
                  });
                }
              }}
            />
          );
        }
      };
    public onSubmitAddNodeDetail = (values: any, actions: any) => {
        actions.setSubmitting(true);
        this.setState({
          ...this.state,
          isBackDropVisible: true
        });
    
        setTimeout(() => {
          this.state.dummyNodeList.push(values);
          this.setState({
            ...this.state,
            isBackDropVisible: false,
            isAddModalVisible: false,
            dummyNodeList: [...this.state.dummyNodeList]
          });
          notification.open({
            message: "Add Node Type",
            description: "Node Type is saved sucessfully",
            duration: 2
          });
          actions.setSubmitting(false);
        }, 2000);
      };
    public fetchData =()=>{

        setTimeout(()=>this.setState({
            ...this.state,
            isNodeDetailDataLoading:false,
            data:[]
        }),2000);
    }
    public onCancelModal=()=>{
        this.setState({ ...this.state, isAddModalVisible: false })
      }
    constructor(){
        super();
        this.addNodeDetail = (
            <AddNodeDetail onSubmit={this.onSubmitAddNodeDetail} onCancel={this.onCancelModal} />
          );
    }

    public nodeDetailsManagement = (props: any): JSX.Element => {
        const [state, setState] = React.useState({
            isDeleteButtonEnabled: false,
            isNodeDetailDataLoading:false,
            checkboxArray:[],
            isAddModalVisible:false,
            isBackDropVisible:false,
            data:[]
          });

        this.state = state;
        this.setState = setState;

        let nodeDetailsTable =(
        <ReactTable
            columns={[this.checkboxHeader,...this.nodeTypeColumnHeaders]}
            showPagination={true}
            loading={state.isNodeDetailDataLoading}
            showPaginationTop={true}
            showPaginationBottom={false}
            defaultPageSize={5}
            onFetchData={this.fetchData}
            data={state.data}
            />);

        return(      
        
        <div className="NodeDetails">
        <Modal
          title="Add Node Detail"
          centered
          footer={null}
          visible={state.isAddModalVisible}
          onCancel={() => {
            setState({ ...state, isAddModalVisible: false });
          }}>
          <div style={{ position: "relative" }}>
            {state.isBackDropVisible ? (
              <> <Backdrop show iswhite /> <CoverSpinner /> {this.addNodeDetail} </> ) : ( this.addNodeDetail )}
          </div>
        </Modal>
        <h4 className="mb-3">Node Details</h4>
        <div className="NodeDetails_NodeTable">
        <div className="NodeDetails__Header">
            {/* <div className="NodeDetails__SelectNodeType">
            <Select placeholder ="Select Node Type" style={{ width: 150 }} onChange={()=>{}}>
                <Option value="S">SDP</Option>
                <Option value="T">TAD</Option>
            </Select>
            </div> */}
            <div className="NodeDetails__button-section">
                <button className="btn btn-primary" onClick={()=>setState({...state,isAddModalVisible:true})}>Add Node</button>
                <button className="btn btn-primary ml-3" onClick={()=>{}}>Modify Node</button>
                <button className="btn btn-primary ml-3" disabled >Delete Node </button>
            </div>
        </div>
          <div className="NodeDetails__NodeDetailsTable">
          <div style={{position:"relative"}}>{state.isNodeDetailDataLoading?<><Spinner/>{nodeDetailsTable}</>:nodeDetailsTable}</div>
          </div>
        </div>
      </div>
        );
    }

    public getComponent(): React.FunctionComponent {
        return this.nodeDetailsManagement;
    }
}
export const nodeDetailContainer = new NodeDetailContainer();

export default nodeDetailContainer.getComponent();