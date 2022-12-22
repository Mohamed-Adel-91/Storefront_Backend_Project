CREATE TABLE order_product (
    order_productID SERIAL PRIMARY KEY,
    orderID bigint   NOT NULL,
    productID bigint   NOT NULL,
    quantity bigint   NOT NULL
);

ALTER TABLE order_product ADD CONSTRAINT fk_order_product_orderID FOREIGN KEY(orderID)
REFERENCES orders (orderID);

ALTER TABLE order_product ADD CONSTRAINT fk_order_product_productID FOREIGN KEY(productID)
REFERENCES product (productID);
