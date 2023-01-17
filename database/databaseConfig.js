/* 
    - npm package called pg-promise; pg-promise will make it simple for us to connect to our Postgres database and allow us to write SQL commands that return JSON to us that we can then send out.
    - server will now make requests to the database
*/

// pgp - postgres promise/ require and call it () (function)
const pgp = require("pg-promise")()
// allow to access files on .env file (using those variables)
require("dotenv").config()
// open the connection with const db = pgp(cn);
// cn - is short for connection -> Connection Object
const cn = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
  };
  
// db is connection between postgres and our database bookmarks_dev (.env variable PG_DATABASE)
  const db = pgp(cn);




module.exports = db