-- Deploy myblog:init to pg
BEGIN;
CREATE TABLE category (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label text NOT NULL UNIQUE,
  route text NOT NULL UNIQUE
);
CREATE TABLE post (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL UNIQUE,
  excerpt text,
  content text
);
ALTER TABLE
  post
ADD
  COLUMN category_id int REFERENCES category(id);
COMMIT;