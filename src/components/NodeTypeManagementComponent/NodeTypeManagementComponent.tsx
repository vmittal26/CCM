import * as React from "react";
import BaseComponent from "../BaseComponent/BaseComponent";
import INodeTypeManagement from "../../model/INodeTypeManagement";
import Backdrop from "../UI/Backdrop/Backdrop";
import CoverSpinner from "../UI/CoverSpinner/CoverSpinner";
import AddnodeType from "../AddnodeType/AddnodeType";
import axios from "../../config/axiosKTMConfig";
import { notification, Modal } from "antd";
import ReactTable from "react-table";
import Spinner from "../UI/Spinner/Spinner";
const dataFromBackend = [
  {
    nodeId: "1",
    nodeType: "SDP",
    nodeDescription: "ABC"
  },
  {
    nodeId: "2",
    nodeType: "PQR",
    nodeDescription: "XYZ"
  },
  {
    nodeId: "3",
    nodeType: "SDP",
    nodeDescription: "ABC"
  },
  {
    nodeId: "4",
    nodeType: "PQR",
    nodeDescription: "XYZ"
  }
];
class NodeTypeManagementContainer extends BaseComponent {
  private addNodeType: JSX.Element;
  private nodeTypeColumnHeaders:Array<{}>=[
    {
        Header: "Node Type",
        accessor: "nodeType", // String-based value accessors!
        headerClassName:"header",
        className: "cell",
        minWidth:200,
      },
      {
        Header: "Description",
        accessor: "nodeDescription",
        headerClassName:"header",
        className: "cell",
        minWidth:200,
      }
  ]
  private setState: Function;
  private state: any;
  constructor() {
    super();
    this.addNodeType = (
      <AddnodeType onSubmit={this.onSubmitAddNodeType} onCancel={this.onCancelModal} />
    );
  }

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

  public onCancelModal=()=>{
    this.setState({ ...this.state, isAddModalVisible: false })
  }
  public fetchData =()=>{
        (async()=>{
            const response = await axios.get("api/node-inventory/v1/getNodeTypes/");
            console.log(response);
            this.setState({
            ...this.state,
            isNodeTypeDataLoading:false,
            data:[...response.data,...this.state.data]
            });
        })();
  
    //   setTimeout(()=>this.setState({
    //       ...this.state,
    //       isNodeTypeDataLoading:false,
    //       data:dataFromBackend
    //   }),2000);
  }
  public onSubmitAddNodeType = (values: any, actions: any) => {
    actions.setSubmitting(true);
    this.setState({
      ...this.state,
      isBackDropVisible: true
    });

    setTimeout(() => {
      this.state.data.push(values);
      this.setState({
        ...this.state,
        isBackDropVisible: false,
        isAddModalVisible: false,
        data: [...this.state.data]
      });
      notification.open({
        message: "Add Node Type",
        description: "Node Type is saved sucessfully",
        duration: 2
      });
      actions.setSubmitting(false);
    }, 2000);
  };

  public nodeTypeManagement = (props: any): JSX.Element => {
    const [state, setState] = React.useState({
      isDeleteButtonEnabled: false,
      checkboxArray: [],
      isAddModalVisible: false,
      isBackDropVisible: false,
      isNodeTypeDataLoading: true,
      data: []
    });

    this.state = state;
    this.setState = setState;

    let nodeTypeTable =(<ReactTable
                    columns={[this.checkboxHeader,...this.nodeTypeColumnHeaders]}
                    showPagination={true}
                    loading={state.isNodeTypeDataLoading}
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    defaultPageSize={5}
                    onFetchData={this.fetchData}
                    data={state.data}
                    />)
    return (
      <div className="NodeTypeManagement">
        <Modal
          title="Add Node Type"
          centered
          footer={null}
          visible={state.isAddModalVisible}
          onCancel={() => {
            setState({ ...state, isAddModalVisible: false });
          }}>
          <div style={{ position: "relative" }}>
            {state.isBackDropVisible ? (
              <> <Backdrop show iswhite /> <CoverSpinner /> {this.addNodeType} </> ) : ( this.addNodeType )}
          </div>
        </Modal>
        <div className="NodeTypeManagement__NodeTypeContainer">
          <div className="NodeTypeManagement__Header">
            <h4>Node Type</h4>
            <div className="NodeTypeManagement__button-section">
              <button className="btn btn-primary" onClick={() => { setState({ ...state, isAddModalVisible: true }); }} >
                Add
              </button>
              <button className="btn btn-primary ml-3" disabled={!state.isDeleteButtonEnabled} > Delete</button>
            </div>
          </div>
          <div className="NodeTypeManagement__NodeTypeTable">
          <div style={{position:"relative"}}>{state.isNodeTypeDataLoading?<><Spinner/>{nodeTypeTable}</>:nodeTypeTable}</div>
          </div>
        </div>
      </div>
    );
  };
  public getComponent(): React.FunctionComponent {
    return this.nodeTypeManagement;
  }
}

export const nodeypeManagementContainer = new NodeTypeManagementContainer();

export default nodeypeManagementContainer.getComponent();
