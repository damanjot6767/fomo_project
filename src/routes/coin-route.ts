import { getCoinBySymbol, getCoins } from "../controllers/coin/coin-controller";
import { getCoinByIdParamJoiValidationObject } from "../controllers/coin/validation";

//for now all apis publically open
const routes = [
    {
		method: 'get',
		path: '/v1/coin/get-all-coins',
		joiSchemaForSwagger: {
			group: 'Coin',
			description: `Route to get all coins of any role.`,
			model: 'Coin',
		},
		middlewares: [],
		auth: false,
		handler: getCoins
	},
    {
		method: 'get',
		path: '/v1/coin/:symbol',
		joiSchemaForSwagger: {
			group: 'Coin',
			description: `Route get coin by id.`,
			params: getCoinByIdParamJoiValidationObject,
		},
		middlewares: [],
		auth: false,
		handler: getCoinBySymbol
	}
]

export default routes;