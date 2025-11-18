
import {  useState,  useEffect, useCallback } from 'react'
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
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import axios1 from 'src/configs/adminaxios'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import ImageUploading, { ImageListType } from "react-images-uploading";
import { FaTrash } from 'react-icons/fa';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import type { FC, SyntheticEvent } from 'react';
import {  CardContent, FormControlLabel, FormHelperText, FormLabel, MenuItem, RadioGroup, Tab, Typography, useTheme } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList'
import { Config } from 'src/configs/mainconfig'
import QuillEditor from 'src/@core/components/html-editor/index';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import CustomSelectField from 'src/@core/components/mui/select-feild'





interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, }) => {
    const router = useRouter();
    // const { setValue } = useForm();
    const [formvalue, setFormvalue] = useState<string>('basic-info')
    const [loading, setLoading] = useState<boolean>(false)
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');
    const [fileNamesbanner, setFileNamesbanner] = useState<any>([]);
    const [selectedbannner, setSelectedbanner] = useState('');
    const [fileNameslogo, setFileNameslogo] = useState<any>([]);
    const [selectedlogo, setSelectedlogo] = useState('');
    const [streamsdata, setStreamsdata] = useState([])
    const [countryData, setCountryData] = useState([])
    const isMountedRef = useIsMountedRef();
    const theme = useTheme()
    const { direction } = theme

    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'




    const handleFileChangelogo = (files: any[]) => {
        setSelectedlogo(files[0]);
        setFileNameslogo(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };

    const handleFileChangephoto = (files: any[]) => {
        setSelectedphoto(files[0]);
        setFileNamesphoto(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };
    const handleFileChangebanner = (files: any[]) => {
        setSelectedbanner(files[0]);
        setFileNamesbanner(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };

    const schema: any = yup.object().shape({
        exam_title: yup
            .string()
            .trim()
            .required(),
        slug: yup
            .string()
            .trim()
            .required(),
        exam_short_name: yup
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
        // stream_id: yup.object().required("This field is required"),
        country_id: yup.object().required("This field is required"),



    })
    console.log(olddata)

    const defaultValues = {
        exam_title: isAddMode ? '' : olddata.exam_title,
        slug: isAddMode ? '' : olddata.slug,
        upcoming_date: isAddMode ? null : new Date(olddata.upcoming_date),
        // exam_dates: isAddMode ? null : new Date(olddata.exam_dates),
        exam_short_name: isAddMode ? '' : olddata.exam_short_name,
        college_type: isAddMode ? '' : olddata.college_type,
        overview: isAddMode ? '' : olddata.overview,
        level_of_study: isAddMode ? '' : olddata.level_of_study,
        types_of_exams: isAddMode ? '' : olddata.types_of_exams,
        country_id: (isAddMode || !olddata) ? '' : olddata.country,
        // exam_dates: isAddMode ? '' : olddata.exam_dates,
        meta_title: isAddMode ? '' : olddata.meta_title,
        meta_description: isAddMode ? '' : olddata.meta_description,
        meta_keywords: isAddMode ? '' : olddata.meta_keywords,
        eligibility_criteria: isAddMode ? '' : olddata.eligibility_criteria,
        syllabus: isAddMode ? '' : olddata.syllabus,
        cutoff: isAddMode ? '' : olddata.cutoff,
        admit_card: isAddMode ? '' : olddata.admit_card,
        exam_centers: isAddMode ? '' : olddata.exam_centers,
        results: isAddMode ? '' : olddata.results,
        prepretion_tips: isAddMode ? '' : olddata.prepretion_tips,
        exam_dates: isAddMode ? '' : olddata.exam_dates,
        counseling: isAddMode ? '' : olddata.counseling,
        accept_colleges: isAddMode ? '' : olddata.accept_colleges,
        status: isAddMode ? 'Published' : olddata.status,
        promo_banner_status: isAddMode ? 'Draft' : olddata.promo_banner_status ? olddata.promo_banner_status : 'Draft',
        stream_id: isAddMode ? '' : olddata.stream ? olddata.stream : '',
        streams: [],
    }

    const {
        control,
        handleSubmit,
        resetField: admfiledReset,
        reset,
        setValue,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    useEffect(() => {


        if (!isAddMode && olddata.examstreams) {
            const data = olddata.examstreams.map((item) => ({
                id: item.examstrDetails.id,
                name: item.examstrDetails.name,
            }));
            admfiledReset("streams", { defaultValue: data })
        }



    }, []);

    const getstreams = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/stream/get', { params: roleparams });
            const strdata = response.data.data.map((news: { id: any; name: any; slug: any; }) => ({
                id: news.id,
                name: news.name,
                slug: news.slug,
            }))
            setStreamsdata(strdata);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    const getCountry = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/countries/get', { params: roleparams });
            setCountryData(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);


    useEffect(() => {


        getstreams();
        getCountry();

    }, [getstreams, getCountry]);

    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/exam/update';
            const formData = new FormData();
            formData.append('id', updateid);
            // formData.append('stream_id', data.stream_id.id);
            formData.append('streams', JSON.stringify(data.streams));
            formData.append('country_id', data.country_id.id);
            formData.append('exam_title', data.exam_title);
            formData.append('slug', data.slug);
            formData.append('upcoming_date', data.upcoming_date);
            formData.append('exam_short_name', data.exam_short_name);
            formData.append('meta_title', data.meta_title);
            formData.append('level_of_study', data.level_of_study);
            formData.append('types_of_exams', data.types_of_exams);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keywords', data.meta_keywords);
            formData.append('overview', data.overview);
            formData.append('exam_dates', data.exam_dates);
            formData.append('eligibility_criteria', data.eligibility_criteria);
            formData.append('syllabus', data.syllabus);
            formData.append('cutoff', data.cutoff);
            formData.append('admit_card', data.admit_card);
            formData.append('exam_centers', data.exam_centers);
            formData.append('results', data.results);
            formData.append('prepretion_tips', data.prepretion_tips);
            formData.append('counseling', data.counseling);
            formData.append('accept_colleges', data.accept_colleges);
            formData.append('promo_banner_status', data.promo_banner_status);
            formData.append('cover_image', selectedphoto);
            formData.append('logo', selectedlogo);
            formData.append('promo_banner', selectedbannner);
            formData.append('status', data.status);



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
            let url = 'api/admin/exam/add';

            const formData = new FormData();
            // formData.append('stream_id', data?.stream_id.id);
            formData.append('streams', JSON.stringify(data.streams));
            formData.append('country_id', data.country_id.id);
            formData.append('exam_title', data.exam_title);
            formData.append('slug', data.slug);
            formData.append('upcoming_date', data.upcoming_date);
            formData.append('exam_short_name', data.exam_short_name);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keywords', data.meta_keywords);
            formData.append('level_of_study', data.level_of_study);
            formData.append('types_of_exams', data.types_of_exams);
            formData.append('overview', data.overview);
            formData.append('exam_dates', data.exam_dates);
            formData.append('eligibility_criteria', data.eligibility_criteria);
            formData.append('syllabus', data.syllabus);
            formData.append('cutoff', data.cutoff);
            formData.append('admit_card', data.admit_card);
            formData.append('exam_centers', data.exam_centers);
            formData.append('results', data.results);
            formData.append('prepretion_tips', data.prepretion_tips);
            formData.append('counseling', data.counseling);
            formData.append('accept_colleges', data.accept_colleges);
            formData.append('promo_banner_status', data.promo_banner_status);
            formData.append('status', data.status);
            if (selectedphoto == '') {

                toast.error('Please Upload Photo', {
                    duration: 2000
                })
                setLoading(false);
                return false;

            }

            formData.append('cover_image', selectedphoto);

            formData.append('logo', selectedlogo);
            formData.append('promo_banner', selectedbannner);


            setLoading(false)
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

    const faqdefaultValues = {
        faqs: isAddMode ? [{
            questions: '',
            answers: '',

        }] :
            olddata.examfaqs && olddata.examfaqs.length > 0 ? olddata.examfaqs : [{
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



        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/exam/updatefaq';
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

    const [images, setImages] = useState<ImageListType>(() => {
        if (olddata && olddata.clggallery && Array.isArray(olddata.clggallery)) {
            return olddata.clggallery.map(item => ({ dataURL: Config.API_URL + '/' + item.image }));
        } else {
            return [];
        }
    });
    const maxNumber = 69;

    const onChangeimages = (
        imageList: ImageListType,
    ) => {

        setImages(imageList);
    };


    const GalleryImage = async () => {
        // console.log(images, "imageLists");
        try {
            const formData = new FormData();
            formData.append('id', olddata.id);

            let oldimages: any = [];
            images.forEach((image, index) => {
                console.log(image);
                if (image.file) {
                    formData.append(`image${index}`, image.file);
                } else {
                    oldimages.push(image);
                }
            });
            // formData.append("oldimages", oldimages);
            formData.append("oldimages", JSON.stringify(oldimages));

            const url = '/api/admin/school/updategallery';
            const response = await axios1.post(url, formData);
            if (response.data.status === 1) {
                toast.success(response.data.message);
                setLoading(false);
                reset();
                router.back();
            } else {
                setLoading(false);
                toast.error(response.data.message);
            }
        } catch (err) {
            console.error(err);
            setLoading(false);

        }
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
                                                    options={streamsdata}
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

                                {/* <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='stream_id'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <CustomAutocomplete
                                                fullWidth
                                                options={streamsdata}
                                                loading={!streamsdata.length}
                                                value={field.value}
                                                onChange={(event, newValue) => {
                                                    field.onChange(newValue);
                                                }}
                                                getOptionLabel={(option: any) => option.name || ''}
                                                renderInput={(params: any) => (
                                                    <CustomTextField
                                                        {...params}

                                                        error={Boolean(errors.stream_id)}
                                                        {...(errors.stream_id && { helperText: 'This field is required' })}
                                                        label='Select Stream'
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </Grid> */}

                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='exam_title'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='Exam Name'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.exam_title)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.exam_title && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='exam_short_name'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='Exam Short Name'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.exam_short_name)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.exam_short_name && { helperText: 'This field is required' })}
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
                                                error={Boolean(errors.meta_description)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.meta_description && { helperText: 'This field is required' })}
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
                                                value={value}
                                                label='Meta keyword'
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
                                        name='country_id'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <CustomAutocomplete
                                                fullWidth
                                                loading={!countryData.length}
                                                options={countryData}
                                                value={field.value}
                                                onChange={(event, newValue) => {
                                                    field.onChange(newValue);
                                                }}
                                                getOptionLabel={(option: any) => option.name || ''}
                                                renderInput={(params: any) => (
                                                    <CustomTextField
                                                        {...params}

                                                        error={Boolean(errors.country_id)}
                                                        {...(errors.country_id && { helperText: 'This field is required' })}
                                                        label='Select Country'
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='level_of_study'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomSelectField
                                                label="Select Level of study"
                                                value={value}
                                                onChange={onChange}
                                                labelId="level-of-study-label"
                                                error={Boolean(errors.level_of_study)}
                                            >
                                                <MenuItem value="UG">UG</MenuItem>
                                                <MenuItem value="PG">PG</MenuItem>
                                                <MenuItem value="professional">Professional</MenuItem>
                                            </CustomSelectField>
                                        )}
                                    />
                                    {errors.level_of_study && (
                                        <FormHelperText>
                                            {errors.level_of_study.message as React.ReactNode}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='types_of_exams'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomSelectField
                                                label="Select Type of exam"
                                                value={value}
                                                onChange={onChange}
                                                labelId="type-of-exam-label"
                                                error={Boolean(errors.types_of_exams)}
                                            >
                                                <MenuItem value="Language_Proficiency">Language Proficiency</MenuItem>
                                                <MenuItem value="Aptitiude_Test">Aptitude Test</MenuItem>
                                                <MenuItem value="Streams">Streams</MenuItem>
                                            </CustomSelectField>
                                        )}
                                    />
                                    {errors.types_of_exams && (
                                        <FormHelperText>
                                            {errors.types_of_exams.message as React.ReactNode}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='upcoming_date'
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
                                                    customInput={<CustomInput label='Date'
                                                    // error={Boolean(errors.upcoming_date)} {...(errors.upcoming_date && { helperText: 'This field is required' })} 
                                                    />}


                                                />
                                            </DatePickerWrapper>
                                        )}
                                    />
                                </Grid>

                                {/* <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='exam_dates'
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
                                                    customInput={<CustomInput label='Exam Date'
                                                   
                                                    />}


                                                />
                                            </DatePickerWrapper>
                                        )}
                                    />
                                </Grid> */}

                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Overview</Typography>

                                    <Controller
                                        name='overview'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("overview", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Exam Dates</Typography>

                                    <Controller
                                        name='exam_dates'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("exam_dates", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Eligibility_criteria</Typography>

                                    <Controller
                                        name='eligibility_criteria'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("eligibility_criteria", value)} />

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
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("syllabus", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Cutoff</Typography>

                                    <Controller
                                        name='cutoff'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("cutoff", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Admit_card</Typography>

                                    <Controller
                                        name='admit_card'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("admit_card", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Exam_center</Typography>

                                    <Controller
                                        name='exam_centers'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("exam_centers", value)} />

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
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("results", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Prepretion_tips</Typography>

                                    <Controller
                                        name='prepretion_tips'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("prepretion_tips", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Counseling</Typography>

                                    <Controller
                                        name='counseling'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("counseling", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Accept_colleges</Typography>

                                    <Controller
                                        name='accept_colleges'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("accept_colleges", value)} />

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
                                <Grid item xs={12} sm={4}>
                                    <FormLabel component='legend' style={{ marginBottom: 0 }}>Select Promo Banner status</FormLabel>
                                    <Controller
                                        name='promo_banner_status'
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
                                        olddata={!isAddMode && olddata.cover_image ? olddata.cover_image : ""}
                                        onFileChange={handleFileChangephoto}
                                        maxFiles={1}
                                        maxSize={2000000}
                                        fileNames={fileNamesphoto}
                                        label=" Upload Cover_image"
                                        helpertext="Recommended upload size: 784 × 392 px "
                                        acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                                        rejectionMessage='Try another file for upload.'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <FileUpload
                                        isAddMode={isAddMode}
                                        olddata={!isAddMode && olddata.promo_banner ? olddata.promo_banner : ""}
                                        onFileChange={handleFileChangebanner}
                                        maxFiles={1}
                                        maxSize={2000000}
                                        fileNames={fileNamesbanner}
                                        label=" Upload promo_banner"
                                        acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                                        rejectionMessage='Try another file for upload.'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <FileUpload
                                        isAddMode={isAddMode}
                                        olddata={!isAddMode && olddata.logo ? olddata.logo : ""}
                                        onFileChange={handleFileChangelogo}
                                        maxFiles={1}
                                        maxSize={2000000}
                                        fileNames={fileNameslogo}
                                        label=" Upload Logo"
                                        helpertext="Recommended size: 600 × 450 px (minimum 300 × 225 px)"
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
                    </TabPanel>

                    <TabPanel sx={{ p: 0 }} value='account-details'>
                        {isAddMode ? <> <h6>Please add Exam First.</h6> </> : <>
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
                                                <Grid item xs={12} sm={11}>
                                                    <Controller
                                                        //@ts-ignore
                                                        name={`faqs[${index}].answers`}
                                                        control={faqcontrol}
                                                        rules={{ required: true }}
                                                        //@ts-ignore
                                                        defaultValue={val.answers}
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

                                        </DialogActions>
                                    </Grid>

                                </Grid>
                            </form >



                        </>}

                    </TabPanel>

                    <TabPanel sx={{ p: 0 }} value='social-links'>
                        {isAddMode ? <> <h6>Please add Exam First.</h6> </> : <>
                            <div className="App">
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChangeimages}
                                    maxNumber={maxNumber}
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemove,
                                        isDragging,
                                        dragProps
                                    }) => (
                                        // Building UI
                                        <div className="upload__image-wrapper">
                                            <button
                                                style={isDragging ? { color: "red" } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                Click or Drop here
                                            </button>
                                            &nbsp;
                                            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                            <div className="container pt-3 pb-3">
                                                <div className="row">
                                                    {imageList.map((image, index) => (


                                                        <div className="col-sm-6 col-md-4 col-lg-3">
                                                            <div className="image-item ">
                                                                {/* <img src={image.dataURL} className="img-fluid rounded" alt="" /> */}
                                                                <img
                                                                    src={image.dataURL}
                                                                    style={{ width: '100%', height: '100px', maxWidth: '200px', maxHeight: '500px' }}
                                                                    className="rounded"
                                                                    alt=""
                                                                />

                                                                <div className="image-item__btn-wrapper d-flex justify-content-between align-items-center mt-2">
                                                                    {/* <button className="btn btn-primary btn-block" onClick={() => onImageUpdate(index)}>Update</button> */}
                                                                    <button className="btn btn-danger btn-block" onClick={() => onImageRemove(index)}><FaTrash /></button>
                                                                </div>
                                                            </div>
                                                        </div>




                                                    ))}

                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </ImageUploading>



                                {loading ? (
                                    <CircularProgress
                                        sx={{
                                            color: 'common.white',
                                            width: '20px !important',
                                            height: '20px !important',
                                            mr: theme => theme.spacing(2)
                                        }}
                                    />
                                ) : <Button variant='contained' type='submit' sx={{ mr: 1, mt: 2 }} onClick={() => GalleryImage()}>
                                    Update                                </Button>}
                            </div>



                        </>}
                    </TabPanel>
                </CardContent>

            </TabContext>
        </Card>
    )
}

export default AddEditForm
