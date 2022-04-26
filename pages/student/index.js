import Head from 'next/head'
import Button from '@mui/material/Button'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login Page</title>
      </Head>

      <Button href="/login" variant="contained" size="large" fontFamily="Helvetica">
        Student Login
      </Button>
    </div>
  )
}
