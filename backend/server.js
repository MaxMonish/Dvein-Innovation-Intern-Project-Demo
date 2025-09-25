const http=require("http");
const app=require("./app");
const connectDB=require("../backend/src/config/db");
require("dotenv").config();

connectDB();

const PORT=process.env.PORT || 5000;

const server=http.createServer(app);

app.get("/", (req,res) => {
    res.send("API is running and connected to server!");
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});