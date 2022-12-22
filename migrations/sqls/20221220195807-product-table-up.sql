CREATE TABLE "product" (
    "productID" SERIAL PRIMARY KEY,
    "Name" varchar(200) NOT NULL,
    "price" integer NOT NULL,
    "category" varchar(200) NOT NULL,
);