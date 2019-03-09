const treeData:any ={ 
  groups: [ 
    { 
      groupName:"Group1", 
      subgroups: { 
        subGroupName:"SubGroup1", 
        parameters:[ 
          { 
            parameterBaseLineId: "1", 
            parameterName: "SDP", 
            parameterValue: "SDP-Value", 
            parameterDesc: "This is SDP node description", 
            confileFilePath: "/var/opt/sdp" 
          }, 
          { 
            parameterBaseLineId: "2", 
            parameterName: "ABC", 
            parameterValue: "ABC-VALUE", 
            parameterDesc: "This is ABC node description", 
            confileFilePath: "/var/opt/abc" 
          } 
        ] 
      } 
    }, 
    { 
      groupName:"Group2", 
      subgroups: { 
        subGroupName:"SubGroup2", 
        parameters: [ 
          { 
            parameterBaseLineId: "3", 
            parameterName: "PQR", 
            parameterValue: "PQR-Value", 
            parameterDesc: "This is PQR node description", 
            confileFilePath: "/var/opt/pqr" 
          }, 
          { 
            parameterBaseLineId: "4", 
            parameterName: " PQR ", 
            parameterValue: " PQR-Value", 
            parameterDesc: " This is PQR node description ", 
            confileFilePath: "/var/opt/pqr " 
          } 
        ] 
      } 
    } 
  ] 
}; 

export default treeData;