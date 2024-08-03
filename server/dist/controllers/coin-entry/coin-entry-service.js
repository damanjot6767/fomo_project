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
exports.getCoinEntriesByCoinIdwithCoinDataService = exports.createMultipleCoinEntriesService = void 0;
const coin_entries_model_1 = require("../../models/coin-entries-model");
const api_error_1 = require("../../utils/api-error");
//this service internally call by our setInternal function server side
const createMultipleCoinEntriesService = (values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCoinEntries = [];
        values.map((coin) => __awaiter(void 0, void 0, void 0, function* () {
            const coinEntry = yield getLatestCoinEntryByCoinIdService(coin.coinId);
            if (coinEntry) {
                //that means price change when we again fetch coin data;
                if (coinEntry.rate !== coin.rate) {
                    newCoinEntries.push(coin);
                }
            }
        }));
        const res = yield (0, coin_entries_model_1.createMultipleCoinEntries)(newCoinEntries);
        return res;
    }
    catch (error) {
        throw error;
    }
});
exports.createMultipleCoinEntriesService = createMultipleCoinEntriesService;
const getCoinEntriesByCoinIdwithCoinDataService = (coinId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, coin_entries_model_1.getCoinEntriesByCoinIdwithCoinData)(coinId);
    return res;
});
exports.getCoinEntriesByCoinIdwithCoinDataService = getCoinEntriesByCoinIdwithCoinDataService;
//this service internaly use this file only
const getLatestCoinEntryByCoinIdService = (coinId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, coin_entries_model_1.getLatestCoinEntryByCoinId)(coinId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
});
