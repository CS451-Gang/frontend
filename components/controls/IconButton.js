import React from 'react'
import { IconButton as MuiIconButton } from '@mui/material';

export default function IconButton(props){

    const { ariaLabel, color, href, rel, target, icon, ... other } = props;
    
    return(
        <MuiIconButton
            aria-label={ ariaLabel }
            target={ target || "_blank" }
            rel={ rel || "noopener" }
            color={color || "primary"}
            href={ href }
                {...other}>
        </MuiIconButton>
    )
}