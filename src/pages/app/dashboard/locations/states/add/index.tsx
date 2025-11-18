// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Link from 'next/link'
import AddEditFormnew from 'src/views/app/dashboard/locations/states/AddEditForm'
import CardContent from '@mui/material/CardContent'


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
                    <h5>Add States  Details</h5>
                    <Link href={`../states`} >
                        <Button variant='contained'>View All states</Button>
                    </Link>
                </Box>
                <CardContent>
                    {/* <AddEditForm isAddMode={true} /> */}
                    <AddEditFormnew isAddMode={true} />
                </CardContent>
            </Card>
        </>
    )
}

export default Adduserlayout
