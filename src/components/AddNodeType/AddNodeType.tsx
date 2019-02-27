import * as React from "react";
import { Formik, Field } from "formik";
import { Col, Row } from "antd";
import * as Yup from "yup";

let initialValues={ nodeid:"", nodetype: "" , nodedescription:""};
export default (props: any) => {
  return (
    <div className="Addnodetype">
      <Formik
        initialValues={initialValues}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object().shape({
                    nodetype: Yup.string().required("Plese Enter Node Type"),
                    nodedescription:Yup.string().max(3000, 'Description can not contain more then 3000 characters!')
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
                    <label htmlFor={"nodetype"}>Node Type </label>
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={12}>
                {touched.nodetype && errors.nodetype && <div >{<span className="text-danger">{errors.nodetype}</span>}</div>}
                <Field  type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nodetype}
                        name="nodetype"
                        className="form-control"/>
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={24}>
                    <label htmlFor={"nodedescription"}>Node Description</label>
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={24}>
                {touched.nodedescription && errors.nodedescription && <div >{<span className="text-danger">{errors.nodedescription}</span>}</div>}
                <Field
                        component={"textarea"}
                        rows={5}
                        cols={50}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nodedescription}
                        name="nodedescription"
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
