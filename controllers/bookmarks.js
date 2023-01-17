const express = require("express")
const router = express.Router()
const { getAllBookmarks } = require("../queries/bookmarks.js")

// cannot use 'await' keyword unless inside of an 'async' function
router.get("/", async (req, resp) => {
    const allBookmarks = await getAllBookmarks()
    if (allBookmarks[0]) {
        resp.status(200).json(allBookmarks);
      } else {
        resp.status(500).json({ error: "server error" });
      }
})




module.exports = router