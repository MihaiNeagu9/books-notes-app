import { Router } from "express";
import {
  listBooks,
  renderNew,
  createBook,
  renderEdit,
  updateBook,
  deleteBook,
} from "../controllers/books.controller.js";

const router = Router();

// Routes
router.get("/", listBooks);
router.get("/new", renderNew);
router.post("/add", createBook);
router.get("/edit/:id", renderEdit);
router.post("/update/:id", updateBook);
router.post("/delete/:id", deleteBook);

export default router;
