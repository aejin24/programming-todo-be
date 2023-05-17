CREATE TABLE IF NOT EXISTS social_login
(
  email VARCHAR(50) NOT NULL,
  accessToken VARCHAR(100) NOT NULL,
  platform VARCHAR(100),
  PRIMARY KEY (email, accessToken),
  FOREIGN KEY (email) REFERENCES member(email)
);