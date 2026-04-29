const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "viper7thegamer",
  host: "localhost",
  port: 5432,
  database: "insighthub"
});

module.exports = pool;