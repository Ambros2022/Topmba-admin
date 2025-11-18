// ** React Imports
import { useEffect, useState, useCallback } from 'react'
// ** MUI Imports
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridPaginationModel, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import axios1 from 'src/configs/adminaxios'

import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'
import { Button, Grid, IconButton, MenuItem } from '@mui/material'


// ** Icon Imports
import toast from 'react-hot-toast'
import Fab from '@mui/material/Fab'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios'





let cancelToken: any;

type SortType = 'asc' | 'desc' | undefined | null



const RowOptions = ({ path }: { path: any | string; }) => {

  const handledownloadfile = async () => {
    try {
      const response = await axios1.get('api/admin/backup/download/' + path, { responseType: 'blob' });

      // Create a Blob object from the response data
      const blob = new Blob([response.data], { type: 'application/sql' }); // Adjust the type as per your API response

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backup.sql'; // Specify the filename for the SQL file
      document.body.appendChild(a);

      // Programmatically trigger a click event on the anchor element
      a.click();

      // Cleanup: remove the temporary anchor element and URL object
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('SQL file downloaded successfully');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while downloading the SQL file. Please try again.');
    }
  };

  return (
    <>


      <MenuItem onClick={() => handledownloadfile()} sx={{ '& svg': { mr: 1 }, backgroundColor: '#3949ab', color: 'white', borderRadius: '8px', padding: '5px' }}>
        <IconButton size="small" color="inherit">
          <CloudDownloadIcon />
        </IconButton>
        Download
      </MenuItem>

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


  const [reloadpage] = useState("0");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [orderby, setOrderby] = useState<SortType>('desc')
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchtext] = useState<string>('')
  const [searchfrom] = useState<any>('created_at')
  const [columnname, setColumnname] = useState<string>('created_at')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const params: any = {}

  params['page'] = 1;
  params['size'] = 10000;



  let columns: GridColDef[] = [

    {
      flex: 0.175,
      minWidth: 200,
      field: 'id',
      headerName: 'ID',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.id}
          </Typography>
        )
      }
    },

    {
      flex: 0.175,
      minWidth: 100,
      field: 'title',
      headerName: 'title',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.title}
          </Typography>
        )
      }
    },

    {
      flex: 0.175,
      minWidth: 200,
      field: 'status',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;

        let button;
        switch (row.status) {
          case 0:
            button = <Button variant="contained" color="warning" sx={{ width: '100px', height: '40px' }}>Pending</Button>;
            break;
          case 1:
            button = <Button variant="contained" color="info" sx={{ width: '100px', height: '40px' }}>Process</Button>;
            break;
          case 2:
            button = <Button variant="contained" color="success" sx={{ width: '100px', height: '40px' }}>Completed</Button>;
            break;
          case 3:
            button = <Button variant="contained" color="error" sx={{ width: '100px', height: '40px' }}>Cancelled</Button>;
            break;
          default:
            button = <Button variant="contained" color="primary" sx={{ width: '100px', height: '40px' }}>Unknown</Button>;
            break;
        }

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {button}
          </Typography>
        );
      }
    },


    {
      flex: 0.175,
      minWidth: 200,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => (
        <RowOptions path={row.path}/>
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
        .get('api/admin/backup/get', {
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

  const paginationchange = (model: GridPaginationModel,) => {
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
      setOrderby('desc')
      setColumnname('name')
    }
  }



  const AddButtonToolbar = () => {

    const handleRequestBackup = async () => {
      try {
        window.location.reload();
        // Make a GET request to your API endpoint
        const response = await axios1.get('api/admin/backup/request');

        // Handle the response
        if (response.data.status === 1) {
          // Request was successful, display a success message or perform any other actions
          toast.success(response.data.message);
          setLoading(true);
        } else {
          // Request failed, display an error message or perform error handling
          toast.error(response.data.message);
        }
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error(error);
        toast.error("An error occurred. Please try again.");
      }
    };

    return (
      <Fab color='primary' variant='extended' sx={{ '& svg': { mr: 1 } }} onClick={handleRequestBackup}>
        <Icon icon='tabler:plus' />
        REQUEST BACKUP
      </Fab>
    );
  };

  const AddButtonComponent = <AddButtonToolbar />;

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
                // value: searchtext,
                // clearSearch: () => handleSearch(''),
                // onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value),
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
