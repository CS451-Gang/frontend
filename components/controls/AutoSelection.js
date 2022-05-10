import { FormControl, InputLabel, MenuItem, AutoComplete as MuiAuto, Checkbox, Icon, TextField, FormHelperText } from '@mui/material';
import React from 'react'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Select(props){
    const { name, label, value, onChange, options, selected, error=null } = props;

    return(
        <FormControl
            variant="filled"
            sx={{width: "100%"}}
            {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiAuto
                multiple
                disableCloseOnSelect
                name={name}
                label={label}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                    {
                        options.map(
                            item=>(<MenuItem key={item.id} value={item.id}>
                                <li {...props}>
                                    <Checkbox icon={icon} 
                                    checkedIcon={checkedIcon} 
                                    style={{marginRight:8}} 
                                    checked={selected}
                                    />
                                    {options.id} - {options.title}
                                </li></MenuItem>)
                        )
                    }
                renderInput={(params) => (
                    <TextField {...params} label="Courses" placeholder="" />
                )}
            </MuiAuto>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}