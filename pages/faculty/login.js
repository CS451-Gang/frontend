import axios from 'axios';
import { useState } from 'react';
import Head from 'next/head';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

export default function Login() {
    let [message, setMessage] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const data = {
            email: form.email.value,
            password: form.password.value
        }

        axios({
            method: "post",
            url: "/api/login",
            data: data,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status === 200) {
                window.location.replace('/faculty/home');
            }
        }).catch(err => {
            setMessage(err.response.data.message);
        });
    };

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="Login" content="Login to UMKC" />
            </Head>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Grid container
                direction="column"
                spacing="2"
                rowSpacing={3} 
                justifycontent="center" 
                alignItems="center"
                sx={{m:3}}
                >
                <TextField 
                    id="email" 
                    type="email"
                    label="UMKC Email" 
                    variant="outlined" 
                    helperText="e.g. student@umsystem.edu"
                    required
                    placeholder=""
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <PersonIcon />
                            </InputAdornment>
                        )
                    }}
                    />
                {/* <TextField 
                    id="stuID" 
                    type="text"
                    label="Student ID" 
                    variant="outlined" 
                    placeholder=""
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <CreditCardIcon />
                            </InputAdornment>
                        )
                    }}
                    />  */}
                <TextField 
                    id="password" 
                    type="password"
                    label="Password" 
                    variant="outlined" 
                    placeholder=""
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <LockIcon />
                            </InputAdornment>
                        )
                    }}
                    />
                <FormControlLabel
                    value="isStudent"
                    control={<Checkbox />}
                    label="Are you a student?"
                    labelPlacement="end"
                    disabled
                />
                <Button type="submit" variant="contained" >Login</Button>
                </Grid>
            </form>
            { message && <p>{message}</p> }
        </>
  )
}
