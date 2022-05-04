import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ConfirmDialog from '../../components/ConfirmDialog';
import ApplyForm from './application-form';


export default function manageApp() {

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: ""})
  
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/api/applications')
      .then(res => {
        console.log(res.status)
        setLoading(false)
        if (res.status === 200) {
          setApplications(res.data)
        }
      })
      .catch(err => {
        console.log(err)
        window.location.replace('/login');
      })
  }, [])

  console.log(applications)

  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    setApplications(res.data)
  }
  
  if (message) {
    return (
      <div>
        <Head>
          <title>Submissions</title>
        </Head>
        <Typography variant="h3">Submissions</Typography>
          <Typography variant="p">{message}</Typography>
      </div>
    )
  }
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
    { field: 'full_name', headerName: 'Name', width: 180 },
    { field: 'applying_for', headerName: 'Position', width: 150 },
    { field: 'courses', headerName: 'Course', width: 150 },
    { field: 'actions', type: 'actions', headerName: 'Actions', width: 130, getActions:(params) => [
      <GridActionsCellItem
        icon={<DeleteIcon/>}
        label="Delete"
        onClick={() => {
          setConfirmDialog({
            isOpen:true,
            title:"Are you sure you want to delete this application?", 
            subTitle:"You can't undo this action.",
            onConfirm: () => {onDelete(applications.id)}
          })}}
      />,
    ] },
  ]

  return (
    <div>
        <Head>
          <title>Faculty | View Submissions</title>
        </Head>
        <Box
          sx={{
            flexWrap: 'wrap',
            justifyContent: "center",
          }}>
          <Typography variant="h3">View Submissions</Typography>
          <DataGrid
            rows={applications}
            columns={columns}
            pageSize={10}
            rowHeight={50}
            autoHeight={true}
            components={{
              Toolbar: GridToolbar,
            }}/>
        </Box>
        <ConfirmDialog 
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
          />
    </div>
  )
}