require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

// Declare app
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// default route for server
app.get("/", (req, res) =>
	res.status(200).send({
		message: "Server is ruuning...",
	})
);

const WriteToFileAsync = async (contentToWrite) => {
	fs.writeFile("./client/src/data.json", contentToWrite, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Done writing to file...");
		}
	});
};

// Declare post / write route to accept incoming request with data
app.post("/write", async (req, res, next) => {
	// take the body from incoming request by using req.body and convert it into string
	const requestContent = JSON.stringify(req.body);
	await WriteToFileAsync(requestContent);
});

// 404 route for server
app.use((req, res, next) =>
	res.status(404).send({
		message: "Requested route not found...!",
	})
);

app.listen(PORT, () => {
	console.log(`Listening for incoming requests on port ${PORT}`);
});
