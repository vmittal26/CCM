import * as React from "react";
import Collapsible from "react-collapsible";
import BaseComponent from "../BaseComponent/BaseComponent";
import SegmentTable from "../SegmentTable/SegmentTable";
import IndividualTable from "../IndividualTable/IndividualTable";
import CommonBaseLineConfigurationComponent from "../CommonBaseLineConfigurationComponent/CommonBaseLineConfigurationComponent";
import { Select, Row, Col, Card, Icon } from "antd";
import "antd/lib/grid/style/index.css";
import "antd/lib/select/style/index.css";
import "antd/lib/card/style/index.css";
const Option = Select.Option;

class BaseLineManagementContainer extends BaseComponent {
  constructor() {
    super();
  }

  public onChangeNodeType = (value: any) => {
    console.log("on change node type", value);
  };
  public baseLineManagementComponent = (props: any): JSX.Element => {
    const [state, setState] = React.useState({});
    const [isBaseLineSectionExpand, setBaseLineSectionExpand] = React.useState(
      false
    );

    const [isRightSectionExpanded, setRightSectionExpanded] = React.useState(
      false
    );

    let baseLineClassName="BaseLineManagement__Left";
    let rightSectionClassName ="BaseLineManagement__Right";

    if(isBaseLineSectionExpand){
      baseLineClassName = baseLineClassName.concat(" BaseLineManagement__Expand");
      rightSectionClassName = "BaseLineManagement__Hide";

    }else if(isRightSectionExpanded){
      baseLineClassName = "BaseLineManagement__Hide";
      rightSectionClassName = rightSectionClassName.concat(" BaseLineManagement__Expand");
    }
    return (
      <div className="BaseLineManagement">
        <div className={baseLineClassName} >
          <div className="BaseLineManagement__Header">
            <div className="BaseLineManagement__HeaderLeft">
              <label style={{ fontSize: "0.9rem" }} htmlFor="">
                Select Node Type
              </label>
              <Select className={"mb-2"} style={{ width: 200 }} onChange={() => {}} >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div className="BaseLineManagement__HeaderRight">
              {isBaseLineSectionExpand ? 
              (<Icon type="left" style={{ fontSize: "1rem" }} onClick={() => setBaseLineSectionExpand(false)} /> ) : 
              (<Icon style={{ fontSize: "1rem" }} type="right" onClick={() => setBaseLineSectionExpand(true)} /> )}
            </div>
          </div>
          <Collapsible trigger="Common Baseline Configuration" open>
            <CommonBaseLineConfigurationComponent className="BaseLineManagement__CommonBaseLineConfiguration" />
          </Collapsible>
        </div>
        <div className={rightSectionClassName}>
          <div className="mb-2 BaseLineManagement__RightHeader">
          {isRightSectionExpanded ? 
              (<Icon type="right" style={{ fontSize: "1rem" }} onClick={() => setRightSectionExpanded(false)} /> ) : 
              (<Icon style={{ fontSize: "1rem" }} type="left" onClick={() =>  setRightSectionExpanded(true)} /> )}
          </div>
          <Collapsible trigger="Segment Baseline Configuration" open>
            <SegmentTable className="BaseLineManagement__SegmentTable" />
          </Collapsible>
          <Collapsible trigger="Individual Baseline Configuration" open>
            <IndividualTable className="BaseLineManagement__IndividualTable" />
          </Collapsible>
        </div>
      </div>
    );
  };
  public getComponent(): React.FunctionComponent {
    return this.baseLineManagementComponent;
  }
}

export const baseLineManagementContainer = new BaseLineManagementContainer();

export default baseLineManagementContainer.getComponent();
