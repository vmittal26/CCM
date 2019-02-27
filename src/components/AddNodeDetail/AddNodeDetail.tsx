import * as React from "react";
import { Formik, Field } from "formik";
import { Col, Row } from "antd";
import * as Yup from "yup";

let initialValues={ nodeName:"", nodeIp: "" , nodeUserName:"" , nodePassword:"",nodeSegment:""};
export default (props: any) => {
  return (
    <div className="AddNodeDetail">
      <Formik
        initialValues={initialValues}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object().shape({
                    nodeName: Yup.string().required("Plese Enter Node Name"),
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
              <Row className="form-group">
                <Col xl={12} lg={12} md={6} sm={8} xs={12}>
                    <label htmlFor={"nodeName"}>Enter Node Name </label>
                </Col>
                <Col xl={12} lg={12} md={6} sm={8} xs={12}>
                {/* {touched.nodeType && errors.nodeType && <div >{<span className="text-danger">{errors.nodeType}</span>}</div>} */}
                <Field  type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nodeName}
                        name="nodeName"
                        className="form-control"/>
                </Col>
                </Row>
                <Row className="form-group">
                <Col xl={12} lg={12} md={6} sm={8} xs={12}>
                    <label htmlFor={"nodeIp"}>Enter Node IP </label>
                </Col>
                <Col xl={12} lg={12} md={6} sm={8} xs={12}>
                {/* {touched.nodeType && errors.nodeType && <div >{<span className="text-danger">{errors.nodeType}</span>}</div>} */}
                <Field  type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nodeUserName}
                        name="nodeUserName"
                        className="form-control"/>
                </Col>
                </Row>
                <Row className="form-group">
                <Col xl={12} lg={12} md={6} sm={8} xs={12}>
                    <label htmlFor={"nodeUserName"}>Enter User Name </label>
                </Col>
                <Col xl={12} lg={12} md={6} sm={8} xs={12}>
                {/* {touched.nodeType && errors.nodeType && <div >{<span className="text-danger">{errors.nodeType}</span>}</div>} */}
                <Field  type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nodeUserName}
                        name="nodeUserName"
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
