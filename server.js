"use strict";
import express, { json as _json } from "express";
import { readdirSync } from "fs";
import AWS from "@aws-sdk/client-s3";

const app = express();
const PORT = 5000;
const HOST = "0.0.0.0";
const srv = "52.91.127.198:8080";
const bucket = "b00847680a2bucket";
const bucketURL = `https://${bucket}.s3.amazonaws.com`;
const filename = "test";
let content = ""; // yes im cheating a little

const startPayload = {
	banner: "B00847680",
	ip: "3.239.32.108",
};

const s3 = new AWS.S3({ region: "us-east-1" });

app.get("/", (req, res) => {
	const response = `"Hello World!" said srv1\n'`;
	res.send(response);
});

app.post("/storedata", _json(), async (req, res) => {
	console.log("Creating file with content: " + req.body.data);
	content = req.body.data;

	await s3.putObject({
		Bucket: bucket,
		Key: filename,
		Body: content,
		ContentType: "text",
	});

	res.send({ s3uri: `${bucketURL}/test` });
});

app.post("/appenddata", _json(), async (req, res) => {
	const data = req.body.data;
	console.log("Appending " + data);

	content = `${content}${data}`;
	console.log(content);

	await s3.putObject({
		Bucket: bucket,
		Key: filename,
		Body: content,
		ContentType: "text",
	});

	res.sendStatus(200);
});

app.post("/deletefile", _json(), async (req, res) => {
	const data = req.body.data;
	console.log("Deleting " + data);

	await s3.deleteObject({
		Bucket: bucket,
		Key: filename
	});

	res.sendStatus(200);
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
