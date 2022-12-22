CREATE TABLE "orders" (
    "orderID" SERIAL PRIMARY KEY,
    "usersID" integer   NOT NULL,
    "status" varchar(200)   NOT NULL,
);

ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_usersID" FOREIGN KEY("usersID")
REFERENCES "users" ("usersID");