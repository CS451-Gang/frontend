import styles from '../styles/Layout.module.css'
import Head from 'next/head'
import Nav from './Nav'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
        <Head>
            <link rel="icon" href="/umkc_favicon.ico" />
        </Head>
        <Nav />
        <div className={styles.containter}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
        <Footer/>
    </>    
  )
}

export default Layout