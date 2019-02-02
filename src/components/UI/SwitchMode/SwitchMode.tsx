import * as React from 'react'
import { Switch } from 'antd';
import BaseComponent from '../../BaseComponent/BaseComponent';
interface ISwichModeProps{
    isMobileView:boolean
}

class SwitchMode extends BaseComponent{
    constructor(){
        super();
    }
    private switchMode = (props:ISwichModeProps):JSX.Element => {
        return (
          <div className="ml-0 text-right">
          <label className={"mb-0"}>{props.isMobileView && props.isMobileView?"Switch To Desktop View":"Switch To Mobile View"}</label>
            <Switch
              onChange={(_checked: boolean) => {this.EE.emit("switchMode")}}
            />
          </div>
        )
    }

    public getComponent(): React.FunctionComponent<ISwichModeProps>{
        return this.switchMode;
    }
}

const switchMode = new SwitchMode();

export default switchMode.getComponent();
