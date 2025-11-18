// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Link from 'next/link'
import AddEditFormnew from 'src/views/app/dashboard/blogcategories/AddEditForm'
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
                    <h5>Add Blog Categories Details</h5>
                    <Link href={`./`} >
                        <Button variant='contained'>View All blogscategories</Button>
                    </Link>
                </Box>
                <CardContent>
                    <AddEditFormnew isAddMode={true} />
                </CardContent>
            </Card>

        </>
    )
}

export default Adduserlayout
