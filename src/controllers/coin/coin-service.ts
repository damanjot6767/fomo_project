import { getCoinsFromLiveCoinApi } from "../../external-services/live-coin-watch-service";
import { createMultipleCoins, getCoinBySymbol, getCoins, updateMultipleCoins } from "../../models/coin-model";
import { ApiError } from "../../utils/api-error";
import { CoinResponseDto, CreateCoinDto, UpdateCoinDto } from "./dto";

//this service internally call by our setInternal function server side
export const createMultipleCoinsService = async (): Promise<any> => {
    try {
        const coins: CreateCoinDto[] = await getCoinsFromLiveCoinApi()
        const res = await createMultipleCoins(coins);
        return res
    } catch (error) {
        throw error;
    }
}

//this service internally call by our setInternal function server side
export const updateMultipleCoinsService = async (values: CreateCoinDto[]): Promise<any> => {
    try{
        const res = await updateMultipleCoins(values);
        return res
    } catch (error) {
        throw error;
    }
}


export const getCoinsService = async (): Promise<CoinResponseDto[]> => {

    const res = await getCoins()
    return res
}

export const getCoinBySymbolService = async (symbol): Promise<CoinResponseDto> => {

    const res = await getCoinBySymbol(symbol)
    if(!res) throw new ApiError(400, "not found")
    return res
}
