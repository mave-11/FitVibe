CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NULL,
    last_name TEXT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT NULL,
    gender CHARACTER(1) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
