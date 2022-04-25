import React from 'react'
import { useState } from 'react';

export function useForm(initialValues, validateOnChange=false, validate){
    
    const [values, setValues] = useState(initialValues);
    const [checked, setChecked] = useState(true);
    const [errors, setErrors] = useState({});
    
    const handleInputChange = event => {
        const {name, value} = event.target
        setValues({
            ...values, 
            [name]:value
        })
        if(validateOnChange){
            validate({ [name]: value })
        }
    }

    return{
        values,
        setValues,
        checked, 
        setChecked,
        errors,
        setErrors,
        handleInputChange,
    }
}

export function Form(props){

    const { children, ...other } = props;

    return(
        <form autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}