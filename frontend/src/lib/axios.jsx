import axios from 'axios';

export const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:3000/api' : "https://chat-application-kx10.onrender.com",
=======
  baseURL: import.meta.env.MODE === 'development' 
    ? 'http://localhost:3000/api' 
    : 'https://chat-application-yjeh.onrender.com/api',
>>>>>>> 68d316086c93e2325f88036aa347acbf4a24ce20
  withCredentials: true,
})