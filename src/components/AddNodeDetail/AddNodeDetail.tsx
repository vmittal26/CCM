import * as React from "react";
import { Formik, Field, Form } from "formik";
import { Col, Row } from "antd";
import * as Yup from "yup";
import {
  AntInputInline,
  AntSelectInline
} from "../../Utils/InlineAntDesignFieldCreator";
import { INodeDetails } from "../../model/INodeDetail";

const selectOptions=[
      {
        id:"1",
        description:"abc"
      },
      { id:"2",
      description:"xyz"}
]
let initialValues:INodeDetails = {
  nodename:"",
  nodeip: "",
  nodeusername: "",
  nodepassword: "",
  nodesegment:[]
};
export default (componentprops: any) => {
  return (
    <div className="AddNodeDetail">
      <Formik
        initialValues={initialValues}
        onSubmit={componentprops.onSubmit}
        validationSchema={Yup.object().shape({
          nodename: Yup.string().required("Plese Enter Node Name"),
        })}
        children={props => 
          (<Form>
            <Field
              label="Enter Node Name"
              component={AntInputInline}
              name="nodename"
              type="text"
            />
            {props.touched.nodename && props.errors.nodename && <div >{<span className="text-danger">{props.errors.nodename}</span>}</div>}
            <Field
              label="Enter Node IP"
              component={AntInputInline}
              name="nodeip"
              type="text"
              onChange={() => {}}
            />
            <Field
              label="Enter Node Username"
              component={AntInputInline}
              name="nodeusername"
              type="text"
            />
            <Field
              label="Enter Node Password"
              component={AntInputInline}
              name="nodepassword"
              type="password"
            />
            <Field
              mode="multiple"
              label="Select Segment"
              style={{ width: "100%" }}
              component={AntSelectInline}
              name="nodesegment"
              selectOptions={selectOptions}
              onChange={() => {}}
            />
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
