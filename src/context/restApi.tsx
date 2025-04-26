import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../config/config';

// Configure axios base URL
axios.defaults.baseURL = `${config.apiUrl}/api/`;

// Create an axios instance
const api = axios.create({
  timeout: config.requestTimeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const tokenStr = await AsyncStorage.getItem('access_token');
      console.log('tokenString =====>', tokenStr);
      if (tokenStr) {
        const token = JSON.parse(tokenStr);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    } catch (error) {
      // console.error('Error retrieving token in interceptor:', error);
      return config;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error);
    }
    // Handle authentication errors
    else if (error.response.status === 401) {
      // Handle token expiration if needed
      console.warn('Authentication error, token may be expired');
    }
    
    return Promise.reject(error);
  }
);

const restApi = {
  postRequest: async (url: string, data?: any) => {
    try {
      const res = await api.post(url, data);
      return res;
    } catch (error: any) {
      // console.error("Error response:", error.response); 
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },
  
  getRequest: async (url: string, params?: any) => {
    try {
      const res = await api.get(url, { params });
      return res;
    } catch (error: any) {
      console.error("Error response:", error.response);
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },
  
  putRequest: async (url: string, data?: any) => {
    try {
      const res = await api.put(url, data);
      return res;
    } catch (error: any) {
      console.error("Error response:", error.response);
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },
  
  deleteRequest: async (url: string) => {
    try {
      const res = await api.delete(url);
      return res;
    } catch (error: any) {
      console.error("Error response:", error.response);
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  }
};

export { restApi };