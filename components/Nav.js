import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
  return (
    <>
    <nav className={navStyles.nav}>
        <nav className={navStyles.logo}>
            <Image src="/UMKC_logo_white.png" width={80} height={40} />
        </nav>
        <ul>
            <li>
                <Link href='/faculty/home'>Home</Link>
            </li>
            <li>
                <Link href='/faculty/manageApp'>Manage Application</Link>
            </li>
            <li>
                <Link href='/faculty/submissions'>View Submissions</Link>
            </li>
            <li>
                <Link href='/faculty/login'>Login</Link>
            </li>
            <li>
                <Link href='/logout'>Logout</Link>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default Nav