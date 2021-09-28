import React from "react"
import {ErrorMessage ,  useField } from "formik"

import 'bootstrap/dist/css/bootstrap.min.css';

export const LoginField = ({label , ...props}) => {
    const [field ] = useField(props)
    //console.log(filed , meta)
    return(
        <div>
            <label htmlFor = {field.name}>{label}</label>
            <br/>
            <input {...field} {...props} />
            <br/>
            <ErrorMessage  name = {field.name} />
        </div>
    )
}