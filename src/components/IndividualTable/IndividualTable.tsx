import *as React from 'react'
import ReactTable from 'react-table';
import headers from "./individualTableHeaderConfig";

const checkboxHeader = {
  Header: "#",
  minWidth: 50,
  className: "cell",
  headerClassName: "header",
  Cell: (row: any) => {
    return (
      <input
        className="checkbox"
        type="checkbox"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          let checkbox = event.target;
          // highlightRowOnChangeCheckbox(checkbox);
          console.log(row);
          if(e.target.checked){
            
          }else{
           
          }
        }}
      />
    );
  }
};

export default function IndividualTable(props:any) {
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
          // onFetchData={this.fetchData}
        data={[]}
       />
  </div>)
}
