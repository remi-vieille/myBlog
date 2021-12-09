-- Revert myblog:init from pg
BEGIN;
DROP TABLE IF EXISTS post,
category;
COMMIT;