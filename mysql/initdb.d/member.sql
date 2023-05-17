CREATE TABLE IF NOT EXISTS member
(
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50),
  nickname VARCHAR(50) NOT NULL,
  PRIMARY KEY (email)
);