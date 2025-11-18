import React from 'react';
import { ReactNode } from 'react'
import BamsPage from 'src/views/BamsPage';// Adjust the import if needed
import dynamic from 'next/dynamic'
const BlankLayout = dynamic(() => import('src/@core/layouts/BlankLayout'))

const BamsCounsellingProcess = () => {
    return <BamsPage />;
};
BamsCounsellingProcess.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
BamsCounsellingProcess.guestGuard = true
export default BamsCounsellingProcess;