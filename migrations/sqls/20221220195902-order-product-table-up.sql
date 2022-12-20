CREATE TABLE "Order_Product" (
    "Order_ProductID" INT NOT NULL,
    "OrderID" bigint   NOT NULL,
    "ProductID" bigint   NOT NULL,
    "Quantity" bigint   NOT NULL,
    CONSTRAINT "pk_Order_Product" PRIMARY KEY (
        "Order_ProductID"
     )
);

ALTER TABLE "Order_Product" ADD CONSTRAINT "fk_Order_Product_OrderID" FOREIGN KEY("OrderID")
REFERENCES "Orders" ("OrderID");

ALTER TABLE "Order_Product" ADD CONSTRAINT "fk_Order_Product_ProductID" FOREIGN KEY("ProductID")
REFERENCES "Product" ("ProductID");
