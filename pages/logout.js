import Head from 'next/head'
import { TextField, Button, Box } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';

export default function Logout() {
    axios({
        method: "post",
        url: "/api/logout",
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            console.log("successfully logged out")
            window.location.href = "/";
        }
    }).catch(err => {
        console.log(err);
    });

    return (
        <>
            <div>
                <Head>
                    <title>Logout</title>
                </Head>
            </div>
        </>
    )
}
