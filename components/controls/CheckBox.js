import { Checkbox as MuiCheckbox, FormControl, FormControlLabel } from '@mui/material';
import React from 'react'

export default function CheckBox(props){

    const { name, value, label, onChange, items, labelPlacement } = props;
    
    const ConvertToDefaultEventParam = (name, value) => ({
        target:{
            name, value
        }
    })
    
    return(
        <FormControl
        required
        component="fieldset"
        variant="standard">
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    //color={primary}
                    labelPlacement={ labelPlacement || "start" }
                    checked={value || false}
                    onChange={e => onChange(ConvertToDefaultEventParam(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}