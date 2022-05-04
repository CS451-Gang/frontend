import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import { FormControl, FormGroup, FormLabel } from '@mui/material';

import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ConfirmDialog from '../../components/ConfirmDialog';
import ApplyForm from './application-form';


export default function UpdateApplication() {

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: ""})
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/account-status')
      .then(res => {
        setUserId(res.data.sub);
      })
  }, []);

  // console.log(`Saw id: ${userId}`);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/applications/${userId}`)
      .then(res => {
        setApplications(res.data.data);
        setMessage(res.data.message);
        setLoading(false);
      }).catch(err => {
        setMessage(err.response.data.message)
      });
  }, [userId]);


  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    setApplications(res.data)
  }
  
  // if (message !== "Success") {
  //   return (
  //     <div>
  //       <Head>
  //         <title>Submissions</title>
  //       </Head>
  //       <Typography variant="h3">Submissions</Typography>
  //         <Typography variant="p">{message}</Typography>
  //     </div>
  //   )
  // }
  if (loading) {
    return (
      <div>
        <Head>
          <title>Submissions</title>
        </Head>
        <Typography variant="h3">Submissions</Typography>
          <Typography variant="p">Loading...</Typography>
      </div>
    )
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'full_name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'current_level', headerName: 'Level', width: 100 },
    { field: 'graduating_semester', headerName: 'Graduating Semester', width: 150 },
    { field: 'cumulative_gpa', headerName: 'GPA', width: 100, type: 'number' },
    { field: 'hours_completed', headerName: 'Hours Completed', width: 50, type: 'number' },
    { field: 'undergraduate_degree', headerName: 'Undergraduate Degree', width: 200 },
    { field: 'current_major', headerName: 'Major', width: 150 },
    { field: 'applying_for', headerName: 'Applying For', width: 150 },
    { field: 'international_student', headerName: 'International Student', width: 150, type: 'boolean' },
    { field: 'gta_certified', headerName: 'GTA Certified', width: 100, type: 'boolean' },
    { field: 'gta_certification_term', headerName: 'GTA Certification Term', width: 170 },
    { field: 'gta_previous_degree', headerName: 'Previous Degree?', width: 150, type: 'boolean' },
]

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 100 },
  //   { field: 'full_name', headerName: 'Name', width: 180 },
  //   { field: 'applying_for', headerName: 'Position', width: 150 },
  //   { field: 'courses', headerName: 'Course', width: 150 },
  //   { field: 'actions', type: 'actions', headerName: 'Actions', width: 130, getActions:(params) => [
  //     <GridActionsCellItem
  //       icon={<DeleteIcon/>}
  //       label="Delete"
  //       onClick={() => {
  //         setConfirmDialog({
  //           isOpen:true,
  //           title:"Are you sure you want to delete this application?", 
  //           subTitle:"You can't undo this action.",
  //           onConfirm: () => {onDelete(applications.id)}
  //         })}}
  //     />,
  //   ] },
  // ]
  
  return (
    <div>
        <Head>
          <title>Student | Manage Application</title>
        </Head>
        <Box
          sx={{
            flexWrap: 'wrap',
            justifyContent: "center",
          }}>
          <Typography variant="h3">View Submissions</Typography>
          <p>{ JSON.stringify(applications) } </p>
          <DataGrid
          autoHeight={true}
          rows={applications}
          columns={columns}
        />
        </Box>
        <ConfirmDialog 
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
          />
    </div>
  )
}