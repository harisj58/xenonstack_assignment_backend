import http from "http";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const parseCookies = (request) => {
  const cookies = {};
  request.headers.cookie &&
    request.headers.cookie.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      cookies[parts[0].trim()] = parts[1].trim();
    });
  return cookies;
};

const server = http.createServer((req, res) => {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Welcome to the backend!" }));
});

server.listen(PORT, (err) => {
  if (err) {
    return console.error("Error starting the server:", err);
  }
  console.log(`Server is listening on port ${PORT}`);
});
