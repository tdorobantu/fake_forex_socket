import express from "express";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/index.js";
import generatePrice from "./generatePrice.js";

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
  const eurRon = generatePrice("EUR/RON", 4, 3.98);
  const ronEur = generatePrice("RON/EUR", 0.2, 0.19);
  const eurUsd = generatePrice("EUR/USD", 0.88, 0.85);
  const usdEur = generatePrice("USD/EUR", 1.2, 1.19);
  const gbpEur = generatePrice("GBP/EUR", 0.68, 0.6);
  const eurGbp = generatePrice("EUR/GBP", 1.68, 1.6);

  socket.emit("eurRon", eurRon);
  socket.emit("ronEur", ronEur);
  socket.emit("eurUsd", eurUsd);
  socket.emit("usdEur", usdEur);
  socket.emit("gbpEur", gbpEur);
  socket.emit("eurGbp", eurGbp);
};

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
