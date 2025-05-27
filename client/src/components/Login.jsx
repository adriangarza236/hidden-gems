import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const Login = ({ login_user, loggedIn }) => {

    //Define Navigate
    const navigate = useNavigate();

    //Navigate after login
    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn])

    //Define Initial values for formik
    const initialValues = {
        username: "",
        password: "",
    };

    //Define yup constraints
    const validationSchema = yup.object({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
    });

    //Login
    const handleSubmit = (values) => {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        fetch("api/login", options).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => login_user(data));
            }
        });
    };
    
    //Define Formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: handleSubmit,
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div style={{ color: "red" }}>{formik.errors.username}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: "red" }}>{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;