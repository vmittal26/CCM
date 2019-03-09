import * as React from "react";
import Collapsible from "react-collapsible";
import BaseComponent from "../BaseComponent/BaseComponent";
import SegmentTable from "../SegmentTable/SegmentTable";
import IndividualTable from "../IndividualTable/IndividualTable";
import CommonBaseLineConfigurationComponent from "../CommonBaseLineConfigurationComponent/CommonBaseLineConfigurationComponent";
import { Select, Row , Col } from 'antd';
import 'antd/lib/grid/style/index.css';
import 'antd/lib/select/style/index.css';
const Option = Select.Option;

class BaseLineManagementContainer extends BaseComponent {
  constructor() {
    super();
  }

  public onChangeNodeType =(value:any)=>{
    console.log("on change node type" , value);
  }
  public baseLineManagementComponent = (props: any): JSX.Element => {
    return (
      <div className="BaseLineManagement">
        <Row gutter={25}>
          
           <Col  className="BaseLineManagement__Left"xl={8} lg={8} ><CommonBaseLineConfigurationComponent className="BaseLineManagement__CommonBaseLineConfiguration"/></Col>
           <Col className="BaseLineManagement__Right" xl={16} lg={16} >
                <label style={{fontSize:"0.9rem"}}htmlFor="">Select Node Type</label>  
                <Select  className={"m-2"} style={{ width: 200 }} onChange={()=>{}}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Collapsible trigger="Segment" open>  
                  <SegmentTable className="BaseLineManagement__SegmentTable"/>
                </Collapsible>
                <Collapsible trigger="Individual" open>
                 <IndividualTable  className="BaseLineManagement__IndividualTable"/>
                </Collapsible>
           </Col>
        </Row>
      </div>
    );
  };
  public getComponent(): React.FunctionComponent {
    return this.baseLineManagementComponent;
  }
}

export const baseLineManagementContainer = new BaseLineManagementContainer();

export default baseLineManagementContainer.getComponent();
 