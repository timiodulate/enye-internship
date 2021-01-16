const exchangeHelper = require("../helpers/exchange_rate_helper");

// Controller for the rate route
const ratesController = (req, res, next) => {
	const baseCode = req.query.base;
	const wantedCurrencies = req.query.currency.split(",");

	exchangeHelper.getParticularBase(baseCode, (err, responseData) => {
		const response = {
			results: {
				base: "",
				date: "",
				rates: {},
			},
		};

		if (!err && responseData) {
			response.results.base = responseData.base;
			response.results.date = responseData.date;

			for (i = 0; i < wantedCurrencies.length; i++) {
				if (responseData.rates[wantedCurrencies[i]]) {
					response.results.rates[wantedCurrencies[i]] =
						responseData.rates[wantedCurrencies[i]];
				} else {
					return res.json({
						Error:
							"Couldn't find the currency " + wantedCurrencies[i],
					});
				}
			}
			res.json(response);
		} else {
			console.log(err);
		}
	});
	// res.send("Hello World from the rates route");
};

module.exports.ratesController = ratesController;
