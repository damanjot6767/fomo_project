"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopLiveCoinWatchIntervals = exports.liveCoinWatchIntervals = void 0;
const coin_entry_service_1 = require("../../controllers/coin-entry/coin-entry-service");
const coin_service_1 = require("../../controllers/coin/coin-service");
let intervalId;
const liveCoinWatchIntervals = () => {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Promise.all([(0, coin_service_1.createMultipleCoinsService)(), (0, coin_entry_service_1.createMultipleCoinEntriesService)()]);
        }
        catch (error) {
            console.error("Error in liveCoinWatchIntervals:", error);
        }
    }), 2000); // every two seconds we call these APIs
};
exports.liveCoinWatchIntervals = liveCoinWatchIntervals;
const stopLiveCoinWatchIntervals = () => {
    if (intervalId) {
        clearInterval(intervalId);
        console.log("Stopped live coin watch intervals.");
    }
};
exports.stopLiveCoinWatchIntervals = stopLiveCoinWatchIntervals;
