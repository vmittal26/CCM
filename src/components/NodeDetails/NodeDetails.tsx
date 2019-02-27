import *as React from 'react';
import { Select, Modal } from 'antd';
import ReactTable from 'react-table';
import columns from "./nodeDetailsHeaderConfig";
const Option = Select.Option;
import 'antd/lib/input/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/select/style/index.css';
import AddNodeDetail from '../AddNodeDetail/AddNodeDetail';
import Backdrop from '../UI/Backdrop/Backdrop';
import CoverSpinner from '../UI/CoverSpinner/CoverSpinner';


export default(props:any)=>{

    const [state, setState] = React.useState({
        isDeleteButtonEnabled: false,
        checkboxArray:[],
        isAddModalVisible:false,
        isBackDropVisible:false,
        data:[]
      });
    let addNodeDetail=(
        <AddNodeDetail onSubmit={(values:any)=>console.log(values)} 
                       onCancel={() => setState({...state,isAddModalVisible:false})}/>
    );
    return(
            <div className="NodeDetails">
            <Modal
                title="Add Node Detail"
                centered
                footer={null}
                onCancel={()=>{setState({...state,isAddModalVisible:false})}}
                visible={state.isAddModalVisible}
            >
            <div style={{position:"relative"}}>{state.isBackDropVisible?<><Backdrop show iswhite/><CoverSpinner/>{addNodeDetail}</>:addNodeDetail}</div>
            </Modal>
             <h4 className="mb-3">Node Details</h4>
             <div className="NodeDetails_NodeTable">
                <div className="NodeDetails__Header">
                    <div className="NodeDetails__SelectNodeType">
                    <Select placeholder ="Select Node Type" style={{ width: 150 }} onChange={()=>{}}>
                        <Option value="S">SDP</Option>
                        <Option value="T">TAD</Option>
                    </Select>
                    </div>
                    <div className="NodeDetails__button-section">
                        <button className="btn btn-primary" onClick={()=>setState({...state,isAddModalVisible:true})}>Add Node</button>
                        <button className="btn btn-primary ml-3" onClick={()=>{}}>Modify Node</button>
                        <button className="btn btn-primary ml-3" disabled >Delete Node </button>
                    </div>
                </div>
                
                <div className="NodeDetails__NodeDetailsTable">
                    <ReactTable
                        style={{height:300}}
                        columns={columns.headerConfig}
                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                        data={[]}
                        showPaginationTop
                        showPaginationBottom={false}
                        pages={0} // Display the total number of pages
                        loading={false} // Display the loading overlay when we need it
                        onFetchData={()=>{}} // Request new data when things change
                        filterable
                        defaultPageSize={5}
                        className="-striped -highlight"
                    ></ReactTable>
                </div>
            </div>
            </div>
    );
}