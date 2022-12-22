CREATE TABLE product (
    productID SERIAL PRIMARY KEY,
    productName varchar(200) NOT NULL,
    price integer NOT NULL,
    category varchar(200) NOT NULL
);