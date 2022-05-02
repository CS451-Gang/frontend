import Head from 'next/head'
import axios from 'axios';
import { useState, useEffect } from 'react';

const studentHome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/account-status')
      .then(res => {
        if (res.status === 200) {
          setUser(res.data)
          if (user.user_type !== "student") {
            window.location.replace('/');
          }
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

      <h1>Student Home</h1>
      {user && <p>Welcome, {user.email}!</p>}
    </div>
  )
}

export default studentHome