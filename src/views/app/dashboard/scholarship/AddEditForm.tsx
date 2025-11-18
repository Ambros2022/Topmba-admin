
import {  useState, useEffect, useCallback } from 'react'

import CustomInput from 'src/@core/components/pickersCoustomInput/index'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router';
// ** Third Party Imports
import toast from 'react-hot-toast'
import * as yup from 'yup'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import axios1 from 'src/configs/adminaxios'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import type { FC } from 'react';
import { Alert, FormControlLabel, FormLabel, MenuItem, RadioGroup, Typography, useTheme } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import QuillEditor from 'src/@core/components/html-editor/index';




interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode,  }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');
    const [levels, setLevels] = useState([]);
    const [types, setTypes] = useState([]);
    const [countries, setCountries] = useState([]);
    const isMountedRef = useIsMountedRef();
    const [gendersdata, setgendersdata] = useState([])
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


    const options = [
        { label: 'Yes', value: '1' },
        { label: 'No', value: '0' },
    ];


    const schema: any = yup.object().shape({
        name: yup
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
        // gender: yup
        //     .string()
        //     .trim()
        //     .required(),
        level_id: yup.object().required("This field is required"),
        type_id: yup.object().required("This field is required"),
        country_id: yup.object().required("This field is required"),
    })

    const defaultValues = {
        name: isAddMode ? '' : olddata.name,
        slug: isAddMode ? '' : olddata.slug,
        gender: isAddMode ? '' : olddata.gender,
        amount: isAddMode ? '' : olddata.amount,
        // last_date: isAddMode ? '' : olddata.last_date,
        total_scholarships: isAddMode ? '' : olddata.total_scholarships,
        is_eligible: isAddMode ? '' : olddata.is_eligible,
        meta_title: isAddMode ? '' : olddata.meta_title,
        meta_description: isAddMode ? '' : olddata.meta_description,
        meta_keywords: isAddMode ? '' : olddata.meta_keywords,
        overview: isAddMode ? '' : olddata.overview,
        status: isAddMode ? 'Published' : olddata.status,
        last_date: isAddMode ? null : new Date(olddata.last_date),
        level_id: isAddMode ? '' : olddata.scholarlevels ? olddata.scholarlevels : '',
        type_id: isAddMode ? '' : olddata.scholartypes ? olddata.scholartypes : '',
        country_id: isAddMode ? '' : olddata.country ? olddata.country : '',
        genders: [],

    }

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        resetField: admfiledReset,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    //get all levels
    const getlevels = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/scholarlevel/get', { params: roleparams });

            setLevels(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    //get all types
    const gettypes = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/scholartype/get', { params: roleparams });

            setTypes(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);


    //get all countries
    const getcountry = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/countries/get', { params: roleparams });

            setCountries(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    const getgenders = useCallback(async () => {

        try {

            const response = await axios1.get('api/website/genders/get');
            setgendersdata(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {

        getlevels();
        gettypes();
        getcountry();
        getgenders();

    }, [getlevels]);

    useEffect(() => {

        if (!isAddMode && olddata.schgenders) {
            const STREAM = olddata.schgenders.map((item) => ({
                id: item.genders.id,
                name: item.genders.name,
            }));
            admfiledReset("genders", { defaultValue: STREAM })
        }


    }, []);


    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let link = 'api/admin/scholarship/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('level_id', data.level_id.id);
            formData.append('type_id', data.type_id.id);
            formData.append('country_id', data.country_id.id);
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('gender', data.gender);
            formData.append('amount', data.amount);
            formData.append('last_date', data.last_date);
            formData.append('total_scholarships', data.total_scholarships);
            formData.append('is_eligible', data.is_eligible);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keywords', data.meta_keywords);
            formData.append('overview', data.overview);
            formData.append('status', data.status);
            formData.append('logo', selectedphoto);
            formData.append('genders', JSON.stringify(data.genders));

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
            let link = 'api/admin/scholarship/add';

            const formData = new FormData();
            formData.append('level_id', data.level_id.id);
            formData.append('type_id', data.type_id.id);
            formData.append('country_id', data.country_id.id);
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('gender', data.gender);
            formData.append('amount', data.amount);
            formData.append('last_date', data.last_date);
            formData.append('total_scholarships', data.total_scholarships);
            formData.append('is_eligible', data.is_eligible);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keywords', data.meta_keywords);
            formData.append('overview', data.overview);
            formData.append('status', data.status);
            formData.append('genders', JSON.stringify(data.genders));
            if (selectedphoto == '') {

                toast.error('Please Upload Image', {
                    duration: 2000
                })
                setLoading(false);
                return false;

            }

            formData.append('logo', selectedphoto);

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

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='level_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={levels}
                                    loading={!levels.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => (
                                        <CustomTextField
                                            {...params}
                                            required
                                            error={Boolean(errors.level_id)}
                                            {...(errors.level_id && { helperText: 'This field is required' })}
                                            label='Select Level'
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='type_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={types}
                                    loading={!types.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => (
                                        <CustomTextField
                                            {...params}
                                            required
                                            error={Boolean(errors.type_id)}
                                            {...(errors.type_id && { helperText: 'This field is required' })}
                                            label='Select Type'
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='country_id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomAutocomplete
                                    fullWidth

                                    options={countries}
                                    loading={!countries.length}
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    renderInput={(params: any) => <CustomTextField {...params}
                                        required error={Boolean(errors.country_id)}
                                        {...(errors.country_id && { helperText: 'This field is required' })} label='Select Country' />}
                                />
                            )}
                        />
                    </Grid>

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

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name="genders"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => {
                                // console.log(value); // Log value here

                                return (
                                    <CustomAutocomplete
                                        multiple
                                        fullWidth
                                        value={value || []}
                                        options={gendersdata}
                                        onChange={(event, newValue) => {
                                            onChange(newValue);
                                        }}
                                        filterSelectedOptions
                                        id='autocomplete-multiple-outlined'
                                        getOptionLabel={(option: any) => option.name}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={params =>
                                            <CustomTextField {...params}
                                                label='Select genders'
                                                variant="outlined"
                                                error={Boolean(errors.genders)}
                                                {...(errors.genders && { helperText: 'This field is required' })}
                                                placeholder='genders' />}
                                    />
                                );
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='amount'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    value={value}
                                    label='Amount'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.amount)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.amount && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='total_scholarships'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    type='number'
                                    value={value}
                                    label='Total Scholarships'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.total_scholarships)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.total_scholarships && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='is_eligible'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    select
                                    value={value}
                                    label='Is_eligible'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.is_eligible)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.is_eligible && { helperText: 'This field is required' })}
                                >
                                    {options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CustomTextField>

                            )}
                        />
                    </Grid>



                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='meta_description'
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
                                    error={Boolean(errors.meta_description)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.meta_description && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='meta_title'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={value}
                                    label='Meta_title'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.meta_title)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.meta_title && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='meta_keywords'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={value}
                                    label='Meta_keywords'
                                    onChange={onChange}
                                    placeholder=''
                                    error={Boolean(errors.meta_keywords)}
                                    aria-describedby='validation-basic-first-name'
                                    {...(errors.meta_keywords && { helperText: 'This field is required' })}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='last_date'
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
                                        customInput={<CustomInput label='Last date'

                                        />}
                                    />
                                </DatePickerWrapper>
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sm={12}>
                        <Typography style={{ marginBottom: '10px' }}>overview</Typography>

                        <Controller
                            name='overview'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value,  } }) => (
                                <>
                                    <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                        onChange={(value) => setValue("overview", value)} />
                                </>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
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
                            olddata={!isAddMode && olddata.logo ? olddata.logo : ""}
                            onFileChange={handleFileChangephoto}
                            maxFiles={1}
                            maxSize={2000000}
                            fileNames={fileNamesphoto}
                            label=" Upload Logo"
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
