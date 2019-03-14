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
import {subGroupIdParameterDataMap } from "../ParameterGroupTableComponent/ParameterGroupTableComponent";
import { Rnd } from "react-rnd";
import axios from "axios";
import { INodeType } from "../../model/INodeType";


class BaseLineManagementContainer extends BaseComponent {
  constructor() {
    super();
  }

  private setState:Function;
  private state:any;
  private baseLineClassName="BaseLineManagement__Left";
  private segmentBaselineClassName ="BaseLineManagement__SegmentBaseLine";
  private individualBaseLineClassName="BaseLineManagement__IndividualBaseLine";
  private nodeListData:[];
  public onNodeTypeSelection = (value: any) => {
    this.EE.emit("onNodeTypeSelection",value);
    console.log("on change node type", value);
  };

  

  public baseLineManagementComponent = (props: any): JSX.Element => {
    const [state, setState] = React.useState({
      isBaseLineSectionExpand:false,
      isSegmentBaseLineExpanded:false,
      isIndividualBaseLineExpanded:false,
      isNodeTypeDownLoading:true
      
    });

    this.state = state;
    this.setState = setState;

    React.useEffect(() => {
      (async()=>{
        const response = await axios.get("http://localhost:8080/api/node-inventory/v1/getNodeTypes/");
        console.log(response);
        this.nodeListData = response.data;
        setState({
          ...state,
          isNodeTypeDownLoading:false,
        });
    })();
    
      return() => {
        
      }
    }, [])
    return (
      <div className="BaseLineConfigurationManagement">
            <Rnd
                    default={{
                      x: 10,
                      y: 0,
                      width: "400px",
                      height: "auto",
                    }}
            bounds="window">
           
            <div className="BaseLineConfigurationManagement__Left" >
                <Collapsible trigger="Common Baseline Configuration" open>
                    <CommonBaseLineConfigurationComponent  />
                </Collapsible>
             </div>
               
            </Rnd>
            <Rnd
                  // default={{
                  //   x: 0,
                  //   y: 0,
                  //   width: "400px",
                  //   height: "auto",
                  // }}
            //  style={
            //    {
            //     transform: "translateX(100%)"
            //    }
            //  }
            enableResizing={{topRight:true}}
            bounds="window">
              <div className="BaseLineConfigurationManagement__SegmentBaseLine">
                <Collapsible trigger="Segment Baseline Configuration" open>
                  <SegmentBaseLineComponent/>
                </Collapsible>
              </div>
            </Rnd>
    </div>
    );
  };
  public getComponent(): React.FunctionComponent {
    return this.baseLineManagementComponent;
  }
}

export const baseLineManagementContainer = new BaseLineManagementContainer();

export default baseLineManagementContainer.getComponent();
