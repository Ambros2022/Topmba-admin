
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
import type { FC } from 'react';
import { Alert, FormHelperText } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import CustomSelectField from 'src/@core/components/mui/select-feild'


interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [collegedata, setCollegedata] = useState([])
    const [streamdata, setStreamdata] = useState([])
    const [coursedata, setCoursedata] = useState([])

    const getcolleges = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('/api/admin/college/get', { params: roleparams });
            setCollegedata(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);
    const getstreams = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('/api/admin/stream/get', { params: roleparams });
            setStreamdata(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);
    const getcourses = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('/api/admin/generalcourse/get', { params: roleparams });
            setCoursedata(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);


    useEffect(() => {


        getcolleges();
        getstreams();
        getcourses();


    }, []);


    const schema: any = yup.object().shape({

        name: yup
            .string()
            .trim()
            .required(),
        type: yup
            .string()
            .required('Testimonial type is required'),
    })

    const defaultValues = {
        title: isAddMode ? '' : olddata.title,
        name: isAddMode ? '' : olddata.name,
        designation: isAddMode ? '' : olddata.designation,
        video_url: isAddMode ? '' : olddata.video_url,
        full_url: isAddMode ? '' : olddata.full_url,
        type: isAddMode ? '' : olddata.type,
        colleges: [],
        streams: [],
        courses: [],

    }

    const {
        control,
        handleSubmit,
        resetField: admfiledReset,
        reset,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    useEffect(() => {

        if (!isAddMode && olddata.collegeTestimonials) {
            const colleges = olddata.collegeTestimonials.map((item) => ({
                id: item.collegeDetails.id,
                name: item.collegeDetails.name,
            }));
            admfiledReset("colleges", { defaultValue: colleges })
        }
        if (!isAddMode && olddata.streamTestimonials) {
            const colleges = olddata.streamTestimonials.map((item) => ({
                id: item.streamDetails.id,
                name: item.streamDetails.name,
            }));
            admfiledReset("streams", { defaultValue: colleges })
        }
        if (!isAddMode && olddata.courseTestimonials) {
            const colleges = olddata.courseTestimonials.map((item) => ({
                id: item.courseDetails.id,
                name: item.courseDetails.name,
            }));
            admfiledReset("courses", { defaultValue: colleges })
        }


    }, []);

    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/videotestimonials/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('title', data?.title);
            formData.append('name', data.name);
            formData.append('designation', data.designation);
            formData.append('video_url', data.video_url);
            formData.append('full_url', data.full_url);
            formData.append('type', data.type);
            formData.append('colleges', JSON.stringify(data.colleges));
            formData.append('streams', JSON.stringify(data.streams));
            formData.append('courses', JSON.stringify(data.courses));

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
            let url = 'api/admin/videotestimonials/add';
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('name', data.name);
            formData.append('designation', data.designation);
            formData.append('video_url', data.video_url);
            formData.append('full_url', data.full_url);
            formData.append('type', data.type);
            formData.append('colleges', JSON.stringify(data.colleges));
            formData.append('streams', JSON.stringify(data.streams));
            formData.append('courses', JSON.stringify(data.courses));


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
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='type'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomSelectField
                                    label="Type"
                                    value={value}
                                    onChange={onChange}
                                    labelId="testimonial-type-label"
                                    error={Boolean(errors.type)}
                                >
                                    <MenuItem value="Testimonial_page">Testimonial Page</MenuItem>
                                    <MenuItem value="About_us_page">About Us Page</MenuItem>
                                </CustomSelectField>
                            )}
                        />
                        {errors.type && (
                            <FormHelperText>
                                {errors.type.message as React.ReactNode}
                            </FormHelperText>
                        )}
                    </Grid>
                    {/* <Grid item xs={12} sm={4}>
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
                    </Grid> */}
                    <Grid item xs={12} sm={4}>
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
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='full_url'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='College Name'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.full_url)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.full_url && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Controller
                            name='designation'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Designation'
                                    onChange={onChange}
                                    placeholder=''
                                    multiline={true}
                                    rows={8}
                                    error={Boolean(errors.designation)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.designation && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Controller
                            name='video_url'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Video'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.video_url)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.video_url && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
    


                    <Grid item xs={12} sm={4}>
                        <Controller
                            name="colleges"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => {
                                // console.log(value); // Log value here

                                return (
                                    <CustomAutocomplete
                                        multiple
                                        fullWidth
                                        value={value || []}
                                        options={collegedata}
                                        onChange={(event, newValue) => {
                                            onChange(newValue);
                                        }}
                                        filterSelectedOptions
                                        id='autocomplete-multiple-outlined'
                                        getOptionLabel={(option: any) => option.name}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={params =>
                                            <CustomTextField {...params}
                                                label='Select colleges'
                                                variant="outlined"
                                                error={Boolean(errors.colleges)}
                                                {...(errors.colleges && { helperText: 'This field is required' })}
                                                placeholder='colleges' />}
                                    />
                                );
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name="streams"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => {
                                // console.log(value); // Log value here

                                return (
                                    <CustomAutocomplete
                                        multiple
                                        fullWidth
                                        value={value || []}
                                        options={streamdata}
                                        onChange={(event, newValue) => {
                                            onChange(newValue);
                                        }}
                                        filterSelectedOptions
                                        id='autocomplete-multiple-outlined'
                                        getOptionLabel={(option: any) => option.name}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={params =>
                                            <CustomTextField {...params}
                                                label='Select Streams'
                                                variant="outlined"
                                                error={Boolean(errors.streams)}
                                                {...(errors.streams && { helperText: 'This field is required' })}
                                                placeholder='streams' />}
                                    />
                                );
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name="courses"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => {
                                // console.log(value); // Log value here

                                return (
                                    <CustomAutocomplete
                                        multiple
                                        fullWidth
                                        value={value || []}
                                        options={coursedata}
                                        onChange={(event, newValue) => {
                                            onChange(newValue);
                                        }}
                                        filterSelectedOptions
                                        id='autocomplete-multiple-outlined'
                                        getOptionLabel={(option: any) => option.name}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={params =>
                                            <CustomTextField {...params}
                                                label='Select Courses'
                                                variant="outlined"
                                                error={Boolean(errors.courses)}
                                                {...(errors.courses && { helperText: 'This field is required' })}
                                                placeholder='courses' />}
                                    />
                                );
                            }}
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
