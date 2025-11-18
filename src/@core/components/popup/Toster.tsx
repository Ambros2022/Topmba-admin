import { Toaster } from 'react-hot-toast';
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast';

const Footer = () => {


  return (
    <>
        <ReactHotToast>
          <Toaster position="top-right" toastOptions={{ className: 'react-hot-toast' }} />
        </ReactHotToast>
   
    </>
  );
};
export default Footer;
