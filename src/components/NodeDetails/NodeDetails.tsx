import *as React from 'react';
import { Select } from 'antd';
import ReactTable from 'react-table';
import columns from "./nodeDetailsHeaderConfig";
const Option = Select.Option;
import 'antd/lib/input/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/select/style/index.css';


export default(props:any)=>{
    return(
            <div className="NodeDetails">
             <h3 className="mb-3">Node Details</h3>
             <div className="NodeDetails_NodeTable">
                <div className="NodeDetails__SelectNodeType">
                <Select placeholder ="Select" style={{ width: 120 }} onChange={()=>{}}>
                    <Option value="a">ABC</Option>
                    <Option value="x">Lucy</Option>
                 </Select>
                </div>
                {/* <div className="NodeDetails__NodeDetailsTable">
                    <ReactTable
                        columns={columns.headerConfig}
                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                        data={[]}
                        pages={0} // Display the total number of pages
                        loading={false} // Display the loading overlay when we need it
                        onFetchData={()=>{}} // Request new data when things change
                        filterable
                        defaultPageSize={5}
                        className="-striped -highlight"
                    ></ReactTable>
                </div> */}
            </div>
            </div>
    );
}