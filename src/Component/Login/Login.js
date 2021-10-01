import React from "react";
import { Formik, Form, useFormik } from "formik"
import { LoginField } from "./LoginField";
import * as YUP from "yup";
import { Link, withRouter, useHistory } from 'react-router-dom'
import "./login.css"
import { signIn, signInWithFireBase } from "../services/loginauth";
import { useState } from "react";
import { storeData } from "../utils/async-storage";


const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = "*Required";
  }
  if (!values.password) {
    errors.password = "*Required";
  }
  else if (values.password.values > 8) {
    errors.password = "*Must be 8 characters or less";
  }
  return errors;
};

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory()

  let errorMsg = ""

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      errorMessage: ""
    },
    validate,
    onSubmit: (values) => {
      const { email, password } = values
      setEmail(values.email)
      setPassword(values.password)
      // setErrorMessage(errorMessage)
      login(values.email, values.password)
    },
  });

  const login = (email, password) => {
    signIn(email, password)
      .then((response) => {
        if (response.data?.status === "ACTIVE") {
          signInWithFireBase(email, password)
          .then((fbResponse) => {
            let token = fbResponse.user 
            // console.log(token)
            const {accessToken} = token 
            console.log(accessToken)
            storeData("accessToken" , accessToken)  

              if (fbResponse === null) {
                setErrorMessage("Please Contact Your Administrator")
              }
              else {
                //tokenId = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdiODcxMTIzNzU0MjdkNjU3ZjVlMjVjYTAxZDU2NWU1OTJhMjMxZGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGluZ2lzaGEtdWF0IiwiYXVkIjoidGluZ2lzaGEtdWF0IiwiYXV0aF90aW1lIjoxNjMyOTk2NTE3LCJ1c2VyX2lkIjoiWU5vcTA4eXB4c05kcEpOZ1k5YmdEUlNLV1gwMyIsInN1YiI6IllOb3EwOHlweHNOZHBKTmdZOWJnRFJTS1dYMDMiLCJpYXQiOjE2MzI5OTY1MTcsImV4cCI6MTYzMzAwMDExNywiZW1haWwiOiJhZG1pbkB0aW5naXNoYS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBob25lX251bWJlciI6IisxMTExMTExMTExMSIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzExMTExMTExMTExIl0sImVtYWlsIjpbImFkbWluQHRpbmdpc2hhLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.LCdcQiYDG0yR3YQZdC69Icl9ElIfK9EWEVbUAEhFFt5puSOQ2-hB0c3KbUEzR_2xs366SBZhLnQ13x7Kcffz-5lqWDUrnzBjhKAdHbrAzZym6mOe_yeVEZzd7UWo5mvBYHr-D-_XOS4HmNMyEr4QXoDiVVZLl4eiQ9yLf6c3NelCHrjGZja4sWXmjROy6TuQ63Dzr6FDuE9bir0RvO-HeiHU0eJBJwXABsWojni9f2sYfykNaykCwl1fRS7nSwyk0Z8rUDwYsOqbUEhq6ldwcr8KKsgZVgdXL7Dq-bFjweE3zzgiP3iQ-AQpdcSfSLobRNFpzStuz33zN7a2Tcjxpg"
                
                history.push("/home")
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (response.statusCode === 400) {
          errorMsg = response.message
          setErrorMessage(errorMsg)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    // <div className = "login-container">
    //   <h1>Login</h1>

    // </div>
    <div className="login-container">
      <div>
           
         <form className="from-container " onSubmit={formik.handleSubmit} >
          <h1 className="my-4.font-weigth-bold-display-4">Log In</h1>
          <label htmlFor="email" className="p-2">email</label>
          <input type="text" id="email" value={formik.values.email}
            onChange={formik.handleChange} />

          {formik.errors.email ? (<div className = "error"> {formik.errors.email}</div>) : null}
          <br />
          <label htmlFor="password" className="p-2">Password</label>
          <input type="password" id="password" value={formik.values.password}
            onChange={formik.handleChange} />

          {formik.errors.password ? (<div className = "error">{formik.errors.password}</div>) : null}
          <br />
          {errorMessage ? (<p className="error">{errorMessage}</p>) : null}
          <button type="submit" className="button">Login</button>

        </form> 
        <div>
          <Link to="/register" className="button sign-in"><p>Signup </p></Link>
        </div>
      </div>
    </div>
  )

}


// const Login = () => {
//   const loginValidation = YUP.object({
//     email: YUP.string()
//         .email("Email is invalid")
//         .required("email is Required"),
//         password: YUP.string()
//         .min(4, "Must be  8 characters or more")
//         .required("Password is Required")
//   })
//   return(
//     <Formik 
//     initialValues ={{
//         email: "",
//         password : "", 
//         }}
//         validationSchema = {loginValidation} 
//         onSubmit={values => {
//           signIn(values.email , values.password)
//           console.log()
//       }}>

//         {formik => (
//             <div>
//                 <h1 className = "my-4.font-weigth-bold-display-4">Log In </h1>
//                 {console.log(formik.values)}
//                 <Form className = "pr-2">  
//                     <LoginField label = "Email" name = "email"  type = "email" />
//                     <LoginField label = "Password" name = "password"  type = "password" />
//                     <button className = "btn btn-dark m-3" type = "Login"> Login </button>
//                     <Link to="/register"><button>Signup </button></Link>
//                     <p></p>    
//                 </Form>
//             </div>
//         )}
//     </Formik>
//   )
// }

export default withRouter(Login);