import pool from "../db/pool.js";
import { fetchCoverId } from "../services/openLibrary.service.js";
import { normalizeBookPayload, parseId } from "../utils/normalizeBook.js";

const SORT_MAP = {
  recent: "id DESC",
  rating: "rating DESC NULLS LAST",
  title: "title ASC",
};

export async function listBooks(req, res) {
  try {
    const sort = req.query.sort;
    const orderBy = SORT_MAP[sort] || SORT_MAP.recent;

    const result = await pool.query(`SELECT * FROM books ORDER BY ${orderBy};`);
    res.render("index.ejs", { books: result.rows, sort: sort || "recent" });
  } catch (err) {
    console.error("listBooks error:", err);
    res.status(500).send(err?.message || "Server error.");
  }
}

export function renderNew(req, res) {
  res.render("new.ejs");
}

export async function createBook(req, res) {
  try {
    const { title, author, rating, notes } = normalizeBookPayload(req.body);
    const coverId = await fetchCoverId(title, author);

    await pool.query(
      "INSERT INTO books (title, author, rating, notes, cover_id) VALUES ($1, $2, $3, $4, $5);",
      [title, author, rating, notes, coverId]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(400).send(err?.message || "Bad request.");
  }
}

export async function renderEdit(req, res) {
  try {
    const id = parseId(req.params.id);

    const result = await pool.query("SELECT * FROM books WHERE id = $1;", [id]);
    const book = result.rows[0];

    if (!book) return res.status(404).send("Book not found.");

    res.render("edit.ejs", { book });
  } catch (err) {
    console.error(err);
    res.status(400).send(err?.message || "Bad request.");
  }
}

export async function updateBook(req, res) {
  try {
    const id = parseId(req.params.id);
    const { title, author, rating, notes } = normalizeBookPayload(req.body);
    const coverId = await fetchCoverId(title, author);

    const result = await pool.query(
      "UPDATE books SET title=$1, author=$2, rating=$3, notes=$4, cover_id=$5 WHERE id=$6 RETURNING id;",
      [title, author, rating, notes, coverId, id]
    );

    if (result.rowCount === 0) return res.status(404).send("Book not found.");

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(400).send(err?.message || "Bad request.");
  }
}

export async function deleteBook(req, res) {
  try {
    const id = parseId(req.params.id);

    const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING id;", [id]);
    if (result.rowCount === 0) return res.status(404).send("Book not found.");

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(400).send(err?.message || "Bad request.");
  }
}
