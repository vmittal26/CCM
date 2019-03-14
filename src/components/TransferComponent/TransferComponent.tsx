import * as React from 'react'
import { Transfer } from 'antd';
import "antd/lib/transfer/style/index.css";

export default function TransferComponent(props:any) {

  const [state, setState] = React.useState({
      availableData:[],
      targetData:[]
  });

  const handleOnChange = (targetData:any)=>{

    console.log(targetData);

    setState({
        ...state,
        targetData
    });

  }
  const getMock = () => {
    const targetData:Array<{}>= [];
    const availableData:Array<{}>= [];
    for (let i = 0; i < 20; i++) {
   
     const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: false,
      };
      availableData.push(data);
    }
   setState({ availableData, targetData });
  }

  React.useEffect(()=>{
    getMock();  
  },[])
  return (
   <div className="Transfer">
     <Transfer
        dataSource={state.availableData}
        // titles={['Available Node List', 'Current Node List']}
        // showSearch
        // filterOption={this.filterOption}
        targetKeys={state.targetData}
        onChange={handleOnChange}
        // /onSearch={this.handleSearch}
        render={item => item.title}
      />
   
   </div>
  )
}
