import Head from 'next/head'
import axios from 'axios';
import { useState, useEffect } from 'react';

const facultyHome = () => {
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
        <title>Home | Faculty</title>
      </Head>

      <h1>Faculty Home</h1>
      {user && <p>Welcome, {user.email}!</p>}
    </div>
  )
}

export default facultyHome