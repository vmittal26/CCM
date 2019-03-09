import * as React from "react";
import Collapsible from "react-collapsible";
import BaseComponent from "../BaseComponent/BaseComponent";
import SegmentTable from "../SegmentTable/SegmentTable";
import IndividualTable from "../IndividualTable/IndividualTable";
import CommonBaseLineConfigurationComponent from "../CommonBaseLineConfigurationComponent/CommonBaseLineConfigurationComponent";
import { Select, Row , Col, Card, Icon } from 'antd';
import 'antd/lib/grid/style/index.css';
import 'antd/lib/select/style/index.css';
import "antd/lib/card/style/index.css";
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
           <Col xl={12} lg={12} >
           <Card>
             <div className="BaseLineManagement__Left">
             <div className="BaseLineManagement__Header">
             <div className="BaseLineManagement__HeaderLeft">
              <label style={{fontSize:"0.9rem"}}htmlFor="">Select Node Type</label>  
              <Select  className={"m-2"} style={{ width: 200 }} onChange={()=>{}}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled" disabled>Disabled</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                  </Select>
             </div>
           <div className="BaseLineManagement__HeaderRight">
              <Icon type="right" onClick={()=>{}} />
           </div>
             </div>
             <Collapsible trigger="Common Baseline Configuration" open>
              <CommonBaseLineConfigurationComponent className="BaseLineManagement__CommonBaseLineConfiguration"/>
             </Collapsible>
             </div>
           </Card>
           </Col>
           <Col xl={12} lg={12} >
           <Card >
            <div className="BaseLineManagement__Right">
          
                <Collapsible trigger="Segment Baseline Configuration" open>  
                  <SegmentTable className="BaseLineManagement__SegmentTable"/>
                </Collapsible>
                <Collapsible trigger="Individual Baseline Configuration" open>
                 <IndividualTable  className="BaseLineManagement__IndividualTable"/>
                </Collapsible>
            </div>
           </Card>
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
 