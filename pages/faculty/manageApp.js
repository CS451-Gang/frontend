import { List, ListItem, ListItemText } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const manageApp = () => {
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

  return (
    <>
      <div>
        <Head>
          <title>Faculty | Manage Applicaiton</title>
        </Head>

        <h1>Manage Application</h1>
      </div>
    </>
  )
}


export default manageApp