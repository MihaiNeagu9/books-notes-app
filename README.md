# 📚 Book Notes – Full-Stack Web Application

**Book Notes** is a full-stack web application for tracking books you’ve read, storing personal notes, and rating them.  
The app integrates a public API to automatically fetch book covers and persists all data in a PostgreSQL database.

This project was built to demonstrate practical skills in **Node.js, Express.js, PostgreSQL, and API integration**.

---

## 🔍 Overview

- Server-rendered web application (EJS)
- PostgreSQL database persistence
- External API integration (Open Library)
- Clean, minimal UI focused on content
- Classic MVC-style Express architecture

---

## 🖼️ Screenshots

<img width="1903" height="992" alt="Screenshot 2026-02-05 094621" src="https://github.com/user-attachments/assets/19bb4c23-6de5-4587-b149-8c2ef8e3a14e" />
<img width="1911" height="992" alt="Screenshot 2026-02-05 095052" src="https://github.com/user-attachments/assets/c8d0cbe0-7ab2-41bf-826d-9164d12dedb9" />
<img width="1919" height="991" alt="Screenshot 2026-02-05 095120" src="https://github.com/user-attachments/assets/2f79ddf0-b65f-4cf7-9c81-314b42db9a2c" />


---

## ✨ Key Features

- **CRUD operations** for books (Create, Read, Update, Delete)
- **Persistent storage** using PostgreSQL
- **Sorting functionality**:
  - Most recent
  - Rating (descending)
  - Title (A → Z)
- **Automatic book cover fetching** using Open Library Search API
- Graceful fallback when no cover image is available
- Clean and readable UI without CSS frameworks

---

## 🧠 Technical Skills

- Designed and implemented full CRUD functionality for book management using Express.js and PostgreSQL
- Built server-side rendered pages with EJS, following a clear MVC-style architecture
- Developed RESTful routes and middleware for handling form submissions and data validation
- Wrote SQL queries for sorting data by recency, rating, and title directly at database level
- Integrated a third-party public API (Open Library Search API) to fetch book metadata and cover images
- Implemented graceful fallback logic for missing external API data
- Managed environment-specific configuration using dotenv
- Structured the project for maintainability using reusable EJS partials
- Handled basic error scenarios to prevent UI and server crashes

---

## 🛠 Tech Stack

| Layer        | Technology                     |
|-------------|--------------------------------|
| Backend     | Node.js, Express.js             |
| Database    | PostgreSQL                      |
| Templating  | EJS                             |
| API         | Open Library Search API         |
| HTTP Client | Axios                           |
| Styling     | CSS (custom, no frameworks)     |

---

## 📂 Project Structure

```
book-notes/
├── public/
│   ├── styles/
│   │   └── main.css
│   └── images/
│       └── image.png
│
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── new.ejs
│   └── edit.ejs
│
├── index.js
├── package.json
├── .env
└── README.md
```

---

## 🗄 Database Schema

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  rating INT,
  notes TEXT,
  cover_id INT
);
```

---

## 🌐 External API

**Open Library Search API**

- Used to retrieve book metadata and `cover_i`
- Cover images are generated dynamically:

```
https://covers.openlibrary.org/b/id/{cover_id}-M.jpg
```

---

## ⚙️ Local Setup

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Environment variables (`.env`)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=book_notes
PORT=3000
```

### 3️⃣ Run the app
```bash
npm run start
```

Visit:
```
http://localhost:3000
```

---

## 📌 Design Decisions

- **Server-side rendering** was chosen for simplicity and clarity
- **SQL sorting** ensures correct ordering and better performance
- **Minimal front-end** keeps focus on content
- API failures do not break the UI (fallback cover)

---

## 🚀 Possible Enhancements

- Reading date (`date_read`) instead of ID-based recency
- Pagination or search
- Authentication and user accounts
- Production deployment with environment-based configuration
- Improved validation and error feedback

---

## 👤 Author

Developed by **Neagu Mihai Daniel**  
Junior Developer | Node.js | PostgreSQL  
