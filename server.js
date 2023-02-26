"use strict";
import express, { json as _json } from "express";
import { readdirSync } from "fs";
import AWS from 'aws-sdk';

const app = express();
const PORT = 5000;
const HOST = "0.0.0.0";
const srv = "http://52.91.127.198:8080";

AWS.config.update({region: 'us-east-1'});

const startPayload = {
   "banner": "<Replace with your Banner ID, e.g. B00123456>",
   "ip": ""
}

fetch(`http://${srv}/start`, {
		method: "POST",
		body: JSON.stringify(startPayload),
		headers: { "Content-Type": "application/json" },
	}).then((res) => res.json()).then((json) => console.log(json));

app.get("/", (req, res) => {
	const response = `"Hello World!" said srv1\n'`;
	res.send(response);
});

// For testing purposes
app.get("/files", (req, res) => {
	const files = [...readdirSync("/usr/src/app/files")];
	res.send(files);
});

app.listen(PORT, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});