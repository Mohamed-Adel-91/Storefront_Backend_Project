CREATE TABLE "Orders" (
    "OrderID" INT NOT NULL,
    "UsersID" integer   NOT NULL,
    "Status" varchar(200)   NOT NULL,
    CONSTRAINT "pk_Orders" PRIMARY KEY (
        "OrderID"
     )
);

ALTER TABLE "Orders" ADD CONSTRAINT "fk_Orders_UsersID" FOREIGN KEY("UsersID")
REFERENCES "Users" ("UsersID");