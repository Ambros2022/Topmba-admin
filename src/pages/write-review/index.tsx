import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout';
import WriteReviewPage from 'src/views/WriteReviewPage';
import dynamic from 'next/dynamic';

// Dynamic import for ConditionalModal
const ConditionalModal = dynamic(() => import('src/@core/layouts/components/Header/ConditionalModal'), { ssr: false });

const WriteReview = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (!localStorage.getItem('UserData')) {
      setShowModal(true);
    }
  }, [showModal, router]);

  return (
    <>
      <WriteReviewPage />
      {showModal && <ConditionalModal showModal={showModal} closeModal={closeModal} />}
    </>
  );
};

WriteReview.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>;

WriteReview.guestGuard = true;

export default WriteReview;
