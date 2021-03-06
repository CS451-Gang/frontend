import React from 'react'
import Head from 'next/head';
import ApplyForm from './application-form'
import { Box, Divider, Typography } from '@mui/material';

export default function Apply() {
    return (
        <>
            <Head>
                <title>GTA Application</title>
                <meta name="Apply" content="GTA application form" />
            </Head>
            <Box sx={{
                display: 'flex',
                justifyContent: "center"
            }}>
                <Typography variant="h3">GTA Application Form</Typography>
            </Box>
            <Divider />
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: "center"
            }}>
                <ApplyForm />
            </Box>
        </>
    )
}