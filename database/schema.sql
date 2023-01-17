DROP DATABASE IF EXISTS bookmarks_dev;
CREATE DATABASE bookmarks_dev;

\c bookmarks_dev;

CREATE TABLE bookmarks (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 url TEXT,
 category TEXT,
 is_favorite BOOLEAN
);

/* 
    - Run this code in terminal to run schema file :
    psql -U postgres -f database/schema.sql
        -This line of code says, run the app psql, use the User postgres and run the file database/schema.sql.
    - schema: which is the representation of your data model and will also contain db/table(s) set up
 */