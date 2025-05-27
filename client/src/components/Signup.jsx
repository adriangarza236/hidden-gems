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
        username: yup.string().required("Username is required").min(3).max(10),
        password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(10, "Password cannot exceed 10 characters"),
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
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input 
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                {formik.errors.username && <div>{formik.errors.username}</div>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password && <div>{formik.errors.password}</div>}
            </div>
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default Signup;