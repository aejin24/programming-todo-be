CREATE TABLE IF NOT EXISTS plan
(
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  content VARCHAR(500) NOT NULL,
  repository VARCHAR(500) NOT NULL,
  register_date VARCHAR(30) NOT NULL,
  status INT NOT NULL,
  member_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (member_id) REFERENCES member(id) ON UPDATE CASCADE
);