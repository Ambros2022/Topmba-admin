
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const FooterContent = () => {
  // ** Var


  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2, display: 'flex', color: 'text.secondary' }}>
        {`© ${new Date().getFullYear()}, Copyright `}
      </Typography>
    </Box>
  )
}

export default FooterContent
