import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Signup = ({ loggedIn, login_user }) => {
    
    //Define navigate
    const navigate = useNavigate();

    //Navigate after singup
    useEffect(() => {
        if (loggedIn) {
            navigate("/")
        }
    }, [loggedIn]);

    //define initial values
    const initialValues = {
        "username": "",
        "password": ""
    }
    
    //Define yup validations 
    const validationSchema = yup.object({
        username: yup.string()
            .required("Username is required")
            .min(3, "Username must be at least 3 characters")
            .max(10, "Username must not exceed 10 characters"),
        password: yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .max(10, "Password cannot exceed 10 characters")
            .matches(/^(?=.*[@$!%*?&#])/, "Password must contain at least one special character [@$!%?*&#]")
    })

    //Handle creating a user
    const handleSubmit = async (values) => {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        const response = await fetch("api/signup", options);
        if (response.status === 201) {
            const user = await response.json();
            login_user(user);
        } else {
            const error = await response.json()
            formik.setErrors({ username: error.error })
        }
    }

    //Defining formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        validationOnChange: false,
        onSubmit: handleSubmit,
    })
    
    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    {formik.errors.username && (
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
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    {formik.errors.password && (
                        <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                    )}
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 py-2 px-4 rounded shadow"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default Signup;