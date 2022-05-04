import Head from 'next/head'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import UserHome from '../../components/UserHome';

const studentHome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/account-status')
      .then(res => {
        if (res.status === 200) {
          setUser(res.data)
        }
      })
      .catch(err => {
        console.log(err);
        window.location.replace('/login');
      })
  }, [])

  return (
    <div>
      <Head>
        <title>Home | Student</title>
      </Head>
      <Container maxWidth="sm">
        <UserHome 
          imgSrc="/images/grant_hall.jpg"
          imgAlt="Atterbury Student Success Center at University of Missouri-Kansas City"
          title={user && <Typography variant="h2">Hello, {user.email}!</Typography>}
          subtitle="What do you want to do today?"
          buttonText="Submit a GTA application"
          buttonLink="/student/apply"
          buttonText2="Manage previous applications"
          buttonLink2="/student/manage-application"
          />
      </Container>
    </div>
  )
}

export default studentHome