import Head from 'next/head'
import { TextField, Button, Box } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';

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
                setMessage(res.data.message);
            }
        }).catch(err => {
            setMessage(err.response.data.message);
        });
    };

    return (
        <>
            <div>
                <Head>
                    <title>Faculty Login</title>
                </Head>

                <h1>Faculty Login</h1>

                <Box component="form" onSubmit={handleSubmit} method="POST">
                <TextField
                    label="Email Address"
                    type="email"
                    name="email"
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    margin="normal"
                    variant="outlined"
                />

                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ margin: '1rem' }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </div>
        { message && <p>{message}</p> }
    </>
  )
}
