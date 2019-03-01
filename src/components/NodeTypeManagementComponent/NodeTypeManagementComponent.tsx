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
import INodeTypeTableState from "../../model/INodeTypeTableState";
import { deselectAllCheckbox } from "../../Utils/TableRowSelectionsUtil";
import highlightRowOnChangeCheckbox from "../../Utils/highlightRowOnChangeCheckbox";
import { INodeType } from "../../model/INodeType";

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
  },
  {
    nodeId: "4",
    nodeType: "PQR",
    nodeDescription: "XYZ"
  },
  {
    nodeId: "4",
    nodeType: "PQR",
    nodeDescription: "XYZ"
  }
];

const dummyData={
    nodeId: "4",
    nodeType: "PQR",
    nodeDescription: "XYZ"
}
class NodeTypeManagementContainer extends BaseComponent {
  private addNodeType: JSX.Element;
  private isTableHasToReload: boolean = false;
  private isLoadedForFirstTime:boolean = false;
  private nodeListData:Array<INodeType>=[];
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
  private setTableState:Function;
  private tableState :INodeTypeTableState;


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
            let checkbox = event.target;
            highlightRowOnChangeCheckbox(checkbox);
            console.log(row.original.nodeId);
            
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

  public onPageSizeChange = ()=>{
    deselectAllCheckbox();
  }

  public onPageChange =()=>{
    deselectAllCheckbox();
  }
  public onCancelModal=()=>{
    this.setState({ ...this.state, isAddModalVisible: false })
  }
  public fetchData =(state:any,instance:any)=>{
    deselectAllCheckbox();
    if(this.isTableHasToReload || !this.isLoadedForFirstTime) {
      this.setTableState({
        ...this.tableState,
          loading:true,
      })
      console.log("inside fetchdata");
      (async()=>{
        const response = await axios.get("api/node-inventory/v1/getNodeTypes/");
        console.log(response);
        this.setTableState({
          ...this.tableState,
             loading:false,
             data:response.data
        });
        this.isTableHasToReload = false;
     })();
    }
  }
  
  public onSubmitAddNodeType = (values: any, actions: any) => {
    actions.setSubmitting(true);
    this.setState({
      ...this.state,
      isBackDropVisible: true
    });
 
  //   this.setTableState({
  //     ...this.tableState,
  //     isNodeTypeDataLoading:true,
  // });
    // setTimeout(() => {
    //   this.state.data.push(values);
    //   this.setState({
    //     ...this.state,
    //     isBackDropVisible: false,
    //     isAddModalVisible: false,
    //     data: [...this.state.data]
    //   });
    //   notification.open({
    //     message: "Add Node Type",
    //     description: "Node Type is saved sucessfully",
    //     duration: 2
    //   });
    //   actions.setSubmitting(false);
    // }, 2000);


    (async()=>{
      const response = await axios.post("api/node-inventory/v1/addNodeType/",values);
      console.log(response);
      //   setState({
      //   ...state,
      //   isNodeTypeDataLoading:false,
      //   dummyNodeList:[...response.data,...state.dummyNodeList]
      // });
        this.setState({
          ...this.state,
          isBackDropVisible: false,
          isAddModalVisible: false,
        });
        notification.open({
          message: "Add Node Type",
          description: response.data.message,
          duration: 2
        });
        // this.isTableHasToReload = true;
        if(response.data.nodeType){
          this.setTableState({
            ...this.tableState,
             data: [...this.tableState.data, response.data.nodeType]
           })
        }
        actions.setSubmitting(false);
      })();
  };

  public nodeTypeManagement = (props: any): JSX.Element => {
    const [state, setState] = React.useState<INodeTypeManagement>({
      isDeleteButtonEnabled: false,
      checkboxArray: [],
      isAddModalVisible: false,
      isBackDropVisible: false,
    });

    const[tableState,setTableState] = React.useState<INodeTypeTableState>({
                                                          loading:false,
                                                          page:0,
                                                          pages:null,
                                                          data:this.nodeListData
                                                         });

    this.state = state;
    this.setState = setState;
    this.setTableState = setTableState;
    this.tableState = tableState;
    let nodeTypeTable =(
                        <ReactTable
                            columns={[this.checkboxHeader,...this.nodeTypeColumnHeaders]}
                            showPagination={true}
                            loading={tableState.loading}
                            showPaginationTop={true}
                            showPaginationBottom={false}
                            defaultPageSize={5}
                            onPageChange={this.onPageChange}
                            filterable
                            onPageSizeChange={this.onPageSizeChange}
                            // onFetchData={this.fetchData}
                            data={tableState.data}
                        />)

     React.useEffect(()=>{
          console.log("inside useEffect");
          if(this.isTableHasToReload || !this.isLoadedForFirstTime) {
            setTableState({
              ...tableState,
              loading:true
            });
            (async()=>{
                  const response = await axios.get("api/node-inventory/v1/getNodeTypes/");
                  console.log(response);
                  this.nodeListData = response.data;
                  setTableState({
                    ...tableState,
                    loading:false,
                    data:this.nodeListData
                  });
                  this.isLoadedForFirstTime ? this.isLoadedForFirstTime : this.isLoadedForFirstTime=true;
              })();
          }
    },[]);
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
            <button className="btn btn-primary ml-3" onClick ={()=>this.EE.emit("onNodeTypeSelect",state.checkboxArray.pop())}disabled={!state.isDeleteButtonEnabled} >
                Node Detail
              </button>
              <button className="btn btn-primary ml-3" onClick={() => { setState({ ...state, isAddModalVisible: true }); }} >
                Add
              </button>
              <button className="btn btn-primary ml-3" disabled={!state.isDeleteButtonEnabled} > Delete</button>
            </div>
          </div>
          <div className="NodeTypeManagement__NodeTypeTable">
            <div style={{position:"relative"}}>{tableState.loading ? <Spinner /> : null}{nodeTypeTable}</div>
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
