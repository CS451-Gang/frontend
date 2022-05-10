import * as React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { FormControl, FormGroup, FormLabel, Paper, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm, Form } from '../components/useForm';
import Controls from '../components/controls/Controls';
import Grid from '@mui/material/Grid';

import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const initialValues={
    email:"",
    password:"",
    isStudent: false,
}

export default function LoginForm() {
    let [message, setMessage] = useState(null);
    let [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/account-status')
          .then(res => {
            if (res.status === 200) {
              setUser(res.data)
            }
          })
          .catch(err => {
            console.log(err);
          })
      }, [])

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('email' in fieldValues)
            temp.email = fieldValues.email?"":"This field is required."
            temp.email = (/$^|.+@.+..+/).test(values.email)?"":"Email is not valid."
        if ('password' in fieldValues)
            temp.password = fieldValues.password?"":"This field is required."
    
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    console.log(`saw user: ${JSON.stringify(user)}`)
    
    const {
        values, 
        setValues, 
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialValues, true, validate);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const data = {
            email: form.email.value,
            password: form.password.value
        }

        if(validate()){
            axios({
                method: "post",
                url: "api/login",
                data: data,
                headers: { "Content-Type": "application/json" }
            }).then(res => {
                if (res.status === 200) {
                    const user_type = res.data.user_type;
                    window.location.replace(`/${user_type}`);
                }
            }).catch(err => {
                console.log(`err status: ${err.response.status}`);
                if (err.response.status == 406 && user !== null) {
                    console.log("logged in!")
                    setMessage(`You're already logged in.`);
                } else {
                    console.log("bad!")
                    setMessage(err.message)
                }
            });
        }
    };

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Grid container
            direction="column"
            alignItems="flex-start"
            sx={{m:1}}
            spacing={{ xs: 2, md: 3 }} 
            columns={{ xs: 4, sm: 8, md: 12 }}
            rowSpacing={4} 
            >
            <Grid item xs={12}  style={{ display: "flex", gap: "1rem", width: "100%"}}>
                <Controls.UserInput
                    variant="outlined"
                    type="email"
                    name="email"
                    label="UMKC Email"
                    value={values.email}
                    helperText="e.g. student@umsystem.edu"
                    onChange={handleInputChange}
                    error={errors.email}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <PersonIcon />
                            </InputAdornment>
                        )
                    }}
                    />
            </Grid>
            <Grid item xs={12} style={{ display: "flex", gap: "1rem", width: "100%"}}>
                <Controls.UserInput
                    variant="outlined"
                    type="password"
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <LockIcon />
                            </InputAdornment>
                        )
                    }}
                    />
            </Grid>
            {/* <Grid item xs={12}>
                <Controls.CheckBox
                    name="isStudent"
                    label="Are you a student?"
                    labelPlacement="end"
                    onChange={handleInputChange}
                    value={values.isStudent}
                    />
            </Grid> */}
            <Grid item xs={12}>
                <Controls.Button
                    type="submit"
                    text="Login"
                    />
            </Grid>
            </Grid>
            <div style={{textAlign: "center"}}>
        { message && <p>{message}</p> }
            </div>
        </Form>
        
        </>
  )
}
