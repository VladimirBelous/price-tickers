"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

let FETCH_INTERVAL = { time: 5000 };
const PORT = process.env.PORT || 4000;

const tickers = [
  { ticker: "AAPL", name: "Apple" },
  { ticker: "GOOGL", name: "Google" },
  { ticker: "MSFT", name: "Microsoft" },
  { ticker: "AMZN", name: "Amazon" },
  { ticker: "FB", name: "Facebook" },
  { ticker: "TSLA", name: "Tesla" },
];

let curentTickers = [];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket) {
  const quotes = curentTickers.map((ticker) => ({
    ticker: ticker.ticker,
    name: ticker.name,
    glow: "green",
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));
  socket.emit("ticker", quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const timer = setTimeout(function run() {
    getQuotes(socket);
    setTimeout(run, FETCH_INTERVAL.time);
  }, FETCH_INTERVAL.time);

  socket.on("disconnect", function () {
    clearInterval(timer);
  });
}

function getInitialCompanysInfo(socket) {
  getQuotes(socket);
  const quotes = tickers.map((ticker) => ({
    ticker: ticker.ticker,
    name: ticker.name,
    glow: "green",
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));
  socket.emit("init", quotes);
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("initialCompanysInfo", () => {
    getInitialCompanysInfo(socket);
    curentTickers = [];
  });
  socket.on("addCompanyToTrack", (arg) => {
    curentTickers.push(arg);
  });
  socket.on("deleteCompanyFromTrack", (arg) => {
    let indexForDelete;
    curentTickers.map((item, index) => {
      if (item.name === arg) {
        indexForDelete = index;
      }
    });
    curentTickers.splice(indexForDelete, 1);
  });

  socket.emit("reconectt", (arg) => {
    trackTickers(socket);
  });

  socket.on("setTimeout", (arg) => {
    FETCH_INTERVAL.time = arg * 1000;
  });

  socket.on("start", () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
