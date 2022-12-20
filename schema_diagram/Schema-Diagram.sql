-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "User" (
    "UserID" id   NOT NULL,
    "FirstName" varchar(100)   NOT NULL,
    "lastName" varchar(100)   NOT NULL,
    "password" varchar(255)   NOT NULL,
    CONSTRAINT "pk_User" PRIMARY KEY (
        "UserID"
     )
);

CREATE TABLE "Orders" (
    "OrderID" id   NOT NULL,
    "UserID" integer   NOT NULL,
    "Status" varchar(200)   NOT NULL,
    CONSTRAINT "pk_Orders" PRIMARY KEY (
        "OrderID"
     )
);

CREATE TABLE "Order_Product" (
    "Order_ProductID" id   NOT NULL,
    "OrderID" bigint   NOT NULL,
    "ProductID" bigint   NOT NULL,
    "Quantity" bigint   NOT NULL,
    CONSTRAINT "pk_Order_Product" PRIMARY KEY (
        "Order_ProductID"
     )
);

CREATE TABLE "Product" (
    "ProductID" id   NOT NULL,
    "Name" varchar(200)   NOT NULL,
    "Price" integer   NOT NULL,
    "Category" varchar(200)   NOT NULL,
    CONSTRAINT "pk_Product" PRIMARY KEY (
        "ProductID"
     )
);

ALTER TABLE "Orders" ADD CONSTRAINT "fk_Orders_UserID" FOREIGN KEY("UserID")
REFERENCES "User" ("UserID");

ALTER TABLE "Order_Product" ADD CONSTRAINT "fk_Order_Product_OrderID" FOREIGN KEY("OrderID")
REFERENCES "Orders" ("OrderID");

ALTER TABLE "Order_Product" ADD CONSTRAINT "fk_Order_Product_ProductID" FOREIGN KEY("ProductID")
REFERENCES "Product" ("ProductID");

