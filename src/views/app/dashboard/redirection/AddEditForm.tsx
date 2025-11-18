
import {  useState } from 'react'
import DialogActions from '@mui/material/DialogActions'
// import { SelectChangeEvent } from '@mui/material/Select'
// import IconButton, { IconButtonProps } from '@mui/material/IconButton'
// import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
// import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router';
// ** Third Party Imports
import toast from 'react-hot-toast'
import * as yup from 'yup'
// import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import axios1 from 'src/configs/adminaxios'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import type { FC } from 'react';
import { Alert } from '@mui/material'
// import FileUpload from 'src/@core/components/dropzone/FileUpload';



interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode,  }) => {
// const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, ...rest }) => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")


    const schema = yup.object().shape({
        old_url: yup
          .string()
          .required("old_url is required")
          .test(
            "starts-with-slash",
            "Enter a valid URL that must contain the first character as '/' (e.g., /example)",
            (value) => value?.startsWith("/")
          ),
        new_url: yup
          .string()
          .required("new_url is required")
          .test(
            "starts-with-slash",
            "Enter a valid URL that must contain the first character as '/' (e.g., /example)",
            (value) => value?.startsWith("/")
          ),
      });

    const defaultValues = {
        old_url: isAddMode ? '' : olddata.old_url,
        new_url: isAddMode ? '' : olddata.new_url,
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

    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/redirect/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('old_url', data.old_url);
            formData.append('new_url', data.new_url);
  

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
            let url = 'api/admin/redirect/add';

            const formData = new FormData();
            formData.append('old_url', data.old_url);
            formData.append('new_url', data.new_url);


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
                            name='old_url'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                //@ts-ignore
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Old URL'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.old_url)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.old_url && { helperText: errors?.old_url?.message })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='new_url'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                //@ts-ignore
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='New Url'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.new_url)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.new_url && { helperText: errors?.new_url?.message })}
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