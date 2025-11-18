// FileUpload.tsx
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Grid, Avatar, Card, CardContent } from '@mui/material';
import { Config } from '../../../configs/mainconfig';
import Icon from 'src/@core/components/icon'
interface FileUploadProps {
    isAddMode: boolean;
    olddata: any; // Adjust the type accordingly
    onFileChange: (files: File[]) => void;
    maxFiles?: number;
    maxSize?: number;
    fileNames?: any;
    label?: any;
    helpertext?: any;
    acceptedFormats?: string[];
    rejectionMessage?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    isAddMode,
    olddata,
    onFileChange,
    maxFiles = 1,
    maxSize = 2000000,
    fileNames,
    helpertext,
    label,
    acceptedFormats = ['.png', '.jpg', '.jpeg', '.gif'],
    rejectionMessage = 'You can only upload 2 files & maximum size of 2 MB.',
}) => {



    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: maxFiles,
        maxSize: maxSize,
        accept: {
            'image/*': acceptedFormats,
        },
        onDrop: (acceptedFiles) => {


            onFileChange(acceptedFiles);
        },
        onDropRejected: () => {
            // Handle rejection logic here
            // You can also use the rejectionMessage prop to display a custom rejection message
            alert(rejectionMessage);
        },
    });

    return (
        <>
            <Typography variant='h6' sx={{ fontSize: '0.8125rem', marginBottom: '0.25rem' }}  >
                {label}
                {/* <Divider></Divider> */}
            </Typography>
            <Card >
                <CardContent sx={{ '&:last-of-type': { paddingBottom: '0 !important' }, pt: 1, px: 1 }}>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <Box sx={{ width: '100%' }}>


                            <Grid container spacing={0}>
                                {fileNames.length === 0 ? (
                                    !isAddMode && olddata ? (
                                        <div>
                                            <Avatar variant={'square'} src={!isAddMode ? Config.API_URL + '/' + olddata : ''} style={{ height: '100px', width: 'auto' }} />
                                            <Typography variant='body1' color="primary" sx={{ fontSize: '0.8125rem', mb: 2, textAlign: 'center' }}>
                                                {helpertext}

                                            </Typography>
                                        </div>
                                    ) : (
                                        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            <Box
                                                sx={{
                                                    mb: 1.5,
                                                    width: 48,
                                                    height: 48,
                                                    display: 'flex',
                                                    borderRadius: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: (theme) => `rgba(${theme.palette.customColors.main}, 0.08)`,
                                                }}
                                            >
                                                <Icon icon='tabler:upload' fontSize='1.75rem' />
                                            </Box>
                                            <Typography variant='body1' sx={{ fontSize: '0.8125rem', mb: 2, textAlign: 'center' }}>
                                                Drop Accepted files =   {acceptedFormats}

                                            </Typography>
                                            <Typography variant='body1' color="primary" sx={{ fontSize: '0.8125rem', mb: 2, textAlign: 'center' }}>
                                                {helpertext}

                                            </Typography>
                                        </Grid>
                                    )
                                ) : (
                                    <Grid item xs={12}>
                                        {fileNames.map((fileName: { preview: any; }, index: React.Key | null | undefined) => (
                                            <>
                                                <div
                                                    key={index}
                                                    style={{
                                                        backgroundImage: `url(${fileName.preview})`,
                                                        backgroundSize: 'contain',
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no-repeat',
                                                        height: '100px',
                                                        width: 'auto',
                                                        margin: '5px',
                                                    }}
                                                />
                                                <Typography variant='body1' color="primary" sx={{ fontSize: '0.8125rem', mb: 2, textAlign: 'center' }}>
                                                    {helpertext}

                                                </Typography>
                                            </>
                                        ))}
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </div>
                </CardContent>
            </Card >

        </>
    );
};

export default FileUpload;
