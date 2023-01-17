// import database configuration to this file
const db = require("../database/databaseConfig.js")

// an async function. We need to wait for the database's response before we try to return a value.
const getAllBookmarks = async () => {
//  set up a try/catch block so that if we have a problem, we can (likely) get a more informative error.
/* 
    db.any() is a function that takes a string as a first argument.

.any() means it will accept any return from the database, no rows, one row, or many rows of data.
*/
    try {
        const allBookmarks = await db.any('SELECT * FROM bookmarks')
        return allBookmarks
    } catch(error) {
        return error
    }
}




module.exports = {
    getAllBookmarks,
}