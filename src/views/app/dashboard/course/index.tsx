// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridPaginationModel, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import Link from 'next/link'
import axios1 from 'src/configs/adminaxios'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

import { Button, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem } from '@mui/material'
import useIsMountedRef from 'src/hooks/useIsMountedRef';



// ** Icon Imports
import toast from 'react-hot-toast'

import Fab from '@mui/material/Fab'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios'
import CustomTextField from 'src/@core/components/mui/text-field'





let cancelToken: any;

type SortType = 'asc' | 'desc' | undefined | null



const RowOptions = ({ id, onReloadPage }: { id: number | string, onReloadPage: () => void }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(true);
  }
  const handleClosePopup = () => {
    setOpen(false);
  };
  const handleConfirmRemove = async () => {
    await DeleteRow();
    setOpen(false);
  }

  const DeleteRow = async () => {
    try {
      await axios1.post('api/admin/courses/delete/' + id)
        .then(response => {
          if (response.data.status == 1) {
            toast.success(response.data.message)
            // router.reload();
            onReloadPage();

          } else {
            toast.error(response.data.message)

          }
        })
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "please try again")

    }

  };

  return (
    <>
      <MenuItem sx={{ '& svg': { mr: 1 } }}>
        <Link href={`./course/edit/` + id} >
          <Icon icon='tabler:edit' fontSize={20} />
        </Link>
      </MenuItem>


      <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 1 } }}>
        <Icon icon='tabler:trash' fontSize={20} />

      </MenuItem>

      <Grid>

        <Dialog
          open={open}
          onClose={handleClosePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="popup-title" id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent style={{ paddingTop: '20px' }}>
            <DialogContentText id="alert-dialog-description">
              Would you like to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopup} color="primary">
              No
            </Button>
            <Button onClick={() => handleConfirmRemove()} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>


  )
}


type DataGridRowType = {
  id: number
  username: string
  email: string
  mobile: string
  status: any
}

const SecondPage = () => {
  // ** States
  const [colleges, setColleges] = useState([]);
  const [college_id, setCollege_id] = useState('')
  const [generalCourses, setGeneralCourses] = useState([]);
  const [course_type, setCourse_type] = useState('');
  const [status, setStatus] = useState('');
  const [general_course_id, setGeneral_course_id] = useState('')

  const [reloadpage, setReloadpage] = useState("0");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [orderby, setOrderby] = useState<SortType>('asc')
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchtext, setSearchtext] = useState<string>('')
  const [searchfrom] = useState<any>('slug')
  const [columnname, setColumnname] = useState<string>('slug')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const params: any = {}
  const isMountedRef = useIsMountedRef();

  params['page'] = 1;
  params['size'] = 10000;
  const handleReloadPage = () => {
    setReloadpage((prev) => (prev === "0" ? "1" : "0"));
  };

  let columns: GridColDef[] = [

    {
      flex: 0.175,
      minWidth: 100,
      field: 'college.name',
      headerName: 'college',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.college.name}
          </Typography>
        )
      }
    },

    {
      flex: 0.175,
      minWidth: 200,
      field: 'generalcourse.name',
      headerName: 'Course',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row?.generalcourse?.name}
          </Typography>
        );
      }
    },



    {
      flex: 0.175,
      minWidth: 100,
      field: 'status',
      headerName: 'status',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (

          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.status}
          </Typography>


        )
      }
    },
    {
      flex: 0.3,
      minWidth: 100,
      field: 'slug',
      headerName: 'slug',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (

          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.slug}
          </Typography>


        )
      }
    },


    {
      flex: 0.175,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => (
        <RowOptions id={row.id} onReloadPage={handleReloadPage} />
      )

    }
  ]




  const fetchTableData = useCallback(
    async (orderby: SortType, searchtext: string, searchfrom: any, size: number, page: number, columnname: string, college_id: string, general_course_id: string, status: string, course_type: string) => {
      setLoading(true);
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios.CancelToken.source();

      await axios1
        .get('api/admin/courses/get', {
          cancelToken: cancelToken.token,
          params: {
            columnname,
            orderby,
            page,
            size,
            searchtext,
            searchfrom,
            college_id,
            general_course_id,
            status,
            course_type,

          },
        })

        .then((res) => {
          setTotal(res.data.totalItems);
          setRows(res.data.data);


          setLoading(false);
        })
        .catch(() => {

          setLoading(false);
          // console.error("API call error:", error);
        });

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel, reloadpage]
  );

  const paginationchange = (model: GridPaginationModel) => {
    setSize(model.pageSize);
    setPage(model.page + 1);
    setPaginationModel({ page: model.page, pageSize: model.pageSize });

  }

  useEffect(() => {
    fetchTableData(orderby, searchtext, searchfrom, size, page, columnname, college_id, general_course_id, status, course_type)
  }, [fetchTableData, searchtext, orderby, searchfrom, size, page, columnname, college_id, general_course_id, status, course_type])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setOrderby(newModel[0].sort)
      setColumnname(newModel[0].field)
    } else {
      setOrderby('asc')
      setColumnname('name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchtext(value)
  }



  const AddButtonToolbar = () => {

    return (
      <>
        <Link href={'./course/add'}>
          <Fab color='primary' variant='extended' sx={{ '& svg': { mr: 1 } }}>
            <Icon icon='tabler:plus' />
            Add
          </Fab>
        </Link>

      </>
    );
  };

  const AddButtonComponent = <AddButtonToolbar />;

  //get all courses
  const getcourses = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['size'] = 10000;
      const response = await axios1.get('api/admin/generalcourse/get', { params: roleparams });

      setGeneralCourses(response.data.data);

    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);



  //get all colleges
  const getcolleges = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10000;
      const response = await axios1.get('api/admin/college/get', { params: roleparams });

      setColleges(response.data.data);

    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);



  useEffect(() => {
    getcourses();
    getcolleges();
  }, [getcourses]);


  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Card>
          <CardHeader title="Search Filters" />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={3} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Select College"
                  value={college_id}
                  onChange={(e: any) => {
                    setCollege_id(e.target.value);
                    // console.log(setschoolId, "setschoolId");

                  }}
                  SelectProps={{
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value=''>Select College</MenuItem>
                  {colleges && colleges.map((val: any) => (
                    <MenuItem value={val.id}>{val.name}</MenuItem>
                  ))}
                  {colleges.length === 0 && <MenuItem disabled>Loading...</MenuItem>}
                </CustomTextField>
              </Grid>
              <Grid item sm={3} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Select Course"
                  value={general_course_id}
                  onChange={(e: any) => {
                    setGeneral_course_id(e.target.value);
                    // console.log(setschoolId, "setschoolId");

                  }}
                  SelectProps={{
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value=''>Select Courses</MenuItem>
                  {generalCourses && generalCourses.map((val: any) => (
                    <MenuItem value={val.id}>{val.name}</MenuItem>
                  ))}
                  {generalCourses.length === 0 && <MenuItem disabled>Loading...</MenuItem>}
                </CustomTextField>
              </Grid>


              <Grid item sm={3} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Select Course Type"
                  value={course_type}
                  onChange={(e: any) => {
                    setCourse_type(e.target.value);
                  }}
                  SelectProps={{
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value=''>Select Course Type</MenuItem>
                  <MenuItem value="UG">UG</MenuItem>
                  <MenuItem value="PG">PG</MenuItem>
                  <MenuItem value="Diploma">Diploma</MenuItem>
                  <MenuItem value="Doctorate">Doctorate</MenuItem>
                  <MenuItem value="Default">Default</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={3} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Select Status"
                  value={status}
                  onChange={(e: any) => {
                    setStatus(e.target.value);
                  }}
                  SelectProps={{
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value=''>Select status</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Published">Published</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={3} xs={12}>
                <Button sx={{ mt: 0 }} variant="contained" color='error'
                  onClick={() => {
                    setGeneral_course_id('');
                    setCourse_type('');
                    setStatus('');
                    setCollege_id('');
                    // setCountry_id('');
                    // setStatus('');
                  }}
                  startIcon={<Icon icon='tabler:trash' />} >Clear Filter</Button>
              </Grid>
            </Grid>
          </CardContent>

          <DataGrid
            autoHeight
            pagination
            loading={loading}
            rows={rows}
            rowCount={total}
            columns={columns}
            // checkboxSelection/
            sortingMode='server'
            paginationMode='server'
            pageSizeOptions={[10, 15, 25, 50]}
            getRowId={(row) => row.id}
            paginationModel={paginationModel}
            onSortModelChange={handleSortModel}
            slots={{ toolbar: ServerSideToolbar }}
            onPaginationModelChange={paginationchange}
            slotProps={{
              baseButton: {
                size: 'medium',
                variant: 'tonal',
              },
              toolbar: {
                value: searchtext,
                clearSearch: () => handleSearch(''),
                onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value),
                CustomToolbar: AddButtonComponent
              },
            }}
          />
        </Card>
      </Grid>

    </Grid>
  );
}

export default SecondPage
