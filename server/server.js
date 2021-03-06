import express from "express";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/index.js";
import generateForexPrice from "./generateForexPrice.js";
import generateDepositPrice from "./generateDepositPrice.js";

const PORT = 8001 || env.PORT;

const app = express();
app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => emitPrices(socket), 4000);

  socket.on("disconnet", () => {
    console.log("Client Disconnected");
    clearInterval(interval);
  });
});

const emitPrices = (socket) => {
  const eurRon = generateForexPrice("EUR/RON", 4, 3.98);
  const ronEur = generateForexPrice("RON/EUR", 0.2, 0.19);
  const eurUsd = generateForexPrice("EUR/USD", 0.88, 0.85);
  const usdEur = generateForexPrice("USD/EUR", 1.2, 1.19);
  const gbpEur = generateForexPrice("GBP/EUR", 0.68, 0.6);
  const eurGbp = generateForexPrice("EUR/GBP", 1.68, 1.6);
  const eur = generateDepositPrice("EUR", 1.2);
  const ron = generateDepositPrice("RON", 2.01);
  const usd = generateDepositPrice("USD", 1.87);
  const gbp = generateDepositPrice("GBP", 1.54);
  const nok = generateDepositPrice("NOK", 0.68);
  const huf = generateDepositPrice("HUF", 6);
  const jpy = generateDepositPrice("JPY", 6.3);
  const aud = generateDepositPrice("AUD", 0.21);
  const cad = generateDepositPrice("CAD", 0.10);
  const sek = generateDepositPrice("SEK", 1.11);
  const brl = generateDepositPrice("BRL", 3.3);
  const pln = generateDepositPrice("PLN", 4.21);

  socket.emit("eurRon", eurRon);
  socket.emit("ronEur", ronEur);
  socket.emit("eurUsd", eurUsd);
  socket.emit("usdEur", usdEur);
  socket.emit("gbpEur", gbpEur);
  socket.emit("eurGbp", eurGbp);
  socket.emit("eur", eur);
  socket.emit("ron", ron);
  socket.emit("usd", usd);
  socket.emit("gbp", gbp);
  socket.emit("nok", nok);
  socket.emit("huf", huf);
  socket.emit("jpy", jpy);
  socket.emit("aud", aud);
  socket.emit("cad", cad);
  socket.emit("sek", sek);
  socket.emit("brl", brl);
  socket.emit("pln", pln);
};

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
