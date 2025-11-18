import axios from 'axios';
import { Config } from './mainconfig';


 const axiosInstance = axios.create({
  baseURL: Config.API_URL,
  
 });


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong'+error)
);

export default axiosInstance;
