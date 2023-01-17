\c bookmarks_dev;

INSERT INTO bookmarks (name, url, category, is_favorite) VALUES
('MDN', 'https://developer.mozilla.org/en-US/', 'educational', true),
('Apartment Therapy', 'https://www.apartmenttherapy.com', 'inspirational', true),
('DMV', 'https://dmv.ny.gov', 'adulting', true);

/* 
    -Run this code in terminal to add data to your database: 
    psql -U postgres -f database/seed.sql
    - seed: This is some starter data we can insert into the database
 */