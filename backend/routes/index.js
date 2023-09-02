import express from "express";
import { Login, Logout, Register, getUsers } from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { addBook, deleteBook, getBooks, updateBook } from "../controllers/book.js";
import { upload, serveStatic } from "../middleware/multer.js";

const router = express.Router();
router.use("/upload", serveStatic);
//User
router.get("/users", verifyToken, getUsers); //tidak dapat access jika tidak login
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

//Book
router.get("/books",verifyToken, getBooks);
router.post("/books", verifyToken, upload.single("photo"), addBook);
router.put("/books/:id", verifyToken, upload.single("photo"), updateBook);
router.delete("/books/:id",verifyToken, deleteBook)

export default router;
