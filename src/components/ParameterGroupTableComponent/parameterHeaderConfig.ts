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
        minWidth: 200
      },
      {
        Header: "Config File",
        accessor: "configFilePath",
        headerClassName: "header",
        className: "cell",
        minWidth: 200
      },
      {
        Header: "Update Request",
        accessor: "updateRequest",
        headerClassName: "header",
        className: "cell",
        minWidth: 200
      }
    ]
  };

export const dummyParameterData:any = [
    {
      parmeterBaseLineId: "1",
      parameterName: "BaseQNum",
      parameterValue: "200",
      parameterDescription: "BaseQNum"
    },
    {
      parmeterBaseLineId: "2",
      parameterName: "CPUThreshold",
      parameterValue: "1",
      parameterDescription: "CPUThreshold"
    },
    {
      parmeterBaseLineId: "3",
      parameterName: "EventServer",
      parameterValue: "150",
      parameterDescription: "EventServer"
    },
    {
      parmeterBaseLineId: "4",
      parameterName: "FirstInterrogationsPerSecThreshold",
      parameterValue: "2500",
      parameterDescription: "FirstInterrogationsPerSecThreshold"
    }
  ];