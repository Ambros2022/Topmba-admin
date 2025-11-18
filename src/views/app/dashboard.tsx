// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import axios1 from 'src/configs/adminaxios'
const Home = () => {
 
  if (axios1.defaults.headers.common["x-access-token"]) {
    console.log("x-access-token header is set:", axios1.defaults.headers.common["x-access-token"]);
  } else {
    console.log("x-access-token header is not set.");
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Home</Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}



export default Home
