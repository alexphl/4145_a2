"use strict";
import express from "express";
import { readdirSync } from "fs";
import AWS from "@aws-sdk/client-s3";

const app = express();
const PORT = 5000;
const HOST = "0.0.0.0";
const srv = "52.91.127.198:8080";
const bucket = "b00847680a2bucket";

const startPayload = {
	banner: "B00847680",
	ip: "3.235.3.150",
};

const s3 = new AWS.S3({ region: "us-east-1" });

app.get("/", (req, res) => {
	const response = `"Hello World!" said srv1\n'`;
	res.send(response);
});

// For testing purposes
app.get("/files", (req, res) => {
	const files = [...readdirSync("/usr/src/app/files")];
	res.send(files);
});

app.post("/storedata", (req, res) => {
	const content = req.body;
	console.log("Content " + content);
	res.send({ s3uri: "" });
});

app.listen(PORT, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});

await fetch(`http://${srv}/start`, {
	method: "POST",
	body: JSON.stringify(startPayload),
	headers: { "Content-Type": "application/json" },
})
	.then((res) => res.text())
	.then((text) => console.log(text));
