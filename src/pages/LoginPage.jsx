import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function LoginPage() {
  const navigate = useNavigate();

  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    axios
      .post("https://fakestoreapi.com/auth/login", values)
      .then(
        (response) => {
          console.log(response.data);
          setRequestResponse({
            textMessage: "login successful, thank you!",
            alertClass: "alert alert-success",
          });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.username));
          navigate("/");
        },
        (error) => {
          setRequestResponse({
            textMessage: "Invalid credentials",
            alertClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const validationSchema = Yup.object({
    // email: Yup.string()
    //   .required("email is requred")
    //   .email("email must be valid email adress"),
    username: Yup.string().required("username is required"),

    password: Yup.string()
      .required("password is required")
      .min(6, "password must be atleast 6 charecters"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,

    validationSchema,
  });
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className=" wrapper">
              <div className={requestResponse.alertClass}>
                {requestResponse.textMessage}
              </div>

              <h2>Login</h2>
              <hr />
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="">UserName</label>
                  <input
                    type="text"
                    name="username"
                    value={formik.values.username}
                    className={
                      formik.touched.username && formik.errors.username
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <small className="text-danger">
                      {formik.errors.username}
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    className={
                      formik.touched.password && formik.errors.password
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <small className="text-danger">
                      {formik.errors.password}
                    </small>
                  ) : null}
                </div>

                <input
                  className="btn btn-primary btn-block"
                  type="submit"
                  value="login"
                  disabled={!formik.isValid}
                />
              </form>
              <br />
              <p className="text-center">
                {" "}
                New User?<Link to="/SignUp">click here</Link>
              </p>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
