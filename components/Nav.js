import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

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
            <nav className={navStyles.nav}>
                <nav className={navStyles.logo}>
                    <Image src="/UMKC_logo_white.png" width={80} height={40} />
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
                                <Link href='/student/manage-app'>Manage Application</Link>
                            </li>
                        </>
                    }
                    <li>
                        <Link href='/login'>Login</Link>
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