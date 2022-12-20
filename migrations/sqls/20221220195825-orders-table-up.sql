CREATE TABLE "Orders" (
    "OrderID" INT NOT NULL,
    "UserID" integer   NOT NULL,
    "Status" varchar(200)   NOT NULL,
    CONSTRAINT "pk_Orders" PRIMARY KEY (
        "OrderID"
     )
);

ALTER TABLE "Orders" ADD CONSTRAINT "fk_Orders_UserID" FOREIGN KEY("UserID")
REFERENCES "User" ("UserID");