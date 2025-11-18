// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid,  GridColDef, GridPaginationModel, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import Link from 'next/link'
import axios1 from 'src/configs/adminaxios'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

import { Button,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  Grid,  MenuItem } from '@mui/material'

import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import axios from 'axios'




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
      await axios1.post('api/admin/jobsenquires/delete/' + id)
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
      // console.error(err);
      toast.error(err.message || "please try again")

    }

  };

  return (
    <>
      <MenuItem sx={{ '& svg': { mr: 1 } }}>
        <Link href={`./jobenquiry/edit/` + id} >
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

  const [reloadpage, setReloadpage] = useState("0");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [orderby, setOrderby] = useState<SortType>('desc')
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchtext, setSearchtext] = useState<string>('')
  const [searchfrom] = useState<any>('name')
  const [columnname, setColumnname] = useState<string>('created_at')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData] = useState<any>(null);
  const params: any = {}

  params['page'] = 1;
  params['size'] = 10000;


  const handleReloadPage = () => {
    setReloadpage((prev) => (prev === "0" ? "1" : "0"));
  };



  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  let columns: GridColDef[] = [

    {
      flex: 0.175,
      minWidth: 200,
      field: 'nameAndEmail',
      headerName: 'Name and Email',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <div>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              Name: {row.name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              Email: {row.email}
            </Typography>
          </div>
        );
      }
    },

    {
      flex: 0.115,
      minWidth: 100,
      field: 'phone',
      headerName: 'phone',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.phone}
          </Typography>
        );
      }
    },




    {
      flex: 0.200,
      minWidth: 100,
      field: 'jobspositions.name',
      headerName: 'Job Position',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
      

        return (
          <div>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              Postion: {row.jobspositions.name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              Location : {row.current_location}
            </Typography>
          </div>
        );
      }
    },

    {
      flex: 0.150,
      minWidth: 100,
      field: 'jobspositions.resume',
      headerName: 'Resume',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;

        const handleViewClick = () => {
          // Open the resume link in a new tab
          const url = `${process.env.NEXT_PUBLIC_IMG_URL}/${row?.resume}`;
          window.open(url, '_blank', 'noopener,noreferrer');
        };


        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'green',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'green', // Keeps the background color green on hover
                },
              }}
              onClick={handleViewClick}
            >
              View Resume
            </Button>
          </Typography>
        );
      }
    }, {
      flex: 0.100,
      minWidth: 100,
      field: 'jobspositions.created_at',
      headerName: 'Date',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;

        
        const formattedDate = row?.created_at
        ? new Date(row.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
        : 'N/A';

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {formattedDate}
          </Typography>
        );
      }
    }
    ,


    {
      flex: 0.100,
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
    async (orderby: SortType, searchtext: string, searchfrom: any, size: number, page: number, columnname: string) => {
      setLoading(true);

      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios.CancelToken.source();

      await axios1
        .get('api/admin/jobsenquires/get', {
          cancelToken: cancelToken.token,
          params: {
            columnname,
            orderby,
            page,
            size,
            searchtext,
            searchfrom,
          },
        })

        .then((res) => {
          setTotal(res.data.totalItems);
          setRows(res.data.data);
          // console.log(res.data.data);

          setLoading(false);
        })
        .catch(() => {
          // Handle error if needed
          setLoading(false);

        });

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel, reloadpage]
  );

  const paginationchange = (model: GridPaginationModel, ) => {
    setSize(model.pageSize);
    setPage(model.page + 1);
    setPaginationModel({ page: model.page, pageSize: model.pageSize });

  }

  useEffect(() => {
    fetchTableData(orderby, searchtext, searchfrom, size, page, columnname)
  }, [fetchTableData, searchtext, orderby, searchfrom, size, page, columnname])

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




  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Card>
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
                // CustomToolbar: AddButtonComponent
              },
            }}
          />
        </Card>
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="view-dialog-title"
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle id="view-dialog-title" className='typographypopup'>View Details</DialogTitle>
        <DialogContent>
          {dialogData && (
            <a href={`${process.env.NEXT_PUBLIC_IMG_URL}/${dialogData.resume}`} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>

          )}
          {/* {dialogData && (
                <iframe
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${dialogData.resume}`}
                title={dialogData.resume}
                style={{ width: '100%', height: '500px', display: loading ? 'none' : 'block' }}

            />
          )} */}


        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Grid>
  );
}

export default SecondPage
