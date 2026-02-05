import express from "express";
import booksRouter from "./routes/books.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", booksRouter);

export default app;