import Head from 'next/head'
import Button from '@mui/material/Button'
import { useEffect } from 'react'

useEffect

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login Page</title>
      </Head>
      <Button href="/login" variant="contained" size="large" fontFamily="Helvetica">
        Login
      </Button>
    </div>
  )
}
