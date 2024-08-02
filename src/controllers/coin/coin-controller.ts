import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";
import { getCoinBySymbolService, getCoinsService } from "./coin-service";

export const getCoins = asyncHandler(async (req, res) => {

    const response = await getCoinsService()

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'coins get successfully'
            )
        )
})

export const getCoinBySymbol = asyncHandler(async (req, res) => {

    const response = await getCoinBySymbolService(req.params.symbol)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'Coin get successfully'
            )
        )
})