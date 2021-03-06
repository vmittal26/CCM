import * as React from "react";
import { Formik, Field } from "formik";
import { Col, Row } from "antd";
import * as Yup from "yup";

let initialValues={ nodeId:"", nodeType: "" , nodeDescription:""};
export default (props: any) => {
  return (
    <div className="AddnodeType">
      <Formik
        initialValues={initialValues}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object().shape({
                    nodeType: Yup.string().required("Plese Enter Node Type"),
                    nodeDescription:Yup.string().max(3000, 'Description can not contain more then 3000 characters!')
        })}
        render={({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          isSubmitting,
          touched
        }) => (
           
            <form  onSubmit={handleSubmit}>
             <Row gutter={16} >
                <Col xl={24} lg={24} md={6} sm={8} xs={12}>
                    <label className="mandatory-label" htmlFor={"nodeType"}>Node Type </label>
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={12}>
                {touched.nodeType && errors.nodeType && <div >{<span className="text-danger">{errors.nodeType}</span>}</div>}
                <Field  type="text"
                        // style={{borderLeft:"5px inset red"}}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nodeType}
                        name="nodeType"
                        className="form-control"/>
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={24}>
                    <label htmlFor={"nodeDescription"}>Node Description</label>
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={24}>
                {touched.nodeDescription && errors.nodeDescription && <div >{<span className="text-danger">{errors.nodeDescription}</span>}</div>}
                <Field
                        component={"textarea"}
                        rows={5}
                        cols={50}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nodeDescription}
                        name="nodeDescription"
                        className="form-control"/>
                </Col>
                </Row>
            <div style={{textAlign:"center"}}>
              <button type="submit" disabled={isSubmitting}className="btn btn-primary mt-1"> Save </button>
              <button type="button" className="btn btn-primary mt-1 ml-1" onClick={props.onCancel}> Cancel </button>
            </div>
            </form>
       
        )}
      />
    </div>
  );
};
