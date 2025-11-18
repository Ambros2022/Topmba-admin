// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid,  GridColDef, GridPaginationModel, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import Link from 'next/link'
import axios1 from 'src/configs/adminaxios'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

import { Button, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  Grid,  MenuItem } from '@mui/material'


// ** Icon Imports
import toast from 'react-hot-toast'
import Fab from '@mui/material/Fab'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios'
import CustomTextField from 'src/@core/components/mui/text-field'
import useIsMountedRef from 'src/hooks/useIsMountedRef';

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
      await axios1.post('api/admin/abroadpage/delete/' + id)
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
        <Link href={`./abroadpage/edit/` + id} >
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
  const [countries, setCountries] = useState([]);
  const [country_id, setCountry_id] = useState('')
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

  //get all countries
  const getcountry = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['size'] = 10000;
      const response = await axios1.get('api/admin/countries/get', { params: roleparams });

      setCountries(response.data.data);

    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);


  useEffect(() => {

    getcountry();
    // getcourses();

  }, [getcountry]);

  const handleReloadPage = () => {
    setReloadpage((prev) => (prev === "0" ? "1" : "0"));
  };

  let columns: GridColDef[] = [

    {
      flex: 0.2,
      minWidth: 200,
      field: 'country.name',
      headerName: 'Country Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.country.name}
          </Typography>
        );
      }
    },

    {
      flex: 0.175,
      minWidth: 100,
      field: 'name',
      headerName: 'Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (

          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.name}
          </Typography>


        )
      }
    },

    // {
    //   flex: 0.175,
    //   minWidth: 100,
    //   field: 'info',
    //   headerName: 'info',
    //   renderCell: (params: GridRenderCellParams) => {
    //     const { row } = params

    //     return (

    //       <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
    //         {row.info}
    //       </Typography>


    //     )
    //   }
    // },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'meta_title',
      headerName: 'meta_title',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (

          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.meta_title}
          </Typography>


        )
      }
    },
    {
      flex: 0.3,
      minWidth: 100,
      field: 'slug',
      headerName: 'Slug',
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
      flex: 0.3,
      minWidth: 100,
      field: 'status',
      headerName: 'Status',
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
    async (orderby: SortType, searchtext: string, searchfrom: any, size: number, page: number, columnname: string , country_id: string) => {
      setLoading(true);
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios.CancelToken.source();

      await axios1
        .get('api/admin/abroadpage/get', {
          cancelToken: cancelToken.token,
          params: {
            columnname,
            orderby,
            page,
            size,
            searchtext,
            searchfrom,
            country_id,

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
    fetchTableData(orderby, searchtext, searchfrom, size, page, columnname, country_id)
  }, [fetchTableData, searchtext, orderby, searchfrom, size, page, columnname, country_id])

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
        <Link href={'./abroadpage/add'}>
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
              <Grid item sm={3} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Select Country"
                  value={country_id}
                  onChange={(e: any) => {
                    setCountry_id(e.target.value);
                    // console.log(setschoolId, "setschoolId");

                  }}
                  SelectProps={{
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value=''>Select Country</MenuItem>
                  {countries && countries.map((val: any) => (
                    <MenuItem value={val.id}>{val.name}</MenuItem>
                  ))}
                  {countries.length === 0 && <MenuItem disabled>Loading...</MenuItem>}
                </CustomTextField>
              </Grid>


             
           

              <Grid item sm={3} xs={12}>
                <Button sx={{ mt: 0 }} variant="contained" color='error'
                  onClick={() => {
                    setCountry_id('');
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
