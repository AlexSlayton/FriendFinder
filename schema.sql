/*
CREATE DATABASE IF NOT EXISTS friendFinder;

USE friendFinder;

CREATE TABLE IF NOT EXISTS friendList (
	-- reservation_id INTEGER(10) UNSIGNED AUTO_INCREMENT NOT NULL
	nameFriend VARCHAR(100) NOT NULL
	, photo VARCHAR(300)
	, score int(100) NOT NULL
	, unique_id VARCHAR(100) NOT NULL
	, PRIMARY KEY(unique_id)
);

*/