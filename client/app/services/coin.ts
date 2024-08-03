import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCoins, fetchCoinEntriesByCode } from "../api/axios";

export const getCoins = createAsyncThunk('CoinSlice/getCoins', async (_, thunkApi) => {
    try {
        const {data} = await fetchCoins()
        return thunkApi.fulfillWithValue(data.data)
    } catch (err) {
        const error: any = err;
        return thunkApi.rejectWithValue(error.response?.status)
    }
})

export const getCoinEntriesByCode = createAsyncThunk<any, any>('CoinSlice/getCoinEntriesByCode', async (params, thunkApi) => {
    try {
        const {data} = await fetchCoinEntriesByCode(params?.code)
        return thunkApi.fulfillWithValue(data.data)
    } catch (err) {
        const error: any = err;
        return thunkApi.rejectWithValue(error.response?.status)
    }
})



