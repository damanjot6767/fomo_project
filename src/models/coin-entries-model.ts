import mongoose, { Schema, Document, Types } from 'mongoose';
import { ApiError } from '../utils/api-error';
import { CoinEntryResponseDto, CreateCoinEntryDto } from '../controllers/coin-entry/dto';



export const coinEntriesSchema = new Schema(
    {
        coinId: {
            type: String,
            ref: 'Coins'
        },
        rate: {
            type: Number,
            required: true
        },
        volume: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export const CoinEntriesModel = mongoose.model('CoinEntries', coinEntriesSchema);


// coinEntries Services

export const getLatestCoinEntryByCoinId = async ( coinId: string): Promise<CoinEntryResponseDto> => {
    try {
        const res: any = await CoinEntriesModel.findOne({ coinId }, { sort: { createdAt: -1 } });
        return res
    } catch (error) {
        throw new ApiError(500, "Something went wrong while finding latest coi entry by coin id")
    }
}

export const getCoinEntriesByCoinIdwithCoinData = async (coinId: string, page: number = 1, limit: number = 10): Promise<CoinEntryResponseDto[]> => {
    try {
        const coinEntries: any = await CoinEntriesModel.aggregate([
            {
                $match: {
                    coinId: coinId
                }
            },
            {
                $lookup: {
                    from: 'coins',
                    foreignField: "_id",
                    localField: "coinId",
                    as: "coin"
                }
            },
            {
                $skip: (page - 1) * limit // Skip documents based on the current page
            },
            {
                $limit: limit // Limit the number of documents per page
            }
        ]);

        return coinEntries;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while finding coin entries")
    }
}

export const createMultipleCoinEntries = async (values: CreateCoinEntryDto[]): Promise<any> => {
    try {
        const res = await CoinEntriesModel.insertMany(values);
        return res
    } catch (error) {
        throw new ApiError(500, "something went wrong while create multiple coin entries")
    }
}



