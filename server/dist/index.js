"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const index_1 = __importDefault(require("./db/index"));
const app_1 = require("./app");
const live_coin_watch_interval_1 = require("./utils/intervals/live-coin-watch-interval");
(0, index_1.default)()
    .then(() => {
    app_1.app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is runing at port ${process.env.PORT}`);
    });
    // liveCoinWatchIntervals
    (0, live_coin_watch_interval_1.liveCoinWatchIntervals)();
})
    .catch((err) => {
    console.log("MONGODB connection error", err);
});
// Gracefully shutdown the server and clear the interval
const gracefulShutdown = () => {
    console.log("Shutting down server...");
    (0, live_coin_watch_interval_1.stopLiveCoinWatchIntervals)();
    process.exit();
};
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
