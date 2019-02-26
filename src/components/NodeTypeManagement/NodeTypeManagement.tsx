import * as React from "react";
import { Modal } from "antd";
import 'antd/lib/modal/style/index.css';
import AddNodeType from "../AddNodeType/AddNodeType";

export default (props: any) => {
  const [state, setState] = React.useState({
    isDeleteButtonEnabled: false,
    checkboxArray:[],
    isAddModalVisible:false
  });
  const dummNodeList = [
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

  return (
    <div className="NodeTypeManagement">
     <Modal
          title="Add Node Type"
          centered
          visible={state.isAddModalVisible}
          onOk={() => setState({...state,isAddModalVisible:false})}
          onCancel={() => setState({...state,isAddModalVisible:false})}
        >
          <AddNodeType />
        </Modal>
      <div className="NodeTypeManagement__NodeTypeContainer">
        <div className="NodeTypeManagement__Header">
          <h4>Node Type</h4>
          <div className="NodeTypeManagement__button-section">
          <button className="btn btn-primary" onClick={()=>{setState({...state,isAddModalVisible:true})}}>Add</button>
          <button className="btn btn-primary ml-3" disabled={!state.isDeleteButtonEnabled} >Delete </button>
      </div>
      </div>
        <table className="NodeTypeManagement__NodeTypeTable table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Node Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {dummNodeList.map(row => {
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
                  <td>{row.nodeType}</td>
                  <td>{row.nodeDescription}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
