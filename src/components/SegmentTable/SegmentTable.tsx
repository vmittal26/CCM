import * as React from 'react';
import ReactTable from 'react-table';
import headers from "./segmentTableHeaderConfig";
import CommonBaseLineConfigurationComponent from '../CommonBaseLineConfigurationComponent/CommonBaseLineConfigurationComponent';
import SegmentParameterTree from '../SegmentParameterTree/SegmentParameterTree';
import { Icon } from 'antd';
import getCheckBoxHeader from '../../Utils/getCheckBoxHeader';

const checkboxHeader =getCheckBoxHeader(20,(e: React.ChangeEvent<HTMLInputElement> , row:any) => {
  let checkbox = event.target;
  // highlightRowOnChangeCheckbox(checkbox);
  if(e.target.checked){
        console.log(row);
  }else{
   
  }});

const dummyData = [
  {
    segmentName: "Segment Name 1",
    segmentDescription: "Segment Description 1",
  },
  {
    segmentName: "Segment Name 2",
    segmentDescription: "Segment Description 2",
  },
  {
    segmentName: "Segment Name 3",
    segmentDescription: "Segment Description 3",
  },
  {
    segmentName: "Segment Name 4",
    segmentDescription: "Segment Description 4",
  },
  {
    segmentName: "Segment Name 4",
    segmentDescription: "Segment Description 4",
  },
  {
    segmentName: "Segment Name 4",
    segmentDescription: "Segment Description 4",
  }
];

export default function SegmentTable(props:any) {
  return (
    <div className={props.className}>
      <ReactTable
        columns={[checkboxHeader,...headers.headerConfig]}
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
       data={dummyData}
    />
    </div>
  )
}
