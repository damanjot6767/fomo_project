import { createMultipleCoinEntriesService } from "../../controllers/coin-entry/coin-entry-service";
import { createMultipleCoinsService } from "../../controllers/coin/coin-service";

let intervalId: NodeJS.Timeout;

export const liveCoinWatchIntervals= () => {
    setInterval(async () => {
        try {
            await Promise.all([createMultipleCoinsService(), createMultipleCoinEntriesService()]);
        } catch (error) {
            console.error("Error in liveCoinWatchIntervals:", error);
        }
    }, 2000); // every two seconds we call these APIs
}

export const stopLiveCoinWatchIntervals = () => {
    if (intervalId) {
        clearInterval(intervalId);
        console.log("Stopped live coin watch intervals.");
    }
};