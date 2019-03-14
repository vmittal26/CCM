import * as React from "react";
import Collapsible from "react-collapsible";
import BaseComponent from "../BaseComponent/BaseComponent";
import CommonBaseLineConfigurationComponent from "../CommonBaseLineConfigurationComponent/CommonBaseLineConfigurationComponent";
import { Select, Icon, Tooltip } from "antd";
import "antd/lib/grid/style/index.css";
import "antd/lib/select/style/index.css";
import "antd/lib/card/style/index.css";
import "antd/lib/tooltip/style/index.css";
import IndividualBaselineComponent from "../IndividualBaselineComponent/IndividualBaselineComponent";
import SegmentBaseLineComponent from "../SegmentBaseLineComponent/SegmentBaseLineComponent";
const Option = Select.Option;
import {parametersModificationsMap } from "../ParameterGroupTableComponent/ParameterGroupTableComponent";
import { INodeType } from "../../model/INodeType";
import { axiosNodeManagement, axiosBaseLineManagement } from "../../config/axiosConfig";


class BaseLineManagementContainer extends BaseComponent {
  constructor() {
    super();
    this.EE.on("onParameterTableExpansion", this.onParameterTableExpansion)
  }

  private setState:Function;
  private state:any;
  private baseLineClassName="BaseLineManagement__Left";
  private segmentBaselineClassName ="BaseLineManagement__SegmentBaseLine";
  private individualBaseLineClassName="BaseLineManagement__IndividualBaseLine";
  private nodeListData:Array<INodeType>;
  public onNodeTypeSelection = (value: any) => {
    this.setState({
      ...this.state,
      isNodeTypeSelected:true
    })

    let node = this.nodeListData.find((nodeType:INodeType)=>nodeType.nodeId==value);
    this.EE.emit("onNodeTypeSelection",value,node.nodeType);
    console.log("on change node type", value);
  };

  public onParameterTableExpansion = (panelToBeExpanded:string)=>{

    if(panelToBeExpanded==="commonBaseline"){
      this.setState({...this.state,isBaseLineSectionExpand:true})
    }else if(panelToBeExpanded==="segmentBaseline"){
      this.setState({...this.state,isSegmentBaseLineExpanded:true})
    }

  }
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
      isIndividualBaseLineExpanded:false,
      isNodeTypeDownLoading:true,
      isNodeTypeSelected:false
    });

    this.state = state;
    this.setState = setState;

    this.handleExpansionOfPanels();
    
    React.useEffect(() => {
      this.EE.emit("onNavigation", [
        { breadCrumbName: "Home", breadCrumbLink: "/" },
        { breadCrumbName: "House Keeping" },
        { breadCrumbName: "Baseline Congifuration Management" }
      ]);
          (async()=>{
            const response = await axiosBaseLineManagement.get("api/base-config-manager/v1/baseconfig/getNodeTypes/ ");
            console.log(response);
            this.nodeListData = response.data;
            setTimeout(()=>{
              setState({
                ...state,
                isNodeTypeDownLoading:false,
              });
            },1000);
        })();
      },[]);
    return (
      <div className="BaseLineManagement">
      <div className={ this.baseLineClassName} >
           <div className="ExpandButton">
              {state.isBaseLineSectionExpand ?
              <Tooltip title="Click To Collapse">
                <Icon type="minus" style={{ fontSize: "0.9rem" }} onClick={() => setState({...state,isBaseLineSectionExpand:false})}/> 
              </Tooltip>
               :
               <Tooltip title="Click To Expand">
                <Icon style={{ fontSize: "0.9rem" }} type="plus" onClick={() => setState({...state,isBaseLineSectionExpand:true})} />
               </Tooltip>}
            </div>
          <div className="BaseLineManagement__Header">
            <div className="BaseLineManagement__HeaderLeft">
              <label htmlFor="">
                Select Node Type
              </label>
              <Select className={"mb-2"} style={{ width: 200 }} 
                      onChange={this.onNodeTypeSelection} 
                      loading = {state.isNodeTypeDownLoading} 
                      placeholder={state.isNodeTypeDownLoading?"Please wait...":"Please Select Node Type"}>
                      {state.isNodeTypeDownLoading?
                      <Option key ="1">Please wait</Option>:
                        this.nodeListData.map((nodeType:INodeType)=>(
                              <Option key = {nodeType.nodeId}>{nodeType.nodeType}</Option>
                        ))
                      }
                    </Select>
            </div>
            <button className="btn btn-primary" onClick={()=>{console.log(parametersModificationsMap)}} >
                Save Modifications
            </button>
          </div>
          <Collapsible trigger="Common Baseline Configuration" triggerDisabled ={!state.isNodeTypeSelected} open={state.isNodeTypeSelected}>
            <CommonBaseLineConfigurationComponent  />
          </Collapsible>
        </div>
        <div className={this.segmentBaselineClassName}>
          <div className="ExpandButton">
          {state.isSegmentBaseLineExpanded ?
             <Tooltip title="Click To Collapse"> 
                <Icon type="minus" style={{ fontSize: "0.9rem" }} onClick={() => setState({...state,isSegmentBaseLineExpanded:false})} />
              </Tooltip>
              :
              <Tooltip title="Click To Expand">
                <Icon style={{ fontSize: "0.9rem" }} type="plus" onClick={() =>  setState({...state,isSegmentBaseLineExpanded:true})}/> 
              </Tooltip>}
          </div>
          <Collapsible trigger="Segment Baseline Configuration"  triggerDisabled ={!state.isNodeTypeSelected} open={state.isNodeTypeSelected}>
            <SegmentBaseLineComponent/>
          </Collapsible>
        </div>
        <div className={this.individualBaseLineClassName}>
        <div className="ExpandButton">
          {state.isIndividualBaseLineExpanded ? 
              <Tooltip title="Click To Collapse"> 
              <Icon type="minus" style={{ fontSize: "0.9rem" }} onClick={() => setState({...state,isIndividualBaseLineExpanded:false})} />
            </Tooltip>
            :
            <Tooltip title="Click To Expand">
              <Icon style={{ fontSize: "0.9rem" }} type="plus" onClick={() =>  setState({...state,isIndividualBaseLineExpanded:true})}/> 
            </Tooltip>}
          </div>
          <Collapsible trigger="Individual Baseline Configuration"   triggerDisabled ={!state.isNodeTypeSelected} open={state.isNodeTypeSelected}>
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
