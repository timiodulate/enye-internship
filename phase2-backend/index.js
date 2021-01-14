const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const api = express();

const HOST = "localhost";
const PORT = 8888;

const urlencodedParser = bodyParser.urlencoded({ extended: false });

api.get("/", (req, res) => {
	res.send("Welcome! go to /api/rates");
});

api.get("/api/rates", (req, res) => {
	res.sendFile(path.join(__dirname + "/index.html"));
});

api.post("/api/rates", urlencodedParser, (req, res) => {
	console.log(req.body);
	res.send({
		results: { ...req.body },
	});

	// res.sendFile(path.join(__dirname + "/query.html"), {data: req.body});
});

api.listen(PORT, () => {
	console.log(`API running at ${HOST}:${PORT}`);
});
