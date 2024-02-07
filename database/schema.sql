DROP DATABASE IF EXISTS destbookmarkpost;
CREATE DATABASE destbookmarkpost;

\c destbookmarkpost;

CREATE TABLE bookmarks (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 url TEXT,
 category TEXT,
 is_favorite BOOLEAN
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
 id SERIAL PRIMARY KEY,
 reviewer TEXT,
 title TEXT,
 content TEXT,
 rating NUMERIC,
 CHECK (rating >= 0 AND rating <= 5),
 bookmark_id INTEGER REFERENCES bookmarks (id)
 ON DELETE CASCADE
);



/* 
    - Run this code in terminal to run schema file :
    psql -U postgres -f database/schema.sql
        -This line of code says, run the app psql, use the User postgres and run the file database/schema.sql.
    - schema: which is the representation of your data model and will also contain db/table(s) set up
 */