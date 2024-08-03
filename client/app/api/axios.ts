import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ErrorResponse } from '../utils/error-response-model';

interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers?: any
}



const apiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:8000`,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000
};

const axiosInstance: AxiosInstance = axios.create(apiConfig);

axiosInstance.interceptors.request.use((req: any) => {
  try {

    const accessToken = true
    if (accessToken) {
      req.headers.Authorization = `${accessToken}`;
    }
    return req;
  } catch (error) {
    console.error("error", error);
  }
});

// Error handling interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorResponse: ErrorResponse = {};
      

    if (error.response) {
      // The request was made and the server responded with a status code
      errorResponse.status = error.response.status;
      errorResponse.message = error.message;
      errorResponse.data = error.response.data as any;
    } else if (error.request) {
      // The request was made but no response was received
      errorResponse.message = 'Request Error';
    } else {
      // Something happened in setting up the request
      errorResponse.message = error.message;
    }

    return Promise.reject(errorResponse);
  }
);

// API methods
const api = {
  // GET request
  get: <T>(url: string): Promise<AxiosResponse<T>> => axiosInstance.get<T>(url),

  // POST request
  post: <T>(url: string, data: any): Promise<AxiosResponse<T>> =>
    axiosInstance.post<T>(url, data),

  // PUT request
  put: <T>(url: string, data: any): Promise<AxiosResponse<T>> =>
    axiosInstance.put<T>(url, data),

  // DELETE request
  delete: <T>(url: string): Promise<AxiosResponse<T>> => axiosInstance.delete<T>(url),
};

export default api;

//----------------------------------------------------------------------coin
export const fetchCoins = () => axiosInstance.get('/v1/coin/get-all-coins');
export const fetchCoinEntriesByCode = (code: string) => axiosInstance.get(`/v1/coin-entries/${code}`)

