
'use client'
import {  FC, SyntheticEvent,  useState } from 'react'
// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CircularProgress from '@mui/material/CircularProgress'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios1 from 'src/configs/adminaxios'
import { DialogActions ,Typography } from '@mui/material'
import FileUpload from 'src/@core/components/dropzone/FileUpload';

import toast from 'react-hot-toast'
import router from 'next/router'
import QuillEditor from 'src/@core/components/html-editor/index';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon


interface Authordata {
    olddata?: any;
    isAddMode: boolean;
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode, }) => {
    const [formvalue, setFormvalue] = useState<string>('basic-info')
    const [loading, setLoading] = useState<boolean>(false)
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');
    const [fileNamesbanner, setFileNamesbanner] = useState<any>([]);
    const [selectedbanner, setSelectedbanner] = useState('');


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
        name: yup
            .string()
            .trim()
            .required(),
        h1_title: yup
            .string()
            .trim()
            .required(),
        slug: yup
            .string()
            .trim()
            .required(),
    })


    const defaultValues = {
        name: isAddMode ? '' : olddata.name,
        slug: isAddMode ? '' : olddata.slug,
        h1_title: isAddMode ? '' : olddata.h1_title,
        description: isAddMode ? '' : olddata.description,
        top_college: isAddMode ? '' : olddata.top_college,
        meta_title: isAddMode ? '' : olddata.meta_title,
        meta_description: isAddMode ? '' : olddata.meta_description,
        meta_keyword: isAddMode ? '' : olddata.meta_keyword,
        listing_order: isAddMode ? '' : olddata.listing_order,
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
            let url = 'api/admin/stream/update';
            const formData = new FormData();
            formData.append('id', updateid);
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('h1_title', data.h1_title);
            formData.append('description', data.description);
            formData.append('top_college', data.top_college);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keyword', data.meta_keyword);
            formData.append('listing_order', data.listing_order);
            formData.append('logo', selectedphoto);
            formData.append('banner', selectedbanner);

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
            let url = 'api/admin/stream/add';

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('h1_title', data.h1_title);
            formData.append('description', data.description);
            formData.append('top_college', data.top_college);
            formData.append('meta_title', data.meta_title);
            formData.append('meta_description', data.meta_description);
            formData.append('meta_keyword', data.meta_keyword);
            formData.append('listing_order', data.listing_order);
            formData.append('logo', selectedphoto);
            formData.append('banner', selectedbanner);


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

        }] : olddata.streamfaqs && olddata.streamfaqs.length > 0 ? olddata.streamfaqs : [{
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
        // return

        if (!isAddMode && olddata.id) {
            let updateid = olddata.id;
            setLoading(true)
            let url = 'api/admin/stream/updatefaq';
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
                    {/* <Tab value='social-links' label='Gallery Images' /> */}
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
                                                label='Stream Name'
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
                                        name='h1_title'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                multiline
                                                rows={3}
                                                label='H1 Title'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.h1_title)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.h1_title && { helperText: 'This field is required' })}


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
                                                multiline
                                                rows={3}
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
                                        name='meta_keyword'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                multiline
                                                rows={3}
                                                label='Keyword'
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
                                        name='meta_description'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextField
                                                fullWidth
                                                value={value}
                                                multiline
                                                rows={3}
                                                label='Meta description'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.meta_description)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.meta_description && { helperText: 'This field is required' })}

                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                    <Typography style={{ marginBottom: '10px' }}>description</Typography>

                                    <Controller
                                        name='description'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value } }) => (
                                            <>
                                            <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                                onChange={(value) => setValue("description", value)} />
                                            
                                        </>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                    <Typography style={{ marginBottom: '10px' }}>top_college</Typography>

                                    <Controller
                                        name='top_college'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value } }) => (
                                            <>
                                <QuillEditor placeholder='Start Writing...' intaialvalue={value}
                                    onChange={(value) => setValue("top_college", value)} />
                        
                            </>
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
                                                label='Listing_Order'
                                                onChange={onChange}
                                                placeholder=''
                                                error={Boolean(errors.listing_order)}
                                                aria-describedby='validation-basic-first-name'
                                                {...(errors.listing_order && { helperText: 'This field is required' })}

                                            />
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


                                <Grid item xs={12} sm={3}>
                                    <FileUpload
                                        isAddMode={isAddMode}
                                        olddata={!isAddMode && olddata.banner ? olddata.banner : ""}
                                        onFileChange={handleFileChangebanner}
                                        maxFiles={1}
                                        maxSize={2000000}
                                        fileNames={fileNamesbanner}
                                        label=" Upload banner"
                                        acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf']}
                                        rejectionMessage='Try another file for upload.'
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
                        {isAddMode ? <> <h6>Please add Stream First.</h6> </> : <>
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
                                                            style={{ margin: '17px 0 0 0px' , padding: '8px' }}
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
    )
}

export default AddEditForm
