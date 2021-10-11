require("dotenv").config();
const Pool = require("pg").Pool;

let pool;
if (process.env.NODE_ENV === "production") {
   pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}else{
pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  dialect: process.env.DATABASE_DIALECT,
  port: process.env.DATABASE_PORT,  
});
}



module.exports = pool;
