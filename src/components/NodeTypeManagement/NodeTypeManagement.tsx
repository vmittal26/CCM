import * as React from "react";

export default (props: any) => {
  const [state, setState] = React.useState({});

  const dummNodeList = [
    {
      nodeId: "1",
      nodeType: "SDP",
      nodeDescription: "ABC"
    },
    {
      nodeId: "2",
      nodeType: "PQR",
      nodeDescription: "XYZ"
    }
  ];

  return (
    <div className="NodeTypeManagement">
      <div className="NodeTypeManagement__button-section">
        <button className="btn btn-primary">Add</button>
        <button className="btn btn-primary ml-3">Delete</button>
      </div>
      <div className="NodeTypeManagement__NodeTypeTable">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Node Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {dummNodeList.map((row, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      className="checkbox"
                      type="checkbox"
                    />
                  </td>
                  <td>{row.nodeType}</td>
                  <td>{row.nodeDescription}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
