
import { useState, useEffect, useCallback } from 'react'
import DialogActions from '@mui/material/DialogActions'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router';
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import axios1 from 'src/configs/adminaxios'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import ImageUploading, { ImageListType } from "react-images-uploading";
import { FaTrash } from 'react-icons/fa';

import type { FC, SyntheticEvent } from 'react';
import { Box, CardContent, FormControlLabel, FormLabel, MenuItem, RadioGroup, Tab, Typography } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList'
import { Config } from 'src/configs/mainconfig'
import QuillEditor from 'src/@core/components/html-editor/index';
import { Checkbox } from '@mui/material'




interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode }) => {
    const router = useRouter();

    const [formvalue, setFormvalue] = useState<string>('basic-info')
    const [loading, setLoading] = useState<boolean>(false)
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');
    const [fileNameslogo, setFileNameslogo] = useState<any>([]);
    const [selectedlogo, setSelectedlogo] = useState('');

    const [amenitiesdata, setAmenitiesdata] = useState([])
    const [streamsdata, setStreamsdata] = useState([])
    const [recoginationsdata, setRecoginationsdata] = useState([])

    const [countryId, setCountryId] = useState<any>(isAddMode ? "" : olddata?.country?.id || '');
    const [stateId, setStateId] = useState<any>(isAddMode ? "" : olddata?.state?.id || '');
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])

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

    const schema: any = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required(),
        type: yup
            .string()
            .trim()
            .required(),
        college_type: yup
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
        address: yup
            .string()
            .trim()
            .required(),
        home_view_status: yup
            .string()
            .trim()
            .required(),
        status: yup
            .string()
            .trim()
            .required(),
        slug: yup
            .string()
            .trim()
            .required(),
        country_id: yup.object().required("This field is required"),
        state_id: yup.object().required("This field is required"),
        city_id: yup.object().required("This field is required"),


    })

    const defaultValues = {
        name: isAddMode ? '' : olddata.name,
        slug: isAddMode ? '' : olddata.slug,
        type: isAddMode ? '' : olddata.type,
        home_view_status: isAddMode ? '' : olddata.home_view_status,
        college_type: isAddMode ? '' : olddata.college_type,
        listing_order: isAddMode ? '' : olddata.listing_order,
        established: isAddMode ? '' : olddata.established,
        meta_title: isAddMode ? '' : olddata.meta_title,
        meta_description: isAddMode ? '' : olddata.meta_description,
        meta_keyword: isAddMode ? '' : olddata.meta_keyword,
        address: isAddMode ? '' : olddata.address,
        map: isAddMode ? '' : olddata.map,
        video_url: isAddMode ? '' : olddata.video_url,
        info: isAddMode ? '' : olddata.info,
        course_fees: isAddMode ? '' : olddata.course_fees,
        admissions: isAddMode ? '' : olddata.admissions,
        placements: isAddMode ? '' : olddata.placements,
        rankings: isAddMode ? '' : olddata.rankings,
        scholarship: isAddMode ? '' : olddata.scholarship,
        hostel: isAddMode ? '' : olddata.hostel,
        status: isAddMode ? 'Published' : olddata.status,
        country_id: isAddMode ? '' : olddata.country ? olddata.country : '',
        state_id: isAddMode ? '' : olddata.state ? olddata.state : '',
        city_id: isAddMode ? '' : olddata.citys ? olddata.citys : '',
        is_associated: isAddMode ? 0 : olddata.is_associated ? olddata.is_associated : 0,

        collegeamenities: [],
        streams: [],
        recoginations: [],
        avg_rating: isAddMode ? 0 : olddata.avg_rating,
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
        if (stateId) {
            getcities();
        }
    }, [getcities, stateId]);

    //get all countries
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

    useEffect(() => {
        if (countryId) {
            getstates();
        }
    }, [countryId, getstates]);


    //get all countries
    const getcountries = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/countries/get', { params: roleparams });

            setCountries(response.data.data);

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

    const getstreams = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/admin/stream/get', { params: roleparams });
            setStreamsdata(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);
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
        getamenities();
        getstreams();
        getrecognition();

    }, [getamenities, getcountries, getrecognition, getstreams]);



    useEffect(() => {

        if (!isAddMode && olddata.collegeamenities) {
            const amenities = olddata.collegeamenities.map((item) => ({
                id: item.clgamenities.id,
                amenities_name: item.clgamenities.amenities_name,
            }));
            admfiledReset("amenities", { defaultValue: amenities })
        }
        if (!isAddMode && olddata.collegestreams) {
            const STREAM = olddata.collegestreams.map((item) => ({
                id: item.clgstreams.id,
                name: item.clgstreams.name,
            }));
            admfiledReset("streams", { defaultValue: STREAM })
        }
        if (!isAddMode && olddata.collegerecognitions) {
            const RECOGINATION = olddata.collegerecognitions.map((item) => ({
                id: item.clgrecognitions.id,
                recognition_approval_name: item.clgrecognitions.recognition_approval_name,
            }));
            admfiledReset("recoginations", { defaultValue: RECOGINATION })
        }

    }, []);
    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            const updateid = olddata.id;
            setLoading(true)
            const url = 'api/admin/college/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('type', data.type);
            formData.append('status', data.status);
            formData.append('home_view_status', data.home_view_status);
            formData.append('college_type', data.college_type);
            formData.append('listing_order', data.listing_order);
            formData.append('established', data.established);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keyword', data.meta_keyword);
            formData.append('address', data.address);
            formData.append('map', data.map);
            formData.append('video_url', data.video_url);
            if (data.avg_rating) {
                formData.append('avg_rating', data.avg_rating);
            }
            formData.append('is_associated', data.is_associated);
            formData.append('info', data.info);
            formData.append('course_fees', data.course_fees);
            formData.append('admissions', data.admissions);
            formData.append('placements', data.placements);
            formData.append('rankings', data.rankings);
            formData.append('scholarship', data.scholarship);
            formData.append('hostel', data.hostel);
            formData.append('country_id', data.country_id.id);
            formData.append('state_id', data.state_id.id);
            formData.append('city_id', data.city_id.id);
            formData.append('amenities', JSON.stringify(data.amenities));
            formData.append('streams', JSON.stringify(data.streams));
            formData.append('recoginations', JSON.stringify(data.recoginations));
            formData.append('banner_image', selectedbanner);
            formData.append('icon', selectedphoto);
            formData.append('logo', selectedlogo);



            try {
                const response = await axios1.post(url, formData)
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
            const url = 'api/admin/College/add';

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('type', data.type);
            formData.append('status', data.status);
            formData.append('home_view_status', data.home_view_status);
            formData.append('college_type', data.college_type);
            formData.append('listing_order', data.listing_order);
            formData.append('established', data.established);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keyword', data.meta_keyword);
            formData.append('address', data.address);
            formData.append('map', data.map);
            formData.append('video_url', data.video_url);
            formData.append('is_associated', data.is_associated);
            if (data.avg_rating) {
                formData.append('avg_rating', data.avg_rating);
            }
            formData.append('info', data.info);
            formData.append('course_fees', data.course_fees);
            formData.append('admissions', data.admissions);
            formData.append('placements', data.placements);
            formData.append('rankings', data.rankings);
            formData.append('scholarship', data.scholarship);
            formData.append('hostel', data.hostel);
            formData.append('country_id', data.country_id.id);
            formData.append('state_id', data.state_id.id);
            formData.append('city_id', data.city_id.id);

            if (selectedlogo == '') {

                toast.error('Please Upload Logo', {
                    duration: 2000
                })
                setLoading(false);

                return false;

            }

            formData.append('banner_image', selectedbanner);
            formData.append('icon', selectedphoto);
            formData.append('logo', selectedlogo);
            formData.append('amenities', JSON.stringify(data.amenities));
            formData.append('streams', JSON.stringify(data.streams));
            formData.append('recoginations', JSON.stringify(data.recoginations));


            setLoading(false)
            try {
                const response = await axios1.post(url, formData)
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
            olddata.collegefaqs && olddata.collegefaqs.length > 0 ? olddata.collegefaqs : [{
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


        if (!isAddMode && olddata.id) {
            const updateid = olddata.id;
            setLoading(true)
            const url = 'api/admin/college/updatefaqs';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('faqs', JSON.stringify(data.faqs));

            try {
                const response = await axios1.post(url, formData)
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
        imageList: ImageListType) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    const GalleryImage = async () => {
        // console.log(images, "imageLists");
        try {
            const formData = new FormData();
            formData.append('id', olddata.id);

            const oldimages: any = [];
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

            const url = '/api/admin/college/updategallery';
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
                                        name='type'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                select
                                                value={value}
                                                label='Select Type'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.type)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.type && { helperText: 'This field is required' })}
                                            >
                                                <MenuItem value='college'>college</MenuItem>
                                                <MenuItem value='university'>university</MenuItem>
                                                {/* <MenuItem value='board'>board</MenuItem> */}

                                            </CustomTextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='home_view_status'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                select
                                                value={value}
                                                label='Select home_view_status'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.type)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.type && { helperText: 'This field is required' })}
                                            >
                                                <MenuItem value='top_college'>top_college</MenuItem>
                                                <MenuItem value='default'>default</MenuItem>
                                                {/* <MenuItem value='board'>board</MenuItem> */}

                                            </CustomTextField>
                                        )}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='college_type'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                select
                                                value={value}
                                                label='Select College Type'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.college_type)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.college_type && { helperText: 'This field is required' })}
                                            >
                                                <MenuItem value='Public'>Public</MenuItem>
                                                <MenuItem value='Deemed'>Deemed</MenuItem>
                                                <MenuItem value='Private'>Private</MenuItem>
                                                <MenuItem value='Government'>Government</MenuItem>
                                                <MenuItem value='Autonomous'>Autonomous</MenuItem>

                                            </CustomTextField>
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
                                                label='University/College/Board Name'
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
                                        name='meta_keyword'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='keywords'
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
                                        name='established'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='Established'
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
                                                            label='Select streams'
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
                                <Grid item xs={12} sm={4}>
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
                                {/* <Grid item xs={12} sm={6}>
                                Rating
                                    <Controller
                                        name='avg_rating'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <Rating
                                                count={5}
                                                value={value}
                                                size={24}
                                                activeColor="#ffd700"
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    {errors.avg_rating && (
                                        <span style={{ color: 'red', fontSize: '12px' }}>{String(errors.avg_rating.message)}</span>
                                    )}
                                </Grid> */}



                                <Grid item xs={12} sm={4}>
                                    <Controller
                                        name='avg_rating'
                                        control={control}
                                        rules={{
                                            required: "This field is required",
                                            max: {
                                                value: 5,
                                                message: "Rating cannot exceed 5"
                                            }
                                        }}

                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                label='Rating : 0 to 5 only'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.avg_rating)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.avg_rating && { helperText: 'This field is required' })}
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
                                        render={({ field: { value } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("info", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Course & fees</Typography>

                                    <Controller
                                        name='course_fees'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("course_fees", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Admissions</Typography>

                                    <Controller
                                        name='admissions'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("admissions", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Placements</Typography>

                                    <Controller
                                        name='placements'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("placements", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Rankings</Typography>

                                    <Controller
                                        name='rankings'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("rankings", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>

                                    <Typography style={{ marginBottom: '10px' }}>Scholarship</Typography>
                                    <Controller
                                        name='scholarship'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("scholarship", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={12}>
                                    <Typography style={{ marginBottom: '10px' }}>Infrastructure</Typography>

                                    <Controller
                                        name='hostel'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, } }) => (
                                            <>
                                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                    onChange={(value) => setValue("hostel", value)} />

                                            </>
                                        )}
                                    />
                                </Grid>




                                <Grid item xs={12} sm={3}>
                                    <Box sx={{ pointerEvents: 'none', opacity: 0.5 }}>
                                        <FileUpload
                                            isAddMode={isAddMode}
                                            olddata={!isAddMode && olddata.icon ? olddata.icon : ""}
                                            onFileChange={handleFileChangephoto}
                                            maxFiles={1}
                                            maxSize={2000000}
                                            fileNames={fileNamesphoto}
                                            label="Disabled Not required Upload Icon"
                                            acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                                            rejectionMessage='Try another file for upload.'
                                        />
                                    </Box>
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


                                <Grid item xs={12} sm={3}>
                                    <FileUpload
                                        isAddMode={isAddMode}
                                        olddata={!isAddMode && olddata.banner_image ? olddata.banner_image : ""}
                                        onFileChange={handleFileChangebanner}
                                        maxFiles={1}
                                        maxSize={2000000}
                                        fileNames={fileNamesbanner}
                                        label="Upload banner_image"
                                        helpertext="Upload size webp :800×600 px (min 550×412)"
                                        acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                                        rejectionMessage='Try another file for upload.'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3} style={{ marginTop: '15px' }}>
                                    <Controller
                                        name='is_associated'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <FormControlLabel
                                                label='is_associated'
                                                control={
                                                    <Checkbox
                                                        checked={value}
                                                        onChange={(e) => onChange(e.target.checked ? 1 : 0)}

                                                    />
                                                }
                                            />
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
                                                value={value}
                                                type='number'
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

                                <Grid item xs={12}>

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
                    </TabPanel>

                    <TabPanel sx={{ p: 0 }} value='account-details'>
                        {isAddMode ? <> <h6>Please add College First.</h6> </> : <>
                            <form onSubmit={faqhandleSubmit(faqonSubmit)} encType="application/x-www-form-urlencoded">
                                <Grid container spacing={5}>
                                    {fields.map((val, index) => (
                                        <Grid item xs={12} key={val.id}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12} sm={5}>
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
                                                    <Typography>Answers</Typography>
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
                                                            color="secondary"
                                                            onClick={() => handleRemoveFaq(index)}
                                                            style={{ margin: '17px 0 0 0px' }}
                                                        >
                                                            -
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
                        {isAddMode ? <> <h6>Please add College First.</h6> </> : <>
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

                                                        <>
                                                            <div className="col-sm-6 col-md-4 col-lg-3">
                                                                <div className="image-item ">

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

                                                        </>




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
                {/* <Divider sx={{ m: '0 !important' }} /> */}
                {/* <CardActions>
                    <Button type='submit' sx={{ mr: 2 }} variant='contained'>
                        Submit
                    </Button>
                    <Button type='reset' variant='tonal' color='secondary'>
                        Reset
                    </Button>
                </CardActions> */}
                {/* </form> */}
            </TabContext>
        </Card>
    )
}

export default AddEditForm
