// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// ** MUI Imports (dynamically loaded)
const AddEditFormnew = dynamic(() => import('src/views/app/dashboard/exam/AddEditForm'))
// import AddEditFormnew from 'src/views/app/dashboard/exam/AddEditForm'
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
                    <h5>Add Exam Details</h5>
                    <Link href={`./`} >
                        <Button variant='contained'>View All exam</Button>
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
