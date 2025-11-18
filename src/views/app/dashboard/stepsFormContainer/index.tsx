import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios1 from 'src/configs/adminaxios';
import toast from 'react-hot-toast';
import StepsForm from './stepsForm';

interface StepsFormContainerProps {
    isAddMode: boolean;
    olddata: any;
}

const StepsFormContainer: React.FC<StepsFormContainerProps> = ({ isAddMode, olddata }) => {
    const [loading] = useState<boolean>(false);
    const router = useRouter();


    const onStepsSubmit = async (formData: FormData, index: number | null = null, setSubmitLoading: (loading: boolean) => void) => {
        setSubmitLoading(true);
        formData.append('organization_page_id', olddata.id);

        try {
            let url = '';
            let response;

            if (index !== null && olddata.organizatiopagesteps && olddata.organizatiopagesteps[index]) {
                const step = olddata.organizatiopagesteps[index];
                url = 'api/admin/organizationpagesteps/update';
                formData.append('id', step.id);
                response = await axios1.post(url, formData);
            } else {
                url = 'api/admin/organizationpagesteps/add';
                response = await axios1.post(url, formData);
            }

      
            if (response.data.status === 1) {
                toast.success(response.data.message);
             
                router.reload(); 
            } else {
                toast.error(response.data.message);
           
            }
        } catch (err: any) {
         
            toast.error(err.message || 'Please try again');
        } finally {
            setSubmitLoading(false);
        }
    };




    const handleDelete = async (index: number, setDeleteLoading: (index: number | null) => void) => {
        const step = olddata.organizatiopagesteps[index];
        setDeleteLoading(index);

        try {
            const response = await axios1.post(`api/admin/organizationpagesteps/delete/${step.id}`);
            if (response.data.status === 1) {
                toast.success('Step deleted successfully');
                router.reload();
            } else {
                toast.error('Failed to delete step');
            }
        } catch (err: any) {
            toast.error(err.message || 'Please try again');
        } finally {
            setDeleteLoading(null);
        }
    };

    return (
        <StepsForm
            isAddMode={isAddMode}
            olddata={olddata}
            onSubmit={onStepsSubmit}
            onDelete={handleDelete}
            loading={loading}
        />
    );
};

export default StepsFormContainer;