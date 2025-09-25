const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require("axios");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

// 🔑 get real route using OSRM (open source)
async function getRoute(start, end) {
  try {
  const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
  const res = await axios.get(url);
  const coords = res.data.routes[0].geometry.coordinates;
  // convert [lng, lat] → {lat, lng}
  return coords.map(([lng, lat]) => ({ lat, lng }));
  } catch (error) {
    console.log(error.message);
  }
}

io.on("connection", (socket) => {

  socket.on("startRide", async ({ start, end }) => {
    console.log("Ride started:", start, "→", end);

    try {
      const path = await getRoute(start, end);
      let index = 0;

      const interval = setInterval(() => {
        if (index >= path.length) {
          clearInterval(interval);
          socket.emit("rideComplete");
          return;
        }
        socket.emit("locationUpdate", { current: path[index], path });
        index++;
      }, 1000); // 1 update per second
    } catch (err) {
      console.error("Route error:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(4000, () => console.log("🚀 Server running on port 4000"));