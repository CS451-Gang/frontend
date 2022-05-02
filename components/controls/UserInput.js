import { TextField } from '@mui/material';
import React from 'react'

export default function UserInput(props){
    
    const { variant, name, label, value, onChange, type, helperText, placeholder, InputProps, error=null } = props;

    return(
        <TextField
            variant={ variant || "filled" }
            type= { type || "text" }
            fullWidth
            placeholder={ placeholder }
            helperText={ helperText }
            name={ name }
            label={ label }
            value={ value }
            InputProps={ InputProps }
            onChange={ onChange }
            {...(error && {error:true, helperText:error})}
        />
    )
}