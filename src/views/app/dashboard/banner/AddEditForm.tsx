
import { useState } from 'react'
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

import type { FC } from 'react';
import { Alert, FormControlLabel, FormLabel, MenuItem, RadioGroup } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';





interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');

    const handleFileChangephoto = (files: any[]) => {
        setSelectedphoto(files[0]);
        setFileNamesphoto(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };

    const options = [
        'Draft',
        'All_Exam_page',
        'All_News_page',
        'All_Scholarship_page',
        'Nri_page',
        'Study_Abroad_page',
        'All_college_page',
        'All_courses_page',
        'All_university_page',
        'All_school_page',
        'Services_Page',
        'All_about_page',
        'All_our_teams',
        'Home_news_page',
        'Advertise_page',
    ];

    const schema: any = yup.object().shape({

        title: yup
            .string()
            .trim()
            .required(),
        status: yup
            .string()
            .trim()
            .required(),
    })

    const defaultValues = {
        link: isAddMode ? '' : olddata.link,
        promo_banner: isAddMode ? '' : olddata.promo_banner,
        title: isAddMode ? '' : olddata.title,
        image: isAddMode ? '' : olddata.image,
        description: isAddMode ? '' : olddata.description,
        status: isAddMode ? 'Published' : olddata.status,
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
            let link = 'api/admin/banner/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('link', data.link);
            formData.append('title', data.title);
            formData.append('promo_banner', data.promo_banner);
            formData.append('status', data.status);
            formData.append('description', data.description);
            formData.append('image', selectedphoto);

            try {
                let response = await axios1.post(link, formData)
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
            let link = 'api/admin/banner/add';

            const formData = new FormData();
            formData.append('link', data.link);
            formData.append('title', data.title);
            formData.append('promo_banner', data.promo_banner);
            formData.append('status', data.status);
            formData.append('description', data.description);
            if (selectedphoto == '') {

                toast.error('Please Upload Image', {
                    duration: 2000
                })
                setLoading(false);
                return false;

            }

            formData.append('image', selectedphoto);

            try {
                let response = await axios1.post(link, formData)
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
            <form onSubmit={handleSubmit(onSubmit)} encType="application/x-www-form-linkencoded">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='title'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Title'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.title)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.title && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='link'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='link'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.link)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.link && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='promo_banner'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    select
                                    value={value}
                                    label='Make Promotional Banner'
                                    onChange={onChange}
                                    error={Boolean(errors.promo_banner)}
                                    helperText={errors.promo_banner && 'This field is required'}
                                >
                                    {options.map((option, value) => (
                                        <MenuItem key={value} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </CustomTextField>
                            )}
                        />
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='description'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    multiline
                                    rows={3}
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
