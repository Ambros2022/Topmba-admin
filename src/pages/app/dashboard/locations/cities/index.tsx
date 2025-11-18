// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridPaginationModel, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import Link from 'next/link'
import axios1 from 'src/configs/adminaxios'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import toast from 'react-hot-toast'
import Fab from '@mui/material/Fab'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios'

let cancelToken: any;

type SortType = 'asc' | 'desc' | undefined | null

// ** renders client column



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
      await axios1.post('api/admin/city/delete/' + id)
        .then(response => {
          console.log(response);

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
        <Link href={`./cities/edit/` + id} >
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
  const [states, setStates] = useState([]);
  const [state_id, setState_id] = useState('')
  const [reloadpage, setReloadpage] = useState("0");

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [orderby, setOrderby] = useState<SortType>('asc')
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchtext, setSearchtext] = useState<string>('')
  const [searchfrom] = useState<any>('name')
  const [fieldname, setFieldname] = useState<string>('name')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const isMountedRef = useIsMountedRef();
  const params: any = {}

  params['page'] = 1;
  params['size'] = 10000;



  //get all states
  const getstates = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['size'] = 10000;
      const response = await axios1.get('api/admin/state/get/', { params: roleparams });

      setStates(response.data.data);

    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);


  useEffect(() => {

    getstates();
    // getcourses();

  }, [getstates]);

  const handleReloadPage = () => {
    setReloadpage((prev) => (prev === "0" ? "1" : "0"));
  };

  let columns: GridColDef[] = [

    {
      flex: 0.175,
      minWidth: 100,
      field: 'name',
      headerName: 'City Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.name}
          </Typography>
        )
      }
    },

    {
      flex: 0.175,
      minWidth: 100,
      field: 'state.name',
      headerName: 'States',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {params.row.state && params.row.state ? params.row.state.name : ""}
          </Typography>
        );
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
    async (orderby: SortType, searchtext: string, searchfrom: any, size: number, page: number, fieldname: string, state_id: string) => {
      setLoading(true);
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios.CancelToken.source();

      await axios1
        .get('api/admin/city/get', {
          cancelToken: cancelToken.token,
          params: {
            searchtext,
            searchfrom,
            orderby,
            size,
            page,
            fieldname,
            state_id,

          },
        })

        .then((res) => {
          setTotal(res.data.totalItems);
          setRows(res.data.data);
          console.log(res.data.data);

          setLoading(false);
        })
        .catch((error) => {
          // Handle error if needed
          setLoading(false);
          console.error("API call error:", error);
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
    fetchTableData(orderby, searchtext, searchfrom, size, page, fieldname, state_id)
  }, [fetchTableData, searchtext, orderby, searchfrom, size, page, fieldname, state_id])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setOrderby(newModel[0].sort)
      setFieldname(newModel[0].field)
    } else {
      setOrderby('asc')
      setFieldname('name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchtext(value)
  }


  const AddButtonToolbar = () => {

    return (
      <>
        <Link href={'./cities/add'}>
          <Fab color='primary' variant='extended' sx={{ '& svg': { mr: 1 } }}>
            <Icon icon='tabler:plus' />
            Add
          </Fab>
        </Link>

      </>
    );
  };

  const AddButtonComponent = <AddButtonToolbar />;

  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Card>
          <CardHeader title="Search Filters" />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Select States"
                  value={state_id}
                  onChange={(e: any) => {
                    setState_id(e.target.value);
                    // console.log(setschoolId, "setschoolId");

                  }}
                  SelectProps={{
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value=''>Select State</MenuItem>
                  {states && states.map((val: any) => (
                    <MenuItem value={val.id}>{val.name}</MenuItem>
                  ))}
                  {states.length === 0 && <MenuItem disabled>Loading...</MenuItem>}
                </CustomTextField>
              </Grid>

              <Grid item sm={4} xs={12}>
                <Button sx={{ mt: 0 }} variant="contained" color='error'
                  onClick={() => {
                    setState_id('');
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
            // getRowId={(row) => row._id}
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
