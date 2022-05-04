import React from 'react'
import { Grid, Typography } from '@mui/material';
import Image from "next/image";
import Controls from './controls/Controls';

const Featured = ({imgSrc, imgAlt, title, subtitle, buttonText, buttonLink, buttonText2, buttonLink2, color}) => {
    return (
        <Grid
            component="section"
            container
            sx={{
                position: 'static',
                height: "50vh",
                overflow: 'hidden',
            }}>
        <Image 
            src={imgSrc} 
            alt={imgAlt} 
            layout="fill" 
            objectFit='cover'/>
        <Grid
            container
            sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 20, 42, .75)",
            }}>
        <Grid
            item
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
        <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
                color: "common.white",
                fontWeight: 400,
            }}>
        {title}
        </Typography>
        <Typography
            component="p"
            variant="h4"
            align="center"
            color="common.white"
            sx={{
                mb: 5,
            }}>
        {subtitle}
        </Typography>
        <Controls.Button
            variant="outlined"
            text={buttonText}
            href={buttonLink}
            color="tertiary"
            sx={{
                mb: 5,
            }}/>
        <Controls.Button
            variant="outlined"
            text={buttonText2}
            href={buttonLink2}
            color="tertiary"
            />
        </Grid>
        </Grid>
        </Grid>
    );
}

export default Featured;