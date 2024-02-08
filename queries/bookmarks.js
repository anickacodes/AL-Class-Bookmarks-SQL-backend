// import database configuration to this file
const db = require("../database/databaseConfig.js");

// an async function. We need to wait for the database's response before we try to return a value.
// const getAllBookmarks = async () => {
// //  set up a try/catch block so that if we have a problem, we can (likely) get a more informative error.
// /*
//     db.any() is a function that takes a string as a first argument.

// .any() means it will accept any return from the database, no rows, one row, or many rows of data.
// */
//     try {
//         const allBookmarks = await db.any('SELECT * FROM bookmarks')
//         return allBookmarks
//     } catch(error) {
//         return error
//     }
// }

const getAllBookmarks = async (name) => {
  //  set up a try/catch block so that if we have a problem, we can (likely) get a more informative error.
  /* 
      db.any() is a function that takes a string as a first argument.
  
  .any() means it will accept any return from the database, no rows, one row, or many rows of data.
  */
  try {
    let allBookmarks;

    if (name) {
      allBookmarks = await db.any(
        "SELECT * FROM bookmarks where name LIKE $1, `%{name}%`"
      );
    } else {
      allBookmarks = await db.any("SELECT * FROM bookmarks");
    }
    return allBookmarks;
  } catch (error) {
    return error;
  }
};

// get one bookmark
async function getOneBookmark(idValue) {
  // db.one because we expect one row to be returned (returns object)
  // $1 rather than inserting the value, as we might if it were a JavaScript string interpolation. <- to prevent SQL INJECTION
  // - second arg can be single value (passing variable) or an array of values being subbed in for $1, $2, $3 ([value, id, param])
  /* 
        await db.one("SELECT * FROM bookmarks WHERE id=$[id]", {
  id: id,
});
    */
  try {
    const oneBookmark = await db.one(
      "SELECT * FROM bookmarks WHERE id = $1",
      idValue
    );
    return oneBookmark;
  } catch (error) {
    return error;
  }
}

// CREATE BOOKMARK
async function createBookmark(obj) {
  /* 
        -Inserting into the database requires two arguments. 
            - first is the SQL query, where the values are represented as $1, $2 etc. 
            - In the second, we are passing an array for each value.
        -We'll use db.one() because we expect one row to be returned. When we return one, we get an object.
    */
  try {
    const newBookmark = await db.one(
      "INSERT INTO bookmarks (name, url, category, is_favorite) VALUES($1, $2, $3, $4) RETURNING *",
      [obj.name, obj.url, obj.category, obj.is_favorite]
    );
    return newBookmark;
  } catch (error) {
    return error;
  }
}

// DELETE BOOKMARK -> use DELETE FROM, WHERE
const deleteBookmark = async (idValue) => {
  try {
    const deletedBookmark = await db.one(
      "DELETE FROM bookmarks WHERE id = $1 RETURNING *",
      idValue
    );
    return deletedBookmark;
  } catch (error) {
    return error;
  }
};

const updateBookmark = async (idValue, obj) => {
  try {
    const updatedBookmark = await db.one(
      "UPDATE bookmarks SET name=$1, url=$2, category=$3, is_favorite=$4 where id=$5 RETURNING *",
      [obj.name, obj.url, obj.category, obj.is_favorite, idValue]
    );
    return updatedBookmark;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllBookmarks,
  getOneBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
};
