import React from 'react'
import Head from 'next/head';
import { Box as Grid, Typography } from '@mui/material';
import Controls from '../../components/controls/Controls';

export default function ManageListings() {
    return (
        <>
        <Head>
            <title>GTA Application</title>
            <meta name="Apply" content="Successful submission" />
        </Head>
        <Grid sx={{
            display: "flex",
            justifyContent:"center"
            }}>
            <Typography variant="h3">Success!</Typography>
            </Grid>
        <Grid sx={{
            display: "flex",
            justifyContent:"center",
            p: 5
        }}>
            <Typography variant="p">Changes submitted successfully.</Typography>
        </Grid>
        <Grid item sx={{
            display: "flex",
            justifyContent:"center",
            p: 2
        }}>
        {/* <Controls.Button
            type="text"
            href="/student/manage-application"
            text="View Application"
            /> */}
        </Grid>
        <Grid item sx={{
            display: "flex",
            justifyContent:"center",
            p: 2
        }}>
        <Controls.Button
            type="text"
            href="/faculty/home"
            text="Return Home"
            />
        </Grid>
        </>

    )
}