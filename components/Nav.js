import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { AppBar } from '@mui/material'

const Nav = () => {
    let [userType, setUserType] = useState(null);

    fetch('/api/account-status', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => setUserType(data.user_type));

    return (
        <>
        <AppBar position="fixed">
            <nav className={navStyles.nav}>
                <nav className={navStyles.logo}>
                    <Image src="/images/umkc_white22.png" width={98} height={53} />
                </nav>
                <ul>
                    {userType === "faculty" && 
                        <>
                            <li>
                                <Link href='/faculty/home'>Home</Link>
                            </li>
                            <li>
                                <Link href='/faculty/submissions'>View Submissions</Link>
                            </li>
                            <li>
                                <Link href='/faculty/manage-listings'>Manage Listings</Link>
                            </li>
                        </>
                    }
                    {userType === "student" &&
                        <>
                            <li>
                                <Link href='/student/home'>Home</Link>
                            </li>
                            <li>
                                <Link href='/student/apply'>Apply</Link>
                            </li>
                            <li>
                                <Link href='/student/manage-application'>Manage Applications</Link>
                            </li>
                        </>
                    }
                    <li>
                        { userType == null && <Link href='/login'>Login</Link> }
                    </li>
                    <li>
                        { userType && <Link href='/logout'>Logout</Link> }
                    </li>
                </ul>
            </nav>
        </AppBar>
        </>
    )
}

export default Nav

const getInitialProps = async function () {
    let userType = null;
    

    await fetch('/api/account-status', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => userType = data.user_type);

    return { userType }
}