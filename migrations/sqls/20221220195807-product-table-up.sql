CREATE TABLE "Product" (
    "ProductID" INT NOT NULL,
    "Name" varchar(200)   NOT NULL,
    "Price" integer   NOT NULL,
    "Category" varchar(200)   NOT NULL,
    CONSTRAINT "pk_Product" PRIMARY KEY (
        "ProductID"
     )
);