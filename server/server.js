const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const routes = require(path.join(__dirname, "..", "app", "routes", "router"));

app.use(express.static(path.join(__dirname, "..", "app", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "app", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

module.exports = {server, io}