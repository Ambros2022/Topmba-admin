// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router';
// ** Third Party Imports
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import axios1 from 'src/configs/adminaxios'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import type { FC } from 'react';
import { Alert } from '@mui/material'


interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [joblocations, setJoblocations] = useState([])
    const [jobposition, setJobPosition] = useState([])
    const isMountedRef = useIsMountedRef();
    const params: any = {}
    params['page'] = 1;
    params['size'] = 10000;

    const schema: any = yup.object().shape({
        job_location_id: yup.object().required("This field is required"),
        jobs_position_id: yup.object().required("This field is required"),

    })

    const defaultValues = {
        job_location_id: isAddMode ? '' : olddata.alljoblocations,
        jobs_position_id: isAddMode ? '' : olddata.jobspositions,

    }

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    //get all job locations
    const getlocation = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/alljoblocation/get', { params: roleparams });

            setJoblocations(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);


    //get all position
    const getposition = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/jobsposition/get', { params: roleparams });

            setJobPosition(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {

        getlocation();
        getposition();

    }, [getlocation]);

    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/joblocations/update';
            let formData: any = {};
            formData.id = updateid;
            formData.job_location_id = data.job_location_id.id;
            formData.jobs_position_id = data.jobs_position_id.id;

            try {
                let response = await axios1.post(url, formData)
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    setLoading(false)
                    setError('')
                    reset();
                    router.back();
                }
                else {
                    setLoading(false)
                    toast.error(response.data.message)
                    setError(response.data.message)
                }

            } catch (err: any) {
                console.error(err);
                setLoading(false)
                if (err.errors && err.errors.length > 0) {
                    const errorMessage = err.errors[0].msg;
                    setError(errorMessage || "Please try again");
                    toast.error(errorMessage || "Please try again");
                } else {
                    setError(err.message || "Please try again");
                    toast.error(err.message || "Please try again");
                }

            }
        } else {
            setLoading(true)
            let url = 'api/admin/joblocations/add';
            let formData: any = {};
            formData.job_location_id = data.job_location_id.id;
            formData.jobs_position_id = data.jobs_position_id.id;
            try {
                let response = await axios1.post(url, formData)
                // console.log(response, "response")

                if (response.data.status == 1) {
                    // console.log("response.data", response.data)
                    toast.success(response.data.message)
                    setLoading(false)
                    setError('')
                    reset();
                    router.push('./');


                }
                else {
                    setLoading(false)
                    toast.error(response.data.message)
                    setError(response.data.message)
                }
            } catch (err: any) {
                setLoading(false)
                if (err.errors && err.errors.length > 0) {
                    const errorMessage = err.errors[0].msg;
                    setError(errorMessage || "Please try again");
                    toast.error(errorMessage || "Please try again");
                } else {
                    setError(err.message || "Please try again");
                    toast.error(err.message || "Please try again");
                }

            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} encType="application/x-www-form-urlencoded">
                <Grid container spacing={5}>


                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='job_location_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={joblocations}
                                    loading={!joblocations.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => (
                                        <CustomTextField
                                            {...params}
                                            required
                                            error={Boolean(errors.job_location_id)}
                                            {...(errors.job_location_id && { helperText: 'This field is required' })}
                                            label='Select Job Location'
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='jobs_position_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={jobposition}
                                    loading={!jobposition.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => (
                                        <CustomTextField
                                            {...params}
                                            required
                                            error={Boolean(errors.jobs_position_id)}
                                            {...(errors.jobs_position_id && { helperText: 'This field is required' })}
                                            label='Select Job Position'
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        {error && <Alert severity='error'>{error}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <DialogActions
                            sx={{
                                justifyContent: 'center',
                                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                            }}
                        >

                            <Button variant='contained' type='submit' sx={{ mr: 1 }} >

                                Submit
                                {loading ? (
                                    <CircularProgress
                                        sx={{
                                            color: 'common.white',
                                            width: '20px !important',
                                            height: '20px !important',
                                            mr: theme => theme.spacing(2)
                                        }}
                                    />
                                ) : null}
                            </Button>

                        </DialogActions>
                    </Grid>
                </Grid>
            </form >
        </>
    )
}

export default AddEditForm
