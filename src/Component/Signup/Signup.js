import React from 'react'
import { Formik , Form } from 'formik'
import { TextField } from './TextField'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as YUP from "yup";


export const Signup = () => {
    const validation = YUP.object({
        firstName: YUP.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
        lastName: YUP.string()
        .max(8, "Must be 8 characters or less")
        .required("Required"),
        email: YUP.string()
        .email("Email is invalid")
        .required("email is Required"),
        password: YUP.string()
        .min(8, "Must be  8 characters or more")
        .required("Password is Required"),
        confirmPassword: YUP.string()
        .oneOf([YUP.ref("password") ,null ] , "Password must Match")
        .required("Required Confirm Password"),
        dateOfBirth: YUP.string() 
        .required("DOB required")

    })


    return(
    <Formik 
    initialValues ={{
        firstName : "",
        lastName : "",
        email: "",
        password : "",
        confirmPassword: "",
        dateOfBirth: ""
        }}
        validationSchema = {validation}
        onSubmit={values => {
            // same shape as initial values
            //console.log(values);
            alert("Successfully submitted")
          }}
        >
        {formik => (
            <div>
                <h1 className = "my-4.font-weigth-bold-display-4">Sign Up</h1>
                {console.log(formik.values)}
                <Form className = "pr-2">
                    <TextField label = "First Name" name = "firstName"  type = "text" />
                    <TextField label = "Last Name" name = "lastName"  type = "text" />
                    <TextField label = "Email" name = "email"  type = "email" />
                    <TextField label = "Password" name = "password"  type = "password" />
                    <TextField label = "Confirm Password" name = "confirmPassword"  type = "password" />
                    <TextField label = "Date Of Birth" name = "dateOfBirth" type = "date"/>
                    <button className = "btn btn-dark mt-3" type = "submit"> Submit </button>
                    
                </Form>
            </div>
        )}
    </Formik>
  )
}  
    
