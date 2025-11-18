
import {  useState} from 'react'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router';
// ** Third Party Imports
import toast from 'react-hot-toast'
import * as yup from 'yup'
import CustomInput from 'src/@core/components/pickersCoustomInput/index'
import { useForm, Controller } from 'react-hook-form'
import axios1 from 'src/configs/adminaxios'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import type { FC } from 'react';
import { Typography, useTheme } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import QuillEditor from 'src/@core/components/html-editor/index';


interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode,  }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');
    const theme = useTheme()
    const { direction } = theme

    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

    const handleFileChangephoto = (files: any[]) => {
        setSelectedphoto(files[0]);
        setFileNamesphoto(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };

    const schema: any = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required(),
    })

    const defaultValues = {
        name: isAddMode ? '' : olddata.name,
        location: isAddMode ? '' : olddata.location,
        description: isAddMode ? '' : olddata.description,
        info: isAddMode ? '' : olddata.info,
        listing_order: isAddMode ? '' : olddata.listing_order,
        experience: isAddMode ? null : new Date(olddata.experience),
    }

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
            let url = 'api/admin/counsellorteam/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('name', data.name);
            formData.append('location', data.location);
            formData.append('info', data.info);
            formData.append('listing_order', data.listing_order);
            formData.append('description', data.description);
            formData.append('image', selectedphoto);
            formData.append('experience', data.experience);


            try {
                let response = await axios1.post(url, formData)
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                    setLoading(false)
                    reset();
                    router.back();
                }
                else {
                    setLoading(false)
                    toast.error(response.data.message)
                }

            } catch (err: any) {

                setLoading(false)
                if (err.errors && err.errors.length > 0) {
                    const errorMessage = err.errors[0].msg;
                    toast.error(errorMessage || "Please try again");
                } else {
                    toast.error(err.message || "Please try again");
                }

            }
        } else {
            setLoading(true)
            let url = 'api/admin/counsellorteam/add';
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('location', data.location);
            formData.append('info', data.info);
            formData.append('listing_order', data.listing_order);
            formData.append('description', data.description);
            formData.append('experience', data.experience);
            if (selectedphoto == '') {

                toast.error('Please Upload Image', {
                    duration: 2000
                })
                setLoading(false);
                return false;

            }

            formData.append('image', selectedphoto);


            try {
                let response = await axios1.post(url, formData)
                console.log(response, "response")

                if (response.data.status == 1) {

                    toast.success(response.data.message)
                    setLoading(false)
                    reset();
                    router.push('./');


                }
                else {
                    setLoading(false)
                    toast.error(response.data.message)
                }
            } catch (err: any) {
                console.error(err);
                setLoading(false)
                if (err.errors && err.errors.length > 0) {
                    const errorMessage = err.errors[0].msg;
                    toast.error(errorMessage || "Please try again");
                } else {
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
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='location'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Location'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.location)}
                                    aria-describedby='validation-basic-location'
                                    {...(errors.location && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='experience'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <DatePickerWrapper>
                                    <DatePicker
                                        selected={value}
                                        id='basic-input'
                                        showYearDropdown
                                        showMonthDropdown
                                        dateFormat='MMMM d, yyyy'
                                        popperPlacement={popperPlacement}
                                        onChange={onChange}
                                        placeholderText='Click to select a date'
                                        customInput={<CustomInput label='Experience'
                                        // error={Boolean(errors.upcoming_date)} {...(errors.upcoming_date && { helperText: 'This field is required' })} 
                                        />}


                                    />
                                </DatePickerWrapper>
                            )}
                        />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <Controller
                            name='experience'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Experience'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.experience)}
                                    aria-describedby='validation-basic-experience'
                                    {...(errors.experience && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='description'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Description'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.description)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.description && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='listing_order'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Listing Order'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.listing_order)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.listing_order && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography style={{ marginBottom: '10px' }}>Info</Typography>

                        <Controller
                            name='info'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value,  } }) => (
                                <>
                                    <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                        onChange={(value) => setValue("info", value)} />
                                </>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <FileUpload
                            isAddMode={isAddMode}
                            olddata={!isAddMode && olddata.image ? olddata.image : ""}
                            onFileChange={handleFileChangephoto}
                            maxFiles={1}
                            maxSize={2000000}
                            fileNames={fileNamesphoto}
                            label=" Upload  Image"
                            acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                            rejectionMessage='Try another file for upload.'
                        />
                    </Grid>

                    {/* <Grid item xs={12}>
                        {error && <Alert severity='error'>{error}</Alert>}
                    </Grid> */}

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
