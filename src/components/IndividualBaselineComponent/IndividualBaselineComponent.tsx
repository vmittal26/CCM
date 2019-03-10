import * as React from "react";
import ReactTable from "react-table";
import headers from "./individualTableHeaderConfig";
import { Icon, Select } from "antd";
import BaseComponent from "../BaseComponent/BaseComponent";
const Option = Select.Option;

const dummyData = [
  {
    nodeDetailName: "Test1",
    parameterName: "test parameter",
    parameterValue: "test value"
  },
  {
    nodeDetailName: "Test2",
    parameterName: "test parameter2",
    parameterValue: "test value2"
  }
];

class IndividualBaselineContainer extends BaseComponent{
  private multiSelectOptions:Array<{}>=[];
  constructor(){
    super();
      for (let i = 10; i < 36; i++) {
        this.multiSelectOptions.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
       }
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
                  defaultValue={['a10', 'c12']}
                  onChange={this.onNodeMultiSelect}
                  style={{ width: '100%' }}>
                   {this.multiSelectOptions}
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
