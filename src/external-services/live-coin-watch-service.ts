//this service internally call by our setInternal function server side

import { AxiosApiCall, AxiosApiMethodEnum } from "../utils/axios-api-call";

const liveCoinApiConfig = {
    baseUrl: process.env.LIVE_COIN_API_URL,
    apiKey: process.env.LIVE_COIN_API_SECRET
}

export const getCoinsFromLiveCoinApi = async (): Promise<any> => {
    try {

        const res: any = await AxiosApiCall(AxiosApiMethodEnum.GET,`${liveCoinApiConfig.baseUrl}/coinlist`,{},{})
        const newData = res.map((coin:any)=>({
            _id: coin.code,
            name: coin.name,
            symbol: coin.symbol,
            code: coin.code,
            rank: coin.rank,
            image: coin.image,
            allTimeHighUSD: coin.allTimeHighUSD,
            rate: coin.rate,
            volume: coin.volume,
            percentageChangeInPrice: {
                hour: (coin.delta.hour-1)*100,// converting price change in percentage
                day: (coin.delta.day-1)*100,
                week: (coin.delta.hour-1)*100,
            }
        }))
        return newData
    } catch (error) {
        throw error;
    }
}


export const getCoinDetailFromLiveCoinApi= async (symbol): Promise<any> => {
    try {

        const res: any = await AxiosApiCall(AxiosApiMethodEnum.GET,`${liveCoinApiConfig.baseUrl}/coin/${symbol}`,{},{})
        return res
    } catch (error) {
        throw error;
    }
}