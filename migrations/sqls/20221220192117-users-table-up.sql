CREATE TABLE "Users" (
    "UsersID"    INT NOT NULL,
    "FirstName" varchar(100)   NOT NULL,
    "lastName" varchar(100)   NOT NULL,
    "password" varchar(255)   NOT NULL,
    CONSTRAINT "pk_Users" PRIMARY KEY (
        "UsersID"
     )
);