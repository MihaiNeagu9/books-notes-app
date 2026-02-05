import express from "express";
import dotenv from "dotenv";
import axios from "axios";

const app = express();
const port = 3000;

dotenv.config();
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Open Library Search API

async function fetchCoverId(title, author) {
  if (!title) return null;

  const params = new URLSearchParams();
  params.set("title", title);
  if (author) params.set("author", author);
  params.set("limit", "5");

  const url = `https://openlibrary.org/search.json?${params.toString()}`;

  try {
    const response = await axios.get(url);
    const docs = response.data.docs || [];

    const withCover = docs.find(d => d.cover_i);
    return withCover ? withCover.cover_i : null;
  } catch (err) {
    console.error("OpenLibrary error:", err.message);
    return null;
  }
}


app.get("/", async (req, res) => {
  const sort = req.query.sort || "recent";

  let orderBy = "id DESC";
  if (sort === "rating") orderBy = "rating DESC NULLS LAST";
  if (sort === "title") orderBy = "title ASC";

  try {
    const result = await pool.query(`
      SELECT id, title, author, rating, notes, cover_id
      FROM books
      ORDER BY ${orderBy}
    `);

    res.render("index.ejs", {
      books: result.rows,
      sort
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
}); 

app.get("/books/new", (req, res) => {
  res.render("new.ejs", { sort: "recent" });
});

app.post("/books", async (req, res) => {
  const { title, author, rating, notes } = req.body;

  try {
    const cover_id = await fetchCoverId(title, author);

    await pool.query(
      `INSERT INTO books (title, author, rating, notes, cover_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [title, author || null, rating ? Number(rating) : null, notes || null, cover_id]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Insert error");
  }
});


app.get("/books/:id/edit", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }

    res.render("edit.ejs", {
      book: result.rows[0],
      sort: "recent"
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});


app.post("/books/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, author, rating, notes } = req.body;

  try {
    const cover_id = await fetchCoverId(title, author);

    await pool.query(
      `UPDATE books
       SET title = $1, author = $2, rating = $3, notes = $4, cover_id = $5
       WHERE id = $6`,
      [title, author || null, rating ? Number(rating) : null, notes || null, cover_id, id]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update error");
  }
});


app.post("/books/:id/delete", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Delete error");
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});