import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const submissions = () => {

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)

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

  if (message) {
    return (
      <div>
        <Head>
          <title>Submissions</title>
        </Head>
        
          <h1>Submissions</h1>
          <p>{message}</p>
      </div>
    )
  }
  if (loading) {
    return (
      <div>
        <Head>
          <title>Submissions</title>
        </Head>
        
          <h1>Submissions</h1>
          <p>Loading...</p>
      </div>
    )
  }

  const columns = [
      { field: 'student_id', headerName: 'ID', width: 100 },
      { field: 'full_name', headerName: 'Name', width: 110 },
      { field: 'email', headerName: 'Email', width: 250 },
      { field: 'current_level', headerName: 'Level', width: 100 },
      { field: 'graduating_semester', headerName: 'Graduating Semester', width: 150 },
      { field: 'cumulative_gpa', headerName: 'GPA', width: 50, type: 'number' },
      { field: 'hours_completed', headerName: 'Hours Completed', width: 70, type: 'number' },
      { field: 'undergraduate_degree', headerName: 'Undergraduate Degree', width: 180 },
      { field: 'current_major', headerName: 'Major', width: 100 },
      { field: 'applying_for', headerName: 'Applying For', width: 120 },
      { field: 'course_id', headerName: 'Course', width: 100 },
      { field: 'grade_value', headerName: 'Grade', width: 50 },
      { field: 'international_student', headerName: 'International Student', width: 150, type: 'boolean' },
      { field: 'gta_certified', headerName: 'GTA Certified', width: 100, type: 'boolean' },
      { field: 'gta_certification_term', headerName: 'GTA Certification Term', width: 170 },
      { field: 'gta_previous_degree', headerName: 'Previous Degree?', width: 150, type: 'boolean' },
  ]

  return (
    <div>
        <Head>
          <title>Faculty | View Submissions</title>
        </Head>

        <h1>View Submissions</h1>

        <div className='submissions'>
        <DataGrid
          rows={applications}
          columns={columns}
          pageSize={10}
          rowHeight={30}
          autoHeight={true}
          components={{
            Toolbar: GridToolbar,
          }}
        />
        </div>
    </div>
    
  )
}

export default submissions
