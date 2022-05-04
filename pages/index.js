import Head from 'next/head'
import Link from 'next/link'
import { Container } from '@mui/material';
import Featured from '../components/Featured';

export default function Home() {
  return (
    <div>
      <Head>
        <title>GTA Application Service</title>
      </Head>
      <Container maxWidth="sm">
        <Featured 
          imgSrc="/images/scofield_hall.jpg"
          imgAlt="Atterbury Student Success Center at University of Missouri-Kansas City"
          title="Welcome to UMKC"
          subtitle="Cultivating Individuality and Academic Excellence"
          buttonText="Apply to become a GTA"
          buttonLink="/login"
          />
      </Container>
    </div>
  )
}