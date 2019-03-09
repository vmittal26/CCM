import * as React from 'react'
import { Tree } from "antd";
const { TreeNode } = Tree;
import "antd/lib/tree/style/index.css";
import treeData from "./treeDataConfig";

export default function SegmentParameterTree(props:any) {
    return (
        <div className={props.className}>
                    <Tree
                        checkable
                        defaultExpandedKeys={[]}
                        defaultSelectedKeys={[]}
                        defaultCheckedKeys={[]}
                        onSelect={(selected:any,info:any)=>console.log(selected,info)}
                        onCheck={(selected:any,info:any)=>console.log(selected,info)}>
                        {treeData["groups"].map((node: any) => {
                        return (
                            <TreeNode  onCheck={(selected:any,info:any)=>console.log(selected,info)} title={node["groupName"]} key={node["groupName"]}>
                                {
                                <TreeNode title={node["subgroups"]["subGroupName"]} key={node["subgroups"]["subGroupName"]}>
                                    {node["subgroups"]["parameters"].map((node:any)=>{
                                        return(
                                            <TreeNode title={`${node["parameterName"]}-${node["parameterValue"]}`} key={node["parameterBaseLineId"]}/>
                                        );
                                    })
                                    }
                                </TreeNode>
                                }
                            </TreeNode>
                        );
                        })}
                    </Tree>
        </div>
  )
}
