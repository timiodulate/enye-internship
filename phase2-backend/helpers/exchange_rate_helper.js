const https = require("https");
const { StringDecoder } = require("string_decoder");

const decoder = new StringDecoder("utf-8");

const exchangeHelper = {};

exchangeHelper.url = "https://api.exchangeratesapi.io/latest";

exchangeHelper.getParticularBase = (baseCode, callback) => {
	const req = https.request(
		exchangeHelper.url + "?base=" + baseCode,
		(res) => {
			let data = "";

			res.on("data", (response) => {
				data += decoder.write(response);
			});

			res.on("end", () => {
				data += decoder.end();
				const returnData = JSON.parse(data);

				callback(false, returnData);
			});
		}
	);

	req.on("error", (e) => {
		callback(e, false);
	});

	req.end();
};

module.exports = exchangeHelper;
