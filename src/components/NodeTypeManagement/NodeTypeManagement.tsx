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
        minWidth:40,
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
    minWidth: 20,
    className: "cell",
    headerClassName: "header",
    Cell: (row: any) => {
      return (
        <input
          className="checkbox"
          type="checkbox"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            let checkbox = event.target;
            // highlightRowOnChangeCheckbox(checkbox);
            console.log(row.original.nodeId);

            this.EE.emit("onNodeTypeSelect",row.original.nodeType,row.original.nodeId , e.target.checked);
            
            if(e.target.checked){
              this.state.checkboxArray.push(row.original.nodeId);
              this.setState({
                ...this.state,
                isNodeDetailButtonDisabled :this.state.checkboxArray.length>=1,
                isDeleteButtonEnabled: this.state.checkboxArray.length===1
              });
            }else{
              var index =  this.state.checkboxArray.indexOf(row.original.nodeId);
              index > -1 ? this.state.checkboxArray.splice(index, 1):this.state.checkboxArray
              this.setState({
                ...this.state,
                isNodeDetailButtonDisabled :this.state.checkboxArray.length>=1,
                isDeleteButtonEnabled: this.state.checkboxArray.length===1
              });
            }
          }}
        />
      );
    }
  };

  public resetCheckBoxSelectionsAndButtonsState =()=>{
    this.state.checkboxArray = [];
    this.setState({
      ...this.state,
      isNodeDetailButtonDisabled:false,
      isDeleteButtonEnabled: false
    });
    this.EE.emit("onNodeTypeSelect",null , false);
  }
  public onPageSizeChange = ()=>{
    deselectAllCheckbox("NodeTypeManagement__NodeTypeTable");
    this.resetCheckBoxSelectionsAndButtonsState();
  }

  public onPageChange =()=>{
    deselectAllCheckbox("NodeTypeManagement__NodeTypeTable");
    this.resetCheckBoxSelectionsAndButtonsState();
  }
  public onCancelModal=()=>{
    this.setState({ ...this.state, isAddModalVisible: false })
  }
  public fetchData =(state:any,instance:any)=>{
    deselectAllCheckbox("NodeTypeManagement__NodeTypeTable");
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
    (async()=>{
      const response = await axios.post("api/node-inventory/v1/addNodeType/",values);
      console.log(response);

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
        this.setTableState({
          ...this.tableState,
         loading:true
        });
        setTimeout(()=>{
          if(response.data.nodeType){
            this.setTableState({
              ...this.tableState,
              loading:false,
               data: [...this.tableState.data, response.data.nodeType]
             })
          }else{
            this.setTableState({
              ...this.tableState,
              loading:false
             });
          }
        },500);
       
        actions.setSubmitting(false);
      })();
  };

  public onDeleteNodeType=()=>{
    
    deselectAllCheckbox("NodeTypeManagement__NodeTypeTable");
    this.setTableState({
      ...this.tableState,
     loading:true
    });

    (async()=>{
      let selectedNode = this.state.checkboxArray[ this.state.checkboxArray.length-1];
      console.log(selectedNode);
      const response = await axios.get('api/node-inventory/v1/deleteNodeType/'+selectedNode);
      let message:string = response.data;
      let newData = null;
      if(message==="success"){
            newData = this.tableState.data.filter((element:INodeType)=>element.nodeId!==selectedNode);
            var index =  this.state.checkboxArray.indexOf(selectedNode);
            this.state.checkboxArray.splice(index, 1);
            notification.open({
              message: "Add Node Type",
              description: "Node type deleted successfully",
              duration: 2
            });
            this.setTableState({
              ...this.tableState,
                 loading:false,
                 data:newData
            });
      }else{
        notification.open({
          message: "Add Node Type",
          description: message,
          duration: 2
        });
        this.setTableState({
          ...this.tableState,
             loading:false,
        });
      }
      this.resetCheckBoxSelectionsAndButtonsState();
      this.isTableHasToReload = false;
   })();

    // setTimeout(()=>{
    //     this.setTableState({
    //       ...this.tableState,
    //       loading:false,
    //       data: newData
    //     });
    //   },500)
    }
  public nodeTypeManagement = (props: any): JSX.Element => {
    const [state, setState] = React.useState<INodeTypeManagement>({
      isDeleteButtonEnabled: false,
      checkboxArray: [],
      isAddModalVisible: false,
      isNodeDetailButtonDisabled:false,
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
            {/* <button className="btn btn-primary ml-3" onClick ={()=>this.EE.emit("onGetNodeDetails",state.checkboxArray[state.checkboxArray.length-1])} disabled={!state.isNodeDetailButtonDisabled} >
                Node Detail
              </button> */}
              <button className="btn btn-primary ml-3" onClick={() => { setState({ ...state, isAddModalVisible: true }); }} >
                Add
              </button>
              <button className="btn btn-primary ml-3" onClick ={this.onDeleteNodeType} disabled={!state.isDeleteButtonEnabled} > Delete</button>
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
