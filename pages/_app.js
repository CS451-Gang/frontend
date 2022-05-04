import '../styles/globals.css'
import Layout from '../components/Layout'
import { ThemeProvider } from '@mui/material'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  ) 
}

export default MyApp
