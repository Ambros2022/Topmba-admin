
import {  useState,  useEffect, useCallback } from 'react'
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
import { Alert, FormControlLabel, FormLabel, MenuItem, RadioGroup, Typography } from '@mui/material'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import QuillEditor from 'src/@core/components/html-editor/index';




interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [college, setCollege] = useState([]);
    const [generalcollege, setGeneralcollege] = useState([]);
    const isMountedRef = useIsMountedRef();



  
    const schema: any = yup.object().shape({
        course_type: yup
            .string()
            .trim()
            .required(),
        slug: yup
            .string()
            .trim()
            .required(),
        meta_title: yup
            .string()
            .trim()
            .required(),
        meta_description: yup
            .string()
            .trim()
            .required(),
        meta_keywords: yup
            .string()
            .trim()
            .required(),

        college_id: yup.object().required("This field is required"),

    })

    const defaultValues = {
        college_id: isAddMode ? '' : olddata.college ? olddata.college : '',
        general_course_id: isAddMode ? '' : olddata?.generalcourse ? olddata?.generalcourse : '',
        course_type: isAddMode ? '' : olddata.course_type,
        slug: isAddMode ? '' : olddata.slug,
        course_short_name: isAddMode ? '' : olddata.course_short_name,
        title: isAddMode ? '' : olddata.title,
        meta_title: isAddMode ? '' : olddata.meta_title,
        meta_description: isAddMode ? '' : olddata.meta_description,
        meta_keywords: isAddMode ? '' : olddata.meta_keywords,
        course_details: isAddMode ? '' : olddata.course_details,
        eligibility: isAddMode ? '' : olddata.eligibility,
        fee_structure: isAddMode ? '' : olddata.fee_structure,
        status: isAddMode ? 'Published' : olddata.status,
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


    //get all colleges
    const getcollege = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/college/get', { params: roleparams });

            setCollege(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);


    //get all general courses
    const getgeneralcourse = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/generalcourse/get', { params: roleparams });

            setGeneralcollege(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {

        getcollege();
        getgeneralcourse();

    }, [getcollege, getgeneralcourse]);


    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/courses/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('course_type', data.course_type);
            formData.append('slug', data.slug);
            formData.append('course_short_name', data.course_short_name);
            formData.append('title', data.title);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keywords', data.meta_keywords);
            formData.append('course_details', data.course_details);
            formData.append('eligibility', data.eligibility);
            formData.append('fee_structure', data.fee_structure);
            formData.append('status', data.status);
            formData.append('college_id', data.college_id.id);
            if (data?.general_course_id?.id) {
                formData.append('general_course_id', data.general_course_id.id);
              } else {
                formData.append('general_course_id', ''); // send empty string, not null, to avoid FormData issues
              }

           

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
            let url = 'api/admin/courses/add';

            const formData = new FormData();
            formData.append('course_type', data.course_type);
            formData.append('slug', data.slug);
            formData.append('course_short_name', data.course_short_name);
            formData.append('title', data.title);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keywords', data.meta_keywords);
            formData.append('course_details', data.course_details);
            formData.append('eligibility', data.eligibility);
            formData.append('fee_structure', data.fee_structure);
            formData.append('status', data.status);
            formData.append('college_id', data.college_id.id);
            if (data?.general_course_id?.id) {
                formData.append('general_course_id', data.general_course_id.id);
              } else {
                formData.append('general_course_id', ''); // send empty string, not null, to avoid FormData issues
              }

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
                            name='college_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={college}
                                    loading={!college.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => (
                                        <CustomTextField
                                            {...params}

                                            error={Boolean(errors.college_id)}
                                            {...(errors.college_id && { helperText: 'This field is required' })}
                                            label='Select College'
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='general_course_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={generalcollege}
                                    loading={!generalcollege.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => (
                                        <CustomTextField
                                            {...params}

                                            error={Boolean(errors.general_course_id)}
                                            {...(errors.general_course_id && { helperText: 'This field is required' })}
                                            label='Select General Course'
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='course_type'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    select
                                    value={value}
                                    label='Select course_type'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.course_type)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.course_type && { helperText: 'This field is required' })}
                                >
                                    <MenuItem value='UG'>UG</MenuItem>
                                    <MenuItem value='PG'>PG</MenuItem>
                                    <MenuItem value='Diploma'>Diploma</MenuItem>
                                    <MenuItem value='Doctorate'>Doctorate</MenuItem>
                                    <MenuItem value='Default'>Default</MenuItem>

                                </CustomTextField>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='slug'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Slug'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.slug)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.slug && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='course_short_name'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Courses Short Name'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.course_short_name)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.course_short_name && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='title'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Course Name'
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
                            name='meta_title'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    multiline
                                    rows={3}
                                    label='meta_title'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.meta_title)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.meta_title && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='meta_description'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    multiline
                                    rows={3}
                                    label='meta_description'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.meta_description)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.meta_description && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='meta_keywords'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    multiline
                                    rows={3}
                                    label='meta_keywords'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.meta_keywords)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.meta_keywords && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography style={{ marginBottom: '10px' }}>course_details</Typography>

                        <Controller
                            name='course_details'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value,  } }) => (
                                <>
                                    <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                        onChange={(value) => setValue("course_details", value)} />
                                   
                                </>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography style={{ marginBottom: '10px' }}>eligibility</Typography>

                        <Controller
                            name='eligibility'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value,  } }) => (
                                <>
                                    <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                        onChange={(value) => setValue("eligibility", value)} />
                                   
                                </>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography style={{ marginBottom: '10px' }}>fee_structure</Typography>

                        <Controller
                            name='fee_structure'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value,  } }) => (
                                <>
                                    <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                        onChange={(value) => setValue("fee_structure", value)} />
                                    
                                </>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
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
