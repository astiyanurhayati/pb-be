import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./models/index.js";
import "dotenv/config";
import router from "./routes/index.js";

const app = express();

db.sequelize.sync();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://idceritaku.com", "https://4a88-114-10-79-33.ngrok-free.app/"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", router);

app.get("/", (req, res) => {
  return res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Running in 5000");
});
