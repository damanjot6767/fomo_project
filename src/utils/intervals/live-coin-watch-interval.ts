import { createMultipleCoinEntriesService } from "../../controllers/coin-entry/coin-entry-service";
import { createMultipleCoinsService } from "../../controllers/coin/coin-service";
import { CoinResponseDto } from "../../controllers/coin/dto";
import { getCoinsFromLiveCoinApi } from "../../external-services/live-coin-watch-service";

let intervalId: NodeJS.Timeout;

export const liveCoinWatchIntervals= async() => {
    // setInterval(async () => {
        try {
            const coins: CoinResponseDto[] = await getCoinsFromLiveCoinApi();
            
            await createMultipleCoinsService(coins);

            const coinEntries = await coins.map((coin)=>({
                coinId: coin.code,
                rate: coin.rate,
                volume: coin.volume,
                percentageChangeInPrice: coin.percentageChangeInPrice
            }))
            await createMultipleCoinEntriesService(coinEntries)
        } catch (error) {
            console.error("Error in liveCoinWatchIntervals:", error);
        }
    // }, 2000); // every two seconds we call these APIs
}

export const stopLiveCoinWatchIntervals = () => {
    if (intervalId) {
        clearInterval(intervalId);
        console.log("Stopped live coin watch intervals.");
    }
};