// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
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
import type { FC } from 'react';
import { Alert, FormControlLabel, FormLabel, RadioGroup, Typography } from '@mui/material'
import QuillEditor from 'src/@core/components/html-editor/index';



interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}



const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [jobsdata, setJobsdata] = useState([])
    const params: any = {}
    params['page'] = 1;
    params['size'] = 10000;

    const schema: any = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required(),
        job_description: yup
            .string()
            .trim()
            .required(),
        exp_required: yup
            .string()
            .trim()
            .required(),
        total_positions: yup
            .string()
            .trim()
            .required(),

    })

    const defaultValues = {
        name: isAddMode ? '' : olddata.name,
        job_description: isAddMode ? '' : olddata.job_description,
        exp_required: isAddMode ? '' : olddata.exp_required,
        total_positions: isAddMode ? '' : olddata.total_positions,
        status: isAddMode ? 'Published' : olddata.status,
        joblocations: isAddMode ? [] : olddata.jobpositionlocation?.map((item: any) => ({
            id: item.jobpositionslocation.id,
            name: item.jobpositionslocation.name,
        })) || [],
    }

    const getjobs = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/alljoblocation/get', { params: roleparams });
            setJobsdata(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        getjobs();

    }, [getjobs]);


    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/jobsposition/update';
            let formData: any = {};
            formData.id = updateid;
            formData.name = data.name;
            formData.job_description = data.job_description;
            formData.exp_required = data.exp_required;
            formData.total_positions = data.total_positions;
            formData.joblocations = JSON.stringify(data.joblocations);
            formData.status = data.status;

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
            const url = 'api/admin/jobsposition/add';

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('job_description', data.job_description);
            formData.append('exp_required', data.exp_required);
            formData.append('total_positions', data.total_positions);
            formData.append('status', data.status);

            formData.append('joblocations', data.joblocations);
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




    useEffect(() => {
        if (!isAddMode && olddata.jobpositionlocation) {
            const locations = olddata.jobpositionlocation.map((item: any) => ({
                id: item.jobpositionslocation.id,
                name: item.jobpositionslocation.name,
            }));
            setValue("joblocations", locations);
        }
    }, [isAddMode, olddata, setValue]);
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} encType="application/x-www-form-urlencoded">
                <Grid container spacing={5}>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="joblocations"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => {
                                // console.log(value); // Log value here

                                return (
                                    <CustomAutocomplete
                                        multiple
                                        fullWidth
                                        value={value || []}
                                        options={jobsdata}
                                        onChange={(event, newValue) => {
                                            onChange(newValue);
                                        }}
                                        filterSelectedOptions
                                        id='autocomplete-multiple-outlined'
                                        getOptionLabel={(option: any) => option.name}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={params =>
                                            <CustomTextField {...params}
                                                label='Select locations'

                                                variant="outlined"
                                                error={Boolean(errors.joblocations)}
                                                {...(errors.joblocations && { helperText: 'This field is required' })}
                                                placeholder='joblocations' />}
                                    />
                                );
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='name'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Name'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.name)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.name && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>

                    {/* <Grid item xs={12} sm={6}>
                        <Controller
                            name='job_description'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Description'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.job_description)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.job_description && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid> */}




                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='exp_required'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Experience'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.exp_required)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.exp_required && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='total_positions'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Position'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.total_positions)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.total_positions && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={12}>
                        <Typography style={{ marginBottom: '10px' }}>Description</Typography>

                        <Controller
                            name='job_description'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value } }) => (
                                <>
                                    <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                        onChange={(value) => setValue("job_description", value)} />
                                    {/* <QuillEditor placeholder='Start Writing...' initialValue={value}
                                //  onChange={(value)=>  setValue("bottom_description", value)} />
                                onChange={(value)=>console.log(value)} /> */}
                                </>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormLabel component='legend' style={{ marginBottom: 0 }}>Select status</FormLabel>
                        <Controller
                            name='status'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={onChange}>
                                    <FormControlLabel value='Draft' control={<Radio />} label='Draft' />
                                    <FormControlLabel value='Published' control={<Radio />} label='Published' />
                                </RadioGroup>
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
