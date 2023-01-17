const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

app.use("/bookmarks", require("./controllers/bookmarks.js"))

app.get("/", (req, resp) => {
    resp.status(200).send('<h1>Welcome To Bookmarks App Deux</h1>')
})

app.get("*", (req, resp) => {
    resp.status(404).send("Page not found");
  })

 /*  
    - sql DROP database file doesn't run when server is started, manually run when you want to 'hard reset' your database 
    - Do not name a database and a table the same name
    - database bookmarks_dev and our table bookmarks
    - schema: which is the representation of your data model and will also contain db/table(s) set up
    - seed: This is some starter data we can insert into the database

    - npm package called pg-promise; pg-promise will make it simple for us to connect to our Postgres database and allow us to write SQL commands that return JSON to us that we can then send out.
    */

module.exports = app