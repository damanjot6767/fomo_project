import { getCoinDetailFromLiveCoinApi } from "../../external-services/live-coin-watch-service";
import { createMultipleCoinEntries, getCoinEntriesByCoinIdwithCoinData, getLatestCoinEntryByCoinId } from "../../models/coin-entries-model";
import { ApiError } from "../../utils/api-error";
import { getCoinsService } from "../coin/coin-service";
import { CoinEntry, CoinEntryResponseDto, CreateCoinEntryDto } from "./dto";

//this service internally call by our setInternal function server side
export const createMultipleCoinEntriesService = async (): Promise<any> => {
    try {
        const allCoins = await getCoinsService();

        const newCoinEntries: CoinEntry[] = [];
        allCoins.map(async(coin)=>{

            const coinEntry = await getLatestCoinEntryByCoinIdService(coin._id);
            const newEntry: CoinEntry = await getCoinDetailFromLiveCoinApi(coin._id);

            if(coinEntry.rate!==newEntry.rate){
                newCoinEntries.push(newEntry)
            }
        })
        
        const res = await createMultipleCoinEntries(newCoinEntries);
        return res
    } catch (error) {
        throw error;
    }
}

export const getCoinEntriesByCoinIdwithCoinDataService = async (coinId: string): Promise<CoinEntryResponseDto[]> => {

    const res = await getCoinEntriesByCoinIdwithCoinData(coinId)
    return res
}


//this service internaly use this file only
const getLatestCoinEntryByCoinIdService = async (coinId): Promise<CoinEntryResponseDto> => {

    const res = await getLatestCoinEntryByCoinId(coinId)
    if(!res) throw new ApiError(400, "not found")
    return res
}

