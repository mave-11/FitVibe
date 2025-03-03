const { Pool } = require("pg");

const pool = new Pool({
  user: "root",
  host: "db",
  database: "example",
  password: "example",
  port: 5432,
});

module.exports = pool;
