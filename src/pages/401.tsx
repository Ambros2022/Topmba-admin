// ** React Imports
import { ReactNode } from 'react'

import dynamic from 'next/dynamic'
// ** MUI Components (tree-shaken)
const Button = dynamic(() => import('@mui/material/Button'))
const Typography = dynamic(() => import('@mui/material/Typography'))
const Box = dynamic(() => import('@mui/material/Box'))
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// ** Dynamic Imports

const BlankLayout = dynamic(() => import('src/@core/layouts/BlankLayout'))

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))

const Error401 = () => {
  return (
    <Box className='content-center'>
      <Box
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <BoxWrapper>
          <Typography variant='h2' sx={{ mb: 1.5 }}>
            You are not authorized!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to view this page using the credentials that you have provided while login.
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Please contact your site administrator.
          </Typography>
          <Button href='/' variant='contained'>
            Back to Home
          </Button>
        </BoxWrapper>
        <Img alt='error-illustration' src='/images/pages/401.png' />
      </Box>
 
    </Box>
  )
}

Error401.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error401