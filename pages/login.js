import React from 'react'
import Head from 'next/head';
import LoginForm from '../pages/LoginForm'
import { Box, Typography } from '@mui/material';
import Layout from '../components/Layout';

export default function Login(){
    return(
        <Layout>
        <Head>
            <title>Login</title>
            <meta name="Login" content="Login to UMKC" />
        </Head>
        <Box sx={{
            display: 'flex', 
            justifyContent:"center"
            }}>
            <Typography variant="h3">Welcome!</Typography>
            </Box>
        <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: "center"
            }}>
            <LoginForm/>
        </Box>
        </Layout>
    )
}