import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

export default app;