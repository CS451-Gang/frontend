import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from '@mui/material/Button';

import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const manageApp = () => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [isFaculty, setIsFaculty] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:3000/api/account-status')
      .then(res => {
        if (res.status === 200) {
          setIsFaculty(res.data.is_faculty)
        }
      })
      .catch(err => {
        console.log(err);
        window.location.replace('/faculty/login');
      })
  }, [])


  const CSclasses = [
    {class: 'CS 101', major: 'CS'},
    {class: 'CS 191', major: 'CS'},
    {class: 'CS 201R', major: 'CS'},
    {class: 'CS 291', major: 'CS'},
    {class: 'CS 303', major: 'CS'},
    {class: 'CS 320', major: 'CS'},
    {class: 'CS 349', major: 'CS'},
    {class: 'CS 349R', major: 'CS'},
    {class: 'CS 404', major: 'CS'},
    {class: 'CS 441', major: 'CS'},
    {class: 'CS 449', major: 'CS'},
    {class: 'CS 456', major: 'CS'},
    {class: 'CS 457', major: 'CS'},
    {class: 'CS 458', major: 'CS'},
    {class: 'CS 461', major: 'CS'},
    {class: 'CS 465R', major: 'CS'},
    {class: 'CS 470', major: 'CS'},
    {class: 'CS 5520', major: 'CS'},
    {class: 'CS 5525', major: 'CS'},
    {class: 'CS 5552A', major: 'CS'},
    {class: 'CS 5565', major: 'CS'},
    {class: 'CS 5573', major: 'CS'},
    {class: 'CS 5590PA', major: 'CS'},
    {class: 'CS 5592', major: 'CS'},
    {class: 'CS 5596A', major: 'CS'},
    {class: 'CS 5596B', major: 'CS'},
  ]

  const ECEclasses = [
    {class: 'ECE 216', major: 'ECE'},
    {class: 'ECE 226', major: 'ECE'},
    {class: 'ECE 228', major: 'ECE'},
    {class: 'ECE 241', major: 'ECE'},
    {class: 'ECE 276', major: 'ECE'},
    {class: 'ECE 302', major: 'ECE'},
    {class: 'ECE 330', major: 'ECE'},
    {class: 'ECE 341R', major: 'ECE'},
    {class: 'ECE 428R', major: 'ECE'},
    {class: 'ECE 458', major: 'ECE'},
    {class: 'ECE 466', major: 'ECE'},
    {class: 'ECE 477', major: 'ECE'},
    {class: 'ECE 486', major: 'ECE'},
    {class: 'ECE 5558', major: 'ECE'},
    {class: 'ECE 5560', major: 'ECE'},
    {class: 'ECE 5567', major: 'ECE'},
    {class: 'ECE 5577', major: 'ECE'},
    {class: 'ECE 5578', major: 'ECE'},
    {class: 'ECE 5586', major: 'ECE'},
  ]

  const ITclasses = [
    {class: 'IT 222', major: 'IT'},
    {class: 'IT 321', major: 'IT'},
  ]

  return (
    <>
      <div>
        <Head>
          <title>Faculty | Manage Applicaiton</title>
        </Head>

        <h1>Manage Application</h1>

        <p>
          <Autocomplete
            multiple
            id="manage-CS-classes"
            options={CSclasses}
            getOptionLabel={option => option.class}
            disableCloseOnSelect
            getOptionsLabel={(option) => option.class}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 5 }}
                  checked={selected}
                />
                {option.class}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="CS Classes" placerholder="Added Classes" />
            )}
          />
        </p>

        <p>
          <Autocomplete
            multiple
            id="manage-ECE-classes"
            options={ECEclasses}
            getOptionLabel={option => option.class}
            disableCloseOnSelect
            getOptionsLabel={(option) => option.class}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.class}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="ECE Classes" placerholder="Added Classes" />
            )}
          />
        </p>

        <p>
          <Autocomplete
            multiple
            id="manage-IT-classes"
            options={ITclasses}
            getOptionLabel={option => option.class}
            disableCloseOnSelect
            getOptionsLabel={(option) => option.class}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.class}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="IT Classes" placerholder="Added Classes" />
            )}
          />
        </p>

        <Button type="submit" variant="contained" >Submit Changes</Button>

      </div>
    </>
  )
}


export default manageApp