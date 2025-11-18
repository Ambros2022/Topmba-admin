
import {  useState,  useEffect, useCallback } from 'react'
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
import type { FC } from 'react';
import { Alert } from '@mui/material'
import useIsMountedRef from 'src/hooks/useIsMountedRef'



interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")

    const [stream, setStream] = useState([]);
    const isMountedRef = useIsMountedRef();



 
    const schema: any = yup.object().shape({
        sub_stream_name: yup
            .string()
            .trim()
            .required(),
        sub_stream_slug: yup
            .string()
            .trim()
            .required(),
    })

    const defaultValues = {
        sub_stream_name: isAddMode ? '' : olddata.sub_stream_name,
        sub_stream_slug: isAddMode ? '' : olddata.sub_stream_slug,
        sub_stream_description: isAddMode ? '' : olddata.sub_stream_description,
        stream_id: isAddMode ? '' : olddata.stream,
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


    //get all countries
    const getstream = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/stream/get', { params: roleparams });

            setStream(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {

        getstream();

    }, [getstream]);


    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/substream/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('sub_stream_name', data.sub_stream_name);
            formData.append('sub_stream_slug', data.sub_stream_slug);
            formData.append('sub_stream_description', data.sub_stream_description);
            formData.append('stream_id', data.stream_id.id);

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
            let url = 'api/admin/substream/add';

            const formData = new FormData();
            formData.append('sub_stream_name', data.sub_stream_name);
            formData.append('sub_stream_slug', data.sub_stream_slug);
            formData.append('sub_stream_description', data.sub_stream_description);
            formData.append('stream_id', data.stream_id.id);


            try {
                let response = await axios1.post(url, formData)
                console.log(response, "response")

                if (response.data.status == 1) {

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
        }
    }




    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} encType="application/x-www-form-urlencoded">
                <Grid container spacing={5}>


                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='stream_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={stream}
                                    loading={!stream.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => (
                                        <CustomTextField
                                            {...params}
                                            required
                                            error={Boolean(errors.stream_id)}
                                            {...(errors.stream_id && { helperText: 'This field is required' })}
                                            label='Select Stream'
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>




                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='sub_stream_name'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='substream Name'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.sub_stream_name)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.sub_stream_name && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Controller
                            name='sub_stream_slug'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    multiline
                                    rows={3}
                                    label='Slug'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.sub_stream_slug)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.sub_stream_slug && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Controller
                            name='sub_stream_description'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    multiline
                                    rows={3}
                                    label='Description'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.sub_stream_description)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.sub_stream_description && { helperText: 'This field is required' })}
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
