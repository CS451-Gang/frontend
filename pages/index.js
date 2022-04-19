import Head from 'next/head'
import Button from '@mui/material/Button'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login Page</title>
      </Head>

      <Button href="/faculty/facultyHome" variant="contained" size="large" font-family="Helvetica">
        Faculty Login
      </Button>
    </div>
  )
}
