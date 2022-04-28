import Head from 'next/head'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { useEffect } from 'react'



export default function Home() {
  return (
    <div>
      <Head>
        <title>Login Page</title>
      </Head>
      <header>
        <h1>Home</h1>
      </header>
      Welcome to the UMKC GTA application service! Please <Link href="/login"><a className="visible">log in</a></Link> to continue.
    </div>
  )
}
