import * as React from 'react';
import ReactTable from 'react-table';
import{sementTableHeaderConfig ,segmentTableDummyData} from "./segmentBaseLineConfig";
import CommonBaseLineConfigurationComponent from '../CommonBaseLineConfigurationComponent/CommonBaseLineConfigurationComponent';
import SegmentParameterTree from '../SegmentParameterTree/SegmentParameterTree';
import { Icon } from 'antd';
import getCheckBoxHeader from '../../Utils/getCheckBoxHeader';
import BaseComponent from '../BaseComponent/BaseComponent';

const checkboxHeader =getCheckBoxHeader(20,(e: React.ChangeEvent<HTMLInputElement> , row:any) => {
  let checkbox = event.target;
  // highlightRowOnChangeCheckbox(checkbox);
  if(e.target.checked){
        console.log(row);
  }else{
   
  }});

class SegmentBaseLineContainer extends BaseComponent{

  constructor(){
    super();
  }

  public segmentBaseLineComponent =(props:any):JSX.Element=>{
    return (
      <div className="SegmentBaseLine">
        <ReactTable
          columns={[checkboxHeader,...sementTableHeaderConfig.headerConfig]}
          showPagination={true}
          loading={false}
          showPaginationTop={true}
          showPaginationBottom={false}
          filterable
          defaultPageSize={5}
          onPageSizeChange={()=>{}}
          onPageChange={()=>{}}
          previousText={<Icon style={{fontSize:"1rem"}} type="fast-backward" />}
          nextText={<Icon style={{fontSize:"1rem"}} type="fast-forward" />}
          SubComponent={row =>{ console.log(row); return (<SegmentParameterTree className="SegmentTable__SegmentParameterTree"/>)}}
          // onFetchData={this.fetchData}
         data={segmentTableDummyData}
      />
      </div>
    )
  }

  public getComponent(): React.FunctionComponent {
    return this.segmentBaseLineComponent;
  }
}

export const segmentBaseLineContainer = new SegmentBaseLineContainer();

export default segmentBaseLineContainer.getComponent ();