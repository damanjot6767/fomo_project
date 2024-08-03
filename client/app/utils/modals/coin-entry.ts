import { CoinModal } from ".";

export interface CoinEntryModal {
    _id: string;
    rate: number;
    volume: number;
    coinId: number;
    percentageChangeInPrice: {
        hour: number;
        day: number;
        week: number;
    };
    coin : CoinModal
    createdAt?: Date;
    updatedAt?: Date;
}

