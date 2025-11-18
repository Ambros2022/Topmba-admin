
import { useState, useEffect, useCallback } from 'react'

import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router';
// ** Third Party Imports
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { useForm, Controller,useFieldArray } from 'react-hook-form'
import axios1 from 'src/configs/adminaxios'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import type { FC } from 'react';
import { Alert, FormControlLabel, FormLabel, RadioGroup, Tab, Typography } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import QuillEditor from 'src/@core/components/html-editor/index';
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import Card from '@mui/material/Card'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import CardContent from '@material-ui/core/CardContent'
import TabPanel from '@mui/lab/TabPanel'
import CloseIcon from '@mui/icons-material/Close';

interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, }) => {
    const router = useRouter();
    const [formvalue, setFormvalue] = useState<string>('basic-info')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');
    const [category, setCategory] = useState([]);
    const isMountedRef = useIsMountedRef();

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
    })

    const defaultValues = {
        name: isAddMode ? '' : olddata.name,
        slug: isAddMode ? '' : olddata.slug,
        category_id: isAddMode ? '' : olddata.blogcategories ? olddata.blogcategories : '',
        meta_title: isAddMode ? '' : olddata.meta_title,
        meta_description: isAddMode ? '' : olddata.meta_description,
        meta_keywords: isAddMode ? '' : olddata.meta_keywords,
        overview: isAddMode ? '' : olddata.overview,
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

    const onSubmit = async (data: any) => {

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/blog/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('category_id', data.category_id.id);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keywords', data.meta_keywords);
            formData.append('overview', data.overview);
            formData.append('status', data.status);
            formData.append('banner_image', selectedphoto);

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
            let url = 'api/admin/blog/add';

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('category_id', data.category_id.id);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keywords', data.meta_keywords);
            formData.append('overview', data.overview);
            formData.append('status', data.status);
            if (selectedphoto == '') {

                toast.error('Please Upload Image', {
                    duration: 2000
                })
                setLoading(false);
                return false;

            }
            formData.append('banner_image', selectedphoto);

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

    //get all Catogry
    const getcategory = useCallback(async () => {

        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/website/blogcategories/get', { params: roleparams });

            setCategory(response.data.data);

        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {

        getcategory();

    }, [getcategory]);
     const faqdefaultValues = {
            faqs: isAddMode ? [{
                questions: '',
                answers: '',
    
            }] : olddata.blogfaqs && olddata.blogfaqs.length > 0 ? olddata.blogfaqs : [{
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
         
    
            if (!isAddMode && olddata.id) {
                let updateid = olddata.id;
                setLoading(true)
                let url = 'api/admin/blog/updatefaq';
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
                
                } catch (err: any) {
                    console.error(err);
                    setLoading(false)
                    toast.error(err.message || "please try again")
    
                }
    
            }
        }
    
    const handleTabsChange = (event: any, newValue: string) => {
        setFormvalue(newValue)
    }

    return (
        <>
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
                        {/* <Tab value='social-links' label='Gallery Images' /> */}
                    </TabList>

                    <CardContent>
                        <TabPanel sx={{ p: 0 }} value='basic-info'>
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
                                            name='category_id'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <CustomAutocomplete
                                                    fullWidth

                                                    options={category}
                                                    loading={!category.length}
                                                    value={field.value}
                                                    onChange={(event, newValue) => {
                                                        field.onChange(newValue);
                                                    }}
                                                    getOptionLabel={(option: any) => option.name || ''}
                                                    renderInput={(params: any) => (
                                                        <CustomTextField
                                                            {...params}
                                                            required
                                                            error={Boolean(errors.category_id)}
                                                            {...(errors.category_id && { helperText: 'This field is required' })}
                                                            label='Select Category'
                                                        />
                                                    )}
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


                                    <Grid item xs={12} sm={6}>
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
                                                    multiline
                                                    rows={3}
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
                                                    label='keywords'
                                                    onChange={onChange}
                                                    multiline
                                                    rows={3}
                                                    placeholder=''
                                                    error={Boolean(errors.meta_keywords)}
                                                    aria-describedby='validation-basic-first-name'
                                                    {...(errors.meta_keywords && { helperText: 'This field is required' })}
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
                                            olddata={!isAddMode && olddata.banner_image ? olddata.banner_image : ""}
                                            onFileChange={handleFileChangephoto}
                                            maxFiles={1}
                                            maxSize={2000000}
                                            fileNames={fileNamesphoto}
                                            label=" Upload Banner Image"
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
                        </TabPanel>

                        <TabPanel sx={{ p: 0 }} value='account-details'>
                            {isAddMode ? <> <h6>Please add Blog First.</h6> </> : <>
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
                                                                            setValue(`faqs[${index}].answers`, e);
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


                    </CardContent>

                </TabContext>
            </Card>
        </>
    )
}

export default AddEditForm
