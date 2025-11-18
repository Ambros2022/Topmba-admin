
import {  useState, useEffect, useCallback } from 'react'
import CustomInput from 'src/@core/components/pickersCoustomInput/index'
import DialogActions from '@mui/material/DialogActions'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router';
// ** Third Party Imports
import toast from 'react-hot-toast'
import * as yup from 'yup'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import axios1 from 'src/configs/adminaxios'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import type { FC, SyntheticEvent } from 'react';
import { CardContent, FormLabel, FormControlLabel, MenuItem, RadioGroup, Tab, Typography, useTheme } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import CustomAutocomplete from 'src/@core/components/mui/autocomplete';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import QuillEditor from 'src/@core/components/html-editor/index';
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon






interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, }) => {
    const router = useRouter();
    const [formvalue, setFormvalue] = useState<string>('basic-info')
    const [recoginationsdata, setRecoginationsdata] = useState([])

    const [loading, setLoading] = useState<boolean>(false)
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [countryId, setCountryId] = useState<any>(isAddMode ? "" : olddata?.country?.id || '');
    const [stateId, setStateId] = useState<any>(isAddMode ? "" : olddata?.state?.id || '');

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
        established: yup
            .string()
            .trim()
            .required(),
        slug: yup
            .string()
            .trim()
            .required(),
        board_type: yup
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
        meta_keyword: yup
            .string()
            .trim()
            .required(),


    })
    const defaultValues = {
        name: isAddMode ? '' : olddata.name,
        slug: isAddMode ? '' : olddata.slug,
        short_name: isAddMode ? '' : olddata.short_name,
        gender: isAddMode ? '' : olddata.gender,
        address: isAddMode ? '' : olddata.address,
        map: isAddMode ? '' : olddata.map,
        board_type: isAddMode ? '' : olddata.board_type,
        avg_rating: isAddMode ? '' : olddata.avg_rating,
        listing_order: isAddMode ? '' : olddata.listing_order,
        established: isAddMode ? '' : olddata.established,
        info: isAddMode ? '' : olddata.info,
        time_table: isAddMode ? '' : olddata.time_table,
        reg_form: isAddMode ? '' : olddata.reg_form,
        syllabus: isAddMode ? '' : olddata.syllabus,
        results: isAddMode ? '' : olddata.results,
        sample_paper: isAddMode ? '' : olddata.sample_paper,
        country_id: isAddMode ? '' : olddata.country ? olddata.country : '',
        state_id: isAddMode ? '' : olddata.state ? olddata.state : '',
        city_id: isAddMode ? '' : olddata.citys ? olddata.citys : '',
        result_date: isAddMode ? null : new Date(olddata.result_date),
        recoginations: [],
        status: isAddMode ? 'Published' : olddata.status,
        meta_title: isAddMode ? '' : olddata.meta_title,
        meta_description: isAddMode ? '' : olddata.meta_description,
        meta_keyword: isAddMode ? '' : olddata.meta_keyword,
    }

    const {
        control,
        handleSubmit,
        resetField: admfiledReset,
        setValue,
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
            let url = 'api/admin/schoolboard/update';
            const formData = new FormData();
            formData.append('id', updateid);
            if (data.country_id !== null && data.country_id !== undefined && data.country_id !== '') {
                formData.append('country_id', data.country_id.id);
            }
            if (data.state_id !== null && data.state_id !== undefined && data.state_id !== '') {
                formData.append('state_id', data.state_id.id);
            }
            if (data.city_id !== null && data.city_id !== undefined && data.city_id !== '') {
                formData.append('city_id', data.city_id.id);
            }
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('short_name', data.short_name);
            formData.append('gender', data.gender);
            formData.append('board_type', data.board_type);
            if (data.avg_rating) {
                formData.append('avg_rating', data.avg_rating);
            }
            formData.append('listing_order', data.listing_order);
            formData.append('established', data.established);
            formData.append('result_date', data.result_date);
            formData.append('info', data.info);
            formData.append('time_table', data.time_table);
            formData.append('reg_form', data.reg_form);
            formData.append('syllabus', data.syllabus);
            formData.append('results', data.results);
            formData.append('address', data.address);
            formData.append('map', data.map);
            formData.append('recoginations', JSON.stringify(data.recoginations));
            formData.append('status', data.status);
            formData.append('sample_paper', data.sample_paper);
            formData.append('logo', selectedphoto);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keyword', data.meta_keyword);


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
            let url = 'api/admin/schoolboard/add';

            const formData = new FormData();
            if (data.country_id !== null && data.country_id !== undefined && data.country_id !== '') {
                formData.append('country_id', data.country_id.id);
            }
            if (data.state_id !== null && data.state_id !== undefined && data.state_id !== '') {
                formData.append('state_id', data.state_id.id);
            }
            if (data.city_id !== null && data.city_id !== undefined && data.city_id !== '') {
                formData.append('city_id', data.city_id.id);
            }
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('short_name', data.short_name);
            formData.append('gender', data.gender);
            formData.append('board_type', data.board_type);
            if (data.avg_rating) {
                formData.append('avg_rating', data.avg_rating);
            }

            formData.append('listing_order', data.listing_order);
            formData.append('established', data.established);
            formData.append('result_date', data.result_date);
            formData.append('info', data.info);
            formData.append('time_table', data.time_table);
            formData.append('reg_form', data.reg_form);
            formData.append('syllabus', data.syllabus);
            formData.append('results', data.results);
            formData.append('address', data.address);
            formData.append('map', data.map);
            formData.append('sample_paper', data.sample_paper);
            formData.append('recoginations', JSON.stringify(data.recoginations));
            formData.append('status', data.status);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keyword', data.meta_keyword);


            if (selectedphoto == '') {

                toast.error('Please Upload logo', {
                    duration: 2000
                })
                setLoading(false);
                return false;

            }

            formData.append('logo', selectedphoto);
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

    const getcountries = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('/api/admin/countries/get', { params: roleparams });
            setCountries(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);
    const getstates = useCallback(async () => {
        setStates([]);
        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            roleparams['country_id'] = countryId;
            const response = await axios1.get('/api/admin/state/get', { params: roleparams });
            setStates(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [countryId]);

    const getcities = useCallback(async () => {
        setCities([]);
        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            roleparams['state_id'] = stateId;
            const response = await axios1.get('/api/admin/city/get', { params: roleparams });
            setCities(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [stateId]);

    const getrecognition = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/recognition/get', { params: roleparams });
            setRecoginationsdata(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {

        getcountries();
        getrecognition();

    }, []);


    useEffect(() => {


        if (!isAddMode && olddata.boardrecognitions) {
            const RECOGINATION = olddata.boardrecognitions.map((item) => ({
                id: item.brdrecognitions.id,
                recognition_approval_name: item.brdrecognitions.recognition_approval_name,
            }));
            admfiledReset("recoginations", { defaultValue: RECOGINATION })
        }



    }, []);

    useEffect(() => {
        if (countryId) {
            getstates();
        }
    }, [countryId]);
    useEffect(() => {
        if (stateId) {
            getcities();
        }
    }, [stateId]);

    const faqdefaultValues = {
        faqs: isAddMode ? [{
            questions: '',
            answers: '',

        }] :
            olddata.schoolboardfaqs && olddata.schoolboardfaqs.length > 0 ? olddata.schoolboardfaqs : [{
                questions: '',
                answers: '',
            }] || [{
                questions: '',
                answers: '',
            }],




    }



    const {
        control: faqcontrol,
        handleSubmit: faqhandleSubmit,
    } = useForm<any>({
        defaultValues: faqdefaultValues,
        mode: 'onChange',
        // resolver: yupResolver(schema)
    })
    const { fields, append, remove } = useFieldArray({
        control: faqcontrol,
        name: 'faqs',
    });

    const handleAddFaq = () => {

        append({
            questions: '',
            answers: '',


        });

    };

    const handleRemoveFaq = (index: number | number[] | undefined) => {
        remove(index);
    };

    const faqonSubmit = async (data: any) => {
        console.log(data.faqs);
        // return

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/schoolboard/updatefaqs';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('faqs', JSON.stringify(data.faqs));

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
                // history.push('/app/products');
            } catch (err: any) {
                console.error(err);
                setLoading(false)
                toast.error(err.message || "please try again")

            }

        }
    }


    const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
        setFormvalue(newValue)
    }

 







    return (
        <Card>
            <TabContext value={formvalue}>
                <TabList
                    variant='scrollable'
                    scrollButtons={false}
                    onChange={handleTabsChange}
                    sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
                >
                    <Tab value='basic-info' label='Basic Info' />
                    <Tab value='account-details' label='FAQS' />
                    <Tab value='social-links' label='Gallery Images' />
                </TabList>

                <CardContent>
                    <TabPanel sx={{ p: 0 }} value='basic-info'>
                        <form onSubmit={handleSubmit(onSubmit)} encType="application/x-www-form-urlencoded">
                            <Grid container spacing={5}>


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
                                                    if (newValue) {

                                                        setCountryId(newValue ? newValue.id : null);
                                                        admfiledReset("state_id", { defaultValue: "New" })
                                                        admfiledReset("city_id", { defaultValue: "New" })
                                                        field.onChange(newValue);



                                                    }
                                                    else {
                                                        console.log(newValue, "newValue2")

                                                        setCountryId(null);

                                                        admfiledReset("state_id", { defaultValue: "New" })
                                                        admfiledReset("city_id", { defaultValue: "New" })



                                                    }

                                                }}
                                                getOptionLabel={(option: any) => option.name || ''}
                                                renderInput={(params: any) => <CustomTextField {...params} error={Boolean(errors.country_id)}
                                                    {...(errors.country_id && { helperText: 'This field is required' })} label='Select Country' />}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='state_id'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <CustomAutocomplete
                                                fullWidth
                                                options={states}
                                                loading={!states.length}
                                                value={field.value}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setStateId(newValue ? newValue.id : null);
                                                        admfiledReset("city_id", { defaultValue: "New" })
                                                        field.onChange(newValue);



                                                    }
                                                    else {


                                                        setStateId(null);
                                                        admfiledReset("setStateId", { defaultValue: "New" })



                                                    }

                                                }}
                                                getOptionLabel={(option: any) => option.name || ''}
                                                renderInput={(params: any) => <CustomTextField {...params} error={Boolean(errors.state_id)}
                                                    {...(errors.state_id && { helperText: 'This field is required' })} label='Select State' />}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>

                                    <Controller
                                        name='city_id'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <CustomAutocomplete
                                                fullWidth
                                                options={cities}
                                                loading={!cities.length}
                                                value={field.value}
                                                onChange={(event, newValue) => {
                                                    field.onChange(newValue)
                                                }}
                                                getOptionLabel={(option: any) => option.name || ''}
                                                renderInput={(params: any) => <CustomTextField {...params} error={Boolean(errors.city_id)}
                                                    {...(errors.city_id && { helperText: 'This field is required' })} label='Select Cities' />}
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
                                                label=' Name'
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
                                                label=' Slug'
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
                                        name='short_name'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='Short Name'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.short_name)}
                                                aria-describedby='validation-basic-short-name'
                                                {...(errors.short_name && { helperText: 'This field is required' })}
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
                                                value={value}
                                                label='Meta Title'
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
                                        name='meta_description'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='Meta Description'
                                                onChange={onChange}
                                                placeholder=''
                                                multiline
                                                rows={3}
                                                error={Boolean(errors.meta_description)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.meta_description && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='meta_keyword'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='Meta keywords'
                                                multiline
                                                rows={3}
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.meta_keyword)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.meta_keyword && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item sm={4}>
                                    <Controller
                                        name='gender'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                select
                                                fullWidth

                                                value={value}
                                                label='Select Gender'
                                                onChange={onChange}
                                                error={Boolean(errors.gender)}
                                                placeholder=''
                                                aria-describedby='stepper-linear-account-email'
                                                {...(errors.gender && { helperText: 'This field is required' })}
                                            >
                                                <MenuItem value='male'>male</MenuItem>
                                                <MenuItem value='female'>female</MenuItem>
                                                <MenuItem value='Co-Ed'>Co-Ed</MenuItem>

                                            </CustomTextField>

                                        )} />
                                </Grid>

                                <Grid item sm={4}>
                                    <Controller
                                        name='board_type'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                select
                                                fullWidth

                                                value={value}
                                                label='School board_type'
                                                onChange={onChange}
                                                error={Boolean(errors.board_type)}
                                                placeholder=''
                                                aria-describedby='stepper-linear-account-email'
                                                {...(errors.board_type && { helperText: 'This field is required' })}
                                            >
                                                <MenuItem value='state'>state</MenuItem>
                                                <MenuItem value='national'>national</MenuItem>
                                                <MenuItem value='international'>international</MenuItem>
                                                <MenuItem value='default'>default</MenuItem>

                                            </CustomTextField>

                                        )} />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='avg_rating'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                type='number'
                                                value={value}
                                                label='avg_rating'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.avg_rating)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.avg_rating && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='established'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='established'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.established)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.established && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='result_date'
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
                                                    customInput={<CustomInput label='Result Date'
                                                    // error={Boolean(errors.upcoming_date)} {...(errors.upcoming_date && { helperText: 'This field is required' })} 
                                                    />}


                                                />
                                            </DatePickerWrapper>
                                        )}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name="recoginations"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => {
                                            // console.log(value); // Log value here

                                            return (
                                                <CustomAutocomplete
                                                    multiple
                                                    fullWidth
                                                    value={value || []}
                                                    options={recoginationsdata}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue);
                                                    }}
                                                    filterSelectedOptions
                                                    id='autocomplete-multiple-outlined'
                                                    getOptionLabel={(option: any) => option.recognition_approval_name}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    renderInput={params =>
                                                        <CustomTextField {...params}
                                                            label='Select recoginations'
                                                            variant="outlined"
                                                            error={Boolean(errors.recoginations)}
                                                            {...(errors.recoginations && { helperText: 'This field is required' })}
                                                            placeholder='recoginations' />}
                                                />
                                            );
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='address'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='Address'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.address)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.address && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='map'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='Map'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.map)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.map && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>info</Typography>
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

                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Time_table</Typography>
                                    <Controller
                                        name='time_table'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value,  } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("time_table", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Registration Form</Typography>
                                    <Controller
                                        name='reg_form'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value,  } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("reg_form", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Syllabus</Typography>
                                    <Controller
                                        name='syllabus'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value,  } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("syllabus", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Results</Typography>
                                    <Controller
                                        name='results'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value,  } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("results", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Sample paper</Typography>
                                    <Controller
                                        name='sample_paper'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value,  } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("sample_paper", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>



                                <Grid item xs={12} sm={4}>
                                    <FileUpload
                                        isAddMode={isAddMode}
                                        olddata={!isAddMode && olddata.logo ? olddata.logo : ""}
                                        onFileChange={handleFileChangephoto}
                                        maxFiles={1}
                                        maxSize={2000000}
                                        fileNames={fileNamesphoto}
                                        label="Upload logo"
                                        helpertext="Recommended size: 600 × 450 px (minimum 300 × 225 px)"
                                        acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                                        rejectionMessage='Try another file for upload.'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='listing_order'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                type='number'
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
                    </TabPanel>

                    <TabPanel sx={{ p: 0 }} value='account-details'>
                        {isAddMode ? <> <h6>Please add School Board First.</h6> </> : <>
                            <form onSubmit={faqhandleSubmit(faqonSubmit)} encType="application/x-www-form-urlencoded">
                                <Grid container spacing={5}>
                                    {fields.map((val, index) => (
                                        <Grid item xs={12} key={val.id}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12} sm={11}>
                                                    <Controller
                                                        //@ts-ignore
                                                        name={`faqs[${index}].questions`}
                                                        control={faqcontrol}
                                                        rules={{ required: true }}
                                                        //@ts-ignore
                                                        defaultValue={val.questions}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label='Questions'
                                                                onChange={(e) => {
                                                                    onChange(e);
                                                                    setValue(`faqs[${index}].questions`, e.target.value);
                                                                }}
                                                                placeholder=''
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                {/* <Grid item xs={12} sm={5}>
                                                    <Controller
                                                        //@ts-ignore
                                                        name={`faqs[${index}].answers`}
                                                        control={faqcontrol}
                                                        rules={{ required: true }}
                                                        //@ts-ignore
                                                        defaultValue={val.answers}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label='Answers'
                                                                onChange={(e) => {
                                                                    onChange(e);
                                                                    setValue(`faqs[${index}].answers`, e.target.value);
                                                                }}
                                                                placeholder=''
                                                            />
                                                        )}
                                                    />
                                                </Grid> */}


                                                <Grid item xs={12} sm={11}>
                                                    <Typography>Answers</Typography>
                                                    <Controller
                                                        name={`faqs[${index}].answers`}
                                                        control={faqcontrol}
                                                        rules={{ required: true }}
                                                        // defaultValue={val.answers}
                                                        render={({ field: { value, onChange } }) => (
                                                            <>
                                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                                    onChange={(e) => {
                                                                        onChange(e);
                                                                        setValue(`faqs[${index}].answers`, e);  // Provide the new value 'e'
                                                                    }} />

                                                            </>
                                                        )}
                                                    />
                                                </Grid>



                                                <Grid item xs={1}>
                                                    {index !== 0 && (
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleRemoveFaq(index)}
                                                            style={{ margin: '17px 0 0 0px', padding: '8px' }}

                                                        >
                                                            <CloseIcon />
                                                        </Button>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))}
                                    {fields.length === 0 && (
                                        <Grid item xs={12}>

                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12} sm={5}>
                                                    <CustomTextField
                                                        fullWidth
                                                        label='Questions'
                                                        placeholder=''
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={5}>
                                                    <CustomTextField
                                                        fullWidth
                                                        label='Answers'
                                                        placeholder=''
                                                    />
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    )}
                                    <Grid item xs={3}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleAddFaq}
                                            style={{ margin: '18px 0', fontSize: '12px' }}
                                        >
                                            Add More
                                        </Button>
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
                                                {/* <Button variant='contained' type='submit' sx={{ mr: 1 }} onClick={() => setShow(false)}> */}
                                                Update
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
                                            {/* <Button variant='tonal' color='secondary' onClick={() => setShow(false)}>
                                Discard
                            </Button> */}
                                        </DialogActions>
                                    </Grid>

                                </Grid>
                            </form >



                        </>}

                    </TabPanel>

                   
                </CardContent>
                
            </TabContext>
        </Card>
    )
}

export default AddEditForm
