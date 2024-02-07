const db = require("../database/databaseConfig.js")

const getAllReviews = async (bookmarkId=false) => {
    if(bookmarkId){
        try {
            const allReviews = await db.any(
            "SELECT * FROM reviews WHERE bookmark_id=$1",
            bookmarkId
            );
            return allReviews;
            } catch (err) {
            return err;
            }
    }
    else{
        try {
            const allReviews = await db.any('SELECT * FROM reviews')
            return allReviews
        } catch(error) {
            return error
        }
    }

}

const getOneReview = async (idValue) => {
    try {
        const oneReview = await db.one('SELECT * FROM reviews WHERE id = $1', idValue)
        return oneReview
    } catch (error) {
        return error
    }
}

const createReview = async (obj) => {
    try {
        const newReview = await db.one('INSERT INTO reviews (bookmark_id, reviewer, title, content, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *', [obj.bookmark_id, obj.reviewer, obj.title, obj.content, obj.rating])
        return newReview
    } catch (error) {
        return error
    }
}

const deleteReview = async (idValue) => {
    try {
        const deletedReview = await db.one(
          "DELETE FROM reviews WHERE id = $1 RETURNING *",
          idValue
        );
        return deletedReview;
      } catch (error) {
        return error;
      }
}

const updateReview = async (idValue, obj) => {
    try {
        const updatedReview = await db.one("UPDATE reviews SET reviewer=$1, title=$2, content=$3, rating=$4 WHERE id=$5 RETURNING *", 
        [obj.reviewer, obj.title, obj.content, obj.rating, idValue])
        return updatedReview
    } catch (error) {
        return error
    }
}




module.exports = {
    getAllReviews,
    getOneReview,
    createReview,
    deleteReview,
    updateReview,
}