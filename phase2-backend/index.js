const express = require("express");
const { ratesController } = require("./controllers/rates_controller");
const PORT = process.env.PORT || 4000;

const app = express();

// Middle wares
app.use(express.json());

app.get("/api/rates", ratesController);

app.listen(PORT, () => {
	console.log("The app is listening at http://localhost:" + PORT);
});
