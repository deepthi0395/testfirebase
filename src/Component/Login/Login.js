import React from "react"; 
import { Formik , Form } from "formik"
import { LoginField } from "./LoginField";
import * as YUP from "yup";
import {Link} from 'react-router-dom'
import "./login.css"


const Login = () => {
  const loginValidation = YUP.object({
    email: YUP.string()
        .email("Email is invalid")
        .required("email is Required"),
        password: YUP.string()
        .min(8, "Must be  8 characters or more")
        .required("Password is Required")
  })



  return(
    <Formik 
    initialValues ={{
        email: "",
        password : "",
     
        }}
        validationSchema = {loginValidation} 
        onSubmit={values => {
          // same shape as initial values
          //console.log(values);
          alert("Successfully submitted")
        }}>

        {formik => (
            <div>
                <h1 className = "my-4.font-weigth-bold-display-4">Log In </h1>
                {console.log(formik.values)}
                <Form className = "pr-2">
                    
                    <LoginField label = "Email" name = "email"  type = "email" />
                    <LoginField label = "Password" name = "password"  type = "password" />
            
                    <button className = "btn btn-dark m-3" type = "Login"> Login </button>
                    <Link to="/register"><button>Signup </button></Link>
                    
                    
                </Form>
            </div>
        )}
    </Formik>
  )
 
}

export default Login