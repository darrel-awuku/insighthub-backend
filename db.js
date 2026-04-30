const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://insighthub_db_svcl_user:nOx8UbmuKzCljqWFvcq2YVxAfID4tpNv@dpg-d7pbgt7avr4c73em4m90-a/insighthub_db_svcl",
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;