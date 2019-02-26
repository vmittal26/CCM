import * as React from "react";
import { Formik } from "formik";
import { Col, Row } from "antd";
import 'antd/lib/grid/style/index.css';

export default (props: any) => {
  return (
    <div className="AddNodeType">
      <Formik
        initialValues={{ nodeType: "SDP" , nodeDescription:"ABC"}}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
        render={({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors
        }) => (
           
            <form  onSubmit={props.handleSubmit}>
             <Row gutter={16} >
                <Col xl={24} lg={24} md={6} sm={8} xs={12}>
                    <label htmlFor={"nodeType"}> Enter Node Type </label>
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={12}>
                    <input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nodeType}
                        name="nodeType"
                        className="form-control"
                    />  
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={24}>
                    <label htmlFor={"nodeDescription"}>Enter Node Description</label>
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={24}>
                    <textarea
                        rows={5}
                        cols={50}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nodeDescription}
                        name="nodeDescription"
                        className="form-control"
                    />  
                </Col>
                </Row>
            {errors.nodeType && <div id="feedback">{errors.nodeType}</div>}
            </form>
       
        )}
      />
    </div>
  );
};
