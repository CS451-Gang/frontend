import React from 'react'
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import Layout from '../components/Layout';
import Controls from '../components/controls/Controls';

export default function Logout(){
    return(
        <Layout>
        <Head>
            <title>Logout</title>
            <meta name="Logout" content="Logout of UMKC" />
        </Head>
        <Box sx={{
            display: "flex",
            justifyContent:"center"
            }}>
            <Typography variant="h3">Goodbye!</Typography>
            </Box>
        <Box sx={{
            display: "flex",
            justifyContent:"center",
            p: 5
        }}>
            <Typography variant="p">You have successfully logged out.</Typography>
        </Box>
        <Box sx={{
            display: "flex",
            justifyContent:"center",
            p: 2
        }}>
            <Controls.Button
                type="text"
                href="/Home" //change this later
                text="Return Home"
                />
        </Box>
        </Layout>
    )
}