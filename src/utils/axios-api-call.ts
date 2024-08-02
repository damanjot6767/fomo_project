import axios from 'axios';
import { ApiError } from './api-error';

async function AxiosApiCall<T>(
    method: AxiosApiMethodEnum,
    url: string,
    config: any,
    body?: any,
): Promise<T> {
    try {
        const headers = {
            Authorization: `Bearer `, // Add the token here if necessary
            'Content-Type': 'application/json',
        };
        const res = await axios.request({
            ...config,
            headers,
            url,
            method,
            data: body ? body : undefined,
            params: config.params ? config.params : undefined,
        });
        return res.data;
    } catch (e: any) {
        console.log(`MakeAxiosCall ${url}, ${method} error: `, e);
        if (e.response?.status === 400) {
            throw new ApiError(400, e.response.data.message);
        } else if (e.response?.status === 401) {
            throw new ApiError(401, e.response.data.message);
        } else if (e.response?.status === 404) {
            throw new ApiError(404, e.response.data.message);
        } else {
            throw new ApiError(500, e.response.data.message);
        }
    }
}

export enum AxiosApiMethodEnum {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

export { AxiosApiCall }