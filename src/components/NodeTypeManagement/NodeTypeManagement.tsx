import * as React from "react";
import { notification,Modal } from "antd";
import 'antd/lib/modal/style/index.css';
import AddNodeType from "../AddNodeType/AddNodeType";
import CoverSpinner from "../UI/CoverSpinner/CoverSpinner";
import Backdrop from "../UI/Backdrop/Backdrop";
import 'antd/lib/notification/style/index.css';
import axios from "../../config/axiosKTMConfig";

const dataFromBackend=[ {
  nodeId: "1",
  nodetype: "SDP",
  nodedescription: "ABC"
},
{
  nodeId: "2",
  nodetype: "PQR",
  nodedescription: "XYZ"
},
{
  nodeId: "3",
  nodetype: "SDP",
  nodedescription: "ABC"
},
{
  nodeId: "4",
  nodetype: "PQR",
  nodedescription: "XYZ"
}]

export default (props: any) => {
  const [state, setState] = React.useState({
    isDeleteButtonEnabled: false,
    checkboxArray:[],
    isAddModalVisible:false,
    isBackDropVisible:false,
    isNodeTypeDataLoading:true,
    dummyNodeList:[]
  });
 
  let addNodeType=(
                <AddNodeType onSubmit={(values:any, actions:any) => {
                                            actions.setSubmitting(true);
                                              setState({
                                                ...state,
                                                isBackDropVisible:true
                                              });
                                              
                                              const data={
                                                nodeName:values.nodetype,
                                                nodeDescription:values.nodedescription
                                              };
                                              console.log(data);

                                              (async()=>{
                                                    const response = await axios.post("api/node-inventory/v1/addNodeType/",data);
                                                    console.log(response);
                                                  //   setState({
                                                  //   ...state,
                                                  //   isNodeTypeDataLoading:false,
                                                  //   dummyNodeList:[...response.data,...state.dummyNodeList]
                                                  // });
                                              })();
                                              
                                              setTimeout(() => {
                                                state.dummyNodeList.push(values);
                                                setState({
                                                  ...state,
                                                  isBackDropVisible:false,
                                                  isAddModalVisible:false,
                                                  dummyNodeList:[...state.dummyNodeList]
                                                })
                                                notification.open({
                                                  message: 'Add Node Type',
                                                  description: 'Node Type is saved sucessfully',
                                                  duration: 2,
                                                });
                                            actions.setSubmitting(false);
                                     }, 2000);
                }} onCancel={() => setState({...state,isAddModalVisible:false})}/>);

  let emptytable=(
    <table className="NodeTypeManagement__NodeTypeTable table table-hover">
      <thead><tr>
              <th>#</th>
              <th>Node Type</th>
              <th>Description</th>
            </tr></thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
    </table>
  )
  let tableBody = (<tbody >
  {state.dummyNodeList.map(row => {
    return (
      <tr key={row.nodeId}>
        <td>
          <input
            className="checkbox"
            type="checkbox"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              
              if(e.target.checked){
                state.checkboxArray.push(row.nodeId);
                setState({
                  ...state,
                  isDeleteButtonEnabled: state.checkboxArray.length===1
                });
              }else{
                var index =  state.checkboxArray.indexOf(row.nodeId);
                index > -1 ? state.checkboxArray.splice(index, 1):state.checkboxArray
                setState({
                  ...state,
                  isDeleteButtonEnabled: state.checkboxArray.length===1
                });
              }
            }}
          />
        </td>
        <td>{row.nodetype}</td>
        <td>{row.nodedescription}</td>
      </tr>
    );
  })}
</tbody>);
let actualTable= <table className="NodeTypeManagement__NodeTypeTable table table-hover">
<thead>
  <tr>
    <th>#</th>
    <th>Node Type</th>
    <th>Description</th>
  </tr>
</thead>
{tableBody}
</table>

  React.useEffect(()=>{
      /** Actual Data Code
        (async()=>{
              const response = await axios.get("api/node-inventory/v1/getNodeTypes/");
              console.log(response);
            setState({
              ...state,
              isNodeTypeDataLoading:false,
              dummyNodeList:[...response.data,...state.dummyNodeList]
            });
        })();
      */
      setTimeout(()=>{
        setState({
          ...state,
          isNodeTypeDataLoading:false,
          dummyNodeList:dataFromBackend
        });
      },1000)
    
    return () => {
      console.log("removing switchMode Listener on unmount");
    };
  },[]);
  return (
    <div className="NodeTypeManagement">
     <Modal
          title="Add Node Type"
          centered
          footer={null}
          visible={state.isAddModalVisible}
          onCancel={()=>{setState({...state,isAddModalVisible:false})}}
        >
          <div style={{position:"relative"}}>{state.isBackDropVisible?<><Backdrop show iswhite/><CoverSpinner/>{addNodeType}</>:addNodeType}</div>
        </Modal>
      <div className="NodeTypeManagement__NodeTypeContainer">
        <div className="NodeTypeManagement__Header">
          <h4>Node Type</h4>
          <div className="NodeTypeManagement__button-section">
          <button className="btn btn-primary" onClick={()=>{setState({...state,isAddModalVisible:true})}}>Add</button>
          <button className="btn btn-primary ml-3" disabled={!state.isDeleteButtonEnabled} >Delete </button>
       </div>
      </div>
      {state.isNodeTypeDataLoading?<><Backdrop /><CoverSpinner/>{emptytable}</>:actualTable}
      </div>
    </div>
  );
};
