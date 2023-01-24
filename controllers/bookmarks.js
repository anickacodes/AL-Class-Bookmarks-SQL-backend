const express = require("express")
const router = express.Router()
const { getAllBookmarks, getOneBookmark, createBookmark, deleteBookmark, updateBookmark } = require("../queries/bookmarks.js")
const { checkName, checkBoolean, validateURL } = require("../validations/checkBookmarks.js")
// import reviewsController file into this file to us /bookmarks/:id/reviews
const reviewsController = require("./reviews.js")
router.use("/:bookmarkId/reviews", reviewsController)


// cannot use 'await' keyword unless inside of an 'async' function
router.get("/", async (req, resp) => {
    const allBookmarks = await getAllBookmarks()
    if (allBookmarks[0]) {
        resp.status(200).json(allBookmarks);
      } else {
        resp.status(500).json({ error: "server error" });
      }
})

// SHOW (get one bookmark)
router.get("/:bookmarkId", async (req, resp) => {
    const { bookmarkId } = req.params;
    const bookmark = await getOneBookmark(bookmarkId);
    // get one bookmark will always return something so bookmark will always have a value, check for a certain key value instead
    if (bookmark.id) {
      resp.json(bookmark);
    } else {
      resp.status(404).json({ error: "not found" });
    }
  });
  
//  CREATE / NEW / POST req
// no need for try catch in post req, keep consistent, catch still not serving purpose, can refactor
router.post("/", checkName, checkBoolean, validateURL, async (req, resp) =>{
    try {
        const bookmark = await createBookmark(req.body);
        resp.json(bookmark);
      } catch (error) {
        resp.status(400).json({ error: error });
      }
})

// DELETE ROUTE
router.delete("/:bookmarkId", async (req, resp) => {
    const {bookmarkId} = req.params
    const deletedBookmark = await deleteBookmark(bookmarkId)
    
    deletedBookmark.id ? resp.status(200).json(deletedBookmark) : resp.status(404).json({Error: "Bookmark Not Found"})
})

// UPDATE EDIT PUT ROUTE
router.put("/:bookmarkId", checkName, checkBoolean, validateURL, async (req, resp) => {
    const {bookmarkId} = req.params
    const updatedBookmark = await updateBookmark(bookmarkId, req.body)
    
    updatedBookmark.id ? resp.status(200).json(updatedBookmark) : resp.status(404).json({Error: "bookmark not found"})
})




module.exports = router