import { FormControl, FormControlLabel, FormGroup, FormLabel, Radio } from '@mui/material';
import React from 'react'

export default function RadioGroup(props){

    const {name, value, label, onChange, items} = props;
    
    return(
        <FormControl
        required
        component="fieldset"
        variant="standard">
            <FormLabel>{label}</FormLabel>
            <FormGroup row 
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(
                        (item) => (
                            <FormControlLabel
                                control={<Radio />}
                                key={item.id} 
                                value={item.id} 
                                label={item.title}/>
                        )
                    )
                }
            </FormGroup>
        </FormControl>
    )
}