import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Grid,
    Button,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomTextField from 'src/@core/components/mui/text-field';
import FileUpload from 'src/@core/components/dropzone/FileUpload';

interface StepsFormProps {
    isAddMode: boolean;
    olddata: { organizatiopagesteps: any[] };
    onSubmit: (data: any, index: number | null, setLoading: (loading: boolean) => void) => void;
    loading: boolean;
    onDelete: (index: number, setLoading: (index: number | null) => void) => void;
}

const stepsSchema = yup.object().shape({
    title: yup.string().trim().required('Title is required'),
    description: yup.string().trim().required('Description is required'),
    order_by: yup.number().required('Listing order is required'),
});

const StepsForm: React.FC<StepsFormProps> = ({ isAddMode, olddata, onSubmit, onDelete }) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
    const [fileNames, setFileNames] = useState<any>([]);
    const [selectedIcon, setSelectedIcon] = useState<File | null>(null);

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleFileChange = (files: File[]) => {
        if (files.length > 0) {
            setSelectedIcon(files[0]);
            console.log(fileNames)
            setFileNames(
                files.map((file) => ({
                    name: file.name,
                    preview: URL.createObjectURL(file),
                }))
            );
        } else {
            setSelectedIcon(null);
            setFileNames([]); 
        }
    };

    const renderStepForm = (step: any, index: number | null) => {
        const stepsDefaultValues = {
            title: step?.title || '',
            description: step?.description || '',
            order_by: step?.order_by || '',
        };

        const { control, handleSubmit, formState: { errors } } = useForm({
            defaultValues: stepsDefaultValues,
            mode: 'onChange',
            resolver: yupResolver(stepsSchema),
        });

        const onFormSubmit = (data: any) => {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('order_by', data.order_by);


            if (selectedIcon) {
                formData.append('icon', selectedIcon);
            } else if (!isAddMode && step?.icon) {
                formData.append('icon', step.icon); 
            }


            onSubmit(formData, index, setSubmitLoading);
        };

        return (
            <form onSubmit={handleSubmit(onFormSubmit)} encType="multipart/form-data">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    fullWidth
                                    {...field}
                                    label="Title"
                                    error={Boolean(errors.title)}
                                    helperText={errors.title ? String(errors.title.message) : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    fullWidth
                                    {...field}
                                    label="Description"
                                    error={Boolean(errors.description)}
                                    helperText={errors.description ? String(errors.description.message) : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="order_by"
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    fullWidth
                                    {...field}
                                    type="number"
                                    label="Listing Order"
                                    error={Boolean(errors.order_by)}
                                    helperText={errors.order_by ? String(errors.order_by.message) : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FileUpload
                            isAddMode={isAddMode}
                            olddata={!isAddMode && step?.icon ? step.icon : ""}
                            onFileChange={handleFileChange}
                            maxFiles={1}
                            maxSize={2000000}
                            fileNames={fileNames}
                            label="Upload Icon"
                            acceptedFormats={['.png', '.jpg', '.jpeg', '.gif', '.svg']}
                            rejectionMessage='Try another file for upload.'
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', gap: 5 }}>
                        <Button type="submit" variant="contained" disabled={submitLoading}>
                            {index !== null ? 'Update' : 'Add'}
                            {submitLoading && (
                                <CircularProgress
                                    sx={{
                                        color: 'common.white',
                                        width: '20px !important',
                                        height: '20px !important',
                                        ml: 2,
                                    }}
                                />
                            )}
                        </Button>
                        {index !== null && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => onDelete(index!, setDeleteLoading)}
                                disabled={deleteLoading === index}
                            >
                                Delete
                                {deleteLoading === index && (
                                    <CircularProgress
                                        sx={{
                                            color: 'error.main',
                                            width: '20px !important',
                                            height: '20px !important',
                                            ml: 2,
                                        }}
                                    />
                                )}
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </form>
        );
    };

    return (
        <>
            {olddata.organizatiopagesteps?.length ? (
                olddata.organizatiopagesteps.map((step: any, index: number) => (
                    <Accordion
                        key={index}
                        expanded={expanded === `panel${index}`}
                        onChange={handleAccordionChange(`panel${index}`)}
                        style={{ marginBottom: '20px' }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{`Step ${index + 1} - ${step.title}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>{renderStepForm(step, index)}</AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography variant="h6">No steps found. Add a new step below:</Typography>
            )}
            <Accordion expanded={expanded === 'panel-new'} onChange={handleAccordionChange('panel-new')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Add New Step</Typography>
                </AccordionSummary>
                <AccordionDetails>{renderStepForm(null, null)}</AccordionDetails>
            </Accordion>
        </>
    );
};

export default StepsForm;
