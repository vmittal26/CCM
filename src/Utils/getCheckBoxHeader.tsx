import * as React from 'react'

export default function getCheckBoxHeader(minWidth:number,onChange:Function) {
  return (
    {
    Header: "#",
    minWidth: minWidth,
    className: "cell",
    headerClassName: "header",
    Cell: (row: any) => {
      return (
        <input
          className="checkbox"
          type="checkbox"
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChange(e,row)}
        />
      );
    }
  }
  );
}
