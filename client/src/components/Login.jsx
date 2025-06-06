import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

const Login = () => {

    const dispatch = useDispatch()
    const loggedIn = useSelector((state) => state.auth.loggedIn)

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
                response.json().then((data) => dispatch(loginUser(data)));
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
        <div className="max-w-md mx-auto p-6 bg-white rounded mt-12 shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Log In</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input 
                        id="username"
                        name="username"
                        type="text"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-blue-500 p-2 focus:ring-blue-200 focus:ring"
                    />
                    {formik.touched.username && formik.errors.username && (
                        <p className="mt-1 text-sm text-red-500">{formik.errors.username}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input  
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block rounded-md border-gray-300 border w-full focus:ring focus:ring-blue-200 shadow-sm p-2 focus:border-blue-500"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="mt-1 text-red-500 text-sm">{formik.errors.password}</p>
                    )} 
                </div>

                <button
                    type="submit"
                    className="w-full hover:bg-blue-700 bg-blue-600 font-semibold text-white rounded shadow px-4 py-2"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;