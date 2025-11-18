// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Link from 'next/link'
import AddEditFormnew from 'src/views/app/dashboard/jobs_positions/AddEditForm'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid';



const Adduserlayout = () => {
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
                    <h5>Add Jobs_positions Details</h5>
                    <Link href={`./`} >
                        <Button variant='contained'>View All jobs_positions</Button>
                    </Link>
                </Box>
                <CardContent>

                    <AddEditFormnew isAddMode={true} />
                </CardContent>
            </Card>
            <Grid container spacing={6}>

            </Grid >

        </>
    )
}

export default Adduserlayout
