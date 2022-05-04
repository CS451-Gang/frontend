import React from 'react'
import Image from 'next/image'
import footStyles from '../styles/Footer.module.css'
import theme from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { IconButton, Link, Typography } from '@mui/material';
import Controls from './controls/Controls'

import whiteLogo from '../public/images/umkc_white22.png';
import duoLogo from '../public/images/umkc_duo_color22.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box } from '@mui/system'

export default function Footer(){
    return(
      <footer className={footStyles.footer}>
        <Box container>
          <Box sx={{ml: 1}}>
            <footer className={footStyles.logo}>
              <Link href="https://www.umkc.edu/">
              <Image src={duoLogo} alt="UMKC Logo" width={300} height={165}/>
              </Link>
            </footer>
          </Box>
          <Box sx={{ml: 4}}>
            <footer className={footStyles.socials}>
              <Controls.IconButton
                aria-label="UMKC Facebook Page"
                href="https://www.facebook.com/UMKansasCity">
                <FacebookIcon/>
              </Controls.IconButton>
              <Controls.IconButton
                aria-label="UMKC Twitter Page"
                href="https://twitter.com/UMKC">
                <TwitterIcon/>
              </Controls.IconButton>
              <Controls.IconButton
                aria-label="UMKC Instagram Page"
                href="https://www.instagram.com/umkcinkansascity">
                <InstagramIcon/>
              </Controls.IconButton>
              <Controls.IconButton
                aria-label="UMKC Youtube Page"
                href="https://www.youtube.com/user/UMKC">
                <YouTubeIcon/>
              </Controls.IconButton>
              <Controls.IconButton
                aria-label="UMKC Linkedin Page"
                href="https://www.linkedin.com/school/umkc">
                <LinkedInIcon/>
              </Controls.IconButton>
            </footer>
          </Box>
        </Box>
        <footer className={footStyles.links}>
          <Typography display="inline" variant="h3">
            <Link href="https://umkc.umsystem.edu/">Pathway</Link>
          </Typography>
          <Typography variant="h3">
            <Link href="https://umsystem.instructure.com/">Canvas</Link>
          </Typography>
          <Typography variant="h3">
            <Link href="https://umkc.starfishsolutions.com/starfish-ops/support/login.html">UMKC Connect</Link>
          </Typography>
        </footer>
      </footer>
    )
}