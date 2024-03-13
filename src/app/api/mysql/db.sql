-- CREATE DATABASE fictichat IF NOT EXISTS;
-- use fictichat;

CREATE TABLE user(
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(200),
  email VARCHAR(200),
  password VARCHAR(400),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- describe user;

CREATE TABLE chat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  character_name VARCHAR(200),
  messages LONGTEXT,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- describe user;