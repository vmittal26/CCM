import * as React from "react";
import ReactTable from "react-table";
import headers from "./individualTableHeaderConfig";
import { Icon, Select } from "antd";
import BaseComponent from "../BaseComponent/BaseComponent";
const Option = Select.Option;

const dummyData = [
  {
    nodeDetailName: "IP1",
    parameterName: "Checksum",
    parameterValue: "AHEFGFDDQCL9LCAG"
  },
  {
    nodeDetailName: "IP2",
    parameterName: "Counter",
    parameterValue: "1548175008"
  },
  {
    nodeDetailName: "sdp_1",
    parameterName: "Active",
    parameterValue: "true"
  },
];

class IndividualBaselineContainer extends BaseComponent{
  private nodes:Array<string>=[
          "sdp_1",
          "IP1",
          "IP2",
          "IP3",
          "IP4",
          "IP5",
          "IP6",
          "IP7"
  ];
  constructor(){
    super();
    // this.nodes.map((node)=><Option key={node}>{node}</Option>);
  }

  public onNodeMultiSelect = (value:any)=>{
    console.log(`Selected: ${value}`);
  }

  public individualBaselineComponent = (props:any):JSX.Element=>{
    return (
      <div className="IndividualBaseline">
         <div className="d-flex align-items-center">
                <Select
                  className="flex-grow-1"
                  mode="multiple"
                  size={'default'}
                  placeholder="Please select"
                  defaultValue={['IP1', 'IP2']}
                  onChange={this.onNodeMultiSelect}
                  style={{ width: '100%' }}>
                   { this.nodes.map((node)=><Option key={node}>{node}</Option>)}
                </Select>
                <button className="btn btn-primary">Collect</button>
         </div>
            <ReactTable
              columns={headers.headerConfig}
              showPagination={true}
              loading={false}
              showPaginationTop={true}
              showPaginationBottom={false}
              filterable
              defaultPageSize={5}
              onPageSizeChange={() => {}}
              onPageChange={() => {}}
              previousText={<Icon style={{fontSize:"1rem"}} type="fast-backward" />}
              nextText={<Icon style={{fontSize:"1rem"}} type="fast-forward" />}
              data={dummyData}
            />
      </div>
    );
  }

  public getComponent(): React.FunctionComponent {
    return this.individualBaselineComponent;
  }

}

export const individualBaselineContainer = new IndividualBaselineContainer();

export default individualBaselineContainer.getComponent();
