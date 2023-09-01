import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import Books from './models/bookModel.js'
dotenv.config();

const app = express();
const port = 5000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
  // await Books.sync(); //membuat table apabila tidak ada
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
//agar dapat dipakai domain lain, origin adalah domain yg diizinkan menggunakannya
app.use(cookieParser()); //mengambil value dari cookie
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
