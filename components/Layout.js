import styles from '../styles/Layout.module.css'
import Head from 'next/head'
import Nav from './Nav'
import Footer from './Footer'
import { ThemeProvider } from '@mui/material'
import theme from '../styles/theme'

const Layout = ({children}) => {
  return (
    <>
    <ThemeProvider theme={theme}>
        <Head>
            <link rel="icon" href="/images/umkc_favicon.ico" />
        </Head>
        <Nav />
        <div className={styles.containter}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
        <Footer/>
      </ThemeProvider>
    </>    
  )
}

export default Layout