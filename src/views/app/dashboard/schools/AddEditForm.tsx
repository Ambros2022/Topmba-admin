
'use client'
import {  FC,  SyntheticEvent, useCallback, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios1 from 'src/configs/adminaxios'
import { DialogActions, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import { Config } from 'src/configs/mainconfig';
import toast from 'react-hot-toast'
import router from 'next/router'
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import ImageUploading, { ImageListType } from "react-images-uploading";
import QuillEditor from 'src/@core/components/html-editor/index';


interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode,  }) => {
    // ** States
    // const { setValue } = useForm();
    const [formvalue, setFormvalue] = useState<string>('basic-info')
    const [loading, setLoading] = useState<boolean>(false)
    const [amenitiesdata, setAmenitiesdata] = useState([])
    const [leveslsdata, setLeveslsdata] = useState([])
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [boardsdata, setBoardsdata] = useState([])
    const [countryId, setCountryId] = useState<any>(isAddMode ? "" : olddata?.country?.id || '');
    const [stateId, setStateId] = useState<any>(isAddMode ? "" : olddata?.state?.id || '');
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');
    const [fileNamesbanner, setFileNamesbanner] = useState<any>([]);
    const [selectedbanner, setSelectedbanner] = useState('');

    const handleFileChangebanner = (files: any[]) => {
        setSelectedbanner(files[0]);
        setFileNamesbanner(
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
    const getboards = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('/api/admin/schoolboard/get', { params: roleparams });
            setBoardsdata(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);
    const getlevels = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('/api/admin/schoollevel/get', { params: roleparams });
            setLeveslsdata(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);
    const getamenities = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('/api/admin/amenities/get', { params: roleparams });
            setAmenitiesdata(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);
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

    useEffect(() => {

        getcountries();
        getboards();
        getamenities();
        getlevels();

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



    const schema: any = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required("This field is required"),
        slug: yup
            .string()
            .trim()
            .required("This field is required"),
        // school_board_id: yup.object().required("This field is required"),
        country_id: yup.object().required("This field is required"),
        state_id: yup.object().required("This field is required"),
        city_id: yup.object().required("This field is required"),
        school_type: yup
            .string()
            .trim()
            .required("This field is required"),
        established: yup
            .string()
            .trim()
            .required("This field is required"),
    })

    const defaultValues = {
        name: isAddMode ? '' : olddata.name,
        slug: isAddMode ? '' : olddata.slug,
        school_board_id: isAddMode ? '' : olddata?.schoolboard ? olddata?.schoolboard : '',
        country_id: isAddMode ? '' : olddata.country ? olddata.country : '',
        state_id: isAddMode ? '' : olddata.state ? olddata.state : '',
        city_id: isAddMode ? '' : olddata.citys ? olddata.citys : '',
        school_type: isAddMode ? '' : olddata.school_type,
        established: isAddMode ? '' : olddata.established,
        meta_title: isAddMode ? '' : olddata.meta_title,
        meta_description: isAddMode ? '' : olddata.meta_description,
        meta_keyword: isAddMode ? '' : olddata.meta_keyword,
        address: isAddMode ? '' : olddata.address,
        map: isAddMode ? '' : olddata.map,
        video_url: isAddMode ? '' : olddata.video_url,
        info: isAddMode ? '' : olddata.info,
        admissions_process: isAddMode ? '' : olddata.admissions_process,
        extracurriculars: isAddMode ? '' : olddata.extracurriculars,
        status: isAddMode ? 'Published' : olddata.status,
        home_view_status: isAddMode ? 'default' : olddata.home_view_status,
        listing_order: isAddMode ? '' : olddata.listing_order,
        // avg_rating: isAddMode ? '' : olddata.avg_rating,
        amenities: [],
        levels: [],
        boards: [],
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

    console.log(olddata)

    useEffect(() => {

        if (!isAddMode && olddata.schoolamenities) {
            const amenities = olddata.schoolamenities.map((item) => ({
                id: item.schamenities.id,
                amenities_name: item.schamenities.amenities_name,
            }));
            admfiledReset("amenities", { defaultValue: amenities })
        }
        if (!isAddMode && olddata.schoollevels) {
            const LEVELS = olddata.schoollevels.map((item) => ({
                id: item.schlevelname.id,
                name: item.schlevelname.name,
            }));
            admfiledReset("levels", { defaultValue: LEVELS })
        }
        if (!isAddMode && olddata.boardschools) {
            const LEVELS = olddata.boardschools.map((item) => ({
                id: item.schbordname.id,
                name: item.schbordname.name,
            }));
            admfiledReset("boards", { defaultValue: LEVELS })
        }

    }, []);

    const onSubmit = async (data: any) => {
        // console.log(data);
        // return
        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/school/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            // formData.append('school_board_id', data.school_board_id.id);
            formData.append('country_id', data.country_id.id);
            formData.append('state_id', data.state_id.id);
            formData.append('city_id', data.city_id.id);
            formData.append('school_type', data.school_type);
            formData.append('established', data.established);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keyword', data.meta_keyword);
            formData.append('address', data.address);
            formData.append('map', data.map);
            // formData.append('avg_rating', data.avg_rating);
            formData.append('video_url', data.video_url);
            formData.append('info', data.info);
            formData.append('admissions_process', data.admissions_process);
            formData.append('extracurriculars', data.extracurriculars);
            formData.append('status', data.status);
            formData.append('home_view_status', data.home_view_status);
            formData.append('listing_order', data.listing_order);
            formData.append('amenities', JSON.stringify(data.amenities));
            formData.append('levels', JSON.stringify(data.levels));
            formData.append('boards', JSON.stringify(data.boards));
            formData.append('icon', selectedphoto);
            formData.append('banner_image', selectedbanner);

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
            let url = 'api/admin/school/add';

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            // formData.append('school_board_id', data.school_board_id.id);
            formData.append('country_id', data.country_id.id);
            formData.append('state_id', data.state_id.id);
            formData.append('city_id', data.city_id.id);
            formData.append('school_type', data.school_type);
            formData.append('established', data.established);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keyword', data.meta_keyword);
            formData.append('address', data.address);
            formData.append('map', data.map);
            // formData.append('avg_rating', data.avg_rating);
            formData.append('video_url', data.video_url);
            formData.append('info', data.info);
            formData.append('admissions_process', data.admissions_process);
            formData.append('extracurriculars', data.extracurriculars);
            formData.append('status', data.status);
            formData.append('home_view_status', data.home_view_status);
            formData.append('listing_order', data.listing_order);
            formData.append('amenities', JSON.stringify(data.amenities));
            formData.append('levels', JSON.stringify(data.levels));
            formData.append('boards', JSON.stringify(data.boards));

            if (selectedphoto == '') {

                toast.error('Please Upload Icon', {
                    duration: 2000
                })
                setLoading(false);
                return false;

            }

            formData.append('icon', selectedphoto);
            formData.append('banner_image', selectedbanner);

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
            olddata.schfaqs && olddata.schfaqs.length > 0 ? olddata.schfaqs : [{
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
            let url = '/api/admin/school/updatefaqs';
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
        if (olddata && olddata.schgallery && Array.isArray(olddata.schgallery)) {
            return olddata.schgallery.map(item => ({ dataURL: Config.API_URL + '/' + item.image }));
        } else {
            return [];
        }
    });
    const maxNumber = 69;

    const onChangeimages = (
        imageList: ImageListType,

    ) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
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
                                        name='name'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='School Name'
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
                                                label='School Slug'
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
                                        name="boards"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => {
                                            // console.log(value); // Log value here

                                            return (
                                                <CustomAutocomplete
                                                    multiple
                                                    fullWidth
                                                    value={value || []}
                                                    options={boardsdata}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue);
                                                    }}
                                                    filterSelectedOptions
                                                    id='autocomplete-multiple-outlined'
                                                    getOptionLabel={(option: any) => option.name}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    renderInput={params =>
                                                        <CustomTextField {...params}
                                                            label='Select Boards'
                                                            variant="outlined"
                                                            error={Boolean(errors.boards)}
                                                            {...(errors.levels && { helperText: 'This field is required' })}
                                                            placeholder='Boards' />}
                                                />
                                            );
                                        }}
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
                                <Grid item sm={4}>
                                    <Controller
                                        name='school_type'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                select
                                                fullWidth

                                                value={value}
                                                label='School Type'
                                                onChange={onChange}
                                                error={Boolean(errors.school_type)}
                                                placeholder='Select Type'
                                                aria-describedby='stepper-linear-account-email'
                                                {...(errors.school_type && { helperText: 'This field is required' })}
                                            >
                                                <MenuItem value='Public'>Public</MenuItem>
                                                <MenuItem value='Private'>Private</MenuItem>
                                                <MenuItem value='Government'>Government</MenuItem>
                                                <MenuItem value='Deemed'>Deemed</MenuItem>
                                            </CustomTextField>

                                        )} />
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
                                                label='Established Year'
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
                                                multiline
                                                rows={3}
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
                                        name="amenities"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => {
                                            // console.log(value); // Log value here

                                            return (
                                                <CustomAutocomplete
                                                    multiple
                                                    fullWidth
                                                    value={value || []}
                                                    options={amenitiesdata}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue);
                                                    }}
                                                    filterSelectedOptions
                                                    id='autocomplete-multiple-outlined'
                                                    getOptionLabel={(option: any) => option.amenities_name}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    renderInput={params =>
                                                        <CustomTextField {...params}
                                                            label='Select amenities'
                                                            variant="outlined"
                                                            error={Boolean(errors.amenities)}
                                                            {...(errors.amenities && { helperText: 'This field is required' })}
                                                            placeholder='amenities' />}
                                                />
                                            );
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name="levels"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => {
                                            // console.log(value); // Log value here

                                            return (
                                                <CustomAutocomplete
                                                    multiple
                                                    fullWidth
                                                    value={value || []}
                                                    options={leveslsdata}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue);
                                                    }}
                                                    filterSelectedOptions
                                                    id='autocomplete-multiple-outlined'
                                                    getOptionLabel={(option: any) => option.name}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    renderInput={params =>
                                                        <CustomTextField {...params}
                                                            label='Select Levels'
                                                            variant="outlined"
                                                            error={Boolean(errors.levels)}
                                                            {...(errors.levels && { helperText: 'This field is required' })}
                                                            placeholder='levels' />}
                                                />
                                            );
                                        }}
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
                                                label='Map link'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.map)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.map && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='video_url'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='Video Url'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.video_url)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.video_url && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='avg_rating'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                type='number'
                                                value={value}
                                                label='Average Rating'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.avg_rating)}
                                                aria-describedby='validation-basic-avg-rating'
                                                {...(errors.avg_rating && { helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </Grid> */}

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
                                    <Typography style={{ marginBottom: '10px' }}>Admissions Process</Typography>
                                    <Controller
                                        name='admissions_process'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("admissions_process", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Extracurriculars</Typography>
                                    <Controller
                                        name='extracurriculars'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value,  } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("extracurriculars", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>


                                {/* <Grid item xs={12} sm={12}>
                                <Typography style={{ marginBottom: '10px' }}>admissions_process</Typography>
                                    <Controller
                                        name='admissions_process'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <>
                                            <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                onChange={(value) => setValue("admissions_process", value)} />
                                          
                                        </>
                                        )}
                                    />
                                </Grid> 

                                <Grid item xs={12} sm={12}>
                                <Typography style={{ marginBottom: '10px' }}>info</Typography>
                                    <Controller
                                        name='info'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <>
                                            <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                onChange={(value) => setValue("info", value)} />
                                           
                                        </>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                <Typography style={{ marginBottom: '10px' }}>extracurriculars</Typography>
                                    <Controller
                                        name='extracurriculars'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <>
                                            <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                onChange={(value) => setValue("extracurriculars", value)} />
                                           
                                        </>
                                        )}
                                    />
                                </Grid> */}
                                <Grid item xs={12} sm={4}>
                                    <FileUpload
                                        isAddMode={isAddMode}
                                        olddata={!isAddMode && olddata.icon ? olddata.icon : ""}
                                        onFileChange={handleFileChangephoto}
                                        maxFiles={1}
                                        maxSize={2000000}
                                        fileNames={fileNamesphoto}
                                        label="Upload icon Image"
                                        helpertext="Recommended size: 600 × 450 px (minimum 300 × 225 px)" 
                                        acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                                        rejectionMessage='Try another file for upload.'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FileUpload
                                        isAddMode={isAddMode}
                                        olddata={!isAddMode && olddata.banner_image ? olddata.banner_image : ""}
                                        onFileChange={handleFileChangebanner}
                                        maxFiles={1}
                                        maxSize={2000000}
                                        fileNames={fileNamesbanner}
                                        helpertext="Upload size webp :800×600 px (min 550×412)"
                                        label="Upload Main Banner Image"
                                        acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                                        rejectionMessage='Try another file for upload.'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>

                                    <FormLabel component='legend'>Select status</FormLabel>
                                    <Controller
                                        name='status'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={onChange}>
                                                <FormControlLabel value='Published' control={<Radio />} label='Published' />
                                                <FormControlLabel value='Draft' control={<Radio />} label='Draft' />
                                            </RadioGroup>
                                        )}
                                    />



                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <FormLabel component='legend'>Select Home View Status</FormLabel>
                                    <Controller
                                        name='home_view_status'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={onChange}>
                                                <FormControlLabel value='top_school' control={<Radio />} label='Top Schools' />
                                                <FormControlLabel value='default' control={<Radio />} label='Default Schools' />
                                            </RadioGroup>
                                        )}
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






                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <Button type='submit' variant='contained'>
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
                                </Grid>
                            </Grid>
                        </form >
                    </TabPanel>

                    <TabPanel sx={{ p: 0 }} value='account-details'>
                        {isAddMode ? <> <h6>Please add School First.</h6> </> : <>
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
                                            {/* <Button variant='tonal' color='secondary' onClick={() => setShow(false)}>
                                Discard
                            </Button> */}
                                        </DialogActions>
                                    </Grid>

                                </Grid>
                            </form >



                        </>}

                    </TabPanel>

                    <TabPanel sx={{ p: 0 }} value='social-links'>
                        {isAddMode ? <> <h6>Please add School First.</h6> </> : <>
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
                                            <div className="container">
                                                <div className="row">
                                                    {imageList.map((image, index) => (


                                                        <div className="col-sm-6 col-md-4 col-lg-3">
                                                            <div className="image-item ">
                                                                {/* <img src={image.dataURL} className="img-fluid rounded" alt="" /> */}
                                                                <img
                                                                    src={image.dataURL}
                                                                    style={{ width: '100%', height: '150px', maxWidth: '200px', maxHeight: '500px' }}
                                                                    className="rounded"
                                                                    alt=""
                                                                />

                                                                <div className="image-item__btn-wrapper d-flex justify-content-between align-items-center mt-2">
                                                                    {/* <button className="btn btn-primary btn-block" onClick={() => onImageUpdate(index)}>Update</button> */}
                                                                    <button className="btn btn-danger btn-block" onClick={() => onImageRemove(index)}>Remove</button>
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
