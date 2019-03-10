export const headerConfig:any = {
    headerConfig: [
      {
        Header: "Parameter Name",
        accessor: "parameterName",
        headerClassName: "header",
        className: "cell",
        minWidth: 100
      },
      {
        Header: "Parameter Value",
        accessor: "parameterValue",
        headerClassName: "header",
        className: "cell",
        minWidth: 100
      },
      {
        Header: "Parameter Description",
        accessor: "parameterDescription",
        headerClassName: "header",
        className: "cell",
        minWidth: 150
      }
    ]
  };

export const dummyParameterData:any = [
    {
      parmeterBaseLineId: "1",
      parameterName: "XXX",
      parameterValue: "200",
      parameterDescription: "This is XXX  Description"
    },
    {
      parmeterBaseLineId: "2",
      parameterName: "YYY",
      parameterValue: "100",
      parameterDescription: "This is YYY  Description"
    },
    {
      parmeterBaseLineId: "3",
      parameterName: "ZZZ",
      parameterValue: "150",
      parameterDescription: "This is ZZZ  Description"
    },
    {
      parmeterBaseLineId: "4",
      parameterName: "PQR",
      parameterValue: "200",
      parameterDescription: "This is PQR  Description"
    }
  ];