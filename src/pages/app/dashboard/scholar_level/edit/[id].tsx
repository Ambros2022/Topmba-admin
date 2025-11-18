// ** React Imports
import {  useState,  useEffect, useCallback } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Link from 'next/link'
import AddEditForm from 'src/views/app/dashboard/scholar_level/AddEditForm'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios1 from 'src/configs/adminaxios'
// import Resetpasswordform from 'src/views/users/ResetPassword'
import LinearProgress from '@mui/material/LinearProgress'



const Edituserlayout = () => {
  const isMountedRef = useIsMountedRef();
  const router = useRouter();
  const { id } = router.query;
  // console.log(router.query , "router.query")
  const isAddMode = !id;
  const [olddata, setolddata] = useState<any>(null);
  const [formloading, setFormloading] = useState(true);


  //get old data
  const getolddata = useCallback(async () => {
    try {
      // this route needs to be swapped out to /Patient/, but it's currently returning 500
      const response = await axios1.get('api/admin/scholarlevel/get/' + id);
      // console.log(response);

      if (isMountedRef.current) {
        setolddata(response.data.data);
        setFormloading(false);
      }
    } catch (err) {
      console.error(err);
    }


  }, [isMountedRef]);



  useEffect(() => {

    getolddata();
  }, []);

  return (
    <>
     
        <Card>
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: theme => theme.spacing(2, 5, 4, 5)
            }}
          >
            <h5>Edit Scholar_level</h5>
            <Link href={`../`} >
              <Button variant='contained'>View All scholar_level</Button>
            </Link>
          </Box>
          <CardContent>
            {formloading ? <LinearProgress /> : <AddEditForm olddata={olddata} isAddMode={isAddMode} />}
          </CardContent>
        </Card>
        
    </>
  )
}

export default Edituserlayout