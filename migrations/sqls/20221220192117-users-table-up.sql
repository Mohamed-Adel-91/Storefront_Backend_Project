CREATE TABLE users (
    usersID SERIAL PRIMARY KEY,
    firstName varchar(100)   NOT NULL,
    lastName varchar(100)   NOT NULL,
    userName varchar(200)   NOT NULL UNIQUE,
    password varchar(255)   NOT NULL
);

