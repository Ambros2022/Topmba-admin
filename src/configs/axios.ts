
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

// import axios from 'axios';
// import { Config } from './mainconfig';

// const axiosInstance = axios.create({
//   baseURL: Config.API_URL,
// });

// // Helper: Only cache in the browser
// const isBrowser = typeof window !== 'undefined';

// // Set a default cache time (optional)
// const CACHE_DURATION = 1000 * 60 * 15; // 10 minutes

// function isCacheValid(item) {
//   const { timestamp } = item || {};
//   return Date.now() - timestamp < CACHE_DURATION;
// }

// // Request Interceptor (read cache if GET + in browser)
// axiosInstance.interceptors.request.use(async (config) => {
//   if (isBrowser && config.method === 'get' && config.url) {
//     const cacheKey = `cache_${config.url}`;
//     const cached = sessionStorage.getItem(cacheKey);

//     if (cached) {
//       const parsed = JSON.parse(cached);
//       if (isCacheValid(parsed)) {
//         return Promise.reject({
//           __fromCache: true,
//           data: parsed.data,
//           config,
//         });
//       } else {
//         sessionStorage.removeItem(cacheKey);
//       }
//     }
//   }
//   return config;
// });

// // Response Interceptor: Set cache after GET
// axiosInstance.interceptors.response.use(
//   (response) => {
//     if (
//       isBrowser &&
//       response.config.method === 'get' &&
//       response.config.url
//     ) {
//       const cacheKey = `cache_${response.config.url}`;
//       console.log(cacheKey);
//       sessionStorage.setItem(
//         cacheKey,
//         JSON.stringify({
//           data: response.data,
//           timestamp: Date.now(),
//         })
//       );
//     }
//     return response;
//   },
//   (error) => {
//     // Return cached data if flagged
//     if (error.__fromCache) {
//       return Promise.resolve({
//         data: error.data,
//         status: 200,
//         config: error.config,
//       });
//     }

//     return Promise.reject(
//       (error.response && error.response.data) ||
//         'Something went wrong: ' + error
//     );
//   }
// );

// export default axiosInstance;
