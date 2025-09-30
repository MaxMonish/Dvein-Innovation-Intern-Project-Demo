// backend/server.js
const express=require("express");
const dotenv=require("dotenv")
const http=require("http");
const app=require("./app");
const connectDB=require("../backend/src/config/db");
require("dotenv").config();

dotenv.config();
connectDB();


app.use(express.json());

const authRoutes=require("../backend/src/routes/authRoutes");

app.use("/api/auth", authRoutes);

const PORT=process.env.PORT || 5000;

const server=http.createServer(app);

app.get("/", (req,res) => {
    res.send("API is running and connected to server!");
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});