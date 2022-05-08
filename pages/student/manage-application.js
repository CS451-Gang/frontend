import { Box, Divider, Link, List, ListItem, ListItemText, Typography } from '@mui/material'
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
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const accountStatus = await axios.get('http://localhost:3000/api/account-status');
      const userId = await accountStatus.data.sub;
      setUserId(userId);

      await axios.get(`http://localhost:3000/api/applications/${userId}`)
        .then(async intermediateResponse => {
          setApplications(await intermediateResponse.data.data);
          setLoading(false);
        })
        .catch(async err => {
          if (err.response.status === 404) {
            setApplications([])
          } else {
            setMessage(err.response.data.message)
          }
        });
      setLoading(false);
    }
    fetchData();
  }, []);

  const onDelete = id => {
    console.log(`deleting ${JSON.stringify(id)}`);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })

    const deleteApplication = async () => {
      await axios.delete(`http://localhost:3000/api/applications/${id}`, { params: { applicationId: id } })
        .then(async response => {
          if (response.status === 200) {
            setMessage("Application deleted.");
            window.location.reload();
          } else {
            setMessage(response.data.message);
          }
        })
        .catch(async err => {
          setMessage(err.response.data.message);
        });
    }
    deleteApplication();
  }

  if (message) {
    return (
      <div>
        <Head>
          <title>Applications</title>
        </Head>
        <Typography variant="h3">Applications</Typography>
        <Typography variant="p">{message}</Typography>
      </div>
    )
  }
  if (loading) {
    return (
      <div>
        <Head>
          <title>Applications</title>
        </Head>
        <Typography variant="h3">Applications</Typography>
        <Typography variant="p">Loading...</Typography>
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div>
        <Head>
          <title>Applications</title>
        </Head>
        <Typography variant="h3">Applications</Typography>

        <Typography variant="p">No applications found! Would you like to <Link href='apply'>apply for a position</Link>?</Typography>
      </div>
    )
  }

  const columns = [
    { field: 'actions', type: 'actions', headerName: 'Actions', width: 130, getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => {
          setConfirmDialog({
            isOpen: true,
            title: "Are you sure you want to delete this application?",
            subTitle: "You can't undo this action.",
            onConfirm: () => {
              onDelete(params.id);
            }
          })
        }}
      />,
    ]
  },
    { field: 'student_id', headerName: 'ID', width: 100 },
    { field: 'course_id', headerName: 'Course', width: 150 },
    { field: 'applying_for', headerName: 'Position', width: 150 },
    { field: 'grade_value', headerName: 'Grade', width: 100 },
  ]

  return (
    <div>
      <Head>
        <title>Student | View Applications</title>
      </Head>
      <Box
        sx={{
          flexWrap: 'wrap',
          justifyContent: "center",
        }}>
        <Typography variant="h3">View Applications</Typography>
        <DataGrid
          rows={applications}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          rowHeight={50}
          autoHeight={true}
          components={{
            Toolbar: GridToolbar,
          }} />
      </Box>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  )
}