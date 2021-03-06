import * as React from "react";
import { Formik, Field, Form } from "formik";
import { Col, Row } from "antd";
import * as Yup from "yup";
import {
  AntInputInline,
  AntSelectInline
} from "../../Utils/InlineAntDesignFieldCreator";
import INodeDetail from "../../model/INodeDetail";

const selectOptions=[
      {
        id:"1",
        description:"SDP"
      },
      { id:"2",
      description:"ABS"}
]
export default (componentprops: any) => {
  return (
    <div className="AddNodeDetail">
      <Formik
        enableReinitialize
        initialValues={componentprops.initialValues}
        onSubmit={componentprops.onSubmit}
        validationSchema={
          Yup.object().shape({
          nodeDetailName: Yup.string().required("Plese Enter Node Name"),
          nodePassword:!componentprops.isUpdateNodeDetail?Yup.string().required("Plese Enter Password"):null,
          nodeDetailUserName:!componentprops.isUpdateNodeDetail?Yup.string().required("Plese Enter User Name"):null
        })}
        children={props => 
          (<Form>
             <Field
              // style={{borderLeft:"2px inset #e74c3c"}}
              disabled
              label="Node Type"
              component={AntInputInline}
              name="nodeType"
              type="text"
            />
            <Field
              // style={{borderLeft:"2px inset #e74c3c"}}
              label="Enter Node Name"
              ismandatory={"true"}
              component={AntInputInline}
              name="nodeDetailName"
              type="text"
            />
            {props.touched.nodeDetailName && props.errors.nodeDetailName && <div >{<span className="text-danger">{props.errors.nodeDetailName}</span>}</div>}
            <Field
              label="Enter Node IP"
              component={AntInputInline}
              name="nodeIp"
              type="text"
              onChange={() => {}}
            />
            <Field
              label="Enter Node Username"
              disabled={componentprops.isUpdateNodeDetail}
              ismandatory={componentprops.isUpdateNodeDetail?"false":"true"}
              component={AntInputInline}
              name="nodeDetailUserName"
              type="text"
            />
              {props.touched.nodeDetailUserName && props.errors.nodeDetailUserName && <div >{<span className="text-danger">{props.errors.nodeDetailUserName}</span>}</div>}
            <Field
              label="Enter Node Password"
              ismandatory={componentprops.isUpdateNodeDetail?"false":"true"}
              component={AntInputInline}
              name="nodePassword"
              type="password"
            />
               {props.touched.nodePassword && props.errors.nodePassword && <div >{<span className="text-danger">{props.errors.nodePassword}</span>}</div>}
            {/* <Field
              mode="multiple"
              label="Select Segment"
              style={{ width: "100%" }}
              component={AntSelectInline}
              name="nodesegment"
              selectOptions={selectOptions}
              onChange={() => {}}
            /> */}
             <div style={{textAlign:"center"}}>
              <button type="submit" className="btn btn-primary mt-1"> Save </button>
              <button type="button" className="btn btn-primary mt-1 ml-1" onClick={componentprops.onCancel}> Cancel </button>
            </div>
          </Form>)
        }
      />
    </div>
  );
};
