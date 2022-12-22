CREATE TABLE users (
    usersID SERIAL PRIMARY KEY,
    firstName varchar(100)   NOT NULL,
    lastName varchar(100)   NOT NULL,
    password varchar(255)   NOT NULL
);