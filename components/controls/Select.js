import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';
import React from 'react'

export default function Select(props){
    const { name, label, value, onChange, options, error=null } = props;

    return(
        <FormControl
            variant="filled"
            sx={{width: 300}}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && {error:true})}
            >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                    {
                        options.map(
                            item=>(<MenuItem key={item.id} value={item.id}>{item.id} - {item.title}</MenuItem>)
                        )
                    }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}