import * as React from "react";
import Collapsible from "react-collapsible";
import BaseComponent from "../BaseComponent/BaseComponent";
import SegmentTable from "../SegmentTable/SegmentTable";
import CommonBaseLineConfigurationComponent from "../CommonBaseLineConfigurationComponent/CommonBaseLineConfigurationComponent";
import { Select, Row, Col, Card, Icon } from "antd";
import "antd/lib/grid/style/index.css";
import "antd/lib/select/style/index.css";
import "antd/lib/card/style/index.css";
import IndividualBaselineComponent from "../IndividualBaselineComponent/IndividualBaselineComponent";
import SegmentBaseLineComponent from "../SegmentBaseLineComponent/SegmentBaseLineComponent";
const Option = Select.Option;

class BaseLineManagementContainer extends BaseComponent {
  constructor() {
    super();
  }

  private setState:Function;
  private state:any;
  private baseLineClassName="BaseLineManagement__Left";
  private segmentBaselineClassName ="BaseLineManagement__SegmentBaseLine";
  private individualBaseLineClassName="BaseLineManagement__IndividualBaseLine";
  public onChangeNodeType = (value: any) => {
    console.log("on change node type", value);
  };

  public handleExpansionOfPanels =()=>{

    this.baseLineClassName="BaseLineManagement__Left";
    this.segmentBaselineClassName ="BaseLineManagement__SegmentBaseLine";
    this.individualBaseLineClassName="BaseLineManagement__IndividualBaseLine";

    if(this.state.isBaseLineSectionExpand){
      this.baseLineClassName =  this.baseLineClassName.concat(" BaseLineManagement__Expand");
      this.segmentBaselineClassName = "BaseLineManagement__Hide";
      this.individualBaseLineClassName="BaseLineManagement__Hide";

    }else if(this.state.isSegmentBaseLineExpanded){
      this.baseLineClassName = "BaseLineManagement__Hide";
      this.segmentBaselineClassName = this.segmentBaselineClassName.concat(" BaseLineManagement__Expand");
      this.individualBaseLineClassName="BaseLineManagement__Hide";
    }else if(this.state.isIndividualBaseLineExpanded){
      this.baseLineClassName = "BaseLineManagement__Hide";
      this.segmentBaselineClassName ="BaseLineManagement__Hide";
      this.individualBaseLineClassName = this.individualBaseLineClassName.concat(" BaseLineManagement__Expand")
    }
  }
  public baseLineManagementComponent = (props: any): JSX.Element => {
    const [state, setState] = React.useState({
      isBaseLineSectionExpand:false,
      isSegmentBaseLineExpanded:false,
      isIndividualBaseLineExpanded:false
    });

    this.state = state;
    this.setState = setState;

    this.handleExpansionOfPanels();

    return (
      <div className="BaseLineManagement">
        <div className={ this.baseLineClassName} >
        <div className="ExpandButton">
              {state.isBaseLineSectionExpand ? 
              (<Icon type="minus" style={{ fontSize: "0.9rem" }} onClick={() => setState({...state,isBaseLineSectionExpand:false})}/> ) : 
              (<Icon style={{ fontSize: "0.9rem" }} type="plus" onClick={() => setState({...state,isBaseLineSectionExpand:true})} /> )}
            </div>
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
          </div>
          <Collapsible trigger="Common Baseline Configuration" open>
            <CommonBaseLineConfigurationComponent  />
          </Collapsible>
        </div>
        <div className={this.segmentBaselineClassName}>
          <div className="ExpandButton">
          {state.isSegmentBaseLineExpanded ? 
              (<Icon type="minus" style={{ fontSize: "0.9rem" }} onClick={() => setState({...state,isSegmentBaseLineExpanded:false})} /> ) : 
              (<Icon style={{ fontSize: "0.9rem" }} type="plus" onClick={() =>  setState({...state,isSegmentBaseLineExpanded:true})}/> )}
          </div>
          <Collapsible trigger="Segment Baseline Configuration" open>
            <SegmentBaseLineComponent/>
          </Collapsible>
        </div>
        <div className={this.individualBaseLineClassName}>
        <div className="ExpandButton">
          {state.isIndividualBaseLineExpanded ? 
              (<Icon type="minus" style={{ fontSize: "0.9rem" }} onClick={() => setState({...state,isIndividualBaseLineExpanded:false})}  /> ) : 
              (<Icon style={{ fontSize: "0.9rem" }} type="plus" onClick={() => setState({...state,isIndividualBaseLineExpanded:true})}/>)}
          </div>
          <Collapsible trigger="Individual Baseline Configuration" open>
           <IndividualBaselineComponent/>
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
