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
import highlightRowOnChangeCheckbox from '../../Utils/highlightRowOnChangeCheckbox';
import { deselectAllCheckbox } from '../../Utils/TableRowSelectionsUtil';
import axios from '../../config/axiosKTMConfig';
import INodeTypeTableState from '../../model/INodeTypeTableState';
import ITableState from '../../model/ITableState';
import INodeDetail from '../../model/INodeDetail';
import INodeDetailTableState from '../../model/INodeDetailTableState';

class NodeDetailContainer extends BaseComponent{
    private addNodeDetail: JSX.Element;
    private setState: Function;
    private state: any;
    private nodeDetailsColumnHeaders:Array<{}>=columns.headerConfig;
    private selectedNodeTypeId:string;
    private selectedNodeIdArray:Array<string>=[];
    private selectedNodeType:string;
    private isTableHasToReload: boolean = false;
    private isLoadedForFirstTime:boolean = false;
    private tableState:INodeDetailTableState;
    private setTableState:Function;
    private nodeDetailsList:Array<INodeDetail>;
    private nodeDetailsToBeUpdated:INodeDetail;
    private nodeDetailSelectedArray:Array<INodeDetail>=[];
    private nodeTypeMap = new Map<string, string>();

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
                // highlightRowOnChangeCheckbox(checkbox);
                console.log(row);
                if(e.target.checked){
                  this.nodeDetailSelectedArray.push({...row.original});
                  this.state.checkboxArray.push(row.original.nodeDetailsId);
                  this.setState({
                    ...this.state,
                    isDeleteButtonEnabled: this.state.checkboxArray.length===1
                  });
                }else{
                  this.nodeDetailSelectedArray.filter((nodeDetail:INodeDetail)=>nodeDetail.nodeDetailsId!==row.original.nodeDetailsId);
                  var index =  this.state.checkboxArray.indexOf(row.original.nodeDetailsId);
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
        console.log(values);
        (async()=>{
          const data = {
            ...values,
            nodeTypeId:this.selectedNodeIdArray[this.selectedNodeIdArray.length-1]
          }
          const response = await axios.post("api/node-inventory/v1/addNodeDetails/",data);
          console.log(response);
    
            this.setState({
              ...this.state,
              isBackDropVisible: false,
              isModalVisible: false,
            });
            notification.open({
              message: "Add Node Detail",
              description: response.data,
              duration: 2
            });
            // // this.isTableHasToReload = true;
            // if(response.data){
            //   this.setTableState({
            //     ...this.tableState,
            //      data: [...this.tableState.data, response.data]
            //    })
            // }
            actions.setSubmitting(false);
          })();
      };
      public fetchData =(state:any,instance:any)=>{
            deselectAllCheckbox("NodeDetails__NodeDetailsTable");
      }

      public onUpdateNodeDetail=()=>{
          console.log("Inside Update Node detail");
      }
      public onCancelModal=()=>{
        this.setState({ ...this.state, isModalVisible: false }) 
      }

    public showAddNodeDetail=()=>{
      this.setState({...this.state,nodeDetailsToBeUpdated:{nodeType: this.nodeTypeMap.get(this.getSelectNodeTypeId())},isUpdateModal:false,isModalVisible:true})
    }
    constructor(){
        super();
    }

    public getSelectedNodeDetail=():string=>{
        return this.state.checkboxArray[this.state.checkboxArray.length-1];
    }
    public getSelectNodeTypeId =():string=>{
     return this.selectedNodeIdArray[this.selectedNodeIdArray.length-1];
    }
    public resetSelectionAndButtonState =()=>{
      this.nodeDetailSelectedArray=[];
      this.state.checkboxArray =[];
      this.setState({
        ...this.state,
        isDeleteButtonEnabled:false,
      });
    }
    public onPageChange =()=>{
      deselectAllCheckbox("NodeDetails__NodeDetailsTable");
      this.resetSelectionAndButtonState();
    }

    public onPageSizeChange =()=>{
      deselectAllCheckbox("NodeDetails__NodeDetailsTable");
      this.resetSelectionAndButtonState();
    }

    public onGetNodeDetails=(id:string)=>{
       
        let nodeTypeIds = {nodeTypeIds:[...this.nodeTypeMap.keys()]}
        console.log("Inside onGetNodeDetails "+ nodeTypeIds);
        deselectAllCheckbox("NodeDetails__NodeDetailsTable");
        this.setTableState({
          ...this.tableState,
          loading:true
        });
        (async()=>{
          const response = await axios.post("/api/node-inventory/v1/getNodeDetails/",nodeTypeIds);
          console.log(response);
          this.nodeDetailsList = response.data;
          this.setTableState({
            ...this.tableState,
            loading:false,
            data:this.nodeDetailsList
          });
          this.resetSelectionAndButtonState();
          // this.isLoadedForFirstTime ? this.isLoadedForFirstTime : this.isLoadedForFirstTime=true;
          this.isTableHasToReload=false;
      })();
    }
    public onNodeTypeSelect=(nodeTypeName:string, nodeTypeId:string,selected:boolean)=>{
      console.log("Inside onNodeTypeSelect "+nodeTypeId ,nodeTypeName);
      if(nodeTypeId===null){
        this.selectedNodeIdArray = [];
      }
      if(selected){
        this.selectedNodeType = nodeTypeName;
        this.nodeTypeMap.set(nodeTypeId,nodeTypeName);
        this.selectedNodeIdArray.push(nodeTypeId);
        this.setState({
          ...this.state,
          isAddNodeDetailButtonEnabled: this.selectedNodeIdArray.length===1
        });
      }else{
        this.nodeTypeMap.delete(nodeTypeId);
        var index =  this.selectedNodeIdArray.indexOf(nodeTypeId);
        index > -1 ? this.selectedNodeIdArray.splice(index, 1):this.selectedNodeIdArray
        this.setState({
          ...this.state,
          isAddNodeDetailButtonEnabled: this.selectedNodeIdArray.length===1
       });
    }
    }

    public onDeleteNodeDetail=()=>{
      console.log("Inside onDeleteNodeDetail "+this.getSelectedNodeDetail());
      deselectAllCheckbox("NodeDetails__NodeDetailsTable");
      this.setTableState({
        ...this.tableState,
        loading:true
      });
      (async()=>{
        console.log(this.getSelectedNodeDetail());
        const response = await axios.get("/api/node-inventory/v1/deleteNodeDetails/"+this.getSelectedNodeDetail());
        let message:string = response.data;
        let newData = null;
        if(message==="success"){
          newData = this.tableState.data.filter((element:INodeDetail)=>element.nodeDetailsId!==this.getSelectedNodeDetail());
          var index =  this.state.checkboxArray.indexOf(this.getSelectedNodeDetail());
          this.state.checkboxArray.splice(index, 1);
          notification.open({
            message: "Delete Node Detail",
            description: "Node Detail deleted successfully",
            duration: 2
          });
          this.setTableState({
            ...this.tableState,
               loading:false,
               data:newData
          });
          }else{
            notification.open({
              message: "Delete Node Detail",
              description: message,
              duration: 2
            });
            this.setTableState({
              ...this.tableState,
                loading:false,
            });
          }
          this.resetSelectionAndButtonState();
          this.isTableHasToReload = false;
    })();
   
    }
    public showUpdateNodeDetail=()=>{
        this.setState({...this.state,nodeDetailsToBeUpdated :  this.nodeDetailSelectedArray[this.nodeDetailSelectedArray.length-1] ,isUpdateModal:true,isModalVisible:true})
    }
    public nodeDetailsManagement = (props: any): JSX.Element => {
        const [state, setState] = React.useState({
            isAddNodeDetailButtonEnabled: false,
            checkboxArray:[],
            isModalVisible:false,
            isUpdateModal:false,
            isBackDropVisible:false,
            isDeleteButtonEnabled:false,
            nodeDetailsToBeUpdated:{}
          });
        const[tableState,setTableState] = React.useState<INodeDetailTableState>({
            loading:false,
            page:0,
            pages:null,
            data:[]
           });

        this.state = state;
        this.setState = setState;
        this.tableState = tableState;
        this.setTableState = setTableState;

        let nodeDetailsTable =(
        <ReactTable
            columns={[this.checkboxHeader,...this.nodeDetailsColumnHeaders]}
            showPagination={true}
            loading={tableState.loading}
            showPaginationTop={true}
            showPaginationBottom={false}
            filterable
            defaultPageSize={5}
            onPageSizeChange={this.onPageSizeChange}
            onPageChange={this.onPageChange}
            // onFetchData={this.fetchData}
            data={tableState.data}
            />);
        React.useEffect(()=>{
          console.log("In useffect of Nodedetails");
          this.EE.on("onGetNodeDetails",this.onGetNodeDetails);
          this.EE.on("onNodeTypeSelect",this.onNodeTypeSelect);
          
          return () => {
            console.log("removing onNodeTypeSelect Listener on unmount");
            this.resetSelectionAndButtonState();
            this.selectedNodeIdArray=[];
            this.EE.removeListener("onGetNodeDetails",this.onGetNodeDetails);
            this.EE.removeListener("onNodeTypeSelect", this.onNodeTypeSelect);
          };
        },[])

        let nodeDetailForm =  <AddNodeDetail  
                                  initialValues = {state.nodeDetailsToBeUpdated} 
                                  onSubmit={state.isUpdateModal?this.onUpdateNodeDetail:this.onSubmitAddNodeDetail} 
                                  onCancel={this.onCancelModal} />;

        return(      
        
        <div className="NodeDetails">
        <Modal
          title={state.isUpdateModal?"Update Node Detail":"Add Node Detail"}
          centered
          footer={null}
          visible={state.isModalVisible}
          onCancel={() => {
            setState({ ...state, isModalVisible: false });
          }}>
          <div style={{ position: "relative" }}>
            {state.isBackDropVisible ? (
              <> <Backdrop show iswhite /> <CoverSpinner /> {nodeDetailForm} </> ) : ( nodeDetailForm)}
          </div>
            </Modal>
            <div className="NodeDetails__NodeDetails">
            <div className="NodeDetails__Header">
            <h4 >Node Details</h4>
            <div className="NodeDetails__button-section">
                <button className="btn btn-primary"  disabled={!state.isAddNodeDetailButtonEnabled} onClick={this.showAddNodeDetail}>Add Node Detail</button>
                <button className="btn btn-primary ml-3" disabled={!state.isDeleteButtonEnabled} onClick={this.showUpdateNodeDetail}>Modify Node</button>
                <button className="btn btn-primary ml-3" onClick={this.onDeleteNodeDetail} disabled={!state.isDeleteButtonEnabled} >Delete Node </button>
            </div>
            </div>
              <div className="NodeDetails__NodeDetailsTable">
              <div style={{position:"relative"}}>{tableState.loading ? <Spinner /> : null}{nodeDetailsTable}</div>
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